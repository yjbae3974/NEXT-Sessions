import { useState } from "react";

export const TodoItem = ({ todo, onToggle, onDelete, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(todo.title);
    const [editDescription, setEditDescription] = useState(
        todo.description || ""
    );

    const getPriorityLevel = (tags) => {
        if (tags.includes("urgent") || tags.includes("high")) return "high";
        if (tags.includes("medium") || tags.includes("normal")) return "medium";
        return "low";
    };

    const priorityStyles = {
        low: "secondary",
        medium: "primary",
        high: "contrast",
    };

    const priority = getPriorityLevel(todo.tags);
    const priorityStyle = priorityStyles[priority];

    // 편집 모드 토글
    const handleEditToggle = () => {
        if (isEditing) {
            // 편집 완료
            onUpdate(todo.id, {
                title: editTitle.trim(),
                description: editDescription.trim() || undefined,
            });
        } else {
            // 편집 시작
            setEditTitle(todo.title);
            setEditDescription(todo.description || "");
        }
        setIsEditing(!isEditing);
    };

    // 편집 취소
    const handleEditCancel = () => {
        setEditTitle(todo.title);
        setEditDescription(todo.description || "");
        setIsEditing(false);
    };

    // 날짜 포맷팅 함수
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <article className={`card ${todo.completed ? "secondary" : ""}`}>
            <div className="grid">
                <div>
                    {isEditing ? (
                        <div>
                            <input
                                type="text"
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                                className="full-width"
                                autoFocus
                            />
                            <textarea
                                value={editDescription}
                                onChange={(e) =>
                                    setEditDescription(e.target.value)
                                }
                                placeholder="설명 (선택사항)"
                                className="full-width"
                                rows={2}
                            />
                        </div>
                    ) : (
                        <div>
                            <h4
                                style={{
                                    textDecoration: todo.completed
                                        ? "line-through"
                                        : "none",
                                    opacity: todo.completed ? 0.6 : 1,
                                }}
                            >
                                {todo.title}
                            </h4>
                            {todo.description && (
                                <p style={{ opacity: 0.8 }}>
                                    {todo.description}
                                </p>
                            )}
                        </div>
                    )}
                </div>

                <div>
                    <div className="grid">
                        <div>
                            <button
                                onClick={() => onToggle(todo.id)}
                                className={
                                    todo.completed ? "secondary" : "primary"
                                }
                                disabled={isEditing}
                            >
                                {todo.completed ? "완료됨" : "완료하기"}
                            </button>
                        </div>
                        <div>
                            <button
                                onClick={handleEditToggle}
                                className="secondary"
                            >
                                {isEditing ? "저장" : "편집"}
                            </button>
                        </div>
                        <div>
                            {isEditing ? (
                                <button
                                    onClick={handleEditCancel}
                                    className="secondary"
                                >
                                    취소
                                </button>
                            ) : (
                                <button
                                    onClick={() => onDelete(todo.id)}
                                    className="contrast"
                                >
                                    삭제
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {todo.tags && todo.tags.length > 0 && (
                <div style={{ marginTop: "0.5rem" }}>
                    {todo.tags.map((tag, index) => (
                        <span
                            key={index}
                            className={`badge ${priorityStyle}`}
                            style={{ marginRight: "0.25rem" }}
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            )}

            {/* 메타 정보 */}
            <div
                style={{
                    marginTop: "0.5rem",
                    fontSize: "0.8rem",
                    opacity: 0.6,
                }}
            >
                <small>
                    생성: {formatDate(todo.createdAt)}
                    {todo.updatedAt !== todo.createdAt && (
                        <> | 수정: {formatDate(todo.updatedAt)}</>
                    )}
                </small>
            </div>
        </article>
    );
};
