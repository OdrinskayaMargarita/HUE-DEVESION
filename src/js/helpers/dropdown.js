export default (removeClasses = false) => {

  const containers = document.querySelectorAll('[data-dropdown-container]');
  if (containers.length === 0) return;

  const OPENED = 'opened';

  const toggleDropdown = (button, dropdown, dropdownInner) => {
    const height = dropdownInner.clientHeight;

    if (!button.classList.contains(OPENED)) {
      button.classList.add(OPENED);
      dropdown.style.height = `${height}px`;
    } else {
      button.classList.remove(OPENED);
      dropdown.style.height = 0;
    }
  };

  const removeDropdown = (target) => {
    if (removeClasses) {
      const buttons = document.querySelectorAll('[data-dropdown-button]');

      buttons.forEach((button) => {
        if (button !== target && button.classList.contains(OPENED)) {
          const dropdown = button.closest('[data-dropdown-container]').querySelector('[data-dropdown]');
          button.classList.remove(OPENED);
          dropdown.style.height = 0;
        }
      });
    }
  }

  containers.forEach(container => {
    const button = container.querySelector('[data-dropdown-button]');
    const dropdown = container.querySelector('[data-dropdown]');
    const dropdownInner = container.querySelector('[data-dropdown-inner]');

    button.addEventListener('click', e => {
      e.preventDefault();
      removeDropdown(e.target);
      toggleDropdown(button, dropdown, dropdownInner);
    });
  });
}
