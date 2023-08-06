export const numberFormat = function (
  number,
  is_price,
  decimals,
  dec_point,
  thousands_point
) {
  if (number == null || typeof number == "undefined") {
    return 0;
  }
  if (is_price) {
    number = Math.ceil(number / 100) * 100;
  }

  number = number * 1;
  if (number == null || !isFinite(number)) {
    return -1;
  }
  if (!decimals) {
    var len = number.toString().split(".").length;
    decimals = len > 1 ? len : 0;
  }
  if (!dec_point) {
    dec_point = ".";
  }
  if (!thousands_point) {
    thousands_point = ",";
  }
  number = parseFloat(number).toFixed(decimals);
  number = number.replace(".", dec_point);
  var splitNum = number.split(dec_point);
  splitNum[0] = splitNum[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousands_point);
  number = splitNum.join(dec_point);

  return number;
};
