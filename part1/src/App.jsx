import { useState } from 'react'
import './App.css'
const Course = (course) => {
  const {parts} = course.course;
  const totalExercises = parts.reduce((sum, {exercises}) => sum + exercises,0)
  return (
    <div className="courses">
      <h2>{course.course.name}</h2>
      <div id="topic-list">
        {parts.map( part => <p key={part.id}>{part.name} {part.exercises}</p> )}
        <p>Total of {totalExercises} exercises</p>
      </div>

    </div>
  )
}
const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

export default App