const nameProfile = document.querySelector('.nameProfile');
const emailProfile = document.querySelector(".emailProfile");
const nameInput = document.getElementById('nameInput');
const emailInput = document.getElementById('emailInput');
const roleInput = document.getElementById('roleInput');
const profileContainer = document.querySelector('.profileContainer');
const btnProfile = document.querySelector('.btnProfile');
const btnConcelProfile = document.querySelector('.btnConcelProfile');
const navItem = document.querySelectorAll('.nav-item');
const orderLinkNone = document.querySelectorAll('.orderLinkNone');
const imgProfile = document.querySelectorAll('#imgProfile');


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

        imgProfile.forEach(item => {
            item.src = !message.adminImg || message.adminImg === "null"
  ? "img/Default_pfp.svg.png"
  : `../img/${message.adminImg}`;
        })

        if(message.adminRole == "Admin"){
            document.querySelector('.nav-item.adminUserLink').remove();
            if(window.location.pathname == "/admin/adminUser.html"){
                window.location.href = "404.html"
            }
        }else if(message.adminRole == "Admin For Delivery" && window.location.pathname == "/admin/index.html"){
            window.location.href = "order.html";
        }else if(message.adminRole == "Admin For Delivery"){
            document.querySelector('.nav-item.adminUserLink').remove();
            orderLinkNone.forEach(item => item.remove());
            if(window.location.pathname == "/admin/adminUser.html" || window.location.pathname == "/admin/index.html" || window.location.pathname == "/admin/categories.html"
                || window.location.pathname == "/admin/customer.html" || window.location.pathname == "/admin/product.html"
            ){
                window.location.href = "404.html"
            }
        }

        
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
