const nameProfile = document.querySelector('.nameProfile');
const emailProfile = document.querySelector(".emailProfile");
const nameInput = document.getElementById('nameInput');
const emailInput = document.getElementById('emailInput');
const roleInput = document.getElementById('roleInput');
const profileContainer = document.querySelector('.profileContainer');
const btnProfile = document.querySelector('.btnProfile');
const btnConcelProfile = document.querySelector('.btnConcelProfile');


const checkAuth = async () => {
    try{
        const res = await fetch('http://127.0.0.1:3000/authLoginAdmin', {
            method: "GET",
            credentials: "include"
        });
        const message = await res.json();

        if(message == "Please login admin first!"){
            return window.location.href = "login.html";
        }

        profileContainer.dataset.id = message.adminId;
        nameProfile.textContent = message.adminName;
        emailProfile.textContent = message.adminEmail;
        nameInput.value = message.adminName;
        emailInput.value = message.adminEmail;
        roleInput.value = message.adminRole;

        console.log(message)

        
    }catch(err){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: err.message,
        });
    }
}

checkAuth();

const overlayClickProfile = document.querySelector('.overlayAddCate');

btnProfile.addEventListener('click', () => {
    profileContainer.classList.add('active');
    overlayClickProfile.classList.add('active');
})

btnConcelProfile.addEventListener('click', () => {
    profileContainer.classList.remove('active');
    overlayClickProfile.classList.remove('active');
})

overlayClickProfile.addEventListener('click', () => {
    profileContainer.classList.remove('active');
    overlayClickProfile.classList.remove('active');
})
