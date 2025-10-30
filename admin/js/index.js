const cardDasboardCate = document.querySelector('.cardDasboard.categories');
const product = document.querySelector('.cardDasboard.product');


const updateFecthingData = async (fec, countCard, percentOfCard) => {
    try{
        const res = await fetch(fec);
        const data = await res.json();
        const target = data.target;
        let txtCount = parseInt(countCard.textContent);
        let percent = data.data.length / target * 100;
        let newPercent = 0;


        const countSetinterval = setInterval(() => {
            if(txtCount < data.data.length){
                txtCount += 1;
                countCard.textContent = txtCount;
            }else{
                clearInterval(countSetinterval)
            }
        }, 100);


        const percentSetinterval = setInterval(() => {
            if(newPercent < percent){
                newPercent += 1;
                percentOfCard.textContent = `${newPercent}%`
            }else{
                clearInterval(percentSetinterval);
            }
        }, 20)
        


        

    }catch(err){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: err.message,
        });
    }
}

const updateCatedas = async (card, fec) => {
    const countCard = card.querySelector('.countCard');
    const percentOfCard = card.querySelector('.percentOfCard');

    updateFecthingData(fec, countCard, percentOfCard);
}

updateCatedas(cardDasboardCate, "http://localhost:3000/categoriesPublish");
updateCatedas(product, "http://localhost:3000/productPublish");

