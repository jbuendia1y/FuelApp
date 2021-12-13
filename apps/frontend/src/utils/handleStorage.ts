export function getDataFromStorage(key: string) {
  return localStorage.getItem(key);
}

export default function setOrDeleteFromStorage(key: string, value?: string) {
  if (key.length === 0)
    throw new Error("The function setOrDeleteFromStorage need a key");

  if (!!value === false) localStorage.removeItem(key);
  else localStorage.setItem(key, value as string);
}
