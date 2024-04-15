window.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("calc-form");
  if (form) {
    setInitialValues();
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      update();
    });
  }
});

function getCurrentValues() {
  return {
    amount: +document.getElementById("loan-amount").value,
    years: +document.getElementById("loan-years").value,
    rate: +document.getElementById("loan-rate").value,
  };
}

// Get the inputs from the DOM.
// Put some default values in the inputs
// Call a function to calculate the current monthly payment
function setInitialValues() {
  const defaultValues = { amount: 10000, years: 5, rate: 6 };
  const amountInput = document.getElementById("loan-amount");
  amountInput.value = defaultValues.amount;
  const yearsInput = document.getElementById("loan-years");
  yearsInput.value = defaultValues.years;
  const rateInput = document.getElementById("loan-rate");
  rateInput.value = defaultValues.rate;
  update();
}

// Get the current values from the UI
// Update the monthly payment
function update() {
  const currentValues = getCurrentValues();
  updateMonthlyPayment(calculateMonthlyPayment(currentValues));
}

// Given an object of values (a value has amount, years and rate ),
// calculate the monthly payment.  The output should be a string
// that always has 2 decimal places.
function calculateMonthlyPayment(values) {
  if (values.rate === 0) {
    const n = Math.floor(values.years * 12);
    return (values.amount / n).toFixed(2);
  } else {
    const monthlyRate = values.rate / 100 / 12;
    const n = Math.floor(values.years * 12);
    return (
      (monthlyRate * values.amount) /
      (1 - Math.pow(1 + monthlyRate, -n))
    ).toFixed(2);
  }
}

// Given a string representing the monthly payment value,
// update the UI to show the value.
function updateMonthlyPayment(monthly) {
  const monthlyPayment = document.getElementById("monthly-payment");
  monthlyPayment.innerText = "$" + monthly;
}
