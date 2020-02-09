"use strict";

(function() {
  var filterDesktop = document.querySelector(".filter");
  var desktopButtons = filterDesktop.querySelectorAll(".filter__button");
  var filterItems = filterDesktop.querySelectorAll(".filter__item");

  var checkboxLists = filterDesktop.querySelectorAll(
    ".filter__checkboxes-item"
  );
  var selectedFiltersBlock = document.querySelector(".selected");
  var desktopInputs = filterDesktop.querySelectorAll("input");

  var resetActiveConditionTitle = function() {
    var conditionSlogan = filterDesktop.querySelector(".condition__slogan");

    if (conditionSlogan.classList.contains("condition__slogan--active")) {
      conditionSlogan.classList.remove("condition__slogan--active");
    }
  };

  var resetSelectedVariants = function() {
    var addedVariants = selectedFiltersBlock.querySelectorAll(".variant");
    var selectedBlocks = selectedFiltersBlock.querySelectorAll(
      ".selected__item--active"
    );

    addedVariants.forEach(function(variant) {
      var parent = variant.closest(".selected__item");
      parent.removeChild(variant);
    });

    selectedBlocks.forEach(function(item) {
      item.classList.remove("selected__item--active");
    });
  };

  var openFiltersMenu = function() {
    if (!selectedFiltersBlock.classList.contains("selected--active")) {
      selectedFiltersBlock.classList.add("selected--active");
    }
  };

  desktopInputs.forEach(function(input) {
    input.addEventListener("change", function() {
      openFiltersMenu();
    });
  });

  desktopButtons.forEach(function(button) {
    var parent = button.closest(".filter__item");
    button.addEventListener("click", function() {
      var idNumber = button.id.slice(15);
      filterItems.forEach(function(item) {
        if (item.classList.contains("filter__item--active")) {
          item.classList.remove("filter__item--active");
        }
      });
      parent.classList.add("filter__item--active");

      checkboxLists.forEach(function(list) {
        if (list.classList.contains("filter__checkboxes-item--active")) {
          list.classList.remove("filter__checkboxes-item--active");
        }

        var listId = list.id;
        if (listId === idNumber + "-wrap") {
          list.classList.add("filter__checkboxes-item--active");
        }
      });
    });
  });

  var setSelectedPointOnDesktop = function(
    inputClass,
    buttonClass,
    activeButtonClass
  ) {
    var inputs = filterDesktop.querySelectorAll(inputClass);
    var activeButton = filterDesktop.querySelector(buttonClass);

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

  setSelectedPointOnDesktop(
    ".filter__checkboxes-item--factor .filter__input",
    ".filter__button--factor",
    "filter__button--active"
  );

  setSelectedPointOnDesktop(
    ".filter__checkboxes-item--producer .filter__input",
    ".filter__button--producer",
    "filter__button--active"
  );

  setSelectedPointOnDesktop(
    ".filter__checkboxes-item--processor .filter__input",
    ".filter__button--processor",
    "filter__button--active"
  );

  setSelectedPointOnDesktop(
    ".filter__checkboxes-item--memory .filter__input",
    ".filter__button--memory",
    "filter__button--active"
  );

  setSelectedPointOnDesktop(
    ".filter__checkboxes-item--hard-drive .filter__input",
    ".filter__button--hard-drive",
    "filter__button--active"
  );

  setSelectedPointOnDesktop(
    ".condition .condition__input",
    ".condition__slogan",
    "condition__slogan--active"
  );

  var desktopResetButton = filterDesktop.querySelector(
    ".js-desktop-reset-button"
  );
  desktopResetButton.addEventListener("click", function() {
    var activeButtons = filterDesktop.querySelectorAll(".filter__button");
    activeButtons.forEach(function(button) {
      if (button.classList.contains("filter__button--active")) {
        button.classList.remove("filter__button--active");
      }
    });

    resetActiveConditionTitle();

    resetSelectedVariants();
  });

  var template = document.querySelector("#variant").content;
  var selectedFilters = document.querySelector(".selected__filters");

  var renderVariant = function(name) {
    var variantElement = template.cloneNode(true);
    variantElement.querySelector(".variant__name").textContent = name;

    return variantElement;
  };

  var condition = filterDesktop.querySelector(".condition");

  condition.addEventListener("change", function(event) {
    var target = event.target.closest(".condition__input");

    if (target) {
      var variant = renderVariant(target.value);
      var block = selectedFilters.querySelector(".selected__item--condition");
      block.classList.add("selected__item--active");
      block.appendChild(variant);
    }
  });

  var setSelectedVariant = function(filtersClass, inputClass) {
    var filtersBlock = filterDesktop.querySelector(filtersClass);

    filtersBlock.addEventListener("change", function(event) {
      var target = event.target.closest(inputClass);
      var block = selectedFilters.querySelector(
        ".selected__item--" + filtersClass.slice(26)
      );

      if (target && target.checked) {
        var variant = renderVariant(target.value);

        block.classList.add("selected__item--active");
        block.appendChild(variant);
      } else if (target && !target.checked) {
        var variants = block.querySelectorAll(".variant");

        if (variants.length === 1) {
          variants.forEach(function(variant) {
            block.removeChild(variant);
            block.classList.remove("selected__item--active");
          });
        }
      }
    });
  };

  setSelectedVariant(".filter__checkboxes-item--factor", ".filter__input");
  setSelectedVariant(".filter__checkboxes-item--processor", ".filter__input");
  setSelectedVariant(".filter__checkboxes-item--producer", ".filter__input");
  setSelectedVariant(".filter__checkboxes-item--memory", ".filter__input");
  setSelectedVariant(".filter__checkboxes-item--hard-drive", ".filter__input");

  window.desktopfilter = {
    resetActiveConditionTitle: resetActiveConditionTitle
  };
})();
