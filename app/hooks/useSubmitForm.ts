import { toast } from "sonner";
import { useFormStore } from "../store/formStore";
import type { FormData } from "../store/formStore";

export function useSubmitForm() {
  const { isSubmitting, setIsSubmitting, isSuccess, setIsSuccess } = useFormStore();

  const submitForm = async (data: FormData) => {
    setIsSubmitting(true);
    setIsSuccess(false);
    
    try {
      const response = await fetch("https://dummyjson.com/products/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: `${data.firstName} ${data.lastName}`,
        }),
      });
      if (!response.ok) throw new Error("Failed to submit");
      setIsSuccess(true);
    } catch (error) {
      toast.error("Произошла ошибка при отправке заявки. Пожалуйста, попробуйте позже.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return { submitForm, isSubmitting, isSuccess, setIsSuccess };
}
