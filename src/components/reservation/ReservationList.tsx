import Component from '../../module/Component';
import '../../style/desktop/reservation/reservation.styled.scss';
import '../../style/mobile/index.scss';
import { btnStatusDataFilter, statusDataFilter, timeDataFilter } from '../../utills/dataFilter';
export default class ReservationList extends Component {
  constructor(...rest) {
    // @ts-ignore
    super(...rest);
  }

  template(): string {
    const { reservations } = this.props;
    if (!reservations) return '';
    return `
        <ul class="reservationList-items">
                ${reservations
                  ?.map(
                    (reservation) =>
                      `<li class='reservationList-item' key="${reservation.id}" data-id="${reservation.id}">
                          <div class="reservation-status">
                           <span>${timeDataFilter(reservation.timeReserved)}</span>
                            <span class="${reservation.status}">${statusDataFilter(reservation.status)}</span>
                        </div>
                        <div class="reservation-info">
                            <span>${reservation.customer.name} - ${reservation.tables?.map(
                        (table) => table.name,
                      )}</span>
                            <span>성인 ${String(reservation.customer.adult).padStart(2, '0')} 아이 ${String(
                        reservation.customer.child,
                      ).padStart(2, '0')} </span>
                            <span>${reservation.menus?.map((menu) => ` ${menu.name}(${menu.qty}) `)}</span>
                        </div>
                        <div class="reservation-event">
                        <button class="reservation-btn ${reservation.status}">${btnStatusDataFilter(
                        reservation.status,
                      )}</button>
                        </div>
                        </li>`,
                  )
                  .join('')}
                </ul>
        `;
  }

  componentDidMount() {
    const { onClickReservation, onClickBtn } = this.props;
    this.$target.addEventListener('click', onClickReservation);
    this.$target.addEventListener('click', onClickBtn);
  }
}
