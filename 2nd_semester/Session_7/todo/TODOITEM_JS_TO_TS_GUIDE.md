# TodoItem JavaScript → TypeScript 변환 실습 가이드

## 🎯 실습 목표

JavaScript로 작성된 `TodoItem_js.jsx`를 TypeScript로 변환하여 타입 안정성을 확보하고, 런타임 에러를 컴파일 타임에 방지해보세요.

## ⚠️ JavaScript 버전의 문제점

### 1. 타입 안정성 부족

```javascript
// JavaScript (현재) - 런타임 에러 가능성
{
    todo.tags.map((tag, index) => (
        <span key={index}>
            {tag} {/* tag가 어떤 타입인지 알 수 없음 */}
        </span>
    ));
}
```

### 2. Props 타입 불명확

```javascript
// JavaScript (현재)
export const TodoItem = ({ todo, onToggle, onDelete, onUpdate }) => {
    // todo가 어떤 구조인지 알 수 없음
    // onToggle, onDelete, onUpdate가 어떤 함수인지 알 수 없음
```

## 📋 변환해야 할 항목들

### 1. Import 문 수정

```javascript
// JavaScript (현재)
import { useState } from "react";

// TypeScript (변환 후)
import { useState } from "react";
import type { Todo, TodoHandler, TodoIdHandler } from "@types/todo";
```

### 2. Props 인터페이스 정의

```javascript
// JavaScript (현재)
export const TodoItem = ({ todo, onToggle, onDelete, onUpdate }) => {

// TypeScript (변환 후)
interface TodoItemProps {
    todo: Todo;
    onToggle: TodoIdHandler;
    onDelete: TodoIdHandler;
    onUpdate: (
        id: string,
        updates: Partial<Omit<Todo, "id" | "createdAt" | "updatedAt">>
    ) => void;
}

export const TodoItem = ({
    todo,
    onToggle,
    onDelete,
    onUpdate,
}: TodoItemProps) => {
```

### 3. State 타입 지정

```javascript
// JavaScript (현재)
const [isEditing, setIsEditing] = useState(false);
const [editTitle, setEditTitle] = useState(todo.title);
const [editDescription, setEditDescription] = useState(todo.description || "");

// TypeScript (변환 후)
const [isEditing, setIsEditing] = useState < boolean > false;
const [editTitle, setEditTitle] = useState < string > todo.title;
const [editDescription, setEditDescription] =
    useState < string > (todo.description || "");
```

### 4. 함수 매개변수 타입 지정

```javascript
// JavaScript (현재)
const getPriorityLevel = (tags) => {
const formatDate = (dateString) => {

// TypeScript (변환 후)
const getPriorityLevel = (tags: string[]): PriorityLevel => {
const formatDate = (dateString: string): string => {
```

### 5. 유니온 타입과 타입 가드 활용

```javascript
// JavaScript (현재)
const priorityStyles = {
    low: "secondary",
    medium: "primary",
    high: "contrast",
};

// TypeScript (변환 후)
type PriorityLevel = "low" | "medium" | "high";

const priorityStyles: Record<PriorityLevel, string> = {
    low: "secondary",
    medium: "primary",
    high: "contrast",
} as const;

// 타입 가드 함수 추가
const isValidPriority = (value: unknown): value is PriorityLevel => {
    return (
        typeof value === "string" &&
        ["low", "medium", "high"].includes(value)
    );
};
```

### 6. 태그 렌더링 안전성 확보

```javascript
// JavaScript (현재) - 런타임 에러 가능성
{
    todo.tags.map((tag, index) => (
        <span key={index}>
            {tag} {/* tag가 어떤 타입인지 알 수 없음 */}
        </span>
    ));
}

// TypeScript (변환 후) - 타입 안전성 확보
{
    todo.tags.map((tag, index) => (
        <span key={index}>
            {typeof tag === "string" && tag}
            {typeof tag === "number" && tag}
            {typeof tag === "boolean" && tag.toString()}
        </span>
    ));
}
```

## 🔍 TypeScript의 장점 (이 실습에서 확인할 수 있는 것들)

### 1. 컴파일 타임 에러 검출

-   잘못된 타입 사용을 미리 발견
-   런타임 에러 방지

### 2. 자동 완성과 IntelliSense

-   Props의 구조를 정확히 알 수 있음
-   함수의 매개변수와 반환 타입을 명확히 알 수 있음

### 3. 리팩토링 안전성

-   타입이 변경되면 관련된 모든 코드에서 에러 표시
-   실수로 인한 버그 방지

### 4. 문서화 효과

-   코드 자체가 문서 역할
-   다른 개발자가 코드를 이해하기 쉬움

## 🚀 실습 단계

1. **TodoItem_js.jsx 파일 열기**
2. **위의 변환 가이드 참고하여 TypeScript로 변환**
3. **타입 에러가 있는지 확인**
4. **태그 렌더링 부분에서 타입 안전성 확보**
5. **변환된 코드가 원본과 동일하게 작동하는지 테스트**

## 💡 힌트

-   `@types/todo`에서 필요한 타입들을 import하세요
-   `PriorityLevel`은 유니온 타입으로 정의하세요
-   `Record<PriorityLevel, string>`은 객체의 키-값 타입을 지정합니다
-   `as const`는 리터럴 타입을 보장합니다
-   `unknown` 타입과 타입 가드를 활용하세요

## ⚠️ 주의사항

-   JavaScript 버전에서는 `{tag}`로 직접 출력했지만, TypeScript에서는 타입 체크가 필요합니다
-   `todo.tags`가 배열이 아닐 수도 있으므로 안전한 접근이 필요합니다
-   함수 매개변수에 타입을 지정하지 않으면 `any` 타입이 됩니다

## ✅ 완성 후 확인사항

-   [ ] 모든 import 문에 타입이 지정되었는가?
-   [ ] Props 인터페이스가 정의되었는가?
-   [ ] State 변수들에 타입이 지정되었는가?
-   [ ] 함수 매개변수와 반환 타입이 지정되었는가?
-   [ ] 유니온 타입이 올바르게 정의되었는가?
-   [ ] 태그 렌더링에서 타입 안전성이 확보되었는가?
-   [ ] TypeScript 컴파일 에러가 없는가?
-   [ ] 런타임 에러가 발생하지 않는가?
