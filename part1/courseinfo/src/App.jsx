// Header
const Header = ({ course }) => {
  return <h1>{course.name}</h1>
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
      <Part part={parts[0]} />
      <Part part={parts[1]} />
      <Part part={parts[2]} />
    </div>
  )
}

// Total
const Total = ({ parts }) => {
  const total =
    parts[0].exercises +
    parts[1].exercises +
    parts[2].exercises

  return <p>Number of exercises {total}</p>
}


// App
const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App
