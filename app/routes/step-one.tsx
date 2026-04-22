import { useState } from "react";
import { useNavigate } from "react-router";
import { useFormStore } from "../store/formStore";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Button } from "../components/ui/button";
import { formatName, formatPhone } from "../lib/utils";
import { PHONE_REGEX, ROUTES } from "../lib/constants";

export default function Step1Personal() {
  const { data, updateData, isValidStep1, direction, setDirection } = useFormStore();
  const navigate = useNavigate();
  const [showErrors, setShowErrors] = useState(false);

  const handleNext = () => {
    if (isValidStep1) {
      setDirection("forward");
      navigate(ROUTES.STEP_TWO);
    } else {
      setShowErrors(true);
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateData({ phone: formatPhone(e.target.value) });
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>, field: "firstName" | "lastName") => {
    updateData({ [field]: formatName(e.target.value) });
  };

  return (
    <div className={`max-w-md mx-auto p-8 bg-white rounded-none shadow-sm border border-neutral-200 ${direction === "backward" ? "animate-slide-backward" : "animate-slide-forward"}`}>
      <h2 className="text-xl font-semibold mb-6 text-neutral-900 tracking-tight uppercase">Шаг 1: Личные данные</h2>
      
      <div className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-neutral-700 font-medium">Телефон</Label>
          <Input 
            id="phone" 
            type="tel" 
            placeholder="+7 (999) 000-00-00" 
            value={data.phone} 
            onChange={handlePhoneChange} 
            className={showErrors && !PHONE_REGEX.test(data.phone) ? "border-red-600 focus-visible:ring-red-600" : ""}
          />
          {showErrors && !PHONE_REGEX.test(data.phone) && (
            <p className="text-xs text-red-600 font-medium mt-1">Введите телефон в формате +7 (XXX) XXX-XX-XX</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="firstName" className="text-neutral-700 font-medium">Имя</Label>
          <Input 
            id="firstName" 
            value={data.firstName} 
            onChange={(e) => handleNameChange(e, "firstName")} 
            className={showErrors && !data.firstName.trim() ? "border-red-600 focus-visible:ring-red-600" : ""}
          />
          {showErrors && !data.firstName.trim() && (
            <p className="text-xs text-red-600 font-medium mt-1">Обязательное поле</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName" className="text-neutral-700 font-medium">Фамилия</Label>
          <Input 
            id="lastName" 
            value={data.lastName} 
            onChange={(e) => handleNameChange(e, "lastName")} 
            className={showErrors && !data.lastName.trim() ? "border-red-600 focus-visible:ring-red-600" : ""}
          />
          {showErrors && !data.lastName.trim() && (
            <p className="text-xs text-red-600 font-medium mt-1">Обязательное поле</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="gender" className="text-neutral-700 font-medium">Пол</Label>
          <Select value={data.gender} onValueChange={(val) => updateData({ gender: val })}>
            <SelectTrigger className={showErrors && !data.gender ? "border-red-600 focus-visible:ring-red-600" : ""}>
              <SelectValue placeholder="Выберите пол" />
            </SelectTrigger>
            <SelectContent position="popper" side="bottom" sideOffset={4}>
              <SelectItem value="Мужской">Мужской</SelectItem>
              <SelectItem value="Женский">Женский</SelectItem>
            </SelectContent>
          </Select>
          {showErrors && !data.gender && (
            <p className="text-xs text-red-600 font-medium mt-1">Обязательное поле</p>
          )}
        </div>

        <Button onClick={handleNext} className="w-full mt-8 bg-neutral-900 hover:bg-neutral-800 text-white rounded-none">
          ДАЛЕЕ
        </Button>
      </div>
    </div>
  );
}
