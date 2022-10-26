import Component from '../../module/Component';
import { fullTimeDataFilter, statusDataFilter, timeDataFilter } from '../../utills/dataFilter';
import { $ } from '../../utills/util';

export default class ReservationDetail extends Component {
  constructor(...rest) {
    // @ts-ignore
    super(...rest);
  }

  template(): string {
    const { reservation, clickedItem, isShowDetail } = this.props;
    const CLICKITEM = clickedItem?.length ? clickedItem[0] : reservation;
    if (!reservation) return ``;
    return `
            <div class="reservationDetail-items">
                <div class="reservationDetail-box">
                  <h3>예약 정보</h3>
                  <ul>
                     <li>
                        <div class='li-title'>예약 상태</div>
                        <p>${statusDataFilter(CLICKITEM.status)}</p>
                     </li>
                      <li>
                        <div class='li-title'>예약 시간</div>
                        <p>${fullTimeDataFilter(CLICKITEM.timeRegistered)}</p>
                     </li>
                      <li>
                        <div class='li-title'>접수 시간</div>
                        <p>${fullTimeDataFilter(CLICKITEM.timeReserved)}</p>
                     </li>
                  </ul>
                </div>
                <div class="reservationDetail-box">
                  <h3>고객 정보</h3>
                  <ul>
                      <li>
                        <div class='li-title'>고객 서명</div>
                        <p>${CLICKITEM.customer.name}</p>
                      </li>
                      <li>
                        <div class='li-title'>고객 등급</div>
                        <p>${CLICKITEM.customer.level}</p>
                      </li>
                      <li>
                        <div class='li-title'>고객 메모</div>
                        <div class='text-area'>
                         <p>${CLICKITEM.customer.memo}</p>
                        </div>
                      </li>
                    </ul>
                 </div>
                 <div class="reservationDetail-box">
                    <ul>
                     <li>
                      <div class='li-title'>요청 사항</div>
                      <div class='text-area'>
                        <p>${CLICKITEM.customer.request}</p>
                      </div>
                      </div>
                     </li>
                   </ul>
                    <button class="closeBtn ${isShowDetail}">닫기</button>
                   </div>
            </div>
        `;
  }
  componentDidMount() {
    const { onClickClosePopup } = this.props;
    this.$target.addEventListener('click', onClickClosePopup);
  }
}
