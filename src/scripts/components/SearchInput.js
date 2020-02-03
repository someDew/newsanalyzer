export default class SearchInput {
    constructor() {
        this.searchForm = document.forms.searchForm;
        this.input = this.searchForm.elements.searchInput;
        this.submit = this.searchForm.elements.searchSubmit;
        this.searchForm.addEventListener('input', (event => console.log(event.target.value)));
        this.searchForm.addEventListener('input', (event => this.validate(event)));
        this.searchForm.addEventListener('submit', (event => this.alertInput(event)));
    }

    alertInput(event) {
        event.preventDefault();
        console.log('prevent default');
    }

    validate(event) {
        switch (event.target.validity.valid) {
            case true:
                console.log('Валидно: ' + event.target.value);
                break;
            case false:
                console.log('Не валидно: ' + event.target.value);
        }
    }

    
}


