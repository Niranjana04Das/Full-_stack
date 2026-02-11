// Header
const Header = ({ course }) => {
  return <h2>{course}</h2>
}

// Part
const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  )
}

// Content
const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part =>
        <Part key={part.id} part={part} />
      )}
    </div>
  )
}

// Total (using reduce — required in 2.3)
const Total = ({ parts }) => {
  const total = parts.reduce(
    (sum, part) => sum + part.exercises,
    0
  )

  return <p><b>Total of {total} exercises</b></p>
}

// Course Component
const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course
