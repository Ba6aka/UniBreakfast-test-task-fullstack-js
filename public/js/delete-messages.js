function deleteMessages() {
    if (localStorage.getItem('myKey')) {
        const valueString = localStorage.getItem('myKey');
        const values = JSON.parse(valueString);
        values.forEach(element => {
            let msg = (document.getElementById(element).parentElement)
            msg.remove()
        });
    }
}

const messageContainer = document.querySelector('.messages');

messageContainer.addEventListener('click', (e) => {
    if (e?.target.nodeName == 'BUTTON') {
        const values = JSON.parse(localStorage.getItem('myKey')) || [];

        values.push(e.target.id);

        localStorage.setItem('myKey', JSON.stringify(values));

        location.reload();
    }
});