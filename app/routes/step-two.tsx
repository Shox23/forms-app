import { useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { useFormStore } from "../store/formStore";
import { useCategories } from "../hooks/useCategories";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Button } from "../components/ui/button";
import { Skeleton } from "../components/ui/skeleton";
import { ROUTES } from "../lib/constants";

export default function Step2AddressWork() {
  const { data, updateData, isValidStep1, isValidStep2, direction, setDirection } = useFormStore();
  const navigate = useNavigate();
  const { categories, isLoading, error } = useCategories();
  const [showErrors, setShowErrors] = useState(false);

  if (!isValidStep1) {
    return <Navigate to={ROUTES.STEP_ONE} replace />;
  }

  const handleNext = () => {
    if (isValidStep2) {
      setDirection("forward");
      navigate(ROUTES.STEP_THREE);
    } else {
      setShowErrors(true);
    }
  };

  const handleBack = () => {
    setDirection("backward");
    navigate(ROUTES.STEP_ONE);
  };

  return (
    <div className={`max-w-md mx-auto p-8 bg-white rounded-none shadow-sm border border-neutral-200 ${direction === "backward" ? "animate-slide-backward" : "animate-slide-forward"}`}>
      <h2 className="text-xl font-semibold mb-6 text-neutral-900 tracking-tight uppercase">Шаг 2: Адрес и место работы</h2>
      
      <div className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="workPlace" className="text-neutral-700 font-medium">Место работы</Label>
          {isLoading ? (
             <Skeleton className="h-10 w-full rounded-none" />
          ) : error ? (
             <div className="text-sm text-red-600 font-medium">Ошибка: {error}</div>
          ) : (
            <Select value={data.workPlace} onValueChange={(val) => updateData({ workPlace: val })}>
              <SelectTrigger className={showErrors && !data.workPlace ? "border-red-600 focus-visible:ring-red-600" : ""}>
                <SelectValue placeholder="Выберите место работы" />
              </SelectTrigger>
              <SelectContent position="popper" side="bottom" sideOffset={4}>
                {categories.map((cat, idx) => (
                  <SelectItem key={idx} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          {showErrors && !data.workPlace && (
            <p className="text-xs text-red-600 font-medium mt-1">Обязательное поле</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="address" className="text-neutral-700 font-medium">Адрес проживания</Label>
          <Input 
            id="address" 
            value={data.address} 
            onChange={(e) => updateData({ address: e.target.value })} 
            className={showErrors && !data.address.trim() ? "border-red-600 focus-visible:ring-red-600" : ""}
          />
          {showErrors && !data.address.trim() && (
            <p className="text-xs text-red-600 font-medium mt-1">Обязательное поле</p>
          )}
        </div>

        <div className="flex justify-between mt-8 space-x-4">
          <Button variant="outline" onClick={handleBack} className="w-1/2 rounded-none border-neutral-300 text-neutral-700 hover:bg-neutral-50 uppercase">
            НАЗАД
          </Button>
          <Button onClick={handleNext} className="w-1/2 bg-neutral-900 hover:bg-neutral-800 text-white rounded-none uppercase">
            ДАЛЕЕ
          </Button>
        </div>
      </div>
    </div>
  );
}
