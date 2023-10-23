document.addEventListener('DOMContentLoaded', function() {
  let acc = document.getElementsByClassName("myAccordion");
  let i;

  for (i = 0; i < acc.length; i++) { //add for all buttons accordions
    acc[i].addEventListener("click", function() {
      this.classList.toggle("active");
      let panel = this.nextElementSibling; //returns the HTML content of the next sibling:
      if (panel.style.maxHeight) { //if accordion opens, it will be closed (its height will be decreased to null)
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px"; //scrollHeight is equal to the content size
      }
    });
  }
});


