import { useState } from "react";
import type { Todo, TodoStatus } from "./types/todo";

function App() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [filter, setFilter] = useState<TodoStatus>("all");

    return (
        <main className="container">
            <h1>TypeScript Todo App</h1>
            <p>TypeScript 문법을 실습해보는 Todo 애플리케이션입니다.</p>

            <div className="grid">
                <div>
                    <h2>Todo 목록</h2>
                    <p>현재 {todos.length}개의 할 일이 있습니다.</p>
                </div>
                <div>
                    <h2>필터</h2>
                    <p>현재 필터: {filter}</p>
                </div>
            </div>

            <div className="card">
                <p>실습을 시작하려면 컴포넌트들을 구현해보세요!</p>
                <ul>
                    <li>TodoList 컴포넌트</li>
                    <li>TodoForm 컴포넌트</li>
                    <li>TodoFilter 컴포넌트</li>
                </ul>
            </div>
        </main>
    );
}

export default App;
