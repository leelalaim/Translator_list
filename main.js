const englishInput = document.getElementById('input-eng'),
      russianInput = document.getElementById('input-rus'),
      inputs = document.querySelectorAll('input'),
      saveButton = document.getElementById('btn'),
      table = document.getElementById('table');

let words;

localStorage.length < 1 ? words = [] : words = JSON.parse(localStorage.getItem('words'));

let addWordToTable = index => {
    table.innerHTML += `
        <tr>
            <td>${words[index].translate}</td>
            <td>${words[index].russian}</td>
        </tr>
    `
}

words.forEach( (element, i) => {
    addWordToTable(i);
});

class CreateWord {
    constructor(translate, russian) {
        this.translate = translate;
        this.russian = russian;
    }
}

saveButton.addEventListener('click', () => {
    if(
        englishInput.value.length < 1 || 
        russianInput.value.length < 1 ||
        !isNaN(englishInput.value)    ||
        !isNaN(russianInput.value) 
    ) {
        for(let key of inputs) {
            key.classList.add('error');
        }
    } else {
        for(let key of inputs) {
            key.classList.remove('error'); 
        }
        words.push(new CreateWord(englishInput.value, russianInput.value));
        localStorage.setItem('words', JSON.stringify(words));
        addWordToTable(words.length - 1);
    }
})

