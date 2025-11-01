const logout = document.getElementById('logout');

logout.addEventListener('click', () => {
     Swal.fire({
                        title: "Are you sure?",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Logout"
                    }).then(async (result) => {
                        if (result.isConfirmed) {
                            try {
                                const res = await fetch(`http://127.0.0.1:3000/logoutAdmin`, {
                                    method: "POST",
                                    credentials: "include",
                                    headers: { "Content-type": "application/json" }
                                })

                                const mess = await res.json();
                                if (res.ok) {
                                    Swal.fire({
                                        icon: "success",
                                        title: "Successfully",
                                        text: mess,
                                    })
                                        .then(() => {
                                            window.location.reload();
                                        })
                                }
                            } catch (err) {
                                Swal.fire({
                                    icon: "error",
                                    title: "Oops...",
                                    text: err.message,
                                });
                            }
                        }
                    });
})