import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";

interface SuccessModalProps {
  isOpen: boolean;
  onReturn: () => void;
  firstName: string;
  lastName: string;
  amount: number;
  term: number;
}

export function SuccessModal({ isOpen, onReturn, firstName, lastName, amount, term }: SuccessModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onReturn()}>
      <DialogContent className="sm:max-w-md text-center rounded-none border border-neutral-300">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center text-neutral-900 mb-2 font-bold uppercase tracking-tight">
            Заявка одобрена!
          </DialogTitle>
          <DialogDescription className="text-center text-lg text-neutral-600 mt-4">
            Поздравляем, <span className="font-semibold text-neutral-900">{lastName} {firstName}</span>. <br/>
            Вам одобрена сумма <span className="font-semibold text-neutral-900">${amount}</span> на <span className="font-semibold text-neutral-900">{term}</span> дней.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center mt-8">
          <Button onClick={onReturn} className="w-full bg-neutral-900 hover:bg-neutral-800 text-white rounded-none uppercase tracking-wide">
            Вернуться на основную страницу
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
