import createCropperContainer from './cropper-element';
import { clamp, copyNodeStyle, setStyles } from './helpers';

const MIN_SCALE = 50;

class Cropper {
  constructor(img) {
    this.container = document.createElement('div');
    this.container.style.setProperty('overflow', 'hidden');

    this.img = img;
    img.parentElement.insertBefore(this.container, img);
    img.remove();

    const inner = document.createElement('div');
    setStyles(inner, {
      position: 'relative',
      'user-select': 'none',
      '-moz-user-select': 'none',
      '-webkit-user-select': 'none',
    });
    this.container.appendChild(inner);
    inner.appendChild(img);

    this.croppedImg = img.cloneNode();
    setStyles(this.croppedImg, {
      position: 'absolute',
      top: '0',
      left: '0',
      cursor: 'pointer',
    });
    inner.appendChild(this.croppedImg);

    this.cropperContainer = createCropperContainer(this.container, {
      onMove: this.handleMove.bind(this),
      onResize: this.handleResize.bind(this),
    });
    inner.appendChild(this.cropperContainer);

    this.init();

    new MutationObserver(() => {
      this.init();
    }).observe(img, { attributeFilter: ['src'] });
  }

  get left() {
    const { scale, center, width } = this;
    return center[0] * width - scale / 2;
  }

  get top() {
    const { scale, center, height } = this;
    return center[1] * height - scale / 2;
  }

  async init() {
    if (!this.img.complete) {
      await new Promise((resolve) =>
        this.img.addEventListener('load', resolve),
      );
    }

    this.container.style = '';
    copyNodeStyle(this.img, this.container, ['filter']);
    setStyles(this.img, { position: 'initial', filter: 'brightness(0.4) ' });
    this.croppedImg.src = this.img.src;

    const { width, height } = this.img.getBoundingClientRect();
    this.width = width;
    this.height = height;
    this.scale = Math.max(Math.min(width, height) * 0.5, MIN_SCALE);
    this.center = [0.5, 0.5];
    this.render();
  }

  handleMove(offsetX, offsetY) {
    const {
      center: [x, y],
      scale,
      width,
      height,
    } = this;
    const halfWidth = scale / 2 / width;
    const halfHeight = scale / 2 / height;
    this.center = [
      clamp(halfWidth, x + offsetX / width, 1 - halfWidth),
      clamp(halfHeight, y + offsetY / height, 1 - halfHeight),
    ];
    this.render();
  }

  handleResize(x, y, key) {
    const isXResize = Math.abs(x) > Math.abs(y);
    const isXFlip = key.includes('w');
    const isYFlip = key.includes('n');
    const diff =
      (isXResize ? (isXFlip ? -1 : 1) * x : (isYFlip ? -1 : 1) * y) * 2;
    const newScale = Math.max(this.scale + diff * 0.5, MIN_SCALE);
    if (this.scale !== newScale) {
      this.scale = newScale;
      this.handleMove(
        (key === 's' || key === 'n' ? 0 : (isXFlip ? -1 : 1) * diff) / 4,
        (key === 'w' || key === 'e' ? 0 : (isYFlip ? -1 : 1) * diff) / 4,
      );
    }
  }

  render() {
    const { cropperContainer, croppedImg, scale, left, top } = this;

    setStyles(cropperContainer, {
      top: `${top}px`,
      left: `${left}px`,
      width: `${scale}px`,
      height: `${scale}px`,
    });
    croppedImg.style.setProperty(
      'clip',
      `rect(${top}px, ${left + scale}px, ${top + scale}px, ${left}px)`,
    );
  }

  api() {
    const cropper = this;
    return {
      toDataURL(...args) {
        const { img, scale, left, top, width } = cropper;
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const factor = img.naturalWidth / width;
        const s = factor * scale;
        canvas.width = s;
        canvas.height = s;
        ctx.drawImage(img, left * factor, top * factor, s, s, 0, 0, s, s);
        return canvas.toDataURL(...args);
      },
    };
  }
}

export default (...args) => new Cropper(...args).api();
