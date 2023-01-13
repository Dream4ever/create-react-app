import React, { useState } from 'react'

import KanbanCard from '../KanbanCard';
import KanbanNewCard from "../KanbanNewCard";

import './index.css';

export default function KanbanBoardColumn({
  children,
  className,
  title,
  cardList = [],
  canAddNew = false,
  onAdd,
  setDraggedItem,
  setIsDragSource = () => { },
  setIsDragTarget = () => { },
  onDrop,
}) {
  const [showAdd, setShowAdd] = useState(false)

  const fullClassNames = `kanban-column ${className}`;

  const handleDragOver = (evt) => {
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'move';
    setIsDragTarget(true);
  };

  const handleDragLeave = (evt) => {
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'none';
    setIsDragTarget(false);
  };

  const handleDrop = (evt) => {
    evt.preventDefault();
    onDrop && onDrop();
  };

  const handleDragEnd = (evt) => {
    evt.preventDefault();
    setIsDragSource(false);
    setIsDragTarget(false);
  };

  const handleAdd = () => {
    setShowAdd(true)
  }

  const handleSubmit = (newCard) => {
    setShowAdd(false)
    onAdd && onAdd(newCard)
  }

  return (
    <section
      onDragStart={() => setIsDragSource(true)}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onDragEnd={handleDragEnd}
      className={fullClassNames}
    >
      <h2>
        {title}
        {canAddNew && <button
          onClick={handleAdd}
          disabled={showAdd}
        >&#8853; 添加新卡片</button>}
      </h2>
      <ul>
        {(canAddNew && showAdd) && <KanbanNewCard onSubmit={handleSubmit} />}
        {children}
        {cardList.map(props =>
          <KanbanCard
            {...props}
            key={props.title}
            onDragStart={() => setDraggedItem && setDraggedItem(props)}
          />
        )}
      </ul>

    </section>
  );
}
