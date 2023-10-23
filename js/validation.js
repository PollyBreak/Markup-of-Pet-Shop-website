document.addEventListener('DOMContentLoaded', function() {
  const contactForms = document.querySelector('#contactsForm');

  const formArr = Array.from(contactForms); // array of inputs
  const validFormArr = []; //array of inputs' "is-valid" attributes

  formArr.forEach((el) => { //initialization of the array
    el.setAttribute("is-valid", "0");
    validFormArr.push(el);
  });
  validFormArr.at(validFormArr.length-1).setAttribute("is-valid", "1")
  //validFormArr.push()

  contactForms.addEventListener("input", inputHandler);
  function inputHandler({ target }) {  //target is a corresponding input line (where a user writes)
  if (target.hasAttribute("data-reg")) {
    inputCheck(target);
    }
  }

  function inputCheck(el) {
    const inputValue = el.value;
    const inputReg = el.getAttribute("data-reg");
    const reg = new RegExp(inputReg);
    let error;
    if (el.id==="client-name") {
      error = document.querySelector("#nameError");
    }
    if (el.id==="client-number") {
      error = document.querySelector("#numberError");
    }
    if (el.id==="client-email") {
      error = document.querySelector("#emailError");
    }

    if (reg.test(inputValue)) {
      el.setAttribute("is-valid", "1");
      el.style.border = "3px solid rgb(0, 196, 0)";
      error.style.color = "green";
    } else {
      el.setAttribute("is-valid", "0");
      el.style.border = "3px solid red";
      error.style.color = "red";
    }
  }

  contactForms.addEventListener('submit', submitButtonHandler);
  function submitButtonHandler(e) {
    e.preventDefault();
    // const isAllValid = [];
    let allValid = true;
    validFormArr.forEach((el) => {
      let isValid = el.getAttribute("is-valid");
      console.log(isValid);
      // isAllValid.push(isValid);
      if (allValid) {
        if (isValid==0) {
          allValid=false;
        }
      }
    });
    if (allValid) {
      contactForms.classList.add('hidden');
      const congrs = document.querySelector('#thanks');
      congrs.classList.remove('hidden');
    }
  }

});

