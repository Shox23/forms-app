import { createContext, useContext, useState, useMemo, type ReactNode } from "react";

export type FormData = {
  phone: string;
  firstName: string;
  lastName: string;
  gender: string;
  workPlace: string;
  address: string;
  loanAmount: number;
  loanTerm: number;
};

const initialData: FormData = {
  phone: "",
  firstName: "",
  lastName: "",
  gender: "",
  workPlace: "",
  address: "",
  loanAmount: 200,
  loanTerm: 10,
};

type FormContextType = {
  data: FormData;
  resetForm: () => void;
  direction: "forward" | "backward" | "none";
  setDirection: (dir: "forward" | "backward" | "none") => void;
  updateData: (fields: Partial<FormData>) => void;
  isValidStep1: boolean;
  isValidStep2: boolean;
  isValidStep3: boolean;
  isSubmitting: boolean;
  setIsSubmitting: (val: boolean) => void;
  isSuccess: boolean;
  setIsSuccess: (val: boolean) => void;
};

const FormContext = createContext<FormContextType | undefined>(undefined);

export function FormProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<FormData>(initialData);
  const [direction, setDirection] = useState<"forward" | "backward" | "none">("forward");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const updateData = (fields: Partial<FormData>) => {
    setData((prev) => ({ ...prev, ...fields }));
  };

  const resetForm = () => {
    setData(initialData);
    setDirection("forward");
  };

  const isValidStep1 = useMemo(() => {
    const phoneRegex = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
    return (
      phoneRegex.test(data.phone) &&
      data.firstName.trim() !== "" &&
      data.lastName.trim() !== "" &&
      data.gender !== ""
    );
  }, [data.phone, data.firstName, data.lastName, data.gender]);

  const isValidStep2 = useMemo(() => {
    return data.workPlace !== "" && data.address.trim() !== "";
  }, [data.workPlace, data.address]);

  const isValidStep3 = useMemo(() => {
    return (
      data.loanAmount >= 200 &&
      data.loanAmount <= 1000 &&
      data.loanTerm >= 10 &&
      data.loanTerm <= 30
    );
  }, [data.loanAmount, data.loanTerm]);

  const value = {
    data,
    updateData,
    resetForm,
    direction,
    setDirection,
    isValidStep1,
    isValidStep2,
    isValidStep3,
    isSubmitting,
    setIsSubmitting,
    isSuccess,
    setIsSuccess,
  };

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
}

export function useFormStore() {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error("useFormStore must be used within a FormProvider");
  }
  return context;
}
