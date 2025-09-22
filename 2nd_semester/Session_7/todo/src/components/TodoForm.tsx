import { useState, type FormEvent } from "react";
import type { TodoFormData } from "@types/todo";

// 컴포넌트 Props 타입 정의
interface TodoFormProps {
    onSubmit: (todo: TodoFormData) => void;
    loading?: boolean; // 옵셔널 프로퍼티
}

export const TodoForm = ({ onSubmit, loading = false }: TodoFormProps) => {
    // 기본 타입들 활용
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [tags, setTags] = useState<string>("");

    // 타입 단언을 활용한 폼 제출 핸들러
    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        if (!title.trim()) return;

        // 타입 단언 (as) 사용
        const todoData: TodoFormData = {
            title: title.trim(),
            description: description.trim() || undefined, // 옵셔널 프로퍼티
            completed: false,
            tags: tags
                .split(",")
                .map((tag) => tag.trim())
                .filter(Boolean),
        };

        onSubmit(todoData);

        // 폼 초기화
        setTitle("");
        setDescription("");
        setTags("");
    };

    return (
        <form onSubmit={handleSubmit} className="card">
            <h3>새로운 할 일 추가</h3>

            <div>
                <label htmlFor="title">
                    제목 <span style={{ color: "red" }}>*</span>
                </label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="할 일을 입력하세요"
                    required
                    disabled={loading}
                />
            </div>

            <div>
                <label htmlFor="description">설명</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="상세 설명 (선택사항)"
                    disabled={loading}
                    rows={3}
                />
            </div>

            <div>
                <label htmlFor="tags">태그</label>
                <input
                    type="text"
                    id="tags"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="태그를 쉼표로 구분하여 입력 (예: work, urgent)"
                    disabled={loading}
                />
                <small>
                    쉼표(,)로 구분하여 여러 태그를 입력할 수 있습니다.
                </small>
            </div>

            <button
                type="submit"
                disabled={loading || !title.trim()}
                className="contrast"
            >
                {loading ? "추가 중..." : "할 일 추가"}
            </button>
        </form>
    );
};
