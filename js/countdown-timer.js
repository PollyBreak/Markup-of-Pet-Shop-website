
document.addEventListener('DOMContentLoaded', function() {
  const hoursInput = document.getElementById('hours-input');
  const minutesInput = document.getElementById('minutes-input');
  const secondsInput = document.getElementById('seconds-input');
  const startTimerButton = document.getElementById('start-timer');

  const congrs = document.querySelector('.success');
  const congrs2 = document.querySelector('#success2');

  let countdownInterval;


  startTimerButton.addEventListener('click', () => {
    // startTimerButton.innerText='hi';
    congrs.classList.add('hidden');
    congrs2.classList.add('hidden');

    const userhours = parseInt(hoursInput.value) || 0;
    const userminutes = parseInt(minutesInput.value) || 0;
    const userseconds = parseInt(secondsInput.value) || 0;


    const endDate = new Date();
    endDate.setHours(endDate.getHours() + userhours);
    endDate.setMinutes(endDate.getMinutes() + userminutes);
    endDate.setSeconds(endDate.getSeconds() + userseconds);

    clearInterval(countdownInterval);

    startCountdownTimer(endDate);

    function startCountdownTimer(endDate) {
      countdownInterval = setInterval(() => {
        const currentDate = new Date();
        const timeBetweenDates = Math.ceil((endDate - currentDate) / 1000);

        if (timeBetweenDates <= 0) {
          clearInterval(countdownInterval);
          congrs.classList.remove('hidden');
          congrs2.classList.remove('hidden');
        }

        flipAllCards(timeBetweenDates);
      }, 250);  // timeout is the execution interval in ms
    }
    function flipAllCards(time) {
      const seconds = time % 60
      const minutes = Math.floor(time / 60) % 60
      const hours = Math.floor(time / 3600)

      flip(document.querySelector("[data-hours-tens]"), Math.floor(hours / 10))
      flip(document.querySelector("[data-hours-ones]"), hours % 10)
      flip(document.querySelector("[data-minutes-tens]"), Math.floor(minutes / 10))
      flip(document.querySelector("[data-minutes-ones]"), minutes % 10)
      flip(document.querySelector("[data-seconds-tens]"), Math.floor(seconds / 10))
      flip(document.querySelector("[data-seconds-ones]"), seconds % 10)
    }

    function flip(flipCard, newNumber) {
      const topHalf = flipCard.querySelector(".top")
      const startNumber = parseInt(topHalf.textContent)
      if (newNumber === startNumber) return

      const bottomHalf = flipCard.querySelector(".bottom")
      const topFlip = document.createElement("div")
      topFlip.classList.add("top-flip")
      const bottomFlip = document.createElement("div")
      bottomFlip.classList.add("bottom-flip")

      top.textContent = startNumber
      bottomHalf.textContent = startNumber
      topFlip.textContent = startNumber
      bottomFlip.textContent = newNumber

      topFlip.addEventListener("animationstart", e => {
        topHalf.textContent = newNumber
      })
      topFlip.addEventListener("animationend", e => {
        topFlip.remove()
      })
      bottomFlip.addEventListener("animationend", e => {
        bottomHalf.textContent = newNumber
        bottomFlip.remove()
      })
      flipCard.append(topFlip, bottomFlip)
    }

  });

})


