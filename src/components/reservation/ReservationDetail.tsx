import Component from '../../module/Component';

export default class ReservationDetail extends Component {
  constructor(...rest) {
    // @ts-ignore
    super(...rest);
  }

  template(): string {
    const { reservation, clickedItem } = this.props;
    console.log('reservationDetail:', reservation, clickedItem);
    if (!reservation) return ``;
    return `
            <div class="reservationDetail-container">
            ${clickedItem?.length ? clickedItem[0].customer?.name : reservation.customer.name}
            </div>
        `;
  }
}
