import BigNumber from 'bignumber.js'

BigNumber.config({ EXPONENTIAL_AT: [-324, 308] });

export const addCommaWithRemoveDot = (str: number | string | BigNumber | undefined = '', digit: number | string) => {
  let removedDuplicatedDotString = `${str}`.replace(/\.+/g, '.');
  if (digit !== undefined) {
    const pointIdx = `${str}`.indexOf('.');
    if (pointIdx !== -1) {
      removedDuplicatedDotString = removedDuplicatedDotString.substr(0, pointIdx + Number(digit) + 1);
    }
  }
  const parts = removedDuplicatedDotString.split('.');
  if (parts[0]) {
    const finalNum = `${parts[0]}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + (parts.length > 1 ? `.${parts[1]}` : '');
    if (`${parts[1]}`.length === 0) {
      return finalNum.split('.')[0];
    }
    return finalNum;
  }
  return '';
};

export const addComma = (
  number: BigNumber | string | number,
  digit: string | number | undefined = undefined,
  isRemoveDot = false
) => {
  let removeFirstZero = `${number}`.replace(/(^0+)/, '') || 0;
  
  let removedDuplicatedDotString = `${removeFirstZero}`.replace(/\.+/g, '.');
  if (digit !== undefined) {
    const pointIdx = `${removeFirstZero}`.indexOf('.');
    if (pointIdx !== -1) {
      removedDuplicatedDotString = removedDuplicatedDotString.substr(0, pointIdx + Number(digit) + 1);
    }
  }
  const parts = removedDuplicatedDotString.split('.');
  if (parts[0]) {
    const finalNum = `${parts[0]}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + (parts.length > 1 ? `.${parts[1]}` : '');
    if (`${parts[1]}`.length === 0 && isRemoveDot) {
      return finalNum.split('.')[0];
    }
    if (digit !== undefined && +digit !== 0) {
      return (
        `${parts[0]}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') +
        (parts.length > 1 ? `.${parts[1]}`.substr(0, Number(digit) + 1) : '.00')
      );
    }
    return finalNum;
  }
  return '';
};

export const toNumberStrWithoutComma = (str: string | number | BigNumber = '', digit?: number | string) => {
  let withoutComma = `${str}`.replace(/[,-\s]/g, '').replace(/\.+/g, '.');
  if (withoutComma.length === 0) withoutComma = '0';
  let pointIdx = withoutComma.indexOf('.');
  if (digit !== undefined && pointIdx !== -1) {
    withoutComma = withoutComma.substr(0, pointIdx + Number(digit) + 1);
  }
  const matches = withoutComma.match(/\./g);
  if (digit === 0 || (matches && matches.length > 1)) {
    return withoutComma.replace(/\.$/, '');
  }
  pointIdx = withoutComma.indexOf('.');
  if (pointIdx === withoutComma.length - 1) return withoutComma;

  if (withoutComma.lastIndexOf('0') === withoutComma.length - 1) {
    // for 0.00001
    return withoutComma;
  }
  return new BigNumber(withoutComma || 0).toString();
};

export const toFixed = (str: string | number | BigNumber = '', digit: number, rm?: any) => {
  const bigNumber = new BigNumber(str || 0);
  return bigNumber.toFixed(digit || 0, rm);
};

export const toNumber = (str = '', digit = undefined) => {
  const removedCommaStr = toNumberStrWithoutComma(str, digit);
  if (Number.isNaN(Number(removedCommaStr))) {
    return 0;
  }
  return Number(removedCommaStr);
};

export const isNaN = (str: string | number | BigNumber) => {
  const bigNumber = new BigNumber(str);
  return !bigNumber.isNaN();
};
export const isFinite = (str: string | number | BigNumber) => {
  const bigNumber = new BigNumber(str);
  return bigNumber.isFinite();
};

// /////////
/* For calculation */
export const sum = (a: number | string | BigNumber, b: number | string | BigNumber) => {
  const bigNumber = new BigNumber(a);
  return bigNumber.plus(b);
};

export const sub = (a: number | string | BigNumber, b: number | string | BigNumber) => {
  const bigNumber = new BigNumber(a);
  return bigNumber.minus(b);
};

export const div = (a: number | string | BigNumber, b: number | string | BigNumber) => {
  const bigNumber = new BigNumber(a);
  return bigNumber.div(b);
};

export const multipliedBy = (a: number | string | BigNumber, b: number | string | BigNumber) => {
  const bigNumber = new BigNumber(a);
  return bigNumber.multipliedBy(b);
};

export const abs = (num: number | string | BigNumber) => {
  const bigNumber = new BigNumber(num);
  return bigNumber.absoluteValue();
};

// a: current amount b: buy/ssell c: portation
export const availableValue = (a: number, b: number | string, percentage: number | string | BigNumber = 1) => {
  if (b === 0 || b === '0') {
    return 0;
  }
  return div(a, b).multipliedBy(percentage);
};

export const round = (num: number, depth: number) => {
  const bigNumber = new BigNumber(num);
  return multipliedBy(div(bigNumber, depth).integerValue(BigNumber.ROUND_HALF_CEIL), depth);
};

export const floor = (num: number, depth: number) => {
  const bigNumber = new BigNumber(num);
  return multipliedBy(div(bigNumber, depth).integerValue(BigNumber.ROUND_FLOOR), depth);
};

export const ceil = (num: number, depth: number) => {
  const bigNumber = new BigNumber(num);
  return multipliedBy(div(bigNumber, depth).integerValue(BigNumber.ROUND_CEIL), depth);
};

export const floorWithDigit = (num: number, digit: number) => {
  const bigNumber = new BigNumber(num);
  return bigNumber.decimalPlaces(digit, BigNumber.ROUND_FLOOR);
};
