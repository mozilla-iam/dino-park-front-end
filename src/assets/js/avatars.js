export default function avatarUrl(profilePictureUrl) {
  const url = new URL(profilePictureUrl, window.location.href);
  url.hostname = window.location.hostname;
  return url.toString();
}
