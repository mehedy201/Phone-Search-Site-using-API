// Get search input Text
const searchText = () => {
    const searchInput = document.getElementById('search-input');
    const searchValue = searchInput.value;
    searchInput.value = '';
    loadPhoneDetails(searchValue);
};
// Load JSON data 
const loadPhoneDetails = searchText => {
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
        .then(res => res.json())
        .then(data => singlePhoneDetails(data.data));
};
// Get single Phone details
const singlePhoneDetails = singlePhones => {
    const phoneDisplayDiv = document.getElementById('show-phone');
    phoneDisplayDiv.textContent = '';
    singlePhones.forEach( phone => {
        console.log(phone.slug);
        const div = document.createElement('div');
        div.classList = 'col';
        div.innerHTML = `
            <div class="card h-100">
                <img src="${phone.image}" class="card-img-top" alt=""">
                <div class="card-body">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <p class="card-text">${phone.brand}</p>
                    <button class="btn fw-bold" onclick="phoneFullDetails(${phone.slug})">Read More</button>
                </div>
            </div>
        `;
        phoneDisplayDiv.appendChild(div);
    });
};
// Get Phone Full Details 
