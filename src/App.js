import React, { useState } from 'react'

import logo from './logo.svg'

import './App.css'
import KanbanBoard from './components/KanbanBoard'
import KanbanBoardColumn from './components/KanbanBoardColumn'
import KanbanCard from './components/KanbanCard'
import KanbanNewCard from './components/KanbanNewCard'

const COLUMN_KEY_TODO = 'todo'
const COLUMN_KEY_ONGOING = 'ongoing'
const COLUMN_KEY_DONE = 'done'

function App() {
  const [showAdd, setShowAdd] = useState(false)
  const [todoList, setTodoList] = useState([
    { title: '开发任务-1', status: '2022-12-04 18:15' },
    { title: '开发任务-3', status: '2022-05-22 18:15' },
    { title: '开发任务-5', status: '2022-05-22 18:15' },
    { title: '测试任务-3', status: '2022-05-22 18:15' },
  ])
  const [ongoingList, setOngoingList] = useState([
    { title: '开发任务-4', status: '2022-05-22 18:15' },
    { title: '开发任务-6', status: '2022-05-22 18:15' },
    { title: '测试任务-2', status: '2022-05-22 18:15' },
  ])
  const [doneList, setDoneList] = useState([
    { title: '开发任务-2', status: '2022-05-22 18:15' },
    { title: '测试任务-1', status: '2022-05-22 18:15' },
  ])

  const [draggedItem, setDraggedItem] = useState(null)
  const [dragSource, setDragSource] = useState(null)
  const [dragTarget, setDragTarget] = useState(null)

  const handleAdd = (evt) => {
    setShowAdd(true)
  }

  const handleSubmit = (title) => {
    setTodoList([
      {
        title,
        status: new Date().toDateString(),
      },
      ...todoList,
    ])
    setShowAdd(false)
  }

  const handleDrop = (evt) => {
    if (!draggedItem || !dragSource || !dragTarget || dragSource === dragTarget) {
      return
    }

    const updaters = {
      [COLUMN_KEY_TODO]: setTodoList,
      [COLUMN_KEY_ONGOING]: setOngoingList,
      [COLUMN_KEY_DONE]: setDoneList,
    }

    if (dragSource) {
      updaters[dragSource]((currentStat) => currentStat.filter((item) => !Object.is(item, draggedItem)))
    }

    if (dragTarget) {
      updaters[dragTarget]((currentStat) => [draggedItem, ...currentStat])
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>我的看板</h1>
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <KanbanBoard>
        <KanbanBoardColumn
          className={'column-todo'}
          title={
            <>
              待处理
              <button
                onClick={handleAdd}
                disabled={showAdd}
              >&#8853; 添加新卡片</button>
            </>
          }
          cardList={todoList}
          setDraggedItem={setDraggedItem}
          setIsDragSource={(isSrc) => setDragSource(isSrc ? COLUMN_KEY_TODO : null)}
          setIsDragTarget={(isTgt) => setDragTarget(isTgt ? COLUMN_KEY_TODO : null)}
          onDrop={handleDrop}
        >
          {showAdd && <KanbanNewCard onSubmit={handleSubmit} />}
        </KanbanBoardColumn>
        <KanbanBoardColumn
          className={'column-ongoing'}
          title='进行中'
          cardList={ongoingList}
          setDraggedItem={setDraggedItem}
          setIsDragSource={(isSrc) => setDragSource(isSrc ? COLUMN_KEY_ONGOING : null)}
          setIsDragTarget={(isTgt) => setDragTarget(isTgt ? COLUMN_KEY_ONGOING : null)}
          onDrop={handleDrop}
        >
        </KanbanBoardColumn>
        <KanbanBoardColumn
          className={'column-done'}
          title='已完成'
          cardList={doneList}
          setDraggedItem={setDraggedItem}
          setIsDragSource={(isSrc) => setDragSource(isSrc ? COLUMN_KEY_DONE : null)}
          setIsDragTarget={(isTgt) => setDragTarget(isTgt ? COLUMN_KEY_DONE : null)}
          onDrop={handleDrop}
        >
        </KanbanBoardColumn>
      </KanbanBoard>
    </div>
  )
}

export default App
