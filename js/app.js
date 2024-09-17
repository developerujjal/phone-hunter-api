
const loadPhones = async (searchText, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const dataPromise = await res.json();
    const phonesData = dataPromise.data;
    displaydata(phonesData, isShowAll)
};



const displaydata = (phones, isShowAll) => {
    const productsContainerElement = document.querySelector('.prodcusts-container');
    // clear products-container cards before adding new cards
    productsContainerElement.textContent = '';

    // display show all btn if there are more then 122
    const showAllBtnElement = document.getElementById('btn-show-all-container');
    if(phones.length > 12 && !isShowAll){
        showAllBtnElement.classList.remove('hidden');
    }
    else{
        showAllBtnElement.classList.add('hidden');
    }


    // show phonse up to 12 if isShowAll false;
    if(!isShowAll){
        phones = phones.slice(0, 12);
    }

    phones.forEach(phone => {
        const newDiv = document.createElement('div');
        newDiv.classList.add('product-box-container');
        newDiv.innerHTML = `

                        <div class="singel-product-img">
                            <img src="${phone.image}" alt="">
                        </div>
                        <div class="singel-product-des">
                            <h3>${phone.phone_name}</h3>
                            <p>There are many variations of passages of available, but the majority have suffered</p>
                        </div>
                        <div class="product-btn-price">
                            <h4>$999</h4>
                            <button class="btn-for-all">Show Details</button>
                        </div>
        
        `;

        productsContainerElement.appendChild(newDiv);
       
    });

    loadingSpinner(false);
};


const handleSearch = (isShowAll) => {
    loadingSpinner(true);
    const searchFieldElement = document.getElementById('search-field');
    const searchFieldValue = searchFieldElement.value;
    loadPhones(searchFieldValue, isShowAll);

    
};


const loadingSpinner = (isloading) => {
    const loaderSpinnerElement = document.getElementById('loaderSpinner');
    if(isloading){
        loaderSpinnerElement.classList.remove('hidden');
    }
    else{
        loaderSpinnerElement.classList.add('hidden');
    }
}


const displayShowAll = () => {
    handleSearch(true);
}



loadPhones();