const btnStatus = document.querySelectorAll('.btnStatus');
const activeBar = document.querySelector('.activeBar');


btnStatus.forEach((item, i) => {
    item.addEventListener('click', () => {

        btnStatus.forEach(item => item.classList.remove('active'));
        item.classList.add('active');

        activeBar.style.left = `${i * 25}%`;
    })
})