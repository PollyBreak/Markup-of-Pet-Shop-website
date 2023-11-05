document.addEventListener('DOMContentLoaded', () => {
  const catsheading = document.getElementById("cats");
  const catSound = document.getElementById('catSound');
  catsheading.addEventListener("mouseover", () => {
    catSound.play();
  });

  const dogsheading = document.getElementById("dogs");
  const dogSound = document.getElementById('dogSound');
  dogsheading.addEventListener("mouseover", () => {
    dogSound.play();
  });

});
