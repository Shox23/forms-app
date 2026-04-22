import { useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { useFormStore } from "../store/formStore";
import { Label } from "../components/ui/label";
import { Slider } from "../components/ui/slider";
import { Button } from "../components/ui/button";
import { SuccessModal } from "../components/SuccessModal";
import { ROUTES, LOAN_LIMITS } from "../lib/constants";
import { useSubmitForm } from "../hooks/useSubmitForm";

export default function Step3LoanParams() {
  const { data, updateData, isValidStep1, isValidStep2, isValidStep3, direction, setDirection, resetForm } = useFormStore();
  const navigate = useNavigate();
  const [showErrors, setShowErrors] = useState(false);
  const { submitForm, isSubmitting, isSuccess, setIsSuccess } = useSubmitForm();

  if (!isValidStep1 || !isValidStep2) {
    return <Navigate to={ROUTES.STEP_TWO} replace />;
  }

  const handleBack = () => {
    setDirection("backward");
    navigate(ROUTES.STEP_TWO);
  };

  const handleSubmitClick = () => {
    if (!isValidStep3) {
      setShowErrors(true);
      return;
    }
    submitForm(data);
  };

  const handleReturnHome = () => {
    setIsSuccess(false);
    resetForm();
    navigate(ROUTES.STEP_ONE);
  };

  return (
    <div className={`max-w-md mx-auto p-8 bg-white rounded-none shadow-sm border border-neutral-200 ${direction === "backward" ? "animate-slide-backward" : "animate-slide-forward"}`}>
      <h2 className="text-xl font-semibold mb-6 text-neutral-900 tracking-tight uppercase">Шаг 3: Параметры займа</h2>
      
      <div className="space-y-8">
        <div className="space-y-4">
          <div className="flex justify-between">
            <Label htmlFor="loanAmount" className="text-neutral-700 font-medium">Сумма займа</Label>
            <span className="font-bold text-neutral-900">${data.loanAmount}</span>
          </div>
          <Slider 
            id="loanAmount"
            min={LOAN_LIMITS.MIN_AMOUNT} 
            max={LOAN_LIMITS.MAX_AMOUNT} 
            step={LOAN_LIMITS.STEP_AMOUNT} 
            value={[data.loanAmount]} 
            onValueChange={(val) => updateData({ loanAmount: val[0] })} 
            className={showErrors && !isValidStep3 ? "opacity-50" : ""}
          />
        </div>

        <div className="space-y-4">
          <div className="flex justify-between">
            <Label htmlFor="loanTerm" className="text-neutral-700 font-medium">Срок займа (дней)</Label>
            <span className="font-bold text-neutral-900">{data.loanTerm}</span>
          </div>
          <Slider 
            id="loanTerm"
            min={LOAN_LIMITS.MIN_TERM} 
            max={LOAN_LIMITS.MAX_TERM} 
            step={LOAN_LIMITS.STEP_TERM} 
            value={[data.loanTerm]} 
            onValueChange={(val) => updateData({ loanTerm: val[0] })} 
            className={showErrors && !isValidStep3 ? "opacity-50" : ""}
          />
        </div>

        <div className="flex justify-between mt-8 space-x-4">
          <Button variant="outline" onClick={handleBack} className="w-1/2 rounded-none border-neutral-300 text-neutral-700 hover:bg-neutral-50 uppercase" disabled={isSubmitting}>
            НАЗАД
          </Button>
          <Button onClick={handleSubmitClick} className="w-1/2 bg-neutral-900 hover:bg-neutral-800 text-white rounded-none uppercase" disabled={isSubmitting}>
            {isSubmitting ? "ОТПРАВКА..." : "ПОДАТЬ ЗАЯВКУ"}
          </Button>
        </div>
      </div>

      <SuccessModal 
        isOpen={isSuccess} 
        onReturn={handleReturnHome}
        firstName={data.firstName}
        lastName={data.lastName}
        amount={data.loanAmount}
        term={data.loanTerm}
      />
    </div>
  );
}
