import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formata um ISO string para hora legível (ex: "09:00")
 */
export function formatTime(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "America/Sao_Paulo",
  });
}

/**
 * Formata uma data para exibição completa (ex: "Segunda-feira, 15 de Janeiro")
 */
export function formatDate(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone: "America/Sao_Paulo",
  });
}

/**
 * Formata uma data para YYYY-MM-DD (para a API)
 */
export function toApiDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Retorna os próximos N dias (excluindo domingo)
 */
export function getNextDays(count: number): Date[] {
  const days: Date[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let d = new Date(today);
  while (days.length < count) {
    d = new Date(d);
    d.setDate(d.getDate() + 1);
    // Pula domingo
    if (d.getDay() !== 0) {
      days.push(new Date(d));
    }
  }

  return days;
}

/**
 * Nomes dos dias da semana em pt-BR curto
 */
export function shortWeekday(date: Date): string {
  return date
    .toLocaleDateString("pt-BR", { weekday: "short" })
    .replace(".", "")
    .toUpperCase();
}

/**
 * Dia do mês formatado
 */
export function dayOfMonth(date: Date): string {
  return String(date.getDate()).padStart(2, "0");
}

export const SERVICOS = [
  { value: "corte", label: "Corte de Cabelo", duracao: "60 min" },
  { value: "corte-barba", label: "Corte + Barba", duracao: "90 min" },
  { value: "sobrancelha", label: "Sobrancelha", duracao: "30 min" },
  { value: "luzes", label: "Luzes", duracao: "120 min" },
  { value: "platinado", label: "Platinado", duracao: "180 min" },
] as const;
