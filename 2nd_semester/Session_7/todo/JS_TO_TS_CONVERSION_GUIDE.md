# JavaScript → TypeScript 변환 실습 가이드

## 🎯 실습 목표

JavaScript로 작성된 `TodoForm_js.jsx`를 TypeScript로 변환하여 타입 안정성을 확보해보세요.

## 📋 변환해야 할 항목들

### 1. Import 문 수정

```javascript
// JavaScript (현재)
import { useState } from "react";

// TypeScript (변환 후)
import { useState, type FormEvent } from "react";
import type { TodoFormData } from "@types/todo";
```

### 2. Props 타입 정의

```javascript
// JavaScript (현재)
export const TodoForm = ({ onSubmit, loading = false }) => {

// TypeScript (변환 후)
interface TodoFormProps {
    onSubmit: (todo: TodoFormData) => void;
    loading?: boolean; // 옵셔널 프로퍼티
}

export const TodoForm = ({ onSubmit, loading = false }: TodoFormProps) => {
```

### 3. State 타입 지정

```javascript
// JavaScript (현재)
const [title, setTitle] = useState("");
const [description, setDescription] = useState("");
const [tags, setTags] = useState("");

// TypeScript (변환 후)
const [title, setTitle] = useState < string > "";
const [description, setDescription] = useState < string > "";
const [tags, setTags] = useState < string > "";
```

### 4. 함수 매개변수 타입 지정

```javascript
// JavaScript (현재)
const handleSubmit = (e) => {

// TypeScript (변환 후)
const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
```

### 5. 객체 타입 지정

```javascript
// JavaScript (현재)
const todoData = {
    title: title.trim(),
    description: description.trim() || undefined,
    completed: false,
    tags: tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
};

// TypeScript (변환 후)
const todoData: TodoFormData = {
    title: title.trim(),
    description: description.trim() || undefined,
    completed: false,
    tags: tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
};
```

## 🔍 TypeScript의 장점

### 1. 타입 안정성

-   컴파일 타임에 에러 검출
-   잘못된 타입 사용 방지

### 2. 자동 완성

-   IDE에서 정확한 자동 완성 제공
-   API 사용법을 정확히 알 수 있음

### 3. 리팩토링 안전성

-   코드 변경 시 영향받는 부분을 정확히 파악
-   실수로 인한 버그 방지

### 4. 문서화 효과

-   타입 자체가 코드의 문서 역할
-   함수의 입출력이 명확함

## 🚀 실습 단계

1. **TodoForm_js.jsx 파일 열기**
2. **위의 변환 가이드 참고하여 TypeScript로 변환**
3. **타입 에러가 있는지 확인**
4. **변환된 코드가 원본과 동일하게 작동하는지 테스트**

## 💡 힌트

-   `@types/todo`에서 `TodoFormData` 타입을 import하세요
-   `FormEvent<HTMLFormElement>`는 React의 이벤트 타입입니다
-   `?:`는 옵셔널 프로퍼티를 의미합니다
-   `void`는 함수가 아무것도 반환하지 않음을 의미합니다

## ✅ 완성 후 확인사항

-   [ ] 모든 import 문에 타입이 지정되었는가?
-   [ ] Props 인터페이스가 정의되었는가?
-   [ ] State 변수들에 타입이 지정되었는가?
-   [ ] 함수 매개변수에 타입이 지정되었는가?
-   [ ] 객체에 타입이 지정되었는가?
-   [ ] TypeScript 컴파일 에러가 없는가?
