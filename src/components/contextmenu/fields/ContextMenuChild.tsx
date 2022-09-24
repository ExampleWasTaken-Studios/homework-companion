import { ItemType } from "../ContextMenu";

interface ContextMenuChildProps {
  type: ItemType;
  onClick?: () => void;
}

export const ContextMenuChild = ({ type, onClick }: ContextMenuChildProps) => {

  return (
    <>
      {type === "divider" ? (
        <div className="context-menu-divider"></div>
      ) : (
        <div
          className="context-menu-child"
          onClick={onClick}
        >
          {type}
        </div>
      )}
    </>
  );
};
