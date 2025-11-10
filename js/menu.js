const overlay = document.querySelector('.overlay');
const searchIcon = document.querySelector('.searchIcon');
const containerSearch = document.querySelector('.containerSearch');
const menuBtn = document.querySelector('.menuBtn');
const menu = document.querySelector('.menu');

searchIcon.addEventListener('click', () => {
    overlay.classList.add('active');
    containerSearch.classList.add('active');
    document.body.classList.add('hidden');
})

overlay.addEventListener('click', () => {
    overlay.classList.remove('active');
    containerSearch.classList.remove('active');
    menu.classList.remove('active');
    document.body.classList.remove('hidden');
})

menuBtn.addEventListener('click', () => {
    overlay.classList.add('active');
    menu.classList.add('active');
    document.body.classList.add('hidden');
})