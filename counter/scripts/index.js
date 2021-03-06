const dateInput = document.querySelector("input#date");
const timeInput = document.querySelector("input#time");
const form = document.querySelector("form#form");

const time = getTime();
timeInput.setAttribute("value", time);
const sumDay = parseInt(time.slice(0, 2)) > 0 ? 0 : 1;
const date = getDate("ymd", "-", sumDay);
dateInput.setAttribute("value", date);

dateInput.addEventListener("click", () => {
  const date = getDate("ymd", "-");
  dateInput.setAttribute("min", date);
  setTime();
});

["click", "change"].forEach((evt) => {
  timeInput.addEventListener(evt, setTime);
});

function setTime() {
  const now = new Date();
  const date = getDate("ymd", "-");

  if (dateInput.value === date) {
    const hourMinutes = now.toLocaleTimeString(navigator.language, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    const seconds = now.getSeconds();
    const time = `${hourMinutes}:${seconds}`;

    timeInput.removeAttribute("min");
    timeInput.setAttribute("min", time);
  } else {
    timeInput.removeAttribute("min");
  }
}

form.addEventListener("submit", (evt) => {
  evt.preventDefault();
  let formData = dateInput.value.split("-").concat(timeInput.value.split(":"));
  formData[1] -= 1;
  window.sessionStorage.setItem("formData", JSON.stringify(formData));
  window.location.replace("./counter.html");
});

function getDate(seq, sep, sumDay = 0) {
  const now = new Date();
  const dd = String(now.getDate() + sumDay).padStart(2, "0");
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const yyyy = now.getFullYear();

  let date = "";
  if (seq.length === 3 && includesEachChar(seq, "dmy")) {
    for (char of seq) {
      switch (char) {
        case "d":
          date += dd + " ";
          break;
        case "m":
          date += mm + " ";
          break;
        case "y":
          date += yyyy + " ";
          break;
      }
    }
  }

  date = date.trim().replaceAll(" ", sep);

  return date;
}

function getTime() {
  const now = new Date();
  const hour = now.getHours();
  let timeArr = [hour < 23 ? hour + 1 : 0, now.getMinutes(), now.getSeconds()];
  timeArr = timeArr.map((value) => String(value).padStart(2, "0"));

  const time = timeArr.join(":");
  return time;
}

function includesEachChar(string, chars) {
  for (char of chars) {
    if (!string.includes(char)) {
      return false;
    }
  }
  return true;
}
