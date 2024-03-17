import Part from './Part'
import Total from './Total'

const Content = ({course}) => {
    return (
        <>
        {course.parts.map(c =>
            <Part key={c.id} name={c.name} exercises={c.exercises}/>
        )}
        <Total parts={course.parts}/>
        </>
    )
}

export default Content