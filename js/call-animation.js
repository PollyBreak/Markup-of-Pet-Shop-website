document.addEventListener('DOMContentLoaded', () => {

  const callDog = document.getElementById("callDogSign");

  callDog.addEventListener('transitionend', function() {
    this.style.transform = 'rotate(360deg)';
  });

});
