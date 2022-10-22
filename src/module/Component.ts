export default class Component{
    $target;
    props;
    state;
    constructor($target, props?:any) {
        this.$target = $target;
        this.props = props;

        this.initialState()
    }

    async initialState(){
        this.render();
    }

    setState(newState){
        this.state = newState;
        this.render();
    }

    template(){
        return '';
    }

    render(){
        this.$target.innerHTML = this.template();
        this.componentDidMount();
    }

    componentDidMount(){

    }
}