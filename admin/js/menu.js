const btnSidebar = document.querySelector('.btnSidebar');
const containerDasboard = document.querySelector('.containerDasboard');
const overlaySidebar = document.querySelector('.overlaySidebar');
const smallBtn = document.querySelector('.smallBtn');
const menu = document.querySelector('.menu');
const contentMenu = document.querySelector('.contentMenu');

btnSidebar.addEventListener('click', () => {
    containerDasboard.classList.toggle('active');
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