const numberToWords = (number: number) => {
  const single = Object.fromEntries([
    ['1', 'одна'],
    ['2', 'дві'],
    ['3', 'три'],
    ['4', 'чотири'],
    ['5', 'п’ять'],
    ['6', 'шість'],
    ['7', 'сім'],
    ['8', 'вісім'],
    ['9', 'дев’ять'],
  ]);
  const teens = Object.fromEntries([
    ['10', 'десять'],
    ['11', 'одинадцять'],
    ['12', 'дванадцять'],
    ['13', 'тринадцять'],
    ['14', 'чотирнадцять'],
    ['15', 'п’ятднадцять'],
    ['16', 'шістнадцять'],
    ['17', 'сімнадцять'],
    ['18', 'вісімнадцять'],
    ['19', 'дев’ятнадцять'],
  ]);
  const tens = Object.fromEntries([
    ['2', 'двадцять'],
    ['3', 'тридцять'],
    ['4', 'сорок'],
    ['5', 'п’ятдесят'],
    ['6', 'шістдесят'],
    ['7', 'сімдесят'],
    ['8', 'вісімдесят'],
    ['9', 'дев’яносто'],
  ]);
  const hundreds = Object.fromEntries([
    ['1', 'сто'],
    ['2', 'двісті'],
    ['3', 'триста'],
    ['4', 'чотириста'],
    ['5', 'п’ятсот'],
    ['6', 'шістсот'],
    ['7', 'сімсот'],
    ['8', 'вісімсот'],
    ['9', 'дев’ятсот'],
  ]);
  const thousends = Object.fromEntries([
    ['1', 'тисяча'],
    ['2', 'тисячі'],
    ['3', 'тисячі'],
    ['4', 'тисячі'],
    ['5', 'тисяч'],
    ['6', 'тисяч'],
    ['7', 'тисяч'],
    ['8', 'тисяч'],
    ['9', 'тисяч'],
  ]);

  function convertGroup(string: string): string | undefined {
    if (string.length == 1) {
      return single[string];
    }
    if (string.length == 2) {
      if (Number(string) < 20) {
        return teens[string];
      } else {
        return tens[string[0]] + ' ' + single[string[1]];
      }
    }
    if (string.length == 3) {
      return hundreds[string[0]] + ' ' + convertGroup(string.slice(1));
    }
    if (string.length == 4) {
      return single[string[0]] + ' ' + thousends[string[0]] + ' ' + convertGroup(Number(string.slice(1)).toString());
    }
    if (string.length == 5) {
      return convertGroup(string.slice(0, 2)) + ' ' + 'тисяч' + ' ' + convertGroup(Number(string.slice(2)).toString());
    }
    if (string.length == 6) {
      return convertGroup(string.slice(0, 3)) + ' ' + 'тисяч' + ' ' + convertGroup(Number(string.slice(3)).toString());
    }
  }

  function findCurrency(number: number) {
    const string = number.toString();
    let endIndex = 0;
    for (let i = 0; i < string.length; i++) {
      const reverceString = string.split('').reverse();
      if (reverceString[i] != '0') {
        endIndex = i + 1;
        break;
      }
    }
    const endValue = Number(string.slice(-endIndex));
    if (endValue == 1) {
      return 'гривня';
    }
    if (endValue > 1 && endValue < 5) {
      return 'гривні';
    }
    return 'гривень';
  }

  const currency = findCurrency(number);
  let finalString = '';

  if (String(number).includes('.')) {
    const [money, cents] = String(number).split('.');
    finalString = convertGroup(money) + ' ' + currency + ' ' + convertGroup(cents) + ' копійок.';
  } else {
    finalString = convertGroup(String(number)) + ' ' + currency + ' ' + 'нуль' + ' копійок.';
  }
  finalString = finalString.split('undefined ').join('');
  return finalString;
};

export default numberToWords;
