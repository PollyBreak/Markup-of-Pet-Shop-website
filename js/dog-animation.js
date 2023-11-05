document.addEventListener('DOMContentLoaded', () => {
  const animatedDog = document.getElementById("animatedDog");
  const container = document.getElementById("otherPets");
  let position = -100;

  function animateElement() {
    position += 1; //speed
    animatedDog.style.transform = `translateX(${position}%)`;
    if (position > container.clientWidth-100) {
      position = -10;
    }
    requestAnimationFrame(animateElement); //performs animations considering cpu resources
  }
  animateElement();
});
