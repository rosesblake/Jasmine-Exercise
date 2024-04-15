describe("Payments test (with setup and tear-down)", function () {
  beforeEach(function () {
    // Set default values for bill and tip amount inputs
    billAmtInput.value = 100;
    tipAmtInput.value = 20;
  });

  it("should add a new payment to allPayments on submitPaymentInfo()", function () {
    // Simulate submitting payment information
    submitPaymentInfo();

    // Expectations for the newly added payment
    expect(Object.keys(allPayments).length).toEqual(1);
    expect(allPayments["payment1"].billAmt).toEqual("100");
    expect(allPayments["payment1"].tipAmt).toEqual("20");
    expect(allPayments["payment1"].tipPercent).toEqual(20);
  });

  it("should not add a new payment on submitPaymentInfo() with empty input", function () {
    // Set bill amount input to empty
    billAmtInput.value = "";
    // Simulate submitting payment information
    submitPaymentInfo();

    // Expectation: No new payment should be added
    expect(Object.keys(allPayments).length).toEqual(0);
  });

  it("should update #paymentTable on appendPaymentTable()", function () {
    // Create a current payment object
    let curPayment = createCurPayment();
    allPayments["payment1"] = curPayment;

    // Append the payment to the payment table
    appendPaymentTable(curPayment);

    // Get the list of table cells in the payment table
    let curTdList = document.querySelectorAll("#paymentTable tbody tr td");

    // Expectations for the table cells
    expect(curTdList.length).toEqual(4);
    expect(curTdList[0].innerText).toEqual("$100");
    expect(curTdList[1].innerText).toEqual("$20");
    expect(curTdList[2].innerText).toEqual("%20");
    expect(curTdList[3].innerText).toEqual("X");
  });

  it("should create a new payment on createCurPayment()", function () {
    // Expected payment object
    let expectedPayment = {
      billAmt: "100",
      tipAmt: "20",
      tipPercent: 20,
    };

    // Create a payment and compare with expected
    expect(createCurPayment()).toEqual(expectedPayment);
  });

  it("should not create payment with empty input on createCurPayment()", function () {
    // Set both bill and tip amount inputs to empty
    billAmtInput.value = "";
    tipAmtInput.value = "";
    // Create a payment
    let curPayment = createCurPayment();

    // Expectation: No payment should be created
    expect(curPayment).toEqual(undefined);
  });

  afterEach(function () {
    // Reset all values and clear tables after each test
    billAmtInput.value = "";
    tipAmtInput.value = "";
    paymentTbody.innerHTML = "";
    summaryTds.forEach((td) => (td.innerHTML = ""));
    serverTbody.innerHTML = "";
    paymentId = 0;
    allPayments = {};
  });
});
