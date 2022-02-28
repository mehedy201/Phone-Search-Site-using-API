// Get search input Text
const searchText = () => {
    const searchInput = document.getElementById('search-input');
    const searchValue = searchInput.value;
    searchInput.value = '';
    console.log(searchValue);
}
searchText();