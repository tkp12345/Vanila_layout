import Component from "./module/Component";
import ReservationList from "./components/reservation/ReservationList";
import { $ } from './utills/util';
import ReservationDetail from "./components/reservation/Reservationdetail";
import {getReservation} from "./api/reserve";


export default  class App extends Component {
    constructor(...rest : any) {
        // @ts-ignore
        super(...rest);
    }

    async initialState(){

        const reservation = await getReservation()
        console.log('reservation:',reservation)

        this.setState({});
    }

    template(){
        return ` 
            <div class="container">
                <h1>예약 목록</h1>
                <section class="contents">
                    <section class="reservationList-container"></section>
                    <section class="reservationDetail-container"></section>
                </section>
            </div>
        `
    }

    async componentDidMount(){
        new ReservationList($('.reservationList-container'))
        new ReservationDetail($('.reservationDetail-container'))

    }

}