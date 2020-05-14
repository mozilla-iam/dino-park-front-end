function trapFocus(event) {
  const element = event.target;
  const KEYCODE_TAB = 9;

  element.addEventListener('keydown', (e) => {
    const focusableEls = element.querySelectorAll(
      'a[href], button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])',
    );
    const firstFocusableEl = focusableEls[0];
    const lastFocusableEl = focusableEls[focusableEls.length - 1];
    const isTabPressed = e.key === 'Tab' || e.keyCode === KEYCODE_TAB;

    if (!isTabPressed) {
      return;
    }

    if (e.shiftKey) {
      /* shift + tab */ if (document.activeElement === firstFocusableEl) {
        lastFocusableEl.focus();
        e.preventDefault();
      }
    } /* tab */ else if (document.activeElement === lastFocusableEl) {
      firstFocusableEl.focus();
      e.preventDefault();
    }
  });
}

function bindFocusTrap(element) {
  element.addEventListener('keydown', trapFocus);
}

function unbindFocusTrap(element) {
  element.removeEventListener('keydown', trapFocus);
}

export { trapFocus, bindFocusTrap, unbindFocusTrap };
