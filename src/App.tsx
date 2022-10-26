import Component from './module/Component';
import ReservationList from './components/reservation/ReservationList';
import { $ } from './utills/util';
import ReservationDetail from './components/reservation/ReservationDetail';
import { getReservation } from './api/reserve';
import './style/desktop/reservation/reservation.styled.scss';
import './style/index.scss';
import './style/mobile/index.scss';
import { constructorType } from './utills/type';

export default class App extends Component {
  constructor(...rest: constructorType[]) {
    // @ts-ignore
    super(...rest);
  }

  async initialState() {
    const getReservationData = await getReservation();
    const reservations = getReservationData.reservations?.filter((v) => v.status !== 'done');

    this.setState({
      reservations,
      reservation: reservations ? reservations[0] : null,
      clickedItem: null,
      isShowDetail: 'close',
      scrollHeight: 0,
    });
  }
  template(): string {
    return ` 
           <main>
            <div class="container">
                <h1>예약 목록</h1>
                <section class="contents">
                    <section class="reservationList-container"></section>
                    <section id="dim" class="reservationDetail-container ${this.state.isShowDetail}"></section>
                </section>
            </div>
        </div>
        `;
  }

  async componentDidMount() {
    const { onClickReservation, onClickReservationBtn, onClickClosePopup } = this;
    new ReservationList($('.reservationList-container'), {
      reservations: this.state?.reservations,
      onClickReservation: onClickReservation.bind(this),
      onClickBtn: onClickReservationBtn.bind(this),
    });
    new ReservationDetail($('.reservationDetail-container'), {
      reservation: this.state?.reservation,
      clickedItem: this.state?.clickedItem,
      isShowDetail: this.state.isShowDetail,
      onClickClosePopup: onClickClosePopup.bind(this),
    });
  }

  /********************************************************************************
   *  예약목록 클릭 이벤트 핸들러
   ********************************************************************************/
  async onClickReservation(e: any) {
    e.stopPropagation();
    e.preventDefault();
    const reservationListScrollTop = $('.reservationList-items').getBoundingClientRect().top;
    if (e.target.tagName === 'BUTTON') return;
    const id = e.target.closest('li')?.dataset?.id;
    if (!id) return;
    const clickedItem = this.state.reservations.filter((v) => v.id === id);

    //모바일 환경(min : 1024px)일떄
    if (window.innerWidth <= 1024) {
      this.setState({
        ...this.state,
        clickedItem,
        isShowDetail: 'isShow',
      });
    } else {
      this.setState({
        ...this.state,
        scrollHeight: reservationListScrollTop ? reservationListScrollTop : 0,
      });
    }
  }

  /********************************************************************************
   *  예약목록 내부 버튼(예약 , 착석) 버튼 클릭 이벤트 핸들러
   ********************************************************************************/
  async onClickReservationBtn(e: any) {
    e.stopPropagation();
    e.preventDefault();
    const target = e.target;
    if (!this.state.reservations) return;
    if (target.tagName !== 'BUTTON') return;

    const TEMP_RESERVATIONS = this.state.reservations;
    const id = target.closest('li')?.dataset?.id;
    const Index = TEMP_RESERVATIONS.findIndex((v) => v.id === id);

    //착석일때 -> 퇴석
    if (TEMP_RESERVATIONS[Index].status === 'reserved') {
      TEMP_RESERVATIONS[Index].status = 'seated';

      //퇴석일떄 -> 제거
    } else if (TEMP_RESERVATIONS[Index].status === 'seated') {
      TEMP_RESERVATIONS.splice(Index, 1);
    }
    this.setState({
      ...this.state,
      reservations: (this.state.reservations = TEMP_RESERVATIONS),
      reservation: (this.state.reservation = TEMP_RESERVATIONS[0]),
    });
    //예약목록 변경에 따른 예약상세 정보를 변경합니다
    this.state.reservation = this.state.reservations ? this.state.reservations[0] : '';
  }

  /********************************************************************************
   *  [모바일환경] 팝업 닫기 버튼 클릭 이벤트 핸들러
   ********************************************************************************/
  async onClickClosePopup(e: any) {
    e.stopPropagation();
    e.preventDefault();
    if (e.target.tagName !== 'BUTTON' && e.target.id !== 'dim') return;
    this.setState({
      ...this.state,
      isShowDetail: 'close',
    });
  }
}
