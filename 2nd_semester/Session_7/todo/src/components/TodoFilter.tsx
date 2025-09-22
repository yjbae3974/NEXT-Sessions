import type { TodoStatus, TodoFilterHandler } from "@types/todo";

// 필터 옵션 타입 정의
interface FilterOption {
    value: TodoStatus;
    label: string;
    count?: number;
}

// 컴포넌트 Props 인터페이스
interface TodoFilterProps {
    currentFilter: TodoStatus;
    onFilterChange: TodoFilterHandler;
    todoCounts?: {
        all: number;
        active: number;
        completed: number;
    };
}

// 필터 옵션 배열 (배열 타입 활용)
const filterOptions: FilterOption[] = [
    { value: "all", label: "전체" },
    { value: "active", label: "진행 중" },
    { value: "completed", label: "완료됨" },
];

export const TodoFilter = ({
    currentFilter,
    onFilterChange,
    todoCounts,
}: TodoFilterProps) => {
    // 필터 옵션 렌더링 함수 (함수 타입 활용)
    const renderFilterButton = (option: FilterOption): JSX.Element => {
        const isActive = currentFilter === option.value;
        const count = todoCounts?.[option.value];

        return (
            <button
                key={option.value}
                onClick={() => onFilterChange(option.value)}
                className={isActive ? "contrast" : "secondary"}
                style={{
                    position: "relative",
                    minWidth: "120px",
                }}
            >
                {option.label}
                {count !== undefined && (
                    <span
                        className="badge"
                        style={{
                            position: "absolute",
                            top: "-8px",
                            right: "-8px",
                            fontSize: "0.7rem",
                            minWidth: "20px",
                            height: "20px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        {count}
                    </span>
                )}
            </button>
        );
    };

    return (
        <div className="card">
            <h3>필터</h3>
            <div className="grid" style={{ gap: "0.5rem" }}>
                {filterOptions.map(renderFilterButton)}
            </div>

            {/* 현재 필터 정보 */}
            <div
                style={{
                    marginTop: "1rem",
                    padding: "0.5rem",
                    backgroundColor: "var(--pico-background-color)",
                    borderRadius: "var(--pico-border-radius)",
                }}
            >
                <small>
                    현재 필터:{" "}
                    <strong>
                        {
                            filterOptions.find(
                                (opt) => opt.value === currentFilter
                            )?.label
                        }
                    </strong>
                    {todoCounts && (
                        <>
                            {" "}
                            | 총 {todoCounts.all}개 중{" "}
                            {todoCounts[currentFilter]}개 표시
                        </>
                    )}
                </small>
            </div>
        </div>
    );
};
