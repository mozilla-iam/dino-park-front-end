export default function avatarUrl(profilePicturePath, size = 264) {
  const url = new URL(profilePicturePath, window.location.href);
  url.hostname = window.location.hostname;
  url.searchParams.set('size', size);
  return url.toString();
}
