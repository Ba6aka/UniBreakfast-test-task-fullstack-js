const form = document.querySelector('form')

form.addEventListener('submit', () => {
    const formData = sanitazeAndGetFormData(form);

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

function sanitazeAndGetFormData(form) {
    const formData = new FormData(form);

    for (const [key, value] of formData.entries()) {

        const sanitizedValue = value.trim().replace(/[^a-zA-Z0-9-\s]/g, '');

        formData.set(key, sanitizedValue);
    }

    formData.append('dataTime', getTime())
    formData.append('id', getId())

    return formData
}

function createColorCode(word) {
    let hash = 0;
    for (let i = 0; i < word.length; i++) {
        hash = word.charCodeAt(i) + ((hash << 5) - hash);
    }
    let colorCode = '#';
    for (let i = 0; i < 3; i++) {
        let value = (hash >> (i * 8)) & 0xFF;
        colorCode += ('00' + value.toString(16)).substr(-2);
    }
    return colorCode;
}