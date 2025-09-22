import { useState, useEffect, useCallback } from "react";
import type { Todo, TodoFormData, TodoStatus } from "@types/todo";
import { todoApi } from "@utils/api";

// 커스텀 훅의 반환 타입 정의
type UseTodosReturn = {
    todos: Todo[];
    loading: boolean;
    error: string | null;
    addTodo: (todo: TodoFormData) => Promise<void>;
    updateTodo: (id: string, todo: Partial<TodoFormData>) => Promise<void>;
    deleteTodo: (id: string) => Promise<void>;
    toggleTodo: (id: string) => Promise<void>;
    filteredTodos: Todo[];
    filter: TodoStatus;
    setFilter: (filter: TodoStatus) => void;
};

export const useTodos = (): UseTodosReturn => {
    // 기본 타입들 (string, number, boolean, array)
    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [filter, setFilter] = useState<TodoStatus>("all");

    // 함수 타입을 활용한 콜백 함수들
    const addTodo = useCallback(
        async (todoData: TodoFormData): Promise<void> => {
            setLoading(true);
            setError(null);
            try {
                const response = await todoApi.create(todoData);
                setTodos((prev) => [...prev, response.data]);
            } catch (err) {
                setError(
                    err instanceof Error ? err.message : "Failed to add todo"
                );
            } finally {
                setLoading(false);
            }
        },
        []
    );

    const updateTodo = useCallback(
        async (id: string, todoData: Partial<TodoFormData>): Promise<void> => {
            setLoading(true);
            setError(null);
            try {
                const response = await todoApi.update(id, todoData);
                setTodos((prev) =>
                    prev.map((todo) => (todo.id === id ? response.data : todo))
                );
            } catch (err) {
                setError(
                    err instanceof Error ? err.message : "Failed to update todo"
                );
            } finally {
                setLoading(false);
            }
        },
        []
    );

    const deleteTodo = useCallback(async (id: string): Promise<void> => {
        setLoading(true);
        setError(null);
        try {
            await todoApi.delete(id);
            setTodos((prev) => prev.filter((todo) => todo.id !== id));
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Failed to delete todo"
            );
        } finally {
            setLoading(false);
        }
    }, []);

    const toggleTodo = useCallback(
        async (id: string): Promise<void> => {
            const todo = todos.find((t) => t.id === id);
            if (todo) {
                await updateTodo(id, { completed: !todo.completed });
            }
        },
        [todos, updateTodo]
    );

    // 유니온 타입을 활용한 필터링
    const filteredTodos = todos.filter((todo) => {
        switch (filter) {
            case "active":
                return !todo.completed;
            case "completed":
                return todo.completed;
            case "all":
            default:
                return true;
        }
    });

    // 초기 데이터 로드
    useEffect(() => {
        const loadTodos = async (): Promise<void> => {
            setLoading(true);
            setError(null);
            try {
                const response = await todoApi.getAll();
                setTodos(response.data);
            } catch (err) {
                setError(
                    err instanceof Error ? err.message : "Failed to load todos"
                );
            } finally {
                setLoading(false);
            }
        };

        loadTodos();
    }, []);

    return {
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
    };
};
