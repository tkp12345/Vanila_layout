> ## 실행방법
```
 $ npm i
 $ npm run dev 
 
 >3080 포트 실행 (http://localhost:3080/)
```
<br/>


> ## 시연
![ezgif com-gif-maker (16)](https://user-images.githubusercontent.com/46067837/197951572-543a574a-ba39-4094-abcc-4c731bd13e9f.gif)

<br/>

> ## 구현
1. only VanilaJS 사용 
2. SPA 구조의 컴포넌트 클래스 생성 - 데이터 기반 돔핸들링 
3. 환경설정 (webpack, babel , eslint, prettier, 각종loader, TS)


<br/>

> ## 구현 상세
### 1. SPA 컴포넌트 구현
본인은 SPA가 익숙하기도하고 현대 프론트 트렌드에따라, \
구현시 **직접적으로 DOM 을 다루는 행위를 최소화하고 상태(state)를 기준으로 DOM을 렌더링 하는 형태**로 구현했습니다.\
이를위해 react 의 라이프사이클을 모방한 컴포넌트 클래스를 만들어 \
마치 리엑트 컴포넌트 구조 및 패키지구조를 흉내내 보았습니다

##### src/module/Component.ts
```
export default class Component {
  $target;
  props;
  state;

  /****************************************************
   *  💁‍♂️constructor :
   *  초기 상태 설정
   *  사용되는는 컴포넌트에서 target(선택자) 과 props를 전달받는다
   *  비동기로 initialState()를 호출한다
   *  => 왜? :initialState 이후에 state 값을 처리하는 요청떄문에
   ****************************************************/
  constructor($target : HTMLElement, props: any) {
    this.$target = $target;
    this.props = props;

    this.initialState();
  }

  /****************************************************
   *  💁‍♂initialState :
   *  state 값을 처리하는 요청 위해 따로 함수로 생성
   *  컴포넌트를 렌더링 하기위한 render() 호출
   ****************************************************/
  async initialState() {
    this.render();
  }

  /****************************************************
   *  💁‍♂setState :
   *  state를 갱신하고 컴포넌트를 다시 렌더하기위해 render()를 호출합니다
   ****************************************************/
  setState(newState:object|any) {
    this.state = newState;
    this.render();
  }

  /****************************************************
   *  💁‍♂template :
   *  (JSX) 를 정의하고 리턴합니다
   ****************************************************/
  template() {
    //state,props 작성
    return '';
  }

  /****************************************************
   *  💁‍♂render :
   *  template 정의된 (JSX)를 브라우저에 뿌려줍니다
   *  그리고 DOM 생성 이후의 처리를 위한 componentDidMount()를 호출합니다
   ****************************************************/
  render(){
    this.$target.innerHTML = this.template();
    this.componentDidMount();
  }

  /****************************************************
   *  💁‍♂componentDidMount :
   *  생성된 돔에 이벤트를 붙여줍니다 (마치 Virtual Dom 과같은 일을합니다 - react life cycle 참조)
   *  하위 컴포넌트 객체를 생성해줍니다 
   ****************************************************/
  componentDidMount() {}
}


```
<br/>

### 2. display : none (❌) => opacity : 0 (⭕) 
불필요한 Reflow 나 돔트리를 다시 그리는 과정을 지양하고 Repaint 만 일어나도록 함으로서 렌더링 최적화를 했습니다. 
<br/>
<br/>

### 3. 인터넷 익스플로러 10 이상 지원 설정 
### ./webpack.config.ts 파일 babel-loader presets 설정 추가 
```
 module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        [
                            '@babel/preset-env',
                            {
                                targets: { browsers: ['IE 10'] },
                                debug: isDevelopment,
                            },
                        ],
                        '@babel/preset-react',
                        '@babel/preset-typescript',
                    ],
                    env: {
                  ...
```

### 메타태그 content 설정 "IE=edge" 설정
```
 ... 
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
 ...
```
