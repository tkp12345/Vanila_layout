import Component from "../../module/Component";

export default class ReservationDetail extends Component {
    constructor(...rest) {
        // @ts-ignore
        super(...rest);
    }

    template(): string {
        return `
            <div class="reservationDetail-container">
            ReservationDetail
            </div>
        `
    }
}