/**
 *  환율 타발
 */
export type RRatesInit = {
  msoList?: RMso[];
  currencyList?: any[];
  weightedRate: number;
  usdBuyRate: number;
  lastUpdateDate: string;
};

// TODO: 쓰는 거만 남기기
export type RRatesRow = {
  id: number;
  currencyId: number;
  multiplier: number;
  standardValue: string;
  cashBuy: string;
  cashSell: string;
  benefitRatio: string;
  utTransactionFee: string;
  usdConversionRate: string;
  bankFee: number;
  bankFixedFee: number;
  utRatePrecision: number;
  updateDate: string;
  utRate: string;
  showUtRate: string;
  displayCurrency: string;
  currencyName: string;
  currencyCode: string;
  symbol: string;
  precision: number;
  status: string;
  isUpdateExchangeRate: string;
  msoId: number;
  fxProfitText?: string;
  fxProfit2Text?: string;
  totalProfitText?: string;
  totalProfit2Text?: string;
  partnerRate: string;
  partnerFee: string;
  partnerAmount: string;
  fxProfit: string;
  fxProfit2: string;
  totalProfit: string;
  totalProfit2: string;
  amount: string;
};

export type RRatesData = {
  tableListEntity: {
    tableData: RRatesRow[];
    tableMetaData: RMetaData;
  };
  purchasableExchangeAmount: number;
};

export type RTableListEntity = {
  tableData: RRatesRow[];
  tableMetaData: RMetaData;
};

export type RMso = {
  id: number;
  name: string;
};

export type RMetaData = { header: { value: string; key: string }[] };
