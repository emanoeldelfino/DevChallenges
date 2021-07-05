const [formYear, formMonth, formDay] = window.sessionStorage.getItem("date").split("-");
const [formHours, formMinutes, formSeconds] = window.sessionStorage.getItem("time").split(":");

const now = new Date();
const currentYear = now.getFullYear();
const currentMonth = now.getMonth();
const currentDay = now.getDay();
const currentHours = now.getHours();
const currentMinutes = now.getMinutes();
const currentSeconds = now.getSeconds();

for (let formValue of [formYear, formMonth, formDay, formHours, formMinutes, formSeconds]) {
  console.log(formValue);
}

for(let currentValue of [currentYear, currentMonth, currentDay, currentHours, currentMinutes, currentSeconds]) {
  console.log(currentValue);
}
