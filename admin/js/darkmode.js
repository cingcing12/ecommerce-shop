const darkBtn = document.querySelector('.darkBtn');
const darkmodeContent = document.querySelector(".darkmodeContent");

darkBtn.addEventListener('change', (e) => {
    let darkmode = e.target.dataset.darkmode;
    if(darkmode == "dark"){
        e.target.dataset.darkmode = 'light';
    }else{
        e.target.dataset.darkmode = 'dark';
    }

    localStorage.setItem('theme', e.target.dataset.darkmode);
    updateDarkmode();
})


const updateDarkmode = () => {
    const body = document.querySelector('body');
    const theme = localStorage.getItem('theme');
    body.dataset.bsTheme = theme;
    darkBtn.dataset.darkmode = theme;
    
    if(theme == "dark"){
        darkBtn.checked = true;
        darkmodeContent.textContent = "Light";
    }else{
        darkBtn.checked = false;
        darkmodeContent.textContent = "Dark";
    }
}


updateDarkmode();

