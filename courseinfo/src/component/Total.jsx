const Total = ({parts}) => {
    const totalExercise = parts.map((part) => part.exercises).reduce(
        (accu, cur) => accu + cur, 0,
    )
    return (
        <b>total of {totalExercise} exercises</b>
    )
}

export default Total