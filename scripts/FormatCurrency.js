class FormatCurrency {
  maskNumbers = (value = "") => {
    if (!value) return "";
    return value.replace(/[^0-9]/g, "");
  };

  currencyMask = (number = 0) => {
    let money;
    let intPart;
    let centPart;

    if (typeof number === "number") number = number.toFixed(2);

    money = String(number);

    if (money.indexOf("c") !== -1 || money.indexOf("C") !== -1) {
      money = "0";
    }

    money = money.replace(/\D/g, "");
    if (money === "") {
      money = "0";
    }
    money = parseInt(money).toString();

    if (money.length > 13) {
      money = money.substring(0, 14);
    }

    if (money.length < 3 && money === "0") {
      money = "000";
    } else {
      for (let i = money.length; i < 3; i++) {
        money = "0" + money;
      }
    }

    intPart = money
      .slice(0, money.length - 2)
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    centPart = money.slice(-2);

    money = intPart + "," + centPart;

    return money;
  };

  currency = (price = 0) =>
    Intl.NumberFormat("pt-br", {
      style: "currency",
      currency: "BRL",
    }).format(price);
}
