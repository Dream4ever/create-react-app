import React, { useState, useEffect } from 'react'

import logo from './logo.svg'

import './App.css'

const KanbanBoard = ({ children }) => {
  return (
    <main className="kanban-board">{children}</main>
  )
}

const KanbanBoardColumn = ({ children, className, title }) => {
  const fullClassNames = `kanban-column ${className}`
  return (
    <section className={fullClassNames}>
      <h2>{title}</h2>
      <ul>{children}</ul>
    </section>
  )
}

const MINUTE = 60 * 1000
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR
const UPDATE_INTERVAL = MINUTE

const KanbanCard = ({ title, status }) => {
  const [displayTime, setDisplayTime] = useState(status)

  useEffect(() => {
    const updateDisplayTime = () => {
      const timePassed = new Date() - new Date(status)
      let relativeTime = '刚刚'

      if (timePassed >= MINUTE && timePassed < HOUR) {
        relativeTime = `${Math.floor(timePassed / MINUTE)}分钟前`
      } else if (timePassed >= HOUR && timePassed < DAY) {
        relativeTime = `${Math.floor(timePassed / HOUR)}小时前`
      } else if (timePassed >= DAY) {
        relativeTime = `${Math.floor(timePassed / DAY)}天前`
      }

      setDisplayTime(relativeTime)
    }

    const intervalId = setInterval(updateDisplayTime, UPDATE_INTERVAL)
    updateDisplayTime()

    return function cleanup() {
      clearInterval(intervalId)
    }
  }, [status])

  return (
    <li className="kanban-card">
      <div className="card-title">{title}</div>
      <div className="card-status" title={status}>{displayTime}</div>
    </li>
  )
}
const KanbanNewCard = ({ onSubmit }) => {
  const [title, setTitle] = useState('')

  const handleChange = (evt) => {
    setTitle(evt.target.value)
  }

  const handleKeyDown = (evt) => {
    if (evt.key === 'Enter') {
      onSubmit(title)
    }
  }

  return (
    <li className="kanban-card">
      <h3>添加新卡片</h3>
      <div className="card-title">
        <input
          type="text"
          value={title}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </div>
    </li>
  )
}

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

  return (
    <div className="App">
      <header className="App-header">
        <h1>我的看板</h1>
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <KanbanBoard>
        <KanbanBoardColumn className={'column-todo'}
          title={
            <>
              待处理
              <button
                onClick={handleAdd}
                disabled={showAdd}
              >&#8853; 添加新卡片</button>
            </>
          }>
          {showAdd && <KanbanNewCard onSubmit={handleSubmit} />}
          {todoList.map(props => <KanbanCard {...props} key={props.title} />)}
        </KanbanBoardColumn>
        <KanbanBoardColumn className={'column-ongoing'} title='进行中'>
          {ongoingList.map(props => <KanbanCard {...props} key={props.title} />)}
        </KanbanBoardColumn>
        <KanbanBoardColumn className={'column-done'} title='已完成'>
          {doneList.map(props => <KanbanCard {...props} key={props.title} />)}
        </KanbanBoardColumn>
      </KanbanBoard>
    </div>
  )
}

export default App