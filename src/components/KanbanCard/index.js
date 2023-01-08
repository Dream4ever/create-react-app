import React, { useState, useEffect } from 'react';
import './index.css';

const MINUTE = 60 * 1000
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR
const UPDATE_INTERVAL = MINUTE

export default function KanbanCard({ title, status, onDragStart }) {
  const [displayTime, setDisplayTime] = useState(status);

  useEffect(() => {
    const updateDisplayTime = () => {
      const timePassed = new Date() - new Date(status);
      let relativeTime = '刚刚';

      if (timePassed >= MINUTE && timePassed < HOUR) {
        relativeTime = `${Math.floor(timePassed / MINUTE)}分钟前`;
      } else if (timePassed >= HOUR && timePassed < DAY) {
        relativeTime = `${Math.floor(timePassed / HOUR)}小时前`;
      } else if (timePassed >= DAY) {
        relativeTime = `${Math.floor(timePassed / DAY)}天前`;
      }

      setDisplayTime(relativeTime);
    };

    const intervalId = setInterval(updateDisplayTime, UPDATE_INTERVAL);
    updateDisplayTime();

    return function cleanup() {
      clearInterval(intervalId);
    };
  }, [status]);

  const handleDragStart = (evt) => {
    evt.dataTransfer.effectAllowed = 'move';
    evt.dataTransfer.setData('text/plain', title);
    onDragStart && onDragStart(evt);
  };

  return (
    <li
      className="kanban-card"
      draggable
      onDragStart={handleDragStart}
    >
      <div className="card-title">{title}</div>
      <div className="card-status" title={status}>{displayTime}</div>
    </li>
  );
}
