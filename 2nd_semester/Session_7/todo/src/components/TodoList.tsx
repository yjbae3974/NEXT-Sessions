import { TodoItem } from "./TodoItem_js";
import type { Todo, TodoIdHandler } from "@types/todo";

// 컴포넌트 Props 인터페이스
interface TodoListProps {
    todos: Todo[];
    onToggle: TodoIdHandler;
    onDelete: TodoIdHandler;
    onUpdate: (
        id: string,
        updates: Partial<Omit<Todo, "id" | "createdAt" | "updatedAt">>
    ) => void;
    loading?: boolean;
}

// 제네릭을 활용한 정렬 함수
const sortByProperty = <T, K extends keyof T>(
    array: T[],
    property: K,
    direction: "asc" | "desc" = "asc"
): T[] => {
    return [...array].sort((a, b) => {
        const aValue = a[property];
        const bValue = b[property];

        if (aValue < bValue) return direction === "asc" ? -1 : 1;
        if (aValue > bValue) return direction === "asc" ? 1 : -1;
        return 0;
    });
};

// 배열 타입을 활용한 통계 계산
const calculateStats = (todos: Todo[]) => {
    const total = todos.length;
    const completed = todos.filter((todo) => todo.completed).length;
    const active = total - completed;
    const completionRate =
        total > 0 ? Math.round((completed / total) * 100) : 0;

    return { total, completed, active, completionRate };
};

export const TodoList = ({
    todos,
    onToggle,
    onDelete,
    onUpdate,
    loading = false,
}: TodoListProps) => {
    // 통계 계산
    const stats = calculateStats(todos);

    // 완료된 항목과 미완료 항목으로 분리
    const completedTodos = todos.filter((todo) => todo.completed);
    const activeTodos = todos.filter((todo) => !todo.completed);

    // 최근 생성된 순으로 정렬 (제네릭 활용)
    const sortedActiveTodos = sortByProperty(activeTodos, "createdAt", "desc");
    const sortedCompletedTodos = sortByProperty(
        completedTodos,
        "updatedAt",
        "desc"
    );

    if (loading) {
        return (
            <div className="card">
                <h3>할 일 목록</h3>
                <p>로딩 중...</p>
            </div>
        );
    }

    if (todos.length === 0) {
        return (
            <div className="card">
                <h3>할 일 목록</h3>
                <p>아직 등록된 할 일이 없습니다.</p>
                <small>새로운 할 일을 추가해보세요!</small>
            </div>
        );
    }

    return (
        <div>
            {/* 통계 정보 */}
            <div className="card">
                <h3>할 일 목록 ({stats.total}개)</h3>
                <div className="grid">
                    <div>
                        <strong>전체</strong>
                        <br />
                        <span className="badge">{stats.total}</span>
                    </div>
                    <div>
                        <strong>진행 중</strong>
                        <br />
                        <span className="badge secondary">{stats.active}</span>
                    </div>
                    <div>
                        <strong>완료됨</strong>
                        <br />
                        <span className="badge primary">{stats.completed}</span>
                    </div>
                    <div>
                        <strong>완료율</strong>
                        <br />
                        <span className="badge contrast">
                            {stats.completionRate}%
                        </span>
                    </div>
                </div>
            </div>

            {/* 진행 중인 할 일 */}
            {sortedActiveTodos.length > 0 && (
                <div>
                    <h4>진행 중인 할 일 ({sortedActiveTodos.length}개)</h4>
                    {sortedActiveTodos.map((todo) => (
                        <TodoItem
                            key={todo.id}
                            todo={todo}
                            onToggle={onToggle}
                            onDelete={onDelete}
                            onUpdate={onUpdate}
                        />
                    ))}
                </div>
            )}

            {/* 완료된 할 일 */}
            {sortedCompletedTodos.length > 0 && (
                <div>
                    <h4>완료된 할 일 ({sortedCompletedTodos.length}개)</h4>
                    {sortedCompletedTodos.map((todo) => (
                        <TodoItem
                            key={todo.id}
                            todo={todo}
                            onToggle={onToggle}
                            onDelete={onDelete}
                            onUpdate={onUpdate}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};
