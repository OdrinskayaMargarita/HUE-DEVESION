export default (form) => {
    const fields = form.querySelectorAll('.field-wrap input, .field-wrap textarea');

    fields.forEach(f => {
        const parent = f.closest('.field-wrap');

        if (f.value !== '') parent.classList.add('has-filled');

        f.addEventListener('focus', () => {
            if (parent.classList.contains('has-filled')) parent.classList.remove('has-filled');
            parent.classList.add('has-focused');
        });

        f.addEventListener('keyup', () => {
            if (parent.classList.contains('has-focused')) parent.classList.remove('has-focused');
            parent.classList.add('has-filled');
        });

        f.addEventListener('blur', () => {
            if (f.value === '') {
                if (parent.classList.contains('has-focused')) parent.classList.remove('has-focused');
                if (parent.classList.contains('has-filled')) parent.classList.remove('has-filled');
            }
        });
    })
}
