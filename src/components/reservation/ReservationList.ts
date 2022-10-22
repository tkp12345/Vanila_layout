import Component from "../../module/Component";

export default class ReservationList extends Component {
    constructor(...rest) {
        // @ts-ignore
        super(...rest);
    }

    template(): string {
        return `
            <div class="reservationList-container">
            ReservationList
            </div>
        `
    }
}