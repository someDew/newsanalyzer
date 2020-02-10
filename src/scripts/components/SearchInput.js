export default class SearchInput {
    constructor(api, newsApi) {
        this.api = api;
        this.newsApi = newsApi;
        this._searchForm = document.forms.searchForm;
        this._input = this._searchForm.elements.searchInput;
        this._button = this._searchForm.elements.searchSubmit;
        this._preloader = document.querySelector('.preloader');

        this._searchForm.addEventListener('submit', this._handleSubmit.bind(this));
        this._input.addEventListener('input', this._handleInput.bind(this));
        this._input.addEventListener('invalid', this._handleInvalid.bind(this));
    }

    _handleSubmit(event) {
        event.preventDefault();
        this._blockForm();
        this.newsApi._userReq = this._input.value;
        console.log('Юзер реквест: ' + this.newsApi._userReq);
        this.newsApi.getNews()
            /* .then((value) => console.log('Ответ newsapi: ' + value))
            .then()
            .catch()
            .finally(this._unblockForm.bind(this)); */

        this._unblockForm();
    }

    _showPreloader() {
        this._preloader.classList.toggle('preloader_disable');
    }

    _blockForm() {
        this._input.setAttribute('disabled', 'true');
        this._button.setAttribute('disabled', 'true');
    }

    _unblockForm() {
        this._input.removeAttribute('disabled');
        this._button.removeAttribute('disabled');
    }

    _handleInput() {
        this._input.setCustomValidity('');
    }

    _handleInvalid() {
        this._input.setCustomValidity('Пожалуйста, введите ключевое слово');
    }
    
}


