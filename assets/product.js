// Product Page Javascript
// https://www.youtube.com/watch?v=daqGfjCo8Y4
//! Product Form Size Inputs
// In Stock: "cursor-pointer",
// Out of Stock: "opacity-25 cursor-not-allowed"
// Active: "ring-2 ring-indigo-500 ring-offset-2"
// Checked: "border-transparent bg-indigo-600 text-white hover:bg-indigo-700",
// Not Checked: "border-gray-200 bg-white text-gray-900 hover:bg-gray-50"
const sizeVariants = document.querySelectorAll('label[data-variant="size"] > input');

sizeVariants.forEach((size) => {
  console.log(size.checked);
  size.addEventListener('click', (e) => {
    e.stopPropagation();
    console.log(size.checked);
    const label = document.querySelectorAll(`label[data-variant="size"]`);
    label.forEach((el) => toggleUI({ label: el, active: e.target }));
  });
});

function toggleUI({ label, active }) {
  label.classList.remove('border-transparent', 'bg-indigo-600', 'text-white', 'hover:bg-indigo-700');
  if (active.checked && label.dataset.value === active.value) {
    label.classList.add('border-transparent', 'bg-indigo-600', 'text-white', 'hover:bg-indigo-700');
  }
}
//! End of Product Form Size Inputs

//! Product Form Color Inputs
// Active and Checked: "ring ring-offset-1"
// Not Active and Checked: "ring-2"
const colorVariants = document.querySelectorAll('label[data-variant="color"] > input');

colorVariants.forEach((color) => {
  color.addEventListener('click', (e) => {
    e.stopPropagation();
    const label = document.querySelectorAll(`label[data-variant="color"]`);
    label.forEach((el) => toggleColorUI({ label: el, active: e.target }));
  });
});

function toggleColorUI({ label, active }) {
  label.classList.remove('ring', 'ring-offset-1');
  if (active.checked && label.dataset.value === active.value) {
    label.classList.add('ring', 'ring-offset-1');
  }
}
//! End of Product Form Color Inputs
