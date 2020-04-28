class Swipe {
  constructor(element, left = () => {}, right = () => {}) {
    this.element = element;
    this.touchStart = 0;
    this.touchEnd = 0;
    this.left = left;
    this.right = right;
    this.element.addEventListener(
      'touchstart',
      ({ changedTouches: [{ screenX }] }) => {
        this.touchStart = screenX;
      },
    );
    this.element.addEventListener(
      'touchend',
      ({ changedTouches: [{ screenX }] }) => {
        this.touchEnd = screenX;
        this.handleSwipe();
      },
    );
  }

  handleSwipe() {
    let diff = this.touchEnd - this.touchStart;
    if (diff > 10) {
      this.right();
    }
    if (diff < -10) {
      this.left();
    }
  }
}

export default Swipe;
