## 프로젝트 이름

WhatTodo-webview

### Features

- 할 일 추가 / 수정 / 삭제
- 할 일 완료 체크
- 날짜, 월별로 할 일 분리
- 모바일 대응 UI

### 실행환경

React + TypeScript + Vite

### 배포 링크

[https://webview-todo-stamp.vercel.app/](https://webview-todo-stamp.vercel.app/)

### 기술 스택

- React + Typescript
- Zustand (상태관리)
- TailwindCSS + shadcn/ui (스타일링)
- Vite (빌드 도구)
- Vercel (배포)

### 설치 및 실행 방법

git clone https://github.com/searchmoon/WhatTodo-Webview
cd WhatTodo-Webview
pnpm install (command not found가 뜬다면, npm install -g pnpm 후 다시 실행)
pnpm run dev

### 주요 이슈 및 해결 과정

1. useLongPress 훅에서의 이슈

문제: 모바일 환경에서 롱프레스를 처리할 때 click 이벤트와 충돌이 생겨 의도치 않게 두 번 이벤트가 발생하는 문제가 있었음.

해결: event.preventDefault() 및 stopPropagation() 등을 추가해 브라우저 기본 동작을 막아 중복 이벤트 발생을 방지함. touch와 mouse 이벤트를 하나로 통합하여 중복 실행을 방지함.

2. WebView 연동 시 주소 처리와 환경 구분

문제: 로컬 개발 서버에서 Android WebView가 localhost를 인식하지 못해 통신이 되지 않음. 자동 생성된 IP 주소가 맞지 않아 통신 불가.

해결: Android 환경에서는 10.0.2.2를 사용하게끔 .env로 환경을 분리하여 WebView와의 통신을 가능하게 함. IP 주소 자동 셋팅 과정에서 172로 시작하는 IP가 자동 선택되어 로컬 접근이 되지 않는 문제가 있어, 192로 시작하는 IP로 자동 생성되도록 수정.

3. 웹뷰와 웹 환경 UI 차이 대응

문제: iOS/Android WebView와 일반 웹 환경에서 UI 차이가 발생함.

해결: Expo 앱에서 SafeAreaView로 감싸기, 공통 스타일 제거 후 모바일 환경에 맞게 터치 영역, 버튼 크기, 폰트 사이즈 등 UI 요소를 최적화함.
