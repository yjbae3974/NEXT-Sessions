import { useState } from "react";

export const TodoForm = ({ onSubmit, loading = false }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState([]);

    // 폼 제출 핸들러 (타입 지정 없이)
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title.trim()) return;

        const todoData = {
            title: title.trim(),
            description: description.trim(),
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
        setTags([]);
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
