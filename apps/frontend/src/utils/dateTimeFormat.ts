export default function dateTimeFormat(timestamp: string) {
  const date = new Date(timestamp);
  const language = navigator.language || "es-ES";

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };

  return new Intl.DateTimeFormat(language, options).format(date);
}
