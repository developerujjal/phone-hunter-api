
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

    if(phones.length === 0){
        const noFoundElement = document.getElementById('noFoundMessage');
        noFoundElement.classList.remove('hidden');
    }

    // display show all btn if there are more then 12
    const showAllBtnElement = document.getElementById('btn-show-all-container');
    if(phones.length > 20 && !isShowAll){
        phones = phones.slice(0, 20);
        showAllBtnElement.classList.remove('hidden');
        
    }
    else{
        showAllBtnElement.classList.add('hidden');
    }


    // show phonse up to 12 if isShowAll false;
    // if(isShowAll){
        
    // }



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
                            <button onclick="loadPhonesDetails('${phone.slug}')" class="btn-for-all">Show Details</button>
                        </div>
        
        `;

        productsContainerElement.appendChild(newDiv);
       
    });

    loadingSpinner(false);
};


// search products handle
const handleSearch = (isShowAll) => {
    loadingSpinner(true);
    const searchFieldElement = document.getElementById('search-field');
    const searchFieldValue = searchFieldElement.value;
    loadPhones(searchFieldValue, isShowAll);

    
};


// loading spinner
const loadingSpinner = (isloading) => {
    const loaderSpinnerElement = document.getElementById('loaderSpinner');
    if(isloading){
        loaderSpinnerElement.classList.remove('hidden');
    }
    else{
        loaderSpinnerElement.classList.add('hidden');
    }
}



// show all btn 
const displayShowAll = () => {
    handleSearch(true);
}



/* 
 * Start Showing Modal/Products Details
*/



// model for see deailts btn
const loadPhonesDetails = async (id) => {
    // console.log(id)
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const dataPromise = await res.json();
    const showDatas = dataPromise.data;
    displayModelDetails(showDatas)
}



// display Model and product Details
const displayModelDetails = (phoneDetails) => {

    modalShow();
    const modelProductImgElement = document.querySelector('.modal-proudct-img');
    modelProductImgElement.innerHTML = `
    
                <img src="${phoneDetails.image}" alt="">

    `;

    const modalProductDetailsElement = document.querySelector('.modal-product-details');
    modalProductDetailsElement.innerHTML = `
    
                     <h3>${phoneDetails.name}</h3>
                    <p class="modal-des">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>

                     <p class="model-storage margin"><span> <span>Storage :</span> ${phoneDetails?.mainFeatures?.storage}</span></p>

                    <p class="modal-display margin"><span> <span>Display Size :</span> ${phoneDetails?.mainFeatures?.displaySize}</span></p>

                    <p class="modal-chipset margin"> <span> <span>Chipset :</span> ${phoneDetails?.mainFeatures?.chipSet}</span> </p>

                    <p class="modal-memory margin"><span> <span>Memory :</span> ${phoneDetails?.mainFeatures?.memory}</span></p>

                     <p class="modal-slug margin"><span> <span>Slug :</span> ${phoneDetails?.slug}</span></p>

                    <p class="modal-release-data margin"><span> <span>Release data :</span> ${phoneDetails.releaseDate}</span></p>

                    <p class="modal-brand margin"><span> <span>Brand :</span> ${phoneDetails.brand}</span></p>

                    <p class="model-gps margin"><span> <span>GPS :</span> ${phoneDetails?.others?.GPS}</span></p>
    
    `;
}





// model Show
const modalShow = () =>{
    const myModalElement = document.getElementById('myModal');
    myModalElement.classList.remove('removeModel');
    myModalElement.classList.add('modalShow');
}


// close Modal
document.querySelector('.modal-close-btn').addEventListener('click', function(){
    const myModalElement = document.getElementById('myModal');
    myModalElement.classList.remove('modalShow');
    myModalElement.classList.add('removeModel')
    
})

/* 
 * ENDING Showing Modal/Products Details
*/


loadPhones('iPhone');