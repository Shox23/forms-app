import { useCallback } from "react";
import { useNavigate } from "react-router";
import { useFormStore } from "../store/formStore";
import { useSubmitForm } from "./useSubmitForm";
import { ROUTES } from "../lib/constants";

export function useSuccessModal() {
  const { data, resetForm } = useFormStore();
  const { submitForm, isSubmitting, isSuccess, setIsSuccess } = useSubmitForm();

  const navigate = useNavigate();

  const handleSubmit = useCallback(() => {
    submitForm(data);
  }, [submitForm, data]);

  const handleClose = useCallback(() => {
    setIsSuccess(false);
  }, [setIsSuccess]);

  const handleReturnHome = useCallback(() => {
    navigate(ROUTES.STEP_ONE);
    setIsSuccess(false);
    resetForm();
  }, [setIsSuccess, resetForm, navigate]);

  return {
    isOpen: isSuccess,
    isSubmitting,
    handleSubmit,
    handleClose,
    handleReturnHome,
    modalProps: {
      isOpen: isSuccess,
      onClose: handleClose,
      onReturn: handleReturnHome,
      firstName: data.firstName,
      lastName: data.lastName,
      amount: data.loanAmount,
      term: data.loanTerm,
    },
  };
}
