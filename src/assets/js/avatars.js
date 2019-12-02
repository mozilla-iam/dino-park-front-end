export default function avatarUrl(profilePicturePath, size = 264, own = false) {
  const url = new URL(profilePicturePath, window.location.href);
  url.hostname = window.location.hostname;
  url.searchParams.set('size', size);
  url.searchParams.set('own', own);
  return url.toString();
}
