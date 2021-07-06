const dateInput = document.querySelector("input#date");
const timeInput = document.querySelector("input#time");
const form = document.querySelector("form#form");

["click", "change"].forEach(evt => {
  dateInput.addEventListener(evt, () => {
    const date = getDate("ymd", "-");
    dateInput.setAttribute("min", date);
    timeInput.click();
  });

  timeInput.addEventListener(evt, () => {
    const now = new Date();
    const date = getDate("ymd", "-");
    console.log(dateInput.value, date);
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
  });
})

form.addEventListener("submit", (evt) => {
  evt.preventDefault();
  let formData = dateInput.value.split("-").concat(timeInput.value.split(":"));
  formData[1] -= 1;
  window.sessionStorage.setItem("formData", JSON.stringify(formData));
  window.location.replace("./counter.html");
});

function getDate(seq, sep) {
  const now = new Date();
  const dd = String(now.getDate()).padStart(2, "0");
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

function includesEachChar(string, chars) {
  for (char of chars) {
    if (!string.includes(char)) {
      return false;
    }
  }
  return true;
}
