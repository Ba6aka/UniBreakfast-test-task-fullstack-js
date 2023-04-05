const form = document.querySelector('form')

form.addEventListener('submit', () => {
    const formData = new FormData(form);

    postData('/db.json', Object.fromEntries(formData))
        .then((response) => {
            console.log(response)
        })
        .catch(error => {
            console.log(error)
        })
        .finally(
            form.reset()
        )
    location.reload()
})