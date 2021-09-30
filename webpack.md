## webpack

- webpack.config.js 기준으로 동작
- output의 path는 절대경로로! 생성하는 경로가 config 아닐 확률이 높음
- 브라우저에서 동작할 수 있는 형태로 번들
- js만 번들 가능
  - vue를 번들하려면 loader를 추가해줘야함
  - /\.vue$/ : .vue로 끝나는 문자열
  - use: 'vue-loader'
  - loader는 파일을 가져와서 읽을 준비만 함, 해석하려면 compiler-sfc 필요
  - The 'mode' option has not been set, webpack will fallback to 'production' for this value.
  - 프로젝트 할 때는 mode option을 제공해주는 것이 좋음
  ```
  "scripts": {
    "build": "webpack --mode production"
  },
  ```
  - 실제 배포시에는 dist 폴더를 호스팅 서버에 업로드 해서 사용하게 되는데, index.html을 추가해줄 수 있다.
    - src의 index.html을 가져다 써야 업데이트 문제 같은게 안생기는데 html-webpack-plugin을 사용한다.
    - plugins 옵션에 추가하고, template을 넣어서 생성해줘야하는데 template은 기본적으로 내부에서 path.resolve(\_\_dirname)을 수행한다.
  - clean:true 옵션 제공하면 필요없는 것들 제거
- 개발 서버 여는 script 설정
  - webpack-dev-server
  - devserver option으로 포트번호 지정
- vue의 스타일 해석하기 위해서는 webpack에 설정 추가해야함
  - vue-style-loader
  - css-loader

> defer랑 태그를 맨 마지막에 넣는건 무슨 차이지?

## SFC

- style은 원래 전역으로 적용된다. scoped attr을 통해 지역에만 설정가능
  - style hash를 통함
- favicon.ico 파일을 저장해놓으면 파비콘 설정 안해놔도 알아서 찾아서 설정함
  - 현재 저는 안됩니다

## 실수 노트

문제를 예상만하고 실제로 확인해보지 않았다.
strong 태그가 존재하지 않을 거라고 생각하고 뷰 닥스 코드를 봤는데, 당연하게 F12를 눌러 개발자 도구로 확인할 생각을 못 했다. 문제 파악은 항상 눈으로 직접 확인하고 정확히 하자!
