import {
  CalculatorIcon,
  DollarSignIcon,
  Edit2Icon,
  FileTextIcon,
  InfoIcon,
  RulerIcon
} from "lucide-react";
import * as React from "react";
import { useFormState } from "react-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "~/common/components/ui/card";
import { Label } from "~/common/components/ui/label";
import { ButtonBalance } from "../components/button-balance";
import { InputNumber } from "../components/input-number";
import { ACQUISITION_TAX_RATIO } from "../constants";
import type { Route } from "./+types/balance-page";
import type { ActionState } from "./balance-helpers";
import { balanceCompute, initialState } from "./balance-helpers";
import { Cost } from "./cost";

export function loader({ request }: Route.LoaderArgs) {
  return initialState;
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  return balanceCompute(initialState, formData);
}

export const meta: Route.MetaFunction = () => [{ title: "잔금계산기 | 한평" }];

export default function Balance(props: Route.ComponentProps) {
  const { loaderData, actionData } = props;
  const [state, dispatch] = useFormState(balanceCompute, loaderData);
  const [values, setValues] = React.useState<ActionState>(loaderData);
  const [tempValues, setTempValues] = React.useState<ActionState>(loaderData);

  console.log("loaderData", loaderData);
  console.log("actionData", actionData);
  console.log("state", state);
  console.log("values", values);

  const handleValueChange = (name: string, value: string | number) => {
    setValues((prev) => {
      const next = { ...prev, [name]: value };

      // 기존 의존성 리셋 로직
      if (name === "salePrice") next.balanceLoan = "";
      if (name === "middleLoanRatio") next.middleLoanInterest = "";
      if (name === "balanceLoanRatio") {
        next.balanceLoan = "";
        next.balanceLoanInterest = "";
      }
      if (name === "balanceLoan") {
        next.balanceLoanRatio = 0;
        next.balanceLoanInterest = "";
      }
      if (name === "middleLoanRate") next.middleLoanInterest = "";
      if (name === "middleLoanInterest") next.middleLoanRate = 0;
      if (name === "balanceLoanRate") next.balanceLoanInterest = "";
      if (name === "balanceLoanInterest") next.balanceLoanRate = 0;
      if (name === "emptyMonth") next.showMessage = "수정버튼 클릭시 적용";

      // 계약면적 입력 시 평수/관리비 자동계산
      if (name === "contractArea") {
        const area = Number(value);
        const perPy = Number(prev.perPy) || 0;
        if (area && perPy) {
          const py = Math.round(area * 0.3025 * 10) / 10;
          next.contractAreaPy = py.toString();
          next.maintenanceFeeMonth = Math.round(py * perPy).toString();
        }
      }
      return next;
    });
  };

  const handleFocus = (name: string) => {
    setTempValues((prev) => ({ ...prev, [name]: values[name] }));
    setValues((prev) => ({ ...prev, [name]: "" }));
  };
  const handleBlur = (name: string) => {
    if (values[name] === "") {
      setValues((prev) => ({ ...prev, [name]: tempValues[name] }));
    }
  };

  React.useEffect(() => setValues(state), [state]);
  const borderDashed = state.surtax ? "border border-dashed" : undefined;

  return (
    <div className="flex min-h-screen flex-col items-center justify-between pt-10">
      <div className="flex flex-col gap-10 px-6 py-8">
        <Card className="w-full max-w-3xl shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl font-bold">
              <CalculatorIcon className="text-primary size-7" />
              소요자금 계산기
            </CardTitle>
            <div className="text-muted-foreground mt-1 text-base">
              잔금시 필요한 자금
            </div>
          </CardHeader>
          <CardContent>
            {!state.surtax && (
              <Card className="mb-6 border-blue-200 bg-blue-50/80">
                <div className="flex items-center gap-2 p-4">
                  <InfoIcon className="size-5 shrink-0 text-blue-500" />
                  <span className="text-base font-semibold text-blue-700">
                    잔금 계산기 사용법
                  </span>
                </div>
                <ul className="space-y-2 px-6 pb-4 text-sm text-blue-800">
                  <li className="flex items-center gap-2">
                    <FileTextIcon className="size-4 text-blue-400" />
                    <span>
                      1. <b>계약서</b>를 펴 보세요.
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <DollarSignIcon className="size-4 text-blue-400" />
                    <span>
                      2. <b>분양가</b>와 <b>부가세</b>를 입력해요.
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CalculatorIcon className="size-4 text-blue-400" />
                    <span>
                      3. <b>잔금대출비율</b> 또는 <b>대출액</b>을 수정해요.
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Edit2Icon className="size-4 text-blue-400" />
                    <span>
                      4. <b>잔금대출 이자율</b> 또는 <b>대출이자액</b>을
                      수정해요.
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <DollarSignIcon className="size-4 text-blue-400" />
                    <span>
                      5. <b>관리비</b>를 입력해요.
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <RulerIcon className="size-4 text-blue-400" />
                    <span>
                      (<b>면적</b>을 입력하면 <b>평단 만원</b>으로 계산돼요)
                    </span>
                  </li>
                </ul>
              </Card>
            )}
            <form action={dispatch} className="space-y-8">
              <div className="mb-4 rounded-xl bg-white/80 p-6 shadow-sm ring-1 ring-gray-200">
                <div className="mb-4 flex items-center gap-2">
                  <DollarSignIcon className="text-primary size-5" />
                  <span className="text-lg font-semibold">기본 정보</span>
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <Label htmlFor="salePrice" className="mb-1 block">
                      분양가
                    </Label>
                    <InputNumber
                      name="salePrice"
                      autoFocus
                      value={
                        values.salePrice !== undefined
                          ? String(values.salePrice)
                          : ""
                      }
                      onValueChange={(value) =>
                        handleValueChange("salePrice", value)
                      }
                      onFocus={() => handleFocus("salePrice")}
                      onBlur={() => handleBlur("salePrice")}
                      errors={state.fieldErrors?.salePrice}
                      placeholder="분양가"
                      type="text"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="surtax" className="mb-1 block">
                      부가세
                    </Label>
                    <InputNumber
                      name="surtax"
                      value={
                        values.surtax !== undefined ? String(values.surtax) : ""
                      }
                      onValueChange={(value) =>
                        handleValueChange("surtax", value)
                      }
                      onFocus={() => handleFocus("surtax")}
                      onBlur={() => handleBlur("surtax")}
                      errors={state.fieldErrors?.surtax}
                      placeholder="부가세"
                      type="text"
                      required
                    />
                  </div>
                </div>
              </div>
              {state.surtax && (
                <div className="mb-4 rounded-xl bg-orange-50/60 p-6 shadow-sm ring-1 ring-orange-200">
                  <div className="mb-4 flex items-center gap-2">
                    <CalculatorIcon className="size-5 text-orange-500" />
                    <span className="text-lg font-semibold">
                      대출/계약 정보
                    </span>
                  </div>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <Label htmlFor="depositRatio" className="mb-1 block">
                        계약금비율(%)
                      </Label>
                      <InputNumber
                        name="depositRatio"
                        value={
                          values.depositRatio !== undefined
                            ? String(values.depositRatio)
                            : ""
                        }
                        onValueChange={(value) =>
                          handleValueChange("depositRatio", value)
                        }
                        onFocus={() => handleFocus("depositRatio")}
                        onBlur={() => handleBlur("depositRatio")}
                        errors={state.fieldErrors?.depositRatio}
                        placeholder="계약금비율"
                        type="text"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="depositPrice" className="mb-1 block">
                        계약금
                      </Label>
                      <div className="font-semibold">
                        {values.depositPrice}원
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="middleLoanRatio" className="mb-1 block">
                        중도금비율(%)
                      </Label>
                      <InputNumber
                        name="middleLoanRatio"
                        value={
                          values.middleLoanRatio !== undefined
                            ? String(values.middleLoanRatio)
                            : ""
                        }
                        onValueChange={(value) =>
                          handleValueChange("middleLoanRatio", value)
                        }
                        onFocus={() => handleFocus("middleLoanRatio")}
                        onBlur={() => handleBlur("middleLoanRatio")}
                        errors={state.fieldErrors?.middleLoanRatio}
                        placeholder="중도금비율"
                        type="text"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="middleLoan" className="mb-1 block">
                        중도금
                      </Label>
                      <span className="text-xs">-부가세 포함</span>
                      <div className="font-semibold">{values.middleLoan}원</div>
                    </div>
                    <div>
                      <Label htmlFor="balanceLoanRatio" className="mb-1 block">
                        잔금대출비율(%)
                      </Label>
                      <InputNumber
                        name="balanceLoanRatio"
                        value={
                          values.balanceLoanRatio !== undefined
                            ? String(values.balanceLoanRatio)
                            : ""
                        }
                        onValueChange={(value) =>
                          handleValueChange("balanceLoanRatio", value)
                        }
                        onFocus={() => handleFocus("balanceLoanRatio")}
                        onBlur={() => handleBlur("balanceLoanRatio")}
                        errors={state.fieldErrors?.balanceLoanRatio}
                        placeholder="잔금대출비율"
                        type="text"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="balanceLoan" className="mb-1 block">
                        잔금대출액
                      </Label>
                      <span className="text-xs">-부가세 제외</span>
                      <div className="font-semibold">
                        {values.balanceLoan}원
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="middleSurtax" className="mb-1 block">
                        중도금부가세
                      </Label>
                      <div className="font-semibold">
                        {values.middleSurtax}원
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="acquisitionTax" className="mb-1 block">
                        취득세({ACQUISITION_TAX_RATIO}%)
                      </Label>
                      <span className="text-xs">-등기비 포함</span>
                      <div className="font-semibold">
                        {values.acquisitionTax}원
                      </div>
                    </div>
                    <div className="ring-2">
                      <Label htmlFor="requiredCash" className="text-xl">
                        등기시 필요현금
                      </Label>
                      <div className="text-xl text-orange-600">
                        {values.requiredCash}원
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="refundAmount" className="mb-1 block">
                        환급액
                      </Label>
                      <span className="text-xs">-잔금부가세</span>
                      <div className="font-semibold">
                        {values.refundAmount}원
                      </div>
                    </div>
                    <div className="ring-2">
                      <Label htmlFor="realFunds" className="text-xs">
                        실질자금
                      </Label>
                      <span className="text-xs">-인테리어 제외</span>
                      <div className="font-semibold">{values.realFunds}원</div>
                    </div>
                    <div className="ring-2">
                      <Label htmlFor="totalFunds" className="text-xl">
                        소요자금 합계
                      </Label>
                      <div className="text-xl text-orange-700">
                        {values.totalFunds}원
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {state.totalFunds && (
                <>
                  <div className="flex justify-center">
                    <ButtonBalance
                      text={state.totalFunds ? "수정" : "입력"}
                      className="to-primary hover:from-primary flex h-14 min-h-[3.5rem] w-1/2 items-center justify-center rounded-full bg-gradient-to-r from-orange-400 px-10 py-3 text-lg font-bold text-white shadow-lg transition hover:to-orange-400"
                      style={{ minHeight: "3.5rem" }}
                    />
                  </div>
                  <div className="mb-4 rounded-xl bg-blue-50/60 p-6 shadow-sm ring-1 ring-blue-200">
                    <div className="mb-4 flex items-center gap-2">
                      <RulerIcon className="size-5 text-blue-500" />
                      <span className="text-lg font-semibold">
                        관리/면적/공실
                      </span>
                    </div>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div>
                        <Label htmlFor="middleLoanRate" className="mb-1 block">
                          중도금이율(%)
                        </Label>
                        <InputNumber
                          name="middleLoanRate"
                          value={
                            values.middleLoanRate !== undefined
                              ? String(values.middleLoanRate)
                              : ""
                          }
                          onValueChange={(value) =>
                            handleValueChange("middleLoanRate", value)
                          }
                          onFocus={() => handleFocus("middleLoanRate")}
                          onBlur={() => handleBlur("middleLoanRate")}
                          errors={state.fieldErrors?.middleLoanRate}
                          placeholder="중도금이율"
                          type="text"
                          required
                        />
                      </div>
                      <div>
                        <Label
                          htmlFor="middleLoanInterest"
                          className="mb-1 block"
                        >
                          중도금이자(월)
                        </Label>
                        <InputNumber
                          name="middleLoanInterest"
                          value={
                            values.middleLoanInterest !== undefined
                              ? String(values.middleLoanInterest)
                              : ""
                          }
                          onValueChange={(value) =>
                            handleValueChange("middleLoanInterest", value)
                          }
                          onFocus={() => handleFocus("middleLoanInterest")}
                          onBlur={() => handleBlur("middleLoanInterest")}
                          errors={state.fieldErrors?.middleLoanInterest}
                          placeholder="중도금이자(월)"
                          type="text"
                        />
                      </div>
                      <div>
                        <Label htmlFor="balanceLoanRate" className="mb-1 block">
                          잔금대출이율(%)
                        </Label>
                        <InputNumber
                          name="balanceLoanRate"
                          value={
                            values.balanceLoanRate !== undefined
                              ? String(values.balanceLoanRate)
                              : ""
                          }
                          onValueChange={(value) =>
                            handleValueChange("balanceLoanRate", value)
                          }
                          onFocus={() => handleFocus("balanceLoanRate")}
                          onBlur={() => handleBlur("balanceLoanRate")}
                          errors={state.fieldErrors?.balanceLoanRate}
                          placeholder="잔금대출이율"
                          type="text"
                          required
                        />
                      </div>
                      <div>
                        <Label
                          htmlFor="balanceLoanInterest"
                          className="mb-1 block"
                        >
                          잔금이자(월)
                        </Label>
                        <InputNumber
                          name="balanceLoanInterest"
                          value={
                            values.balanceLoanInterest !== undefined
                              ? String(values.balanceLoanInterest)
                              : ""
                          }
                          onValueChange={(value) =>
                            handleValueChange("balanceLoanInterest", value)
                          }
                          onFocus={() => handleFocus("balanceLoanInterest")}
                          onBlur={() => handleBlur("balanceLoanInterest")}
                          errors={state.fieldErrors?.balanceLoanInterest}
                          placeholder="잔금이자"
                          type="text"
                        />
                      </div>
                      <div>
                        <Label htmlFor="contractArea" className="mb-1 block">
                          계약면적(㎡)
                        </Label>
                        {values.contractArea && (
                          <span className="text-xs">
                            -{values.contractAreaPy}평
                          </span>
                        )}
                        <InputNumber
                          name="contractArea"
                          value={
                            values.contractArea !== undefined
                              ? String(values.contractArea)
                              : ""
                          }
                          onValueChange={(value) =>
                            handleValueChange("contractArea", value)
                          }
                          onFocus={() => handleFocus("contractArea")}
                          onBlur={() => handleBlur("contractArea")}
                          errors={state.fieldErrors?.contractArea}
                          placeholder="계약면적(㎡)을 입력하시거나"
                          type="text"
                        />
                      </div>
                      <div>
                        <Label
                          htmlFor="maintenanceFeeMonth"
                          className="mb-1 block"
                        >
                          관리비
                        </Label>
                        {values.contractArea && (
                          <span className="text-xs">
                            -평당 {values.perPy}원
                          </span>
                        )}
                        <InputNumber
                          name="maintenanceFeeMonth"
                          value={
                            values.maintenanceFeeMonth !== undefined
                              ? String(values.maintenanceFeeMonth)
                              : ""
                          }
                          onValueChange={(value) =>
                            handleValueChange("maintenanceFeeMonth", value)
                          }
                          onFocus={() => handleFocus("maintenanceFeeMonth")}
                          onBlur={() => handleBlur("maintenanceFeeMonth")}
                          errors={state.fieldErrors?.maintenanceFeeMonth}
                          placeholder="관리비를 입력하세요"
                          type="text"
                        />
                      </div>
                      <div>
                        <Label htmlFor="emptyMonth" className="mb-1 block">
                          (예상)공실 개월수
                        </Label>
                        <InputNumber
                          name="emptyMonth"
                          value={
                            values.emptyMonth !== undefined
                              ? String(values.emptyMonth)
                              : ""
                          }
                          onValueChange={(value) =>
                            handleValueChange("emptyMonth", value)
                          }
                          onFocus={() => handleFocus("emptyMonth")}
                          onBlur={() => handleBlur("emptyMonth")}
                          errors={state.fieldErrors?.emptyMonth}
                          placeholder="공실 개월수(예상)"
                          type="text"
                          required
                        />
                      </div>
                      <div className="ring-2">
                        <Label htmlFor="amountOfLoss" className="mb-1 block">
                          누적손실비용
                        </Label>
                        <div className="font-semibold">
                          {values.amountOfLoss}원
                        </div>
                        <span className="text-xs text-orange-500">
                          {values.showMessage}
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              )}
              <div className="flex justify-center">
                <ButtonBalance
                  text={state.totalFunds ? "수정" : "입력"}
                  className="to-primary hover:from-primary flex h-14 min-h-[3.5rem] w-1/2 items-center justify-center rounded-full bg-gradient-to-r from-orange-400 px-10 py-3 text-lg font-bold text-white shadow-lg transition hover:to-orange-400"
                  style={{ minHeight: "3.5rem" }}
                />
              </div>
            </form>
            {state.totalFunds && (
              <>
                <div className="mt-8">
                  <Card className="bg-primary/5 border-primary/20 rounded-xl shadow-md">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-primary flex items-center gap-2 text-lg font-semibold">
                        <CalculatorIcon className="text-primary size-5" />
                        결과 요약
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <Cost
                        balanceLoanInterest={values.balanceLoanInterest}
                        emptyMonth={values.emptyMonth}
                        maintenanceFeeMonth={values.maintenanceFeeMonth}
                        middleLoanInterest={values.middleLoanInterest}
                        salePrice={values.salePrice}
                        surtax={values.surtax}
                        totalFunds={values.totalFunds}
                      />
                    </CardContent>
                  </Card>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
