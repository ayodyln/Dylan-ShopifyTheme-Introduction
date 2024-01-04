//! Product Page Globals
const sizeInputLabels = document.querySelectorAll('label[data-input="size"]');
const sizeInputs = document.querySelectorAll('label[data-input="size"] > input');

// Function to handled input events and class updates
function handleInputEvents(e) {
  console.log(e);
}

// Exectute Mounted Functions
window.onload = () => {
  sizeInputs.forEach((input) => input.addEventListener('click', handleInputEvents));
};
