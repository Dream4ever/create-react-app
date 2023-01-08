import React, { useState, useEffect, useRef } from 'react';

export default function KanbanNewCard({ onSubmit }) {
  const [title, setTitle] = useState('');
  const inputElem = useRef(null);

  useEffect(() => {
    inputElem.current.focus();
  }, []);

  const handleChange = (evt) => {
    setTitle(evt.target.value);
  };

  const handleKeyDown = (evt) => {
    if (evt.key === 'Enter') {
      onSubmit(title);
    }
  };

  return (
    <li className="kanban-card">
      <h3>添加新卡片</h3>
      <div className="card-title">
        <input
          type="text"
          value={title}
          ref={inputElem}
          onChange={handleChange}
          onKeyDown={handleKeyDown} />
      </div>
    </li>
  );
}
