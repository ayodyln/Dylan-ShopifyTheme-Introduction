// Product Page
// https://www.youtube.com/watch?v=daqGfjCo8Y4
const { productData } = window || {};
const variants = productData.variants;
console.log(productData);

// ~ Product Form Swatch-Listner
document.querySelectorAll(`section#swatches__wrapper input[type="radio"]`).forEach((input) =>
  input.addEventListener('change', () => {
    //? Selected Options Map - Update with all checked elements; Upon change.
    const selectedOptions = new Map();

    //! Get all checked inputs
    document
      .querySelectorAll(`section#swatches__wrapper input[type="radio"]:checked`)
      .forEach((input) => selectedOptions.set(input.name, input.value));

    //! Find the matched variant
    const matchedVariant = variants.find((variant) =>
      [...selectedOptions].every(([_, v]) => variant.title.includes(v))
    );

    document.querySelector(`form#product_form > input[type="hidden"][name="id"]`).value = matchedVariant.id;
  })
);

//? Product Form Size Inputs
// In Stock: "cursor-pointer",
// Out of Stock: "opacity-25 cursor-not-allowed"
// Not Checked: "border-gray-200 bg-white text-gray-900 hover:bg-gray-50"
/**
 * Product Page Styles
 *
 * @typedef {Object} productPageStyles
 * @property {Object} size - Size input element styles.
 * @property {string[]} size.state - Size input element state classes.
 * @property {Object} colorInputs - Color input element styles.
 * @property {Object} colorInputs.c - Color input element color values.
 * @property {Object} colorInputs.state - Color input element state classes.
 * @property {string[]} colorInputs.state.active - Active color input element state classes.
 * @property {string[]} colorInputs.state.inactive - Inactive color input element state classes.
 */
const productPageStyles = {
  size: {
    state: [
      'border-transparent',
      'bg-indigo-600',
      'text-white',
      'hover:bg-indigo-700',
      'ring-2',
      'ring-offset-2',
      'ring-indigo-500',
    ],
  },
  //! TailwindCSS and Liquid Templating doesn't work too well together. Either code in CSS or in JS
  colorInputs: {
    c: {
      Black: '#000',
      Blue: '#0000FF',
    },
    state: {
      active: ['ring', 'ring-offset-1'],
      inactive: ['ring-2'],
    },
  },
};

/**
 * Handles the click event for size input elements.
 *
 * @param {Event} e - The click event.
 */
function sizeClickHndlr(e) {
  e.stopPropagation();
  const active = e.target; //! The input element that was clicked
  document.querySelectorAll(`label[data-variant="size"]`).forEach((label) => {
    label.classList.remove(...productPageStyles.size.state);
    if (active.checked && label.dataset.value === active.value) label.classList.add(...productPageStyles.size.state);
  });
}

document
  .querySelectorAll('label[data-variant="size"] > input')
  .forEach((size) => size.addEventListener('click', sizeClickHndlr));
//! End of Product Form Size Inputs

//! Product Form Color Inputs
const colorVariantSpans = document.querySelectorAll('label[data-variant="color"] > span[data-value]');

colorVariantSpans.forEach((span) => {
  //? Append Color Styles - TailwindCSS only creates classes during Dev/Build - Not during runtime
  span.style.backgroundColor = productPageStyles.colorInputs.c[span.dataset.value];
});

/**
 * Handles the click event for color input elements.
 *
 * @param {Event} e - The click event.
 */
function colorSizeHndlr(e) {
  e.stopPropagation();
  const clickedInput = e.target; //! The input element that was clicked
  colorVariantSpans.forEach((span) => {
    const { active, inactive } = productPageStyles.colorInputs.state;
    const labelWrapper = document.querySelector(`label[data-variant="color"][data-value="${span.dataset.value}"]`);
    labelWrapper.classList.replace(...active, ...inactive);
    if (clickedInput.checked && span.dataset.value === clickedInput.value) labelWrapper.classList.add(...active);
  });
}

document
  .querySelectorAll('label[data-variant="color"] > input')
  .forEach((color) => color.addEventListener('click', colorSizeHndlr));
//! End of Product Form Color Inputs
