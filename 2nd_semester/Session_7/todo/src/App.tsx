import { TodoForm } from "@components/TodoForm";
import { TodoList } from "@components/TodoList";
import { TodoFilter } from "@components/TodoFilter";
import { useTodos } from "@hooks/useTodos";
import type { TodoFormData } from "@types/todo";

function App() {
    // 커스텀 훅을 통한 상태 관리
    const {
        todos,
        loading,
        error,
        addTodo,
        updateTodo,
        deleteTodo,
        toggleTodo,
        filteredTodos,
        filter,
        setFilter,
    } = useTodos();

    // Todo 추가 핸들러 (함수 타입 활용)
    const handleAddTodo = async (todoData: TodoFormData): Promise<void> => {
        await addTodo(todoData);
    };

    // Todo 수정 핸들러
    const handleUpdateTodo = async (
        id: string,
        updates: Partial<Omit<TodoFormData, "id">>
    ): Promise<void> => {
        await updateTodo(id, updates);
    };

    // 필터별 통계 계산 (배열 타입, 유니온 타입 활용)
    const todoCounts = {
        all: todos.length,
        active: todos.filter((todo) => !todo.completed).length,
        completed: todos.filter((todo) => todo.completed).length,
    };

    return (
        <main className="container">
            <header style={{ textAlign: "center", marginBottom: "2rem" }}>
                <h1>TypeScript Todo App</h1>
                <p>
                    TypeScript의 모든 문법을 실습해보는 Todo 애플리케이션입니다.
                </p>
            </header>

            {/* 에러 표시 */}
            {error && (
                <div
                    className="card"
                    style={{ backgroundColor: "var(--pico-color-red-50)" }}
                >
                    <h4 style={{ color: "var(--pico-color-red-600)" }}>
                        오류 발생
                    </h4>
                    <p>{error}</p>
                </div>
            )}

            <div className="grid">
                {/* Todo 추가 폼 */}
                <div>
                    <TodoForm onSubmit={handleAddTodo} loading={loading} />
                </div>

                {/* 필터 */}
                <div>
                    <TodoFilter
                        currentFilter={filter}
                        onFilterChange={setFilter}
                        todoCounts={todoCounts}
                    />
                </div>
            </div>

            {/* Todo 목록 */}
            <div style={{ marginTop: "2rem" }}>
                <TodoList
                    todos={filteredTodos}
                    onToggle={toggleTodo}
                    onDelete={deleteTodo}
                    onUpdate={handleUpdateTodo}
                    loading={loading}
                />
            </div>
        </main>
    );
}

export default App;
