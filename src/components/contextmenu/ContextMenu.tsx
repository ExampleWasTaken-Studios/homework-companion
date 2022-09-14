import React, { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { ContextMenuChild } from "./fields/ContextMenuChild";
export type ItemType = "Copy" | "Cut" | "Paste" | "Delete" | "Mark as Complete" | "Mark as Incomplete" | "divider";

interface Items {
  id: number;
  type: ItemType;
  clickHandler?: () => void;
}

interface ContextMenuProps {
  parentRef: React.RefObject<HTMLDivElement>
  items: Items[];
}

export const ContextMenu = ({ parentRef, items }: ContextMenuProps) => {

  const [posX, setPosX] = useState(150);
  const [posY, setPosY] = useState(150);
  const [show, setShow] = useState(false);

  const onContextMenu = useCallback((event: MouseEvent) => {
    event.preventDefault();

    setPosX(event.pageX);
    setPosY(event.pageY);
    setShow(true);
  }, [posX, posY, show]);

  const onClick = useCallback((event: MouseEvent) => {
    event.preventDefault();

    show && setShow(false);
    setPosX(0);
    setPosY(0);
  }, [show]);

  useEffect(() => {
    document.addEventListener("click", onClick);

    return () => document.removeEventListener("click", onClick);
  });

  useLayoutEffect(() => {
    parentRef.current && parentRef.current.addEventListener("contextmenu", onContextMenu);

    return () => {
      parentRef.current && parentRef.current.removeEventListener("contextmenu", onContextMenu);
    };
  });

  return (
    <>
      {show && (
        <div 
          className="context-menu"
          style={{ top: posY, left: posX }}
        >
  
          {items.map(current => {
  
            if (current.type === "divider") {
              if (current.clickHandler !== undefined) {
                throw new Error("'ContextMenuChild' components of type 'divider' should not have a 'clickHandler' method defined");
              }
            } else {
              if (current.clickHandler === undefined) {
                throw new Error(`'ContextMenuChild' ${current.type} should have a 'clickHandler' method defined`);
              }
            }
  
            switch (current.type) {
              case "divider":
                return (
                  <ContextMenuChild 
                    key={current.id}
                    type={current.type}
                  />
                );
              case "Copy":
                return (
                  <ContextMenuChild
                    key={current.id}
                    type={current.type}
                    onClick={current.clickHandler}
                  />
                );
              case "Cut":
                return (
                  <ContextMenuChild
                    key={current.id}
                    type={current.type}
                    onClick={current.clickHandler}
                  />
                );
              case "Paste":
                return (
                  <ContextMenuChild
                    key={current.id}
                    type={current.type}
                    onClick={current.clickHandler}
                  />
                );
              case "Delete":
                return (
                  <ContextMenuChild
                    key={current.id}
                    type={current.type}
                    onClick={current.clickHandler}
                  />
                );
              case "Mark as Complete":
                return (
                  <ContextMenuChild
                    key={current.id}
                    type={current.type}
                    onClick={current.clickHandler}
                  />
                );
              case "Mark as Incomplete":
                return (
                  <ContextMenuChild
                    key={current.id}
                    type={current.type}
                    onClick={current.clickHandler}
                  />
                );
            }
          })}
        </div>
      )}
    </>
  );
};