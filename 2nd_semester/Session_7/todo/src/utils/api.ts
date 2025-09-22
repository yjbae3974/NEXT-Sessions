import type { Todo, TodoFormData, ApiResponse, ApiError } from "@types";

// 제네릭을 활용한 API 함수
export const apiRequest = async <T>(
    url: string,
    options?: RequestInit
): Promise<ApiResponse<T>> => {
    try {
        const response = await fetch(url, {
            headers: {
                "Content-Type": "application/json",
                ...options?.headers,
            },
            ...options,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return {
            data,
            status: response.status,
            message: "Success",
        };
    } catch (error) {
        throw {
            error: error instanceof Error ? error.message : "Unknown error",
            status: 500,
        } as ApiError;
    }
};

// Todo 관련 API 함수들
export const todoApi = {
    // 모든 Todo 조회
    getAll: (): Promise<ApiResponse<Todo[]>> =>
        apiRequest<Todo[]>("http://localhost:3001/todos"),

    // 특정 Todo 조회
    getById: (id: string): Promise<ApiResponse<Todo>> =>
        apiRequest<Todo>(`http://localhost:3001/todos/${id}`),

    // Todo 생성
    create: (todo: TodoFormData): Promise<ApiResponse<Todo>> =>
        apiRequest<Todo>("http://localhost:3001/todos", {
            method: "POST",
            body: JSON.stringify({
                ...todo,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            }),
        }),

    // Todo 수정
    update: (
        id: string,
        todo: Partial<TodoFormData>
    ): Promise<ApiResponse<Todo>> =>
        apiRequest<Todo>(`http://localhost:3001/todos/${id}`, {
            method: "PATCH",
            body: JSON.stringify({
                ...todo,
                updatedAt: new Date().toISOString(),
            }),
        }),

    // Todo 삭제
    delete: (id: string): Promise<ApiResponse<{}>> =>
        apiRequest<{}>(`http://localhost:3001/todos/${id}`, {
            method: "DELETE",
        }),
};
