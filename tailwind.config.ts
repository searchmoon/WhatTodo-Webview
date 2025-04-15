export default {
  mode: "jit", // JIT 모드 활성화
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // Tailwind가 클래스명을 검색할 경로
    "./node_modules/react-spring-bottom-sheet/**/*.js", // 외부 라이브러리 클래스 포함
  ],
  darkMode: "class", //또는 "media"
  theme: {
    extend: {
      zIndex: {
        100: "100",
        999: "999",
      },
    },
  },
};
