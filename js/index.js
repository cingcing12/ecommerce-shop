const containerShopCategories = document.querySelector('.containerShopCategories .container');

const updateShoipCategories = async () => {
    try {
        const res = await fetch('http://127.0.0.1:3000/categoriesPublish');
        const data = await res.json();
        if(res.ok){
            const btnAll = document.createElement('a');
            btnAll.classList.add('btnCate');
            btnAll.href = window.location.pathname == "/index.html" ? `views/categories.html?queryCategories=allCategories` : `categories.html?queryCategories=allCategories`;
            btnAll.textContent = "All";
            containerShopCategories.appendChild(btnAll);

            data.data.forEach(item => {
                const a = document.createElement('a');
                a.classList.add('btnCate');
                a.href = window.location.pathname == "/index.html" ? `views/categories.html?queryCategories=${item.categoriesName}` : `categories.html?queryCategories=${item.categoriesName}`;
                a.textContent = item.categoriesName;
                containerShopCategories.appendChild(a);
            })

            const btnCate = [...document.querySelectorAll('.btnCate')];
            const search = new URLSearchParams(window.location.search);
            const s = search.get('queryCategories');
            const indexActive = btnCate.findIndex(item => item.textContent == s);
            if(s == "allCategories"){
                document.querySelectorAll('.btnCate')[0].classList.add('active');
            }else if(indexActive !== -1){
                document.querySelectorAll('.btnCate')[indexActive].classList.add('active');
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

updateShoipCategories();