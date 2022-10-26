export default class Component {
  $target;
  props;
  state;

  /****************************************************
   *  constructor :
   *  초기 상태 설정
   *  사용되는는 컴포넌트에서 target(선택자) 과 props를 전달받는다
   *  비동기로 initialState()를 호출한다
   *  => 왜? :initialState 이후에 state 값을 처리하는 요청떄문에
   ****************************************************/
  constructor($target: HTMLElement, props: any) {
    this.$target = $target;
    this.props = props;

    this.initialState();
  }

  /****************************************************
   *  initialState :
   *  state 값을 처리하는 요청 위해 따로 함수로 생성
   *  컴포넌트를 렌더링 하기위한 render() 호출
   ****************************************************/
  async initialState() {
    this.render();
  }

  /****************************************************
   *  setState :
   *  state를 갱신하고 컴포넌트를 다시 렌더하기위해 render()를 호출합니다
   ****************************************************/
  setState(newState: object | any) {
    this.state = newState;
    this.render();
  }

  /****************************************************
   *  template :
   *  (JSX) 를 정의하고 리턴합니다
   ****************************************************/
  template() {
    //state,props 작성
    return '';
  }

  /****************************************************
   *  render :
   *  template 정의된 (JSX)를 브라우저에 뿌려줍니다
   *  그리고 DOM 생성 이후의 처리를 위한 componentDidMount()를 호출합니다
   ****************************************************/
  render() {
    this.$target.innerHTML = this.template();
    this.componentDidMount();
  }

  /****************************************************
   *  componentDidMount :
   *  생성된 돔에 이벤트를 붙여줍니다 (마치 Virtual Dom 과같은 일을합니다 - react life cycle 참조)
   *  하위 컴포넌트 객체를 생성해줍니다
   ****************************************************/
  componentDidMount() {}
}
