window.addEventListener('load', () => {
  const contianerBtnUploadImg = document.querySelector('.contianerBtnUploadImg');
  const addimgProfile = document.getElementById('addimgProfile');
  const uplaodImgProfile = document.getElementById('uplaodImgProfile');
  const id = document.querySelector('.profileContainer').dataset.id;

  contianerBtnUploadImg.addEventListener('click', () => {
    uplaodImgProfile.click();
  });

  uplaodImgProfile.addEventListener('change', async (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    if (!file) return;

    // preview image
    const reader = new FileReader();
    reader.onload = (e) => {
      addimgProfile.src = e.target.result;
      addimgProfile.style.display = 'block';
    };
    reader.readAsDataURL(file);

    // upload image
    const formData = new FormData();
    formData.append('image', file);
    formData.append('id', id);

    const res = await fetch('http://127.0.0.1:3000/uploadProfile', {
      method: 'POST',
      credentials: "include",
      body: formData
    });
    const msg = await res.text();
    Swal.fire({
                title: "Added!",
                text: msg,
                icon: "success"
            })
                .then(() => {
                    checkAuth();
                })
  });
});
