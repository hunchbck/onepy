import {
  ACQUISITION_TAX_RATIO,
  BALANCE_LOAN_RATIO,
  BALANCE_LOAN_RATIO_MAX,
  BALANCELOAN_RATE,
  BALANCELOAN_RATE_MAX,
  BALANCELOAN_RATE_MIN,
  DEPOSIT_RATIO,
  DEPOSIT_RATIO_MAX,
  DEPOSIT_RATIO_MIN,
  EMPTY_MONTH,
  EMPTY_MONTH_MAX,
  EMPTY_MONTH_MIN,
  MIDDLE_LOAN_RATIO,
  MIDDLELOAN_RATE,
  MIDDLELOAN_RATE_MAX,
  MIDDLELOAN_RATE_MIN,
  PER_PY,
  PRICE_PY_MAX,
  PRICE_PY_MIN,
  SALE_PRICE_MIN
} from "../constants";

export interface FieldErrors {
  balanceLoan: string[] | undefined;
  balanceLoanInterest: string[] | undefined;
  balanceLoanRate: string[] | undefined;
  balanceLoanRatio: string[] | undefined;
  contractArea: string[] | undefined;
  depositRatio: string[] | undefined;
  emptyMonth: string[] | undefined;
  maintenanceFeeMonth: string[] | undefined;
  middleLoanInterest: string[] | undefined;
  middleLoanRate: string[] | undefined;
  middleLoanRatio: string[] | undefined;
  salePrice: string[] | undefined;
  surtax: string[] | undefined;
}

export interface ActionState {
  [key: string]: string | number | undefined | FieldErrors;
  acquisitionTax: string;
  amountOfLoss: string;
  balanceLoan: string;
  balanceLoanInterest: string;
  balanceLoanRate: number;
  balanceLoanRatio: number;
  contractArea: string;
  contractAreaPy: string;
  depositPrice: string;
  depositRatio: number;
  emptyMonth: number;
  fieldErrors: FieldErrors;
  maintenanceFeeMonth: string;
  middleLoan: string;
  middleLoanInterest: string;
  middleLoanRate: number;
  middleLoanRatio: number;
  middleSurtax: string;
  perPy: string;
  pyPrice: string;
  realFunds: string;
  refundAmount: string;
  requiredCash: string;
  salePrice: string;
  showMessage: string;
  surtax: string;
  totalFunds: string;
}

export const initialState: ActionState = {
  acquisitionTax: "",
  amountOfLoss: "",
  balanceLoan: "",
  balanceLoanInterest: "",
  balanceLoanRate: BALANCELOAN_RATE,
  balanceLoanRatio: BALANCE_LOAN_RATIO,
  contractArea: "",
  contractAreaPy: "",
  depositPrice: "",
  depositRatio: DEPOSIT_RATIO,
  emptyMonth: EMPTY_MONTH,
  fieldErrors: {
    balanceLoan: [],
    balanceLoanInterest: [],
    balanceLoanRate: [],
    balanceLoanRatio: [],
    contractArea: [],
    depositRatio: [],
    emptyMonth: [],
    maintenanceFeeMonth: [],
    middleLoanInterest: [],
    middleLoanRate: [],
    middleLoanRatio: [],
    salePrice: [],
    surtax: []
  },
  maintenanceFeeMonth: "",
  middleLoan: "",
  middleLoanInterest: "",
  middleLoanRate: MIDDLELOAN_RATE,
  middleLoanRatio: MIDDLE_LOAN_RATIO,
  middleSurtax: "",
  perPy: "",
  pyPrice: "",
  realFunds: "",
  refundAmount: "",
  requiredCash: "",
  salePrice: "",
  showMessage: "",
  surtax: "",
  totalFunds: ""
};

export async function balanceCompute(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  let fieldErrors: FieldErrors = {
    balanceLoan: [],
    balanceLoanInterest: [],
    balanceLoanRate: [],
    balanceLoanRatio: [],
    contractArea: [],
    depositRatio: [],
    emptyMonth: [],
    maintenanceFeeMonth: [],
    middleLoanInterest: [],
    middleLoanRate: [],
    middleLoanRatio: [],
    salePrice: [],
    surtax: []
  };

  const data = Object.fromEntries(formData.entries());
  if (!data.salePrice) {
    fieldErrors = {
      ...fieldErrors,
      salePrice: ["분양가를 입력해주세요"]
    };
    return {
      ...prevState,
      fieldErrors
    };
  }

  const dataStr = Object.fromEntries(
    Object.entries(data).map(([key, value]) => [
      key,
      value instanceof File ? "" : value
    ])
  );

  // 계산을 위한 number 변환
  const dataNum = {
    acquisitionTax: 0,
    amountOfLoss: 0,
    balanceLoan: dataStr.balanceLoan
      ? +String(dataStr.balanceLoan).replace(/,/g, "")
      : 0,
    balanceLoanInterest: dataStr.balanceLoanInterest
      ? +String(dataStr.balanceLoanInterest).replace(/,/g, "")
      : 0,
    balanceLoanRate: dataStr.balanceLoanRate
      ? +dataStr.balanceLoanRate
      : BALANCELOAN_RATE,
    balanceLoanRatio: dataStr.balanceLoanRatio
      ? +dataStr.balanceLoanRatio
      : BALANCE_LOAN_RATIO,
    contractArea: dataStr.contractArea ? +dataStr.contractArea : 0,
    contractAreaPy: 0,
    depositPrice: 0,
    depositRatio: dataStr.depositRatio ? +dataStr.depositRatio : DEPOSIT_RATIO,
    emptyMonth: dataStr.emptyMonth ? +dataStr.emptyMonth : EMPTY_MONTH,
    maintenanceFeeMonth: dataStr.maintenanceFeeMonth
      ? +String(dataStr.maintenanceFeeMonth).replace(/,/g, "")
      : 0,
    middleLoan: 0,
    middleLoanInterest: dataStr.middleLoanInterest
      ? +String(dataStr.middleLoanInterest).replace(/,/g, "")
      : 0,
    middleLoanRate: dataStr.middleLoanRate
      ? +dataStr.middleLoanRate
      : MIDDLELOAN_RATE,
    middleLoanRatio: dataStr.middleLoanRatio
      ? +dataStr.middleLoanRatio
      : MIDDLE_LOAN_RATIO,
    middleSurtax: 0,
    perPy: PER_PY,
    pyPrice: 0,
    realFunds: 0,
    refundAmount: 0,
    requiredCash: 0,
    salePrice: +String(dataStr.salePrice).replace(/,/g, ""),
    surtax: +String(dataStr.surtax).replace(/,/g, ""),
    totalFunds: 0
  };
  if (dataNum.salePrice < SALE_PRICE_MIN) {
    fieldErrors = {
      ...fieldErrors,
      salePrice: ["1억 이상만 가능합니다"]
    };
    return {
      ...prevState,
      fieldErrors
    };
  }
  if (!data.surtax) {
    fieldErrors = {
      ...fieldErrors,
      surtax: ["부가세를 입력해주세요"]
    };
    return {
      ...prevState,
      fieldErrors,
      salePrice: dataStr.salePrice
    };
  }
  if (dataNum.surtax < dataNum.salePrice * 0.02) {
    fieldErrors = {
      ...fieldErrors,
      surtax: ["너무 적습니다"]
    };
    return {
      ...prevState,
      fieldErrors,
      salePrice: dataStr.salePrice
    };
  }
  if (dataNum.surtax > dataNum.salePrice * 0.09) {
    fieldErrors = {
      ...fieldErrors,
      surtax: ["너무 많습니다"]
    };
    return {
      ...prevState,
      fieldErrors,
      salePrice: dataStr.salePrice
    };
  }
  // 공급가
  const supplyPrice = dataNum.salePrice - dataNum.surtax;

  if (dataNum.depositRatio < DEPOSIT_RATIO_MIN) {
    dataNum.depositRatio = DEPOSIT_RATIO_MIN;
    fieldErrors = {
      ...fieldErrors,
      depositRatio: [`${DEPOSIT_RATIO_MIN}% 이상만 가능합니다`]
    };
  }
  if (dataNum.depositRatio > DEPOSIT_RATIO_MAX) {
    dataNum.depositRatio = DEPOSIT_RATIO_MAX;
    fieldErrors = {
      ...fieldErrors,
      depositRatio: [`${DEPOSIT_RATIO_MAX}% 이하만 가능합니다`]
    };
  }
  // 계약금
  dataNum.depositPrice = (dataNum.salePrice * dataNum.depositRatio) / 100;

  if (dataNum.middleLoanRatio < 0) {
    dataNum.middleLoanRatio = 0;
    fieldErrors = {
      ...fieldErrors,
      middleLoanRatio: ["0 보다 커야 합니다"]
    };
  }
  if (dataNum.middleLoanRatio > 90 - dataNum.depositRatio) {
    dataNum.middleLoanRatio = 90 - dataNum.depositRatio;
    fieldErrors = {
      ...fieldErrors,
      middleLoanRatio: [`${dataNum.middleLoanRatio}% 이하만 가능합니다`]
    };
  }
  // 중도금
  dataNum.middleLoan = (dataNum.salePrice * dataNum.middleLoanRatio) / 100;

  // 잔금대출비율 & 잔금대출액
  if (dataNum.balanceLoan) {
    if (dataNum.balanceLoan < 0) {
      dataNum.balanceLoan = 0;
      fieldErrors = {
        ...fieldErrors,
        balanceLoan: ["0 보다 커야 합니다"]
      };
    }
    if (dataNum.balanceLoan > (supplyPrice * BALANCE_LOAN_RATIO_MAX) / 100) {
      dataNum.balanceLoan = (supplyPrice * BALANCE_LOAN_RATIO_MAX) / 100;
      fieldErrors = {
        ...fieldErrors,
        balanceLoan: [
          `${dataNum.balanceLoan.toLocaleString()}원 이하만 가능합니다`
        ]
      };
    }
    dataNum.balanceLoanRatio =
      Math.round((dataNum.balanceLoan / supplyPrice) * 1000) / 10;
  } else {
    if (dataNum.balanceLoanRatio < 0) {
      dataNum.balanceLoanRatio = 0;
      fieldErrors = {
        ...fieldErrors,
        balanceLoanRatio: ["0 보다 커야 합니다"]
      };
    }
    if (dataNum.balanceLoanRatio > BALANCE_LOAN_RATIO_MAX) {
      dataNum.balanceLoanRatio = BALANCE_LOAN_RATIO_MAX;
      fieldErrors = {
        ...fieldErrors,
        balanceLoanRatio: [`${dataNum.balanceLoanRatio}% 이하만 가능합니다`]
      };
    }
    dataNum.balanceLoan =
      ((dataNum.salePrice - dataNum.surtax) * dataNum.balanceLoanRatio) / 100;
  }
  dataNum.middleSurtax = (dataNum.surtax * dataNum.middleLoanRatio) / 100;
  dataNum.acquisitionTax =
    ((dataNum.salePrice - dataNum.surtax) * ACQUISITION_TAX_RATIO) / 100;
  dataNum.requiredCash =
    dataNum.salePrice -
    dataNum.depositPrice -
    dataNum.balanceLoan +
    (dataNum.surtax * (100 - dataNum.depositRatio - dataNum.middleLoanRatio)) /
      100 +
    dataNum.middleSurtax +
    dataNum.acquisitionTax;
  dataNum.refundAmount =
    (dataNum.surtax * (100 - dataNum.depositRatio - dataNum.middleLoanRatio)) /
    100;
  dataNum.realFunds = dataNum.requiredCash - dataNum.refundAmount;
  dataNum.totalFunds =
    dataNum.depositPrice -
    (dataNum.surtax * dataNum.depositRatio) / 100 +
    dataNum.realFunds;

  // 중도금이율 & 중도금이자(월)
  if (dataNum.middleLoanInterest) {
    if (
      dataNum.middleLoanInterest <
      (dataNum.middleLoan * MIDDLELOAN_RATE_MIN) / 100 / 12
    ) {
      dataNum.middleLoanInterest = Math.round(
        (dataNum.middleLoan * MIDDLELOAN_RATE_MIN) / 100 / 12
      );
      fieldErrors = {
        ...fieldErrors,
        middleLoanInterest: ["너무 적습니다"]
      };
    }
    if (
      dataNum.middleLoanInterest >
      (dataNum.middleLoan * MIDDLELOAN_RATE_MAX) / 100 / 12
    ) {
      dataNum.middleLoanInterest = Math.floor(
        (dataNum.middleLoan * MIDDLELOAN_RATE_MAX) / 100 / 12
      );
      fieldErrors = {
        ...fieldErrors,
        middleLoanInterest: ["너무 많습니다"]
      };
    }
    dataNum.middleLoanRate =
      Math.round(
        ((dataNum.middleLoanInterest * 12) / dataNum.middleLoan) * 10000
      ) / 100;
  } else {
    if (dataNum.middleLoanRate < MIDDLELOAN_RATE_MIN) {
      dataNum.middleLoanRate = MIDDLELOAN_RATE_MIN;
      fieldErrors = {
        ...fieldErrors,
        middleLoanRate: ["너무 낮습니다"]
      };
    }
    if (dataNum.middleLoanRate > MIDDLELOAN_RATE_MAX) {
      dataNum.middleLoanRate = MIDDLELOAN_RATE_MAX;
      fieldErrors = {
        ...fieldErrors,
        middleLoanRate: ["너무 높습니다"]
      };
    }
    dataNum.middleLoanInterest = Math.round(
      (dataNum.middleLoan * dataNum.middleLoanRate) / 12 / 100
    );
  }
  // 잔금대출이율 & 잔금이자(월)
  if (dataNum.balanceLoanInterest) {
    if (
      dataNum.balanceLoanInterest <
      (dataNum.balanceLoan * BALANCELOAN_RATE_MIN) / 100 / 12
    ) {
      dataNum.balanceLoanInterest = Math.round(
        (dataNum.balanceLoan * BALANCELOAN_RATE_MIN) / 100 / 12
      );
      fieldErrors = {
        ...fieldErrors,
        balanceLoanInterest: ["너무 적습니다"]
      };
    }
    if (
      dataNum.balanceLoanInterest >
      (dataNum.balanceLoan * BALANCELOAN_RATE_MAX) / 100 / 12
    ) {
      dataNum.balanceLoanInterest = Math.floor(
        (dataNum.balanceLoan * BALANCELOAN_RATE_MAX) / 100 / 12
      );
      fieldErrors = {
        ...fieldErrors,
        balanceLoanInterest: ["너무 많습니다"]
      };
    }
    dataNum.balanceLoanRate =
      Math.round(
        ((dataNum.balanceLoanInterest * 12) / dataNum.balanceLoan) * 10000
      ) / 100;
  } else {
    if (dataNum.balanceLoanRate < BALANCELOAN_RATE_MIN) {
      dataNum.balanceLoanRate = BALANCELOAN_RATE_MIN;
      fieldErrors = {
        ...fieldErrors,
        balanceLoanRate: ["너무 낮습니다"]
      };
    }
    if (dataNum.balanceLoanRate > BALANCELOAN_RATE_MAX) {
      dataNum.balanceLoanRate = BALANCELOAN_RATE_MAX;
      fieldErrors = {
        ...fieldErrors,
        balanceLoanRate: ["너무 높습니다"]
      };
    }
    dataNum.balanceLoanInterest = Math.round(
      (dataNum.balanceLoan * dataNum.balanceLoanRate) / 12 / 100
    );
  }
  // 계약면적(㎡)
  if (dataNum.contractArea < 0) {
    dataNum.contractArea = 0;
    fieldErrors = {
      ...fieldErrors,
      contractArea: ["음수일 수 없습니다"]
    };
  }
  if (dataNum.maintenanceFeeMonth < 0) {
    dataNum.maintenanceFeeMonth = 0;
    fieldErrors = {
      ...fieldErrors,
      maintenanceFeeMonth: ["음수일 수 없습니다"]
    };
  }
  // 계약면적(평)
  dataNum.contractAreaPy = Math.round(dataNum.contractArea * 0.3025 * 10) / 10;
  if (dataNum.contractAreaPy) {
    // 최소평수(평당 1억원)
    const minPy = Math.ceil((supplyPrice / PRICE_PY_MAX) * 10) / 10;
    if (dataNum.contractAreaPy < minPy) {
      dataNum.contractAreaPy = minPy;
      dataNum.contractArea = minPy / 0.3025;
      fieldErrors = {
        ...fieldErrors,
        contractArea: [`${minPy}평 이상 입력하세요`]
      };
    }
    // 최대평수(평당 500만원)
    const maxPy = Math.floor((supplyPrice / PRICE_PY_MIN) * 10) / 10;
    if (dataNum.contractAreaPy > maxPy) {
      dataNum.contractAreaPy = maxPy;
      dataNum.contractArea = maxPy / 0.3025;
      fieldErrors = {
        ...fieldErrors,
        contractArea: [`${maxPy}평 이하로 입력하세요`]
      };
    }
  }
  // 평당 가격
  dataNum.pyPrice = Math.round(supplyPrice / dataNum.contractAreaPy);
  // 관리비
  if (dataNum.maintenanceFeeMonth) {
    if (dataNum.contractAreaPy) {
      dataNum.perPy = Math.round(
        dataNum.maintenanceFeeMonth / dataNum.contractAreaPy
      );
    }
  } else {
    dataNum.maintenanceFeeMonth = Math.round(
      dataNum.contractAreaPy * dataNum.perPy
    );
  }
  // 공실 개월수
  if (dataNum.emptyMonth < EMPTY_MONTH_MIN) {
    dataNum.emptyMonth = EMPTY_MONTH_MIN;
    fieldErrors = {
      ...fieldErrors,
      emptyMonth: [`넉넉하게 ${EMPTY_MONTH_MIN}개월 이상 입력하시지요`]
    };
  }
  if (dataNum.emptyMonth > EMPTY_MONTH_MAX) {
    dataNum.emptyMonth = EMPTY_MONTH_MAX;
    fieldErrors = {
      ...fieldErrors,
      emptyMonth: [`으악~ ${EMPTY_MONTH_MAX}개월 이상 공실이라니...`]
    };
  }
  // 손실액
  dataNum.amountOfLoss =
    (dataNum.emptyMonth - 2) *
      (dataNum.balanceLoanInterest + dataNum.maintenanceFeeMonth) +
    2 * dataNum.middleLoanInterest;

  // state 필드값 set
  const salePrice = dataNum.salePrice.toLocaleString();
  const surtax = dataNum.surtax.toLocaleString();
  const pyPrice = dataNum.pyPrice.toLocaleString();

  const depositRatio = dataNum.depositRatio;
  const depositPrice = dataNum.depositPrice.toLocaleString();
  const middleLoanRatio = dataNum.middleLoanRatio;
  const middleLoan = dataNum.middleLoan.toLocaleString();
  const balanceLoanRatio = dataNum.balanceLoanRatio;
  const balanceLoan = dataNum.balanceLoan.toLocaleString();
  const middleSurtax = dataNum.middleSurtax.toLocaleString();
  const acquisitionTax = dataNum.acquisitionTax.toLocaleString();
  const requiredCash = dataNum.requiredCash.toLocaleString();
  const refundAmount = dataNum.refundAmount.toLocaleString();
  const realFunds = dataNum.realFunds.toLocaleString();
  const totalFunds = dataNum.totalFunds.toLocaleString();

  const middleLoanRate = dataNum.middleLoanRate;
  const middleLoanInterest = dataNum.middleLoanInterest.toLocaleString();

  const balanceLoanRate = dataNum.balanceLoanRate;
  const balanceLoanInterest = dataNum.balanceLoanInterest.toLocaleString();

  const contractArea = dataNum.contractArea
    ? dataNum.contractArea.toLocaleString()
    : "";
  const contractAreaPy = dataNum.contractAreaPy
    ? dataNum.contractAreaPy.toLocaleString()
    : "";
  const perPy = dataNum.perPy.toLocaleString();
  const maintenanceFeeMonth = dataNum.maintenanceFeeMonth
    ? dataNum.maintenanceFeeMonth.toLocaleString()
    : "";

  const emptyMonth = dataNum.emptyMonth;
  const amountOfLoss = dataNum.amountOfLoss.toLocaleString();

  const stateData: ActionState = {
    acquisitionTax,
    amountOfLoss,
    balanceLoan,
    balanceLoanInterest,
    balanceLoanRate,
    balanceLoanRatio,
    contractArea,
    contractAreaPy,
    depositPrice,
    depositRatio,
    emptyMonth,
    fieldErrors,
    maintenanceFeeMonth,
    middleLoan,
    middleLoanInterest,
    middleLoanRate,
    middleLoanRatio,
    middleSurtax,
    perPy,
    pyPrice,
    realFunds,
    refundAmount,
    requiredCash,
    salePrice,
    showMessage: "",
    surtax,
    totalFunds
  };
  return stateData;
}
