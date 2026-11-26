import SearchBar from "../components/SearchBar";

function HomePage() {
    const handleSearch = (term) => {
        console.log("Searching for:", term)
    }
    return (
        <div>
            <h1>My Movie Home Page</h1>
            <SearchBar onSearch={handleSearch} />
        </div>
    )
}

export default HomePage;