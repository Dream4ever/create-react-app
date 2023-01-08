import React from 'react';
import './index.css';

export default function KanbanBoardColumn({
  children, className, title, setIsDragSource = () => { }, setIsDragTarget = () => { }, onDrop,
}) {

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

  return (
    <section
      onDragStart={() => setIsDragSource(true)}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onDragEnd={handleDragEnd}
      className={fullClassNames}
    >
      <h2>{title}</h2>
      <ul>{children}</ul>
    </section>
  );
}