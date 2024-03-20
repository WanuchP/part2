const Search = ({search, onChange}) => {
    return (
        <>
        <p>find countries <input value={search} onChange={onChange}/></p>
        </>
    )
}

export default Search