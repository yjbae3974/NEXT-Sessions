export type TodoId = string;
export type TodoTitle = string;
export type TodoDescription = string;
export type TodoCompleted = boolean;
export type TodoTags = string[];

export interface Todo {
    id: TodoId;
    title: TodoTitle;
    description?: TodoDescription; // 옵셔널 프로퍼티
    completed: TodoCompleted;
    tags: TodoTags;
    createdAt: string;
    updatedAt: string;
}

export type TodoStatus = "all" | "active" | "completed";
export type TodoFilter = "all" | "high" | "medium" | "low";

export type TodoList = Todo[];
export type TodoFormData = Omit<Todo, "id" | "createdAt" | "updatedAt">;

export type TodoHandler = (todo: Todo) => void;
export type TodoIdHandler = (id: TodoId) => void;
export type TodoFilterHandler = (filter: TodoStatus) => void;

// API 응답 타입
export type ApiResponse<T> = {
    data: T;
    status: number;
    message: string;
};

// 에러 타입
export type ApiError = {
    error: string;
    status: number;
};
