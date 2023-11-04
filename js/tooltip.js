window.addEventListener('load', () => {

  var tooltip = document.createElement("div");
  tooltip.classList.add("myTooltip");
  tooltip.classList.add("invisible");
  document.querySelector("body").appendChild(tooltip);

  function ShowTooltip(e) {
    var elm = e.target;
    tooltip.textContent = elm.dataset.descr;
    tooltip.style.left = elm.getBoundingClientRect().left + window.pageXOffset + 'px';
    tooltip.style.top = (elm.getBoundingClientRect().top + window.pageYOffset + elm.offsetHeight + 5) + 'px';
    tooltip.classList.remove("invisible");
  }

  function HideTooltip(e) {
    tooltip.classList.add("invisible");
  }

  var els = document.querySelectorAll("*[data-descr]");
  for (var i = 0; i < els.length; ++i) {
    var el = els[i];
    el.addEventListener("mouseover", ShowTooltip);
    el.addEventListener("mouseleave", HideTooltip);
  }
});
