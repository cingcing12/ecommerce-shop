const btnAddNewCate = document.querySelector('.btnAddNewCate');
const containerAddCategores = document.querySelector('.containerAddCategores');
const formAddCategories = document.querySelector('.formAddCategories');
const btnConcelAddCate = document.querySelector('.btnConcelAddCate');
const categoriesInput = document.querySelector('#categoriesInput');
const containerNoItemCatgories = document.querySelector('.containerNoItemCatgories');
const tbody = document.getElementById('tbodyCategories');
const searchCate = document.querySelector('#searchCate');
const overlayAddCate = document.querySelector('.overlayAddCate');
const containerEditCategores = document.querySelector('.containerEditCategores');
const btnConcelEditCate = document.querySelector('.btnConcelEditCate');
const formEditCategories = document.querySelector('.formEditCategories');
const nameCategoriesEdit = document.getElementById('nameCategoriesEdit');
const categoriesInputEdit = document.getElementById('categoriesInputEdit');
let idItem = null;




btnConcelEditCate.addEventListener('click', () => {
    containerEditCategores.classList.remove('active');
    overlayAddCate.classList.remove('active');
    updateFormreset();
})


overlayAddCate.addEventListener('click', () => {
    overlayAddCate.classList.remove('active');
    containerAddCategores.classList.remove('active');

    containerEditCategores.classList.contains('active') ? containerEditCategores.classList.remove('active') : '';
    updateFormreset();
})



btnAddNewCate.addEventListener('click', () => {
    containerAddCategores.classList.add('active')
    overlayAddCate.classList.add('active');
})


formAddCategories.addEventListener('submit', async (e) => {
    e.preventDefault();

    try {
        const name = document.querySelector('#nameCategories').value;
        const status = categoriesInput.dataset.status;
        const time = new Date();
        const created = time.toDateString();
        const res = await fetch('http://localhost:3000/addCategories', {
            method: "POST",
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ name, status, created })
        });
        const message = await res.json();
        if (res.ok) {
            Swal.fire({
                icon: "success",
                title: "Successfully",
                text: message.message,
            })
                .then(() => {
                    containerAddCategores.classList.remove('active');
                    e.target.reset();
                    categoriesInput.dataset.status = "Publish";
                    overlayAddCate.classList.remove('active');
                    updateNoitemCateGories();
                })
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!"
            });
        }
    } catch (err) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: err.message,
        });
    }



})

btnConcelAddCate.addEventListener('click', () => {
    containerAddCategores.classList.remove('active');
    overlayAddCate.classList.remove('active');
    updateFormreset();
})

categoriesInput.addEventListener('change', (e) => {
    if (e.target.checked) {
        e.target.dataset.status = "Publish";
    } else {
        e.target.dataset.status = "Private";
    }
})


const updateNoitemCateGories = async () => {
    try {
        const res = await fetch('http://localhost:3000/categories');
        const data = await res.json();
        containerNoItemCatgories.classList.toggle('hidden', data.length > 0);

        if (data.length > 0) {
            const tr = tbody.querySelectorAll('.contentCate');
            tr.forEach(item => item.remove());

            data.forEach(item => {
                const tr = document.createElement('tr');
                tr.dataset.id = item._id;
                tr.classList.add('contentCate');

                const name = document.createElement('td');
                name.classList.add('nameCategories');
                name.textContent = item.categoriesName;
                tr.appendChild(name);

                const status = document.createElement('td');
                status.classList.add('statuscategories');
                status.textContent = item.status;
                tr.appendChild(status);

                status.textContent == "Private" ? status.classList.add('private') : status.classList.add('publish');

                const created = document.createElement('td');
                created.className = "createdCategories";
                created.textContent = item.created;
                tr.appendChild(created);

                const action = document.createElement('td');
                action.className = "d-flex align-items-center gap-2"
                action.innerHTML = `
                <button class='btn btn-outline-primary' id='editCate'><i class="bi bi-pencil-square"></i> Edit</button>
                <button class='btn btn-outline-danger' id='delCate'><i class="bi bi-trash3"></i> Delete</button>
                `;
                tr.appendChild(action);

                tbody.appendChild(tr);

                searchCate.addEventListener('keyup', function () {
                    const nameData = [...document.querySelectorAll('.nameCategories')];
                    if (nameData.length > 0) {
                        const valueInput = this.value.toLowerCase();
                        if (name.textContent.toLowerCase().includes(valueInput)) {
                            tr.style.display = '';
                        } else {
                            tr.style.display = "none";
                        }

                        let foundItem = nameData.some(item => item.textContent.toLowerCase().includes(valueInput));
                        document.querySelector('.searchNotFound').classList.toggle('active', !foundItem);
                    }


                })

                // delete 
                tr.querySelector('#delCate').addEventListener('click', async () => {
                    let id = tr.dataset.id;

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
                                const res = await fetch(`http://localhost:3000/deleteCate/${id}`, {
                                    method: "delete",
                                    headers: { "Content-type": 'application/json' }
                                })
                                const message = await res.json();
                                if (res.ok) {
                                    Swal.fire({
                                        title: "Deleted!",
                                        text: message.message,
                                        icon: "success"
                                    })
                                        .then(() => {
                                            updateNoitemCateGories();
                                        })
                                } else {

                                }
                            } catch (err) {
                                Swal.fire({
                                    icon: "error",
                                    title: "Oops...",
                                    text: err.message,
                                });
                            }
                        }
                    });

                })

                // edit 
                tr.querySelector('#editCate').addEventListener('click', () => {
                    containerEditCategores.classList.add('active');
                    overlayAddCate.classList.add('active');
                    idItem = tr.dataset.id;
                    nameCategoriesEdit.value = name.textContent;
                    categoriesInputEdit.dataset.status = status.textContent;
                    categoriesInputEdit.checked = status.textContent === "Publish" ? true : false;
                })
            })

        } else {
            const contentCate = document.querySelector('.contentCate');
            if (contentCate) {
                contentCate.remove();
            }
        }
    } catch (err) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: err.message,
        });
    }
}

categoriesInputEdit.addEventListener('change', function () {
    let thisValue = this.dataset.status;
    thisValue = this.checked ? 'Publish' : "Private";
    this.dataset.status = thisValue;
})

formEditCategories.addEventListener('submit', async e => {
    e.preventDefault();
    const time = new Date();
    const editCreate = time.toDateString();
    const statusEdit = categoriesInputEdit.dataset.status;
    const nameEdit = nameCategoriesEdit.value;

    const tr = document.querySelector(`tr[data-id="${idItem}"]`);
    const name = tr.querySelector('.nameCategories').textContent;
    const status = tr.querySelector('.statuscategories').textContent;
    if (nameEdit == name && statusEdit == status) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "You need to update data before click update!",
        })
        return;
    }

    try {
        const res = await fetch(`http://localhost:3000/editCate/${idItem}`, {
            method: "PUT",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ nameEdit, statusEdit, editCreate })
        })

        const messa = await res.json();
        if (res.ok) {
            btnConcelEditCate.click();
            Swal.fire({
                title: "Updated!",
                text: messa.message,
                icon: "success"
            })
                .then(() => {
                    updateNoitemCateGories();
                    updateFormreset();
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


window.addEventListener('load', () => {
    updateNoitemCateGories();

})

const updateFormreset = () => {
    formAddCategories.reset();
    formEditCategories.reset();
}


