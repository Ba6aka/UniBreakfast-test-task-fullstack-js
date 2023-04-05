const form = document.querySelector('form');
const checkNegative = document.getElementById('negative');
const checkFacrotorial = document.getElementById('factorial');
const numberInput = document.getElementById('number');

let nubmerForPost;

form.addEventListener('submit', () => {
    if (checkNegative.checked) {
        nubmerForPost = '-' + numberInput.value;
    }

    if (!checkFacrotorial.checked) {
        nubmerForPost = Math.floor(+nubmerForPost) ||  Math.floor(numberInput.value);
    }

    if (checkNegative.checked && !checkFacrotorial) {
        nubmerForPost = '-' + Math.floor(numberInput.value);
    }

    postData('/postCalculation', JSON.parse(nubmerForPost));

    const output = document.querySelector('.output');
    const div = document.createElement('div')
    div.className = 'loader'
    output.prepend(div)

    form.reset();
})
