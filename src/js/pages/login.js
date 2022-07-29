import formFocuses from '../helpers/form-focuses';

export default () => {
    const form = document.querySelector('.form-theme--contacts');

    if (form) formFocuses(form);
}
