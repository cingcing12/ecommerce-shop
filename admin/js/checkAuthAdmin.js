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

        
    }catch(err){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: err.message,
        });
    }
}

checkAuth();