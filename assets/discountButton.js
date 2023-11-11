document
  .getElementById("DiscountButton")
  .addEventListener("click", function () {
    const discountCode =
      "Your personal discount code: " + generateRandomString(10);
    console.log(discountCode);
    if (Shopify.Checkout.Customer) {
      const customerEmail = Shopify.Checkout.Customer.email;
      sendDiscountCodeByEmail(customerEmail, discountCode);
    } else {
      console.log("The user is not logged in.");
    }
  });

function generateRandomString(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  return result;
}
function sendDiscountCodeByEmail(customerEmail, discountCode) {
  const data = {
    email: customerEmail,
    discountCode: discountCode,
  };

  fetch("/send-discount-email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.status === 200) {
        console.log("Discount code sent successfully");
      } else {
        console.error("Failed to send discount code");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
