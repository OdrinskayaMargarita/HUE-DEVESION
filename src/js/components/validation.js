export default () => {
    let forms = document.querySelectorAll('.form-valid')

    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    function validation(inputs) {
        inputs.forEach((input) => {
            let data = input.getAttribute('data-input')
            switch (data) {
                case 'text':
                    if (input.value.length < 3) {
                        input.closest('.form-theme__field').classList.add('has-error')
                    } else {
                        input.closest('.form-theme__field').classList.remove('has-error')
                    }
                    break;
                case 'email':
                    if (re.test(input?.value) === false) {
                        input.closest('.form-theme__field').classList.add('has-error')
                    } else {
                        input.closest('.form-theme__field').classList.remove('has-error')
                    }
                    break;
                case 'phone':
                    if (input.value.length < 8) {
                        input.closest('.form-theme__field').classList.add('has-error')
                    } else if (input.value.length > 15) {
                        input.closest('.form-theme__field').classList.add('has-error')
                    } else {
                        input.closest('.form-theme__field').classList.remove('has-error')
                    }
                    break;
                case 'password' :
                    if (input.value.length < 6) {
                        input.closest('.form-theme__field').classList.add('has-error-short')
                    } else {
                        input.closest('.form-theme__field').classList.remove('has-error-short')
                    }
                    break;
                default:
                    if (input.value.length < 3) {
                        input.closest('.form-theme__field').classList.add('has-error')
                    } else {
                        input.closest('.form-theme__field').classList.remove('has-error')
                    }
                    break;
            }
        })
    }


    forms.forEach((form) => {
        let inputs = form.querySelectorAll('.input-required')
        let button = form.querySelector('button[type="submit"]')
        button?.addEventListener('click', (e) => {
            e.preventDefault()
            validation(inputs)
        })
    })
}