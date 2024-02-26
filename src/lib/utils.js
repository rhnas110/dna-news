import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { v4 as uuidv4 } from "uuid";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const generateDummyData = (val) => {
  const data = [];
  for (let i = 0; i < val; i++) {
    const id = uuidv4();
    data.push({ id });
  }
  return data;
};

export const minimizeString = (str, num) => {
  if (str?.length > num) return str.slice(0, num) + "...";
  return str;
};

export function beautifyDate(inputDate) {
  var date = new Date(inputDate);

  // months in Bahasa
  var monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Agu",
    "Sep",
    "Okt",
    "Nov",
    "Des",
  ];

  // get day, month, dan year
  var day = date.getUTCDate();
  var month = monthNames[date.getUTCMonth()];
  var hour = ("0" + date.getUTCHours()).slice(-2);
  var minute = ("0" + date.getUTCMinutes()).slice(-2);

  // days in Bahasa
  var dayNames = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
  var dayName = dayNames[date.getUTCDay()];

  var formattedDate =
    dayName + ", " + day + " " + month + " " + hour + "." + minute;

  return formattedDate;
}

export function scrollTo(x = 0, y = 69) {
  // x for scrollX (horizontal)
  // y for scrollY (vertical), default value 69 for testing
  return window.scroll(x, y);
}

export function popularSearch() {
  // DUMMY DATA POPULAR QUERY
  const query = [
    "tesla",
    "indonesia",
    "sport",
    "bali",
    "jakarta",
    "pemilu",
    "xiaomi",
    "elon musk",
    "bitcoin",
  ];

  return query[randomIntFromInterval(0, query.length - 1)];
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
