// 비용 계산 결과를 보여주는 컴포넌트
export interface CostProps {
  balanceLoanInterest: string;
  emptyMonth: number;
  maintenanceFeeMonth: string;
  middleLoanInterest: string;
  salePrice: string;
  surtax: string;
  totalFunds: string;
}

export function Cost({
  balanceLoanInterest,
  emptyMonth,
  maintenanceFeeMonth,
  middleLoanInterest,
  salePrice,
  surtax,
  totalFunds
}: CostProps) {
  const balanceLoanInterestNumber = balanceLoanInterest
    ? Number(balanceLoanInterest.replace(/,/g, ""))
    : 0;
  const maintenanceFeeMonthNumber = maintenanceFeeMonth
    ? Number(maintenanceFeeMonth.replace(/,/g, ""))
    : 0;
  const middleLoanInterestNumber = middleLoanInterest
    ? Number(middleLoanInterest.replace(/,/g, ""))
    : 0;
  const salePriceNumber = salePrice ? Number(salePrice.replace(/,/g, "")) : 0;
  const surtaxNumber = surtax ? Number(surtax.replace(/,/g, "")) : 0;
  const totalFundsNumber = totalFunds
    ? Number(totalFunds.replace(/,/g, ""))
    : 0;

  // 월별 비용 시뮬레이션 테이블 생성
  let totalCost = 0;
  let inputFunds = totalFundsNumber;

  return (
    <div className="ring-primary/20 rounded-xl bg-white/90 p-0 shadow-md ring-1">
      <div className="bg-primary/10 text-primary flex items-center justify-between rounded-t-xl px-6 py-3 text-center font-semibold">
        <span className="w-8 min-w-8 text-center">개월</span>
        <span className="w-16 min-w-16 text-center">월비용</span>
        <span className="w-24 min-w-20 text-center">누적비용</span>
        <span className="w-32 min-w-24 text-center">투입자금</span>
        <span className="w-20 min-w-16 text-center">공급가대비</span>
      </div>
      <div className="divide-primary/10 divide-y">
        {Array.from({ length: emptyMonth }).map((_, i) => {
          const monthCost =
            i < 2
              ? middleLoanInterestNumber
              : balanceLoanInterestNumber + maintenanceFeeMonthNumber;
          totalCost += monthCost;
          inputFunds += monthCost;
          const supplyRatio =
            salePriceNumber - surtaxNumber > 0
              ? Math.round(
                  (inputFunds / (salePriceNumber - surtaxNumber)) * 1000
                ) / 10
              : 0;
          return (
            <div
              key={i}
              className="hover:bg-primary/5 flex items-center justify-between px-6 py-2 text-sm transition"
            >
              <span className="w-8 min-w-8 text-center text-gray-500">
                {i + 1}
              </span>
              <span className="w-16 min-w-16 text-center font-medium text-blue-700">
                {monthCost.toLocaleString()}
              </span>
              <span className="w-24 min-w-20 text-center font-semibold text-orange-600">
                {totalCost.toLocaleString()}
              </span>
              <span className="text-primary w-32 min-w-24 text-center font-bold">
                {inputFunds.toLocaleString()}
              </span>
              <span className="w-20 min-w-16 text-center text-gray-700">
                {supplyRatio}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
