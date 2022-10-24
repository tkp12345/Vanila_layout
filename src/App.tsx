import Component from './module/Component';
import ReservationList from './components/reservation/ReservationList';
import { $ } from './utills/util';
import ReservationDetail from './components/reservation/ReservationDetail';
import { getReservation } from './api/reserve';
import './style/desktop/reservation/reservation.styled.scss';
import './style/index.scss';

export default class App extends Component {
  constructor(...rest: any) {
    // @ts-ignore
    super(...rest);
  }

  async initialState() {
    const getReservationData = await getReservation();
    const reservations = getReservationData.reservations;

    this.setState({
      reservations,
      reservation: reservations ? reservations[0] : null,
      clickedItem: null,
    });
  }
  template() {
    return ` 
           <main>
            <div class="container">
                <h1>예약 목록</h1>
                <section class="contents">
                    <section class="reservationList-container"></section>
                    <section class="reservationDetail-container"></section>
                </section>
            </div>
        </div>
        `;
  }

  async componentDidMount() {
    // @ts-ignore
    const { onClickReservation , onClickReservationBtn } = this;

    new ReservationList($('.reservationList-container'), {
      reservations: this.state?.reservations,
      onClickReservation: onClickReservation.bind(this),
      onClickBtn : onClickReservationBtn.bind(this),
    });
    new ReservationDetail($('.reservationDetail-container'), {
      reservation: this.state?.reservation,
      clickedItem: this.state?.clickedItem,
    });
    console.log(this.state);
  }

  async onClickReservation(id) {
    if (!id) return;
    const clickedItem = this.state.reservations.filter((v) => v.id === id);
    this.setState({
      ...this.state,
      clickedItem,
    });
  }

  async onClickReservationBtn({target}){
    console.log('event:');
    console.log('this.state.reservations:',this.state.reservations);
    if(!this.state.reservations) return;
    if(target.tagName !== 'BUTTON') return;
    const id = target.closest('li')?.dataset?.id;
    console.log('target-id:',id)
    console.log('target:',target)
    // console.log('props:',this.state.reservations)
    this.state.reservations?.map((reservation ,index) =>{
      if(reservation.id === id) {
        console.log('선택된 status:', reservation.status)
        if (reservation.status === 'seated') {
          this.state.reservations.splice(index,1)

        } else if (reservation.status === 'reserved') {
          reservation.status = 'seated'
        }
      }
    })
    this.state.reservation = this.state.reservations?this.state.reservations[0]:''
    this.componentDidMount()

  }

}
