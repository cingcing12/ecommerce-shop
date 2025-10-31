const btnSidebar = document.querySelector('.btnSidebar');
const containerDasboard = document.querySelector('.containerDasboard');
const overlaySidebar = document.querySelector('.overlaySidebar');
const smallBtn = document.querySelector('.smallBtn');
const menu = document.querySelector('.menu');
const contentMenu = document.querySelector('.contentMenu');
const sidebar = document.querySelector('.sidbar');
const main = document.querySelector('.main');
const logo = document.querySelector('.containerLogo');

btnSidebar.addEventListener('click', () => {

    logo.style = "transition: .2s ease";
    sidebar.style = "transition: .5s ease";
    main.style = "transition: .5s ease";
    containerDasboard.classList.toggle('activeBigDevive');
    localStorage.setItem('activeSideBar', containerDasboard.classList[1]);


})

overlaySidebar.addEventListener('click', () => {
    containerDasboard.classList.remove('active');
})

smallBtn.addEventListener('click', () => {
    containerDasboard.classList.add('active');
})

menu.addEventListener('click', (e) => {
    e.stopPropagation();
    contentMenu.classList.toggle('active');
})

document.addEventListener('click', () => {
    contentMenu.classList.remove('active');
})

contentMenu.addEventListener('click', (e) => {
    e.stopPropagation();
})

const updateSidebarLoaded = () => {
    const activeBar = localStorage.getItem('activeSideBar');
    containerDasboard.classList.toggle('activeBigDevive', activeBar != "undefined");
}

updateSidebarLoaded();