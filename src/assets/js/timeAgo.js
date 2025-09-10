export function TimeAgo(date) {
  const now = new Date();
  const commentedAt = new Date(date);
  const diff = Math.floor((now - commentedAt) / 1000); // seconds

  if (diff < 60) return `${diff} sec ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hr ago`;
  if (diff < 2592000)
    return `${Math.floor(diff / 86400)} day${
      Math.floor(diff / 86400) > 1 ? "s" : ""
    } ago`;
  if (diff < 31536000)
    return `${Math.floor(diff / 2592000)} month${
      Math.floor(diff / 2592000) > 1 ? "s" : ""
    } ago`;

  return `${Math.floor(diff / 31536000)} year${
    Math.floor(diff / 31536000) > 1 ? "s" : ""
  } ago`;
}
