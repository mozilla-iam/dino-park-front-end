class Swipe {
  constructor(element, left = () => {}, right = () => {}) {
    this.element = element;
    this.touchStartX = 0;
    this.touchStartY = 0;
    this.touchEndX = 0;
    this.touchEndY = 0;
    this.left = left;
    this.right = right;
    this.touchstart = ({ changedTouches: [{ screenX, screenY }] }) => {
      this.touchStartX = screenX;
      this.touchStartY = screenY;
    };
    this.touchend = ({ changedTouches: [{ screenX, screenY }] }) => {
      this.touchEndX = screenX;
      this.touchEndY = screenY;
      this.handleSwipe();
    };
    this.element.addEventListener('touchstart', this.touchstart);
    this.element.addEventListener('touchend', this.touchend);
  }

  handleSwipe() {
    const diffX = this.touchEndX - this.touchStartX;
    const absDiffY = Math.abs(this.touchEndY - this.touchStartY);
    if (diffX > 10 && absDiffY < 50) {
      this.right();
    }
    if (diffX < -10 && absDiffY < 50) {
      this.left();
    }
  }

  stop() {
    this.element.removeEventListener('');
  }
}

export default Swipe;
