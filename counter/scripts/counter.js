const formData = JSON.parse(window.sessionStorage.getItem("formData"));
const formDate = new Date(...formData);
const spansDate = document.querySelectorAll(
  "main div#time div span:first-child"
);

(function updateTime() {
  let currentDate = new Date();

  let seconds = Math.floor((formDate - currentDate) / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);
  let days = Math.floor(hours / 24);

  hours = hours - days * 24;
  minutes = minutes - days * 24 * 60 - hours * 60;
  seconds = seconds - days * 24 * 60 * 60 - hours * 60 * 60 - minutes * 60;
  let diff = [days, hours, minutes, seconds];

  if (
    seconds + minutes + hours + days >= 0 &&
    diff.every((value) => value === Math.abs(value))
  ) {
    spansDate.forEach((spanDate, index) => {
      console.log(diff[index]);
      spanDate.textContent = diff[index];
    });
    setTimeout(updateTime, 1000);
  } else {
    const soundEffect = new Audio("./assets/bell-alert.mp3");
    soundEffect.play();
  }
})();
