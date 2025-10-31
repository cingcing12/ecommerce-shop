
const btnAddProduct = document.querySelector('.btnAddProduct');
const containerAddProduct = document.querySelector('.containerAddProduct');
const formAddProduct = document.getElementById('formAddProduct');
const addProductConcel = document.querySelector('.addProductConcel');
const overlayAddCate = document.querySelector('.overlayAddCate');
const productSelecct = document.getElementById('productSelecct');
const selectCate = document.getElementById('selectCate');
const statusInput = document.getElementById('status');
const tbody = document.getElementById('tbodyProduct');
const searchStatus = document.getElementById('searchStatus');
const containerNotFoundProduct = document.querySelector('.containerNotFoundProduct');
const searchPro = document.getElementById('searchPro');



btnAddProduct.addEventListener('click', () => {
    containerAddProduct.classList.add('active');
    overlayAddCate.classList.add('active');
})

addProductConcel.addEventListener('click', () => {
    containerAddProduct.classList.remove('active');
    overlayAddCate.classList.remove('active');
    updateResetForm();
})

overlayAddCate.addEventListener('click', () => {
    overlayAddCate.classList.remove('active');
    containerAddProduct.classList.remove('active');
    updateResetForm();
})

formAddProduct.addEventListener('submit', async e => {
    e.preventDefault();
    const nameProduct = document.getElementById('nameProduct').value;
    const productSelect = document.getElementById('productSelecct').value;
    let size = document.getElementById('size');
    if (size) {
        if (size.value == "Size") {
            return Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please select size!",
            });
        }
        size = size.value;
    }
    const imgURL = document.getElementById('imgURL').value;
    const brand = document.getElementById('brand').value;
    const stock = document.getElementById('stock').value;
    const price = document.getElementById('price').value;
    const time = new Date();
    const created = time.toDateString();
    const des = document.getElementById('des').value;
    const status = statusInput.dataset.status;

    if (productSelecct.value == "Categories") {
        return Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please select categories!",
        });
    }

    try {
        const res = await fetch('http://localhost:3000/addProduct', {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ nameProduct, imgURL, productSelect, size, brand, stock, price, created, des, status })
        })

        const mess = await res.json();
        if (res.ok) {
            addProductConcel.click();
            Swal.fire({
                icon: "success",
                title: "Successfully",
                text: mess.message,
            })
                .then(() => {
                    const tr = tbody.querySelectorAll('.containerProductCreate');
                    tr.forEach(item => item.remove());
                    updateProduct();

                })
        }
    } catch (err) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: err.message,
        });
    }
})

const updateResetForm = () => {
    formAddProduct.reset();
    const containerOptionClothes = document.querySelector('.containerOptionClothes');
    if (containerOptionClothes) {
        containerOptionClothes.remove();
    }
}

const updateCategoriesAdd = async (productSelecct) => {
    try {
        const res = await fetch('http://localhost:3000/categoriesPublish');
        const data = await res.json();
        if (data) {
            data.data.forEach(item => {
                const option = document.createElement('option');
                option.textContent = item.categoriesName;
                productSelecct.appendChild(option);
            })
        }
    } catch (err) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: err.message,
        });
    }
}

updateCategoriesAdd(productSelecct);
updateCategoriesAdd(selectCate);


productSelecct.addEventListener('change', function () {
    if (this.value == "Clothes") {
        const containerOptionClothes = document.querySelector('.containerOptionClothes');
        if (containerOptionClothes) {
            containerOptionClothes.remove();
        }
        const childclothes = formAddProduct.childNodes[3];
        const div = document.createElement('div');
        div.className = "col-12 mt-3 containerOptionClothes";
        div.innerHTML = `
        <select class="form-select" id="size" aria-label="Default select example" required>
  <option selected>Size</option>
  <option >S</option>
  <option >M</option>
  <option >XL</option>
  <option >XXL</option>
</select>
        `
        childclothes.insertBefore(div, childclothes.childNodes[4]);
    } else if (this.value == "Shoes") {
        const containerOptionClothes = document.querySelector('.containerOptionClothes');
        if (containerOptionClothes) {
            containerOptionClothes.remove();
        }
        const childclothes = formAddProduct.childNodes[3];
        const div = document.createElement('div');
        div.className = "col-12 mt-3 containerOptionClothes";
        div.innerHTML = `
        <select class="form-select" id="size" aria-label="Default select example" required>
  <option selected>Size</option>
  <option >38</option>
  <option >39</option>
  <option >40</option>
  <option >41</option>
</select>
        `;
        childclothes.insertBefore(div, childclothes.childNodes[4]);
    }
    else {
        const containerOptionClothes = document.querySelector('.containerOptionClothes');
        if (containerOptionClothes) {
            containerOptionClothes.remove();
        }
    }
})


const updateProduct = async () => {
    try {
        const res = await fetch('http://localhost:3000/getproduct');
        const data = await res.json();
        document.querySelector('.containerNoItemProduct').classList.toggle('hidden', data.length > 0);
        if (data.length > 0) {
            data.forEach(item => {
                const tr = document.createElement('tr');
                tr.classList.add('containerProductCreate', 'text-nowrap');
                tr.dataset.id = item._id;

                const nameAndImg = document.createElement('td');
                nameAndImg.className = "containernameImg";
                nameAndImg.innerHTML = `
                <div class="d-flex align-items-center gap-3"><img class="imgproductcreate" src="${item.imgURL}" />
                <div class="vr"></div>
                <h6 class="fs-6 nameProductCreate">${item.nameProduct}</h6></div>
                `
                tr.appendChild(nameAndImg);

                const categories = document.createElement('td');
                categories.classList.add('cateCreate');
                categories.textContent = item.categories;
                tr.appendChild(categories);

                const size = document.createElement('td');
                size.classList.add('sizeCreate');
                size.textContent = size.textContent == null ? "No Size!" : item.size;
                tr.appendChild(size);


                const stock = document.createElement('td');
                stock.classList.add('stockCreate');
                stock.textContent = item.stock;
                tr.appendChild(stock);

                const price = document.createElement('td');
                price.classList.add('priceCreate');
                price.textContent = `$${item.price.toFixed(2)}`;
                tr.appendChild(price);

                const brand = document.createElement('td');
                brand.classList.add('brandCreate');
                brand.textContent = item.brand;
                tr.appendChild(brand);

                const status = document.createElement('td');
                status.classList.add('statusCreate');
                status.textContent = item.status;
                tr.appendChild(status);

                status.textContent == "Publish" ? status.classList.add('publishPro') : status.classList.add('privatePro')

                const created = document.createElement('td');
                created.classList.add('createdEle');
                created.textContent = item.created;
                tr.appendChild(created);

                const action = document.createElement('td');
                action.className = "actionProduct"
                action.innerHTML = `
                <button class='btn btn-outline-primary' id='editCate'><i class="bi bi-pencil-square"></i> Edit</button>
                <button class='btn btn-outline-danger' id='delCate'><i class="bi bi-trash3"></i> Delete</button>
                `;
                tr.appendChild(action);

                tbody.appendChild(tr);









                tr.querySelector('#delCate').addEventListener('click', () => {
                    const id = tr.dataset.id;

                    Swal.fire({
                        title: "Are you sure?",
                        text: "You won't be able to revert this!",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Yes, delete it!"
                    }).then(async (result) => {
                        if (result.isConfirmed) {
                            try {
                                const res = await fetch(`http://localhost:3000/deleteProduct/${id}`, {
                                    method: "delete",
                                    headers: { "Content-type": "application/json" }
                                })

                                const mess = await res.json();
                                if (res.ok) {
                                    Swal.fire({
                                        icon: "success",
                                        title: "Successfully",
                                        text: mess.message,
                                    })
                                        .then(() => {
                                            const tr = tbody.querySelectorAll('.containerProductCreate');
                                            tr.forEach(item => item.remove());
                                            updateProduct();
                                        })
                                }
                            } catch (err) {
                                Swal.fire({
                                    icon: "error",
                                    title: "Oops...",
                                    text: err,
                                });
                            }
                        }
                    });
                })

            })
        } else {
            return;
        }
    } catch (err) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: err.message,
        });
    }
}

updateProduct();

// update status 
statusInput.addEventListener('change', function () {
    this.dataset.status = this.checked ? "Publish" : "Private";
})


window.addEventListener('load', () => {
    selectCate.addEventListener('change', function () {
        updateSaerch();
    })

    searchStatus.addEventListener('change', function () {
        updateSaerch();
    })

    const updateSaerch = () => {
        const containerProductCreate = document.querySelectorAll('.containerProductCreate');
        let found = false;
        containerProductCreate.forEach(item => {
            const categories = item.querySelector('.cateCreate');
            const status = item.querySelector('.statusCreate');

                const cateTxt = categories.textContent.toLowerCase();
                const statusTxt = status.textContent.toLowerCase();
                const cateSelect = selectCate.value.toLowerCase();
                const statusSelect = searchStatus.value.toLowerCase();

                if(searchPro.value.length == 0){
                    if (conditionSearch(cateTxt, statusTxt, cateSelect, statusSelect)) {
                    item.style.display = '';
                    found = true;
                }
                else {
                    item.style.display = "none";
                }
                }else{
                    if ((conditionSearch(cateTxt, statusTxt, cateSelect, statusSelect)) && 
                    item.querySelector('.nameProductCreate').textContent.toLowerCase().includes(searchPro.value.toLowerCase())) {
                    item.style.display = '';
                    found = true;
                }
                else {
                    item.style.display = "none";
                }
                }
        })

        containerNotFoundProduct.classList.toggle('active', !found);

    }

    // search  product
searchPro.addEventListener('keyup', function(){
    updateSearchPro(this.value);
})
    const updateSearchPro = (thisValue) => {
        const containerProductCreate = document.querySelectorAll('.containerProductCreate');
        let found = false;
        containerProductCreate.forEach(item => {
            const categories = item.querySelector('.cateCreate');
            const status = item.querySelector('.statusCreate');
            const cateTxt = categories.textContent.toLowerCase();
                const statusTxt = status.textContent.toLowerCase();
                const cateSelect = selectCate.value.toLowerCase();
                const statusSelect = searchStatus.value.toLowerCase();

            if((conditionSearch(cateTxt, statusTxt, cateSelect, statusSelect)) && 
            item.querySelector('.nameProductCreate').textContent.toLowerCase().includes(thisValue.toLowerCase())){
                        item.style.display = '';
                        found = true;
                    }else{
                        item.style.display = 'none'
                    }
                   
        })

        containerNotFoundProduct.classList.toggle('active', !found);

    }

    const conditionSearch = (cateTxt, statusTxt, cateSelect, statusSelect) => {
        return (selectCate.value == "All Categories" && searchStatus.value == "All Status") ||
                    (searchStatus.value == "All Status" && cateTxt.includes(cateSelect)) ||
                    (selectCate.value == "All Categories" && statusTxt.includes(statusSelect)) ||
                    (cateTxt.includes(cateSelect) && statusTxt.includes(statusSelect))
    }
})

