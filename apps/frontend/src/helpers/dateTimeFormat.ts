import { Timestamp } from "@firebase/firestore";

export default function dateTimeFormat(timestamp: Timestamp) {
  const date = timestamp.toDate();
  const language = navigator.language || "es-ES";

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };

  return new Intl.DateTimeFormat(language, options).format(date);
}
