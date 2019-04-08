import Identicon from 'identicon.js';

function hex(buffer) {
  const hexCodes = [];
  const view = new DataView(buffer);
  for (let i = 0; i < view.byteLength; i += 4) {
    const value = view.getUint32(i);
    const stringValue = value.toString(16);
    const padding = '00000000';
    const paddedValue = (padding + stringValue).slice(-padding.length);
    hexCodes.push(paddedValue);
  }
  return hexCodes.join('');
}

function sha256(str) {
  const buffer = new TextEncoder('utf-8').encode(str);
  return crypto.subtle.digest('SHA-256', buffer).then(hex);
}

async function generateIdenticon(username, size) {
  let hash;
  if (window.crypto && window.crypto.subtle) {
    hash = await sha256(username);
  } else {
    hash = '04f8996da763b7a969b1028ee3007569eaf3a635486ddab211d512c85b9df8fb'; // 'user'
  }
  const identicon = new Identicon(hash, {
    size,
    format: 'svg',
  });
  return `data:image/svg+xml;base64,${identicon.toString()}`;
}

export default generateIdenticon;
