# TypeScript Todo App 실습 프로젝트

## 🎯 프로젝트 목표

TypeScript의 기본 문법과 React와의 연동을 실습하기 위한 Todo 애플리케이션입니다.

## 🛠️ 기술 스택

-   **Frontend**: React + TypeScript + Vite
-   **Styling**: Pico CSS
-   **Backend**: JSON Server
-   **Package Manager**: npm

## 📁 프로젝트 구조

```
src/
├── types/
│   └── todo.ts          # Todo 관련 타입 정의
├── components/          # React 컴포넌트들 (실습용)
├── hooks/              # 커스텀 훅들 (실습용)
├── utils/              # 유틸리티 함수들 (실습용)
├── App.tsx             # 메인 앱 컴포넌트
└── main.tsx            # 앱 진입점
```

## 🚀 실행 방법

### 1. 의존성 설치

```bash
npm install
```

### 2. JSON Server 실행 (백엔드)

```bash
npm run server
```

-   포트: 3001
-   API 엔드포인트: http://localhost:3001/todos

### 3. 개발 서버 실행 (프론트엔드)

```bash
npm run dev
```

-   포트: 5173
-   URL: http://localhost:5173

## 📚 실습할 TypeScript 문법들

### 기본 타입

-   `string`, `number`, `boolean`, `array`
-   `any`, `unknown`, `never`
-   `object`, `interface`

### 문법

-   타입 선언과 추론
-   타입 단언 (`as`)
-   타입 별칭 (`type`)
-   유니온 타입 (`|`)
-   옵셔널 프로퍼티 (`?`)
-   함수 타입

## 🎯 실습 과제

1. **TodoList 컴포넌트** - Todo 목록 표시
2. **TodoForm 컴포넌트** - Todo 추가/수정 폼
3. **TodoFilter 컴포넌트** - 필터링 기능
4. **API 연동** - JSON Server와 통신
5. **커스텀 훅** - 상태 관리 로직 분리

## 📝 참고사항

-   모든 컴포넌트는 TypeScript로 작성
-   타입 안정성을 최대한 활용
-   Pico CSS를 사용한 간단한 스타일링
-   JSON Server를 통한 REST API 연동
