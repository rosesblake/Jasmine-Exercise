it("should calculate the monthly rate correctly", function () {
  const values = {
    amount: 10000,
    years: 5,
    rate: 6,
  };
  expect(calculateMonthlyPayment(values)).toEqual("193.33");
});

it("should return a result with 2 decimal places", function () {
  const values = {
    amount: 15621,
    years: 4,
    rate: 6.7,
  };
  expect(calculateMonthlyPayment(values)).toEqual("371.89");
});

/// etc

it("should handle interest rate of 0", function () {
  const values = {
    amount: 12000,
    years: 10,
    rate: 0,
  };
  expect(calculateMonthlyPayment(values)).toEqual("100.00");
});
