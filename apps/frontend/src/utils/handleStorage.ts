export function getDataFromStorage(key: string) {
  return localStorage.getItem(key);
}

export default function setOrDeleteFromStorage(key: string, value?: string) {
  if (key.length === 0) return;

  if (!value) localStorage.removeItem(key);
  else localStorage.setItem(key, value);
}
