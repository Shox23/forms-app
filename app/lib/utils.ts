import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPhone(value: string): string {
  let val = value.replace(/\D/g, "");
  
  if (val.length > 0 && (val[0] === "7" || val[0] === "8")) {
    val = val.slice(1);
  }
  
  val = val.slice(0, 10);
  
  if (val.length === 0) return "";

  let masked = "+7";
  if (val.length > 0) masked += " (" + val.substring(0, 3);
  if (val.length >= 4) masked += ") " + val.substring(3, 6);
  if (val.length >= 7) masked += "-" + val.substring(6, 8);
  if (val.length >= 9) masked += "-" + val.substring(8, 10);

  return masked;
}

export function formatName(value: string): string {
  return value.replace(/[^a-zA-Zа-яА-ЯёЁ\s-]/g, "");
}
