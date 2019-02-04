import { setStyles } from './helpers';

function addDragListener(container, dragItem, fn, key = '') {
  let active = false;
  let lastX = null;
  let lastY = null;

  function dragStart(event) {
    if (event.target === dragItem || dragItem.contains(event.target)) {
      event.stopImmediatePropagation();
      active = true;
    }
  }

  function dragEnd() {
    lastX = null;
    lastY = null;
    active = false;
  }

  function drag(event) {
    if (!active) {
      return;
    }

    event.preventDefault();
    let currentX;
    let currentY;
    if (event.type === 'touchmove') {
      currentX = event.touches[0].clientX;
      currentY = event.touches[0].clientY;
    } else {
      currentX = event.clientX;
      currentY = event.clientY;
    }

    if (lastX != null && lastY != null) {
      fn(currentX - lastX, currentY - lastY, key);
    }

    lastX = currentX;
    lastY = currentY;
  }

  container.addEventListener('touchstart', dragStart);
  container.addEventListener('touchend', dragEnd);
  container.addEventListener('touchmove', drag);

  container.addEventListener('mousedown', dragStart);
  container.addEventListener('mouseup', dragEnd);
  container.addEventListener('mousemove', drag);
}

const CROPPER_STYLE = {
  position: 'absolute',
  display: 'flex',
  'flex-wrap': 'wrap',
};
const ONE_THIRD = `${100 / 3}%`;

const CROPPER_BOX_STYLE = {
  display: 'flex',
  width: ONE_THIRD,
  height: ONE_THIRD,
  border: '1px solid rgba(255, 255, 255, .3)',
  'box-sizing': 'border-box',
  overflow: 'hidden',
  cursor: 'move',
};

const BORDER = '2px solid white';

const HANDLE_DIRECTIONS = {
  1: 'nw',
  2: 'n',
  3: 'ne',
  4: 'w',
  6: 'e',
  7: 'sw',
  8: 's',
  9: 'se',
};

const HANDLE_STYLES = [
  i => i <= 3 && { 'border-top': BORDER },
  i => i >= 7 && { 'border-bottom': BORDER, 'align-self': 'flex-end' },
  i => i % 3 === 1 && { 'border-left': BORDER },
  i => i % 3 === 0 && { 'border-right': BORDER, 'margin-left': 'auto' },
  i => (i === 2 || i === 8) && { margin: '0 auto', cursor: 'ns-resize' },
  i => (i === 4 || i === 6) && { 'align-self': 'center', cursor: 'ew-resize' },
  i => (i === 1 || i === 9) && { cursor: 'nwse-resize' },
  i => (i === 3 || i === 7) && { cursor: 'nesw-resize' },
];

export default function createCropperContainer(
  container,
  { onMove, onResize },
) {
  const cropperContainer = document.createElement('div');
  setStyles(cropperContainer, CROPPER_STYLE);

  for (let i = 1; i <= 9; i += 1) {
    const box = document.createElement('div');
    cropperContainer.appendChild(box);
    setStyles(box, CROPPER_BOX_STYLE);
    if (i > 3) {
      setStyles(box, { 'border-top': 0 });
    }
    if (i % 3 !== 0) {
      setStyles(box, { 'border-right': 0 });
    }

    if (i !== 5) {
      const handle = document.createElement('div');
      addDragListener(container, handle, onResize, HANDLE_DIRECTIONS[i]);
      setStyles(
        handle,
        HANDLE_STYLES.reduce((obj, styleFn) => Object.assign(obj, styleFn(i)), {
          width: '40%',
          height: '40%',
        }),
      );
      box.appendChild(handle);
    }
  }

  addDragListener(container, cropperContainer, onMove);

  return cropperContainer;
}
