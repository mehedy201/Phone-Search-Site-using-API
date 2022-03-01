// Get search input Text ----------------------------------------------------------------
const searchText = () => {
    const searchInput = document.getElementById('search-input');
    const searchValue = searchInput.value;
    searchInput.value = '';
    loadPhoneDetails(searchValue);
};
// Load JSON data -------------------------------------------------------------------------
const loadPhoneDetails = searchText => {
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
        .then(res => res.json())
        .then(data => singlePhoneDetails(data.data));
};
// Get single Phone details ------------------------------------------------------------------
const singlePhoneDetails = singlePhones => {
    const phoneDisplayDiv = document.getElementById('show-phone');
    // Clear Phone Display Div........
    phoneDisplayDiv.textContent = '';
    // Loop on phones and Set phone details .....
    singlePhones.forEach( phone => {
        const div = document.createElement('div');
        div.classList = 'col';
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
        phoneDisplayDiv.appendChild(div);
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
    const displaySensor = document.getElementById('displaySensor')
    // Creat div and set inner html afterthat append on modal..... 
    const div = document.createElement('div');
    div.innerHTML = `
        <img src="${phone.image}" alt="">
        <h6 class="pt-3 fw-bold">Brand: ${phone.brand}</h6>
        <h6 class="pb-3">${phone.releaseDate}</h6>
        <h6 class="fw-bold">Main Features</h6>
        <div><h6 class="d-inline-block">ChipSet: </h6> <span>${phone.mainFeatures.chipSet}</span></div>
        <div><h6 class="d-inline-block">Display Size: </h6> <span>${phone.mainFeatures.displaySize}</span></div>
        <div><h6 class="d-inline-block">Memory: </h6> <span>${phone.mainFeatures.memory}</span></div>
        <div><h6 class="d-inline-block">Storage: </h6> <span>${phone.mainFeatures.storage}</span></div>
        <h6 class="fw-bold pt-3">Others</h6>
        <div><h6 class="d-inline-block">WLAN: </h6> <span>${phone.others.WLAN}</span></div>
        <div><h6 class="d-inline-block">Bluetooth: </h6> <span>${phone.others.Bluetooth}</span></div>
        <div><h6 class="d-inline-block">GPS: </h6> <span>${phone.others.GPS}</span></div>
        <div><h6 class="d-inline-block">NFC: </h6> <span>${phone.others.NFC}</span></div>
        <div><h6 class="d-inline-block">Radio: </h6> <span>${phone.others.Radio}</span></div>
        <div><h6 class="d-inline-block">USB: </h6> <span>${phone.others.USB}</span></div>
        <h6 class="fw-bold pt-3">Sensor</h6>
        ${singleSensor.forEach(sen => {
            const li = document.createElement('li');
            li.innerText = sen;
              displaySensor.appendChild(li);
            })}
    `;
    modalBody.appendChild(div);
};