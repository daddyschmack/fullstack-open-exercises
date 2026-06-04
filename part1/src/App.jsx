import {useState} from 'react'
import './App.css'

const ExercisesTotal = (props) => {
    const totalExercises = props.parts.reduce((tot, {exercises}) => tot + exercises, 0)
    return <p><b>Total of {totalExercises} exercises</b></p>
}
const Topics = (props) => {
    const parts = props.parts;
    return (
     <div id="topic-list">
         {parts.map(part => <p key={part.id}>{part.name} {part.exercises}</p>)}
         <ExercisesTotal parts={parts}/>
     </div>
    )
}
const Course = (courses) => {

    return (
        <div>
            <h1>Web Development Curriculum</h1>
        <div className="course">
            {courses.course.map(course => {
                return (
                <div key={course.id}>
                    <h2>{course.name}</h2>
                   <Topics parts={course.parts}/>
                </div>
                )
                }
            )}
        </div>
        </div>
    )
}
const App = () => {
    const courses = [
        {
            name: 'Half Stack application development',
            id: 1,
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
                },
                {
                    name: 'Redux',
                    exercises: 11,
                    id: 4
                }
            ]
        },
        {
            name: 'Node.js',
            id: 2,
            parts: [
                {
                    name: 'Routing',
                    exercises: 3,
                    id: 1
                },
                {
                    name: 'Middlewares',
                    exercises: 7,
                    id: 2
                }
            ]
        }
    ]

    return <Course course={courses}/>
}

export default App