
const loadPhones = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/phones?search=iphone');
    const dataPromise = await res.json();
    const phonesData = dataPromise.data;
    displaydata(phonesData)
}


const displaydata = (phones) => {
    const productsContainerElement = document.querySelector('.prodcusts-container')
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
       
    })
}

loadPhones();