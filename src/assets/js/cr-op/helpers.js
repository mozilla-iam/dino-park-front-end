export function clamp(min, n, max) {
  return Math.min(Math.max(n, min), max);
}

export function copyNodeStyle(sourceNode, targetNode) {
  const computedStyle = window.getComputedStyle(sourceNode);
  Array.from(computedStyle).forEach(key =>
    targetNode.style.setProperty(
      key,
      computedStyle.getPropertyValue(key),
      computedStyle.getPropertyPriority(key),
    ));
}

export function setStyles(element, styles) {
  Object.keys(styles).forEach(key =>
    element.style.setProperty(key, styles[key]));
}
