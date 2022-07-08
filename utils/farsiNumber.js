export const toFarsiNumber = (n) => {
  const farsiDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

  let newNumber = n.toString();
  if (newNumber.length > 3) {
    return newNumber
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      .split("")
      .map((x) => (x == "," ? "," : farsiDigits[x]))
      .join("");
  } else {
    return newNumber
      .split("")
      .map((x) => farsiDigits[x])
      .join("");
  }
};
