import React from 'react';
import './index.css';

export default function KanbanBoard({ children }) {
  return (
    <main className="kanban-board">{children}</main>
  );
}
