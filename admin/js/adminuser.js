const tbodyAdminUser = document.getElementById('tbodyAdminUser');
const searchAdminUser = document.getElementById('searchAdminUser');
const addAdminUser = document.querySelector('.addAdminUser');
const containerAddadmin = document.querySelector('.containerAddadmin');
const overlayAddCate = document.querySelector('.overlayAddCate');
const addAdminConcel = document.querySelectorAll('.addAdminConcel');
const formAddAdmin = document.getElementById('formAddAdmin');
const containerEditadmin = document.querySelector('.containerEditadmin');
const formEditAdmin = document.getElementById('formEditAdmin');
let idEdit = null;

const updateNodataAdminUser = async () => {
    try {
        const res = await fetch(`http://127.0.0.1:3000/getAdminuser`);
        const data = await res.json();
        document.querySelector('.adminUserNoData').classList.toggle('hidden', data.length > 0);

        const containerAdminCreate = document.querySelectorAll('.containerAdminCreate');
        if (containerAdminCreate) {
            containerAdminCreate.forEach(item => item.remove());
        }
        if (data.length > 0) {
            data.forEach(item => {
                const tr = document.createElement('tr');
                tr.dataset.id = item._id;
                tr.classList.add('containerAdminCreate');

                const name = document.createElement('td');
                name.classList.add('nameAdminCreate');
                name.textContent = item.name;
                tr.appendChild(name);

                const email = document.createElement('td');
                email.classList.add('emailAdninCreate');
                email.textContent = item.email;
                tr.appendChild(email);

                const phone = document.createElement('td');
                phone.classList.add('phoneAdminCreate');
                phone.textContent = item.phone;
                tr.appendChild(phone);

                const role = document.createElement('td');
                role.classList.add('roleAdminCreate');
                role.innerHTML = `<h6 class="roleTage fs-6">${item.role}</h6>`;
                tr.appendChild(role);

                const action = document.createElement('td');
                action.className = "actionProduct text-nowrap"
                action.innerHTML = `
                <button class='btn btn-outline-primary' id='editAdmin'><i class="bi bi-pencil-square"></i> Edit</button>
                <button class='btn btn-outline-danger' id='delAdmin'><i class="bi bi-trash3"></i> Delete</button>
                `;
                tr.appendChild(action);

                tbodyAdminUser.appendChild(tr);

                tr.querySelector('#delAdmin').addEventListener('click', () => {
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
                                const res = await fetch(`http://127.0.0.1:3000/deleteAdmin/${id}`, {
                                    method: "delete",
                                    headers: { "Content-type": "application/json" }
                                })

                                const mess = await res.json();
                                if (res.ok) {
                                    Swal.fire({
                                        icon: "success",
                                        title: "Successfully",
                                        text: mess,
                                    })
                                        .then(() => {
                                            updateNodataAdminUser();
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


                tr.querySelector('#editAdmin').addEventListener('click', () => {
                    containerEditadmin.classList.add('active');
                    overlayAddCate.classList.add('active');
                    idEdit = tr.dataset.id;

                    document.getElementById('nameAdminEdit').value = name.textContent;
                    document.getElementById('roleSelectEdit').value = role.textContent;
                    document.getElementById('emailEdit').value = email.textContent;
                    document.getElementById('phoneEdit').value = phone.textContent;
                })



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

updateNodataAdminUser();


// seach admin name
searchAdminUser.addEventListener('keyup', function () {
    updateSearch(this.value.toLowerCase());
})

const updateSearch = (inputValue) => {
    const containerAdminCreate = document.querySelectorAll('.containerAdminCreate');
    let found = false;
    if (containerAdminCreate) {
        containerAdminCreate.forEach(item => {
            const nameAdminCreate = item.querySelector('.nameAdminCreate').textContent.toLowerCase();
            if (nameAdminCreate.includes(inputValue)) {
                item.style.display = '';
                found = true;
            } else {
                item.style.display = "none";
            }
            document.querySelector('.adminNotFound').classList.toggle('active', !found);


        })
    }
}



addAdminUser.addEventListener('click', () => {
    containerAddadmin.classList.add('active');
    overlayAddCate.classList.add('active');
})

overlayAddCate.addEventListener('click', () => {
    overlayAddCate.classList.remove('active');
    containerAddadmin.classList.remove('active');
    containerEditadmin.classList.remove('active');
    updateresetForm();
})

addAdminConcel.forEach(item => {
    item.addEventListener('click', () => {
        overlayAddCate.classList.remove('active');
        containerAddadmin.classList.remove('active');
        containerEditadmin.classList.remove('active');
        updateresetForm();
    })
})


const updateresetForm = () => {
    formAddAdmin.reset();
    formEditAdmin.reset();
}

formAddAdmin.addEventListener('submit', async (e) => {
    e.preventDefault();

    try {
        const name = document.getElementById('nameAdmin').value;
        const email = document.getElementById('email').value;
        const role = document.getElementById('roleSelect').value;
        const phone = document.getElementById('phone').value;
        const password = document.getElementById('password').value;

        const res = await fetch('http://127.0.0.1:3000/createAdmin', {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ name, email, phone, password, role })
        });

        const message = await res.json();
        if (res.ok) {
            addAdminConcel.click();
            Swal.fire({
                title: "Added!",
                text: message.message,
                icon: "success"
            })
                .then(() => {
                    updateNodataAdminUser();
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

formEditAdmin.addEventListener('submit', async e => {
    e.preventDefault();
    
    try {
        const name = document.getElementById('nameAdminEdit').value;
        const email = document.getElementById('emailEdit').value;
        const role = document.getElementById('roleSelectEdit').value;
        const phone = document.getElementById('phoneEdit').value;

        const res = await fetch(`http://127.0.0.1:3000/editAdmin/${idEdit}`, {
            method: "PUT",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ name, email, phone, role })
        });

        const message = await res.json();
        if (res.ok) {
            overlayAddCate.click();
            Swal.fire({
                title: "Updated!",
                text: message.message,
                icon: "success"
            })
                .then(() => {
                    updateNodataAdminUser();
                    checkAuth();
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
