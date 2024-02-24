import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const keysWithSpaces = (obj: {}) => {
  return Object.keys(obj).map((key) => key.replace(/_/g, ' '));
};

export const keysWithUnderscores = (obj: {}) => {
  return Object.keys(obj).map((key) => key.replace(/\s+/g, '_'));
};
