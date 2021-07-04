const dateInput = document.querySelector("input#date");
const timeInput = document.querySelector("input#time");
const currentDate = getDate("ymd", '-');
window.onload = () => {
  dateInput.setAttribute("min", currentDate);
}

function getDate(seq, sep) {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();

  let date = "";
  if (seq.length === 3 && includesEachChar(seq, "dmy")) {
    for (char of seq) {
      switch (char) {
        case 'd':
          date += dd + " ";
          break;
        case 'm':
          date += mm + " ";
          break;
        case 'y':
          date += yyyy + " ";
          break;
      }
    }
  }

  date = date.trim().replaceAll(" ", sep);

  return date;
}

function includesEachChar(string, chars) {
  for (char of chars) {
    if (!string.includes(char)) {
      return false;
    }
  }
  return true;
}
