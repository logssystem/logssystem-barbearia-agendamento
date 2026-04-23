"use client";

import { useState } from "react";

export interface AppointmentData {
  nome: string;
  servico: string;
  telefone?: string;
  start: string;
  end: string;
}

export interface AppointmentResult {
  eventId: string;
  eventLink: string;
  appointment: AppointmentData;
}

interface UseAppointmentReturn {
  loading: boolean;
  error: string | null;
  success: boolean;
  result: AppointmentResult | null;
  createAppointment: (data: AppointmentData) => Promise<boolean>;
  reset: () => void;
}

export function useAppointment(): UseAppointmentReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [result, setResult] = useState<AppointmentResult | null>(null);

  const createAppointment = async (data: AppointmentData): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      const backendUrl =
        process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";
      const res = await fetch(`${backendUrl}/api/appointments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || "Erro ao criar agendamento");
      }

      setResult(json);
      setSuccess(true);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro inesperado");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setLoading(false);
    setError(null);
    setSuccess(false);
    setResult(null);
  };

  return { loading, error, success, result, createAppointment, reset };
}
