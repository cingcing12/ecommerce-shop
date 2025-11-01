const tbodyAdminUser = document.getElementById('tbodyAdminUser');




const updateNodataAdminUser = async () => {
    try{
        const res = await fetch(`http://127.0.0.1:3000/getAdminuser`);
        const data = await res.json();

        document.querySelector('.adminUserNoData').classList.toggle('hidden', data.length > 0);
        if(data.length > 0){
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
                <button class='btn btn-outline-primary' id='editCate'><i class="bi bi-pencil-square"></i> Edit</button>
                <button class='btn btn-outline-danger' id='delCate'><i class="bi bi-trash3"></i> Delete</button>
                `;
                tr.appendChild(action);

                tbodyAdminUser.appendChild(tr);
            })
        }
    }catch(err){
       Swal.fire({
            icon: "error",
            title: "Oops...",
            text: err.message,
        }); 
    }
}

updateNodataAdminUser();