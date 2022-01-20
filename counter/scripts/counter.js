const formData = JSON.parse(window.sessionStorage.getItem("formData"));
const formDate = new Date(...formData);
const spansDate = document.querySelectorAll(
  "main div#time div span:first-child"
);
const titleElem = document.querySelector("title");

(function updateTime() {
  const currentDate = new Date();

  const ms = formDate - currentDate;
  const seconds = Math.floor(ms / 1000) % 60;
  const minutes = Math.floor(ms / (1000 * 60)) % 60;
  const hours = Math.floor(minutes / (1000 * 60 * 60)) % 24;
  const days = Math.floor(hours / (1000 * 60 * 60 * 24));

  let diff = [days, hours, minutes, seconds];

  if (
    seconds + minutes + hours + days >= 0 &&
    diff.every((value) => value === Math.abs(value))
  ) {
    diff = diff.map(elem => String(elem).padStart(2, "0"));
    spansDate.forEach((spanDate, index) => {
      spanDate.textContent = diff[index];
    });
    titleElem.innerHTML = `Counter ${diff[0]}:${diff[1]}:${diff[2]}:${diff[3]}`;
    setTimeout(updateTime, 100);
  } else {
    const soundEffect = new Audio("./assets/bell-alert.mp3");
    soundEffect.play();
  }
})();
