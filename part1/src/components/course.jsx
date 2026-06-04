
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