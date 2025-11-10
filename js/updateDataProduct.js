

const updateDataProduct = (data, containerProduct) => {
    console.log(data, containerProduct);

    data.forEach(item => {
        const productContent = document.createElement('a');
        productContent.href = `product_Detail.html?id=${item._id}&name=${item.nameProduct}`;
        productContent.dataset.id = item._id;
        productContent.classList.add('productContent', "nav-link");
        productContent.innerHTML = `
            <div class="containerImageProduct"><img src='${item.imgURL}' /></div>
            <div class="contentDetail"><h6 class="fs-6 nameProduct">${item.nameProduct}</h6>
            ${item.size != null ? `<h6 class="size">Size: <span>${item.size}</span></h6>` : ''}
            <p class="productPrice">$${item.price.toFixed(2)}</p></div>
            <div class="containeradd"><div class="addtoWishlist"><i class="bi bi-heart"></i></div><div class="addtocart"><i class="bi bi-cart"></i></div></div>
            `;
        containerProduct.appendChild(productContent);

        productContent.querySelector('.addtocart').addEventListener('click', async (e) => {
            e.preventDefault();
            try {
                const idProduct = productContent.dataset.id;
                const quantity = 1;

                const res = await fetch('http://127.0.0.1:3000/addCart', {
                    method: "POST",
                    credentials: "include",
                    headers: { "Content-type": "application/json" },
                    body: JSON.stringify({ idProduct, quantity })
                })

                const message = await res.json();

                if (res.status == 401) {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: message.err,
                        footer: `<a href="${window.location.pathname == "/index.html" ? 'views/login.html' : "login.html"}">Go to Login!</a>`
                    });
                } else if (res.ok) {
                    Swal.fire({
                        icon: "success",
                        title: "Successfully",
                        text: message.message,
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
    })
}

export default updateDataProduct;