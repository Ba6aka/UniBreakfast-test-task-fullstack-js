const form = document.querySelector('form')

form.addEventListener('submit', () => {
    const formData = new FormData(form);

    formData.append('dataTime', getTime())
    formData.append('id', getId())

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


function getTime() {
    const today = new Date();
    const now = today.toLocaleString();

    return now
}

function getId() {
    if (!localStorage.getItem('id')) {
        let id = 1
    }
    let id = localStorage.getItem('id');

    id++

    localStorage.setItem('id', id)

    return id
}