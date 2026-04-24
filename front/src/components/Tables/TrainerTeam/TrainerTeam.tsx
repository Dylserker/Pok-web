import './TrainerTeam.css'
import { useState } from "react"
import type { TrainerItem, TrainerTableProps } from "../../../types/trainer.ts"

export default function TrainerTable({
  title = "",
  portrait = null,
  columns = [],
  items = [],
  highlightLast = false,
  onItemClick = null,
}: TrainerTableProps) {
  const [active, setActive] = useState<number | null>(null);

  const handleClick = (item: TrainerItem, index: number) => {
    setActive(index);
    onItemClick?.(item);
  };

  return (
    <div className="trainer-table">

      {title && (
        <div className="trainer-table__title">
          {title}
        </div>
      )}

      <div className="trainer-table__body">

        {portrait !== null && (
          <div className="trainer-table__portrait">
            {portrait ? (
              <img
                src={portrait}
                alt=""
                className="trainer-table__portrait-image"
              />
            ) : (
              <div className="trainer-table__portrait-placeholder">?</div>
            )}
          </div>
        )}

        {items.map((item, i) => {
          const isHighlighted = highlightLast && i === items.length - 1;
          const isActive = active === i;
          return (
            <div
              key={i}
              onClick={() => onItemClick && handleClick(item, i)}
              className={[
                "trainer-table__item",
                onItemClick ? "trainer-table__item--interactive" : "",
                isActive ? "trainer-table__item--active" : "",
                isHighlighted ? "trainer-table__item--highlighted" : "",
              ].filter(Boolean).join(" ")}
            >
              {columns.map((col) => (
                <div
                  key={col.key}
                  className={[
                    "trainer-table__cell",
                    isHighlighted ? "trainer-table__cell--highlighted" : "",
                  ].filter(Boolean).join(" ")}
                >
                  {col.render ? col.render(item) : item[col.key]}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}