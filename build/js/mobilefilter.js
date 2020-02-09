"use strict";

(function() {
  var mobileFilter = document.querySelector(".mobile-filter");
  var accordionToggles = mobileFilter.querySelectorAll(
    ".js-filter-accordion-toggle"
  );

  var mobileResetButton = document.querySelector(".js-mobile-reset-button");

  var changeAccordionHeight = function(button) {
    button.addEventListener("click", function() {
      button.classList.toggle("mobile-filter__button--active");
      var panels = button.nextElementSibling;
      if (panels.style.maxHeight) {
        panels.style.maxHeight = null;
      } else {
        panels.style.maxHeight = panels.scrollHeight + "px";
      }
    });
  };

  accordionToggles.forEach(function(toggle) {
    changeAccordionHeight(toggle);
  });

  var setSelectedPointOnMobile = function(
    inputClass,
    buttonClass,
    activeButtonClass
  ) {
    var inputs = mobileFilter.querySelectorAll(inputClass);
    var activeButton = mobileFilter.querySelector(buttonClass);

    inputs.forEach(function(input) {
      input.addEventListener("change", function() {
        if (
          input.checked &&
          !activeButton.classList.contains(activeButtonClass)
        ) {
          activeButton.classList.add(activeButtonClass);
        } else if (
          !input.checked &&
          activeButton.classList.contains(activeButtonClass)
        ) {
          var checkedInputs = Array.from(inputs).filter(function(input) {
            return input.checked;
          });

          if (checkedInputs.length === 0) {
            activeButton.classList.remove(activeButtonClass);
          }
        }
      });
    });
  };

  setSelectedPointOnMobile(
    ".mobile-filter__filtering--factor .mobile-filter__input",
    ".mobile-filter__filtering--factor .js-filter-accordion-toggle",
    "mobile-filter__button--checked"
  );

  setSelectedPointOnMobile(
    ".mobile-filter__filtering--producer .mobile-filter__input",
    ".mobile-filter__filtering--producer .js-filter-accordion-toggle",
    "mobile-filter__button--checked"
  );

  setSelectedPointOnMobile(
    ".mobile-filter__filtering--processor .mobile-filter__input",
    ".mobile-filter__filtering--processor .js-filter-accordion-toggle",
    "mobile-filter__button--checked"
  );

  setSelectedPointOnMobile(
    ".mobile-filter__filtering--memory .mobile-filter__input",
    ".mobile-filter__filtering--memory .js-filter-accordion-toggle",
    "mobile-filter__button--checked"
  );

  setSelectedPointOnMobile(
    ".mobile-filter__filtering--hard-drive .mobile-filter__input",
    ".mobile-filter__filtering--hard-drive .js-filter-accordion-toggle",
    "mobile-filter__button--checked"
  );

  mobileResetButton.addEventListener("click", function() {
    var activeButtons = mobileFilter.querySelectorAll(
      ".mobile-filter__button--checked"
    );

    activeButtons.forEach(function(button) {
      if (button.classList.contains("mobile-filter__button--checked")) {
        button.classList.remove("mobile-filter__button--checked");
      }
    });

    window.desktopfilter.resetActiveConditionTitle();
  });
})();
