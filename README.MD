# CodeLab-React-Express

## About

React + Express.js 작업 환경
- 클라이언트 / 서버 에서 ES6 문법 사용
- 개발 환경에서 webpack-dev-server 실행, 프록시 연결
- react-hot-loader 를 통한 Hot Module Reload 사용
- nodemon을 이용하여 개발 환경에서 서버사이드 코드가 수정 될 때 마다 서버 재시작

React CodeLab 에서 Express 초기 작업환경을 설정 할 때 사용 된 프로젝트입니다.


## 설치하기

```
npm install -g webpack webpack-dev-server babel nodemon
npm install
```

## 스크립트

- `npm run clean` 서버 / 클라이언트 빌드된 코드 제거
- `npm run build` 서버 / 클라이언트 빌드
- `npm run start` production 환경에서 서버 시작
- `npm run development` development 환경에서 서버 시작

Express 서버는 포트 3000, 개발서버는 4000 으로 실행됩니다. 변경은 server/main.js 에서 할 수 있습니다.
