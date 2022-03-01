// Get search input Text ----------------------------------------------------------------
const searchText = () => {
    const searchInput = document.getElementById('search-input');
    const searchValue = searchInput.value;
    searchInput.value = '';
    console.log(searchValue.length);
    // Search input Field Condition
    if(searchValue.length <= 0){ 
        const phoneDisplayDiv = document.getElementById('show-phone');
        // Clear Phone Display Div........
        phoneDisplayDiv.textContent = '';
        const showErrorDiv = document.getElementById('page-not-found');
        showErrorDiv.textContent = '';
        const div = document.createElement('div');
        div.innerHTML = `
        <h1 class="py-5 text-center fw-bold text-secondary">Please Type Search Field</h1>                
         `;
         showErrorDiv.appendChild(div);
    }
    else{
        const showErrorDiv = document.getElementById('page-not-found');
        showErrorDiv.textContent = '';
        loadPhoneDetails(searchValue);
    }
    // loadPhoneDetails(searchValue);
    
};
// Load JSON data -------------------------------------------------------------------------
const loadPhoneDetails = searchText => {
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
        .then(res => res.json())
        .then(data => {
            debugger
            if(data.data.length === 0){
                const showErrorDiv = document.getElementById('page-not-found');
                const div = document.createElement('div');
                div.innerHTML = `
                    <h1 class="py-5 text-center fw-bold text-secondary">Mobile Phone NOT Found</h1>                
                `;
                showErrorDiv.appendChild(div);
            }
            else{
                const showErrorDiv = document.getElementById('page-not-found');
                showErrorDiv.textContent = '';
                singlePhoneDetails(data.data);
            }
        });
};
// Get single Phone details ------------------------------------------------------------------
const singlePhoneDetails = singlePhones => {
    const phoneDisplayDiv = document.getElementById('show-phone');
    // Clear Phone Display Div........
    phoneDisplayDiv.textContent = '';
    // Loop on phones and Set phone details .....
    singlePhones.forEach( phone => {
        const div = document.createElement('div');
        div.classList.add('single-product')
        // div.length.slice(0, 10);
        div.innerHTML = `
            <div class="card h-100">
                <img src="${phone.image}" class="card-img-top" alt=""">
                <div class="card-body">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <p class="card-text">${phone.brand}</p>
                    <button class="btn fw-bold" onclick="getPhoneDetails('${phone.slug}')" data-bs-toggle="modal" data-bs-target="#modal-id">Read More</button>
                </div>
            </div>
        `;
        phoneDisplayDiv.appendChild(div)
    });
};

// Get Phone Full Details ---------------------------------------------------------------------
const getPhoneDetails = phone => {
    fetch(`https://openapi.programming-hero.com/api/phone/${phone}`)
        .then(res => res.json())
        .then(data => displayPhoneFullDetails(data.data));
};

// Show Phone Details on Modal ------------------------------------------------------------------
const displayPhoneFullDetails = phone => {
    const modalBody = document.getElementById('show-phone-details')
    // Clear modal Body 
    modalBody.textContent= '';
    // Get phone name and show on Modal title.........................
    const showPhoneName = document.getElementById('exampleModalLabel');
    showPhoneName.innerText = phone.name;
    // Get sensor array and sensor show div........
    const singleSensor = phone.mainFeatures.sensors;
    // Creat div and set inner html afterthat append on modal..... 
    const div = document.createElement('div');
    div.innerHTML = `
        <img src="${phone.image}" alt="">
        <h6 class="pt-3 fw-bold">Brand: ${phone.brand}</h6>
        <h6 class="pb-3">${phone.releaseDate}</h6>
        <h6 class="fw-bold">Main Features</h6>
        <div><h6 class="d-inline-block">ChipSet: </h6> <span class="error">${phone.mainFeatures.chipSet}</span></div>
        <div><h6 class="d-inline-block">Display Size: </h6> <span class="error">${phone.mainFeatures.displaySize}</span></div>
        <div><h6 class="d-inline-block">Memory: </h6> <span class="error">${phone.mainFeatures.memory}</span></div>
        <div><h6 class="d-inline-block">Storage: </h6> <span class="error">${phone.mainFeatures.storage}</span></div>
        <h6 class="fw-bold pt-3">Others</h6>
        <div><h6 class="d-inline-block">WLAN: </h6> <span class="error">${phone.others?.WLAN}</span></div>
        <div><h6 class="d-inline-block">Bluetooth: </h6> <span class="error">${phone.others?.Bluetooth}</span></div>
        <div><h6 class="d-inline-block">GPS: </h6> <span class="error">${phone.others?.GPS}</span></div>
        <div><h6 class="d-inline-block">NFC: </h6> <span class="error">${phone.others?.NFC}</span></div>
        <div><h6 class="d-inline-block">Radio: </h6> <span class="error">${phone.others?.Radio}</span></div>
        <div><h6 class="d-inline-block">USB: </h6> <span class="error">${phone.others?.USB}</span></div>
        <h6 class="fw-bold pt-3">Sensor</h6>
        
    `;
    // Dom manupulation Sensor ................
    singleSensor.forEach(sen => {
        const li = document.createElement('li');
        li.innerText = sen;
        div.appendChild(li);
        })
    //--------------------
    // console.log(phone.others); 
    modalBody.appendChild(div);
};