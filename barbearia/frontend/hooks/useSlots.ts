"use client";

import { useState, useCallback } from "react";

export interface TimeSlot {
  start: string;
  end: string;
}

interface UseSlotsReturn {
  slots: TimeSlot[];
  loading: boolean;
  error: string | null;
  fetchSlots: (date: string) => Promise<void>;
}

export function useSlots(): UseSlotsReturn {
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSlots = useCallback(async (date: string) => {
    setLoading(true);
    setError(null);
    setSlots([]);

    try {
      const backendUrl =
        process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";
      const res = await fetch(
        `${backendUrl}/api/calendar/slots?date=${date}`
      );

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Erro ao buscar horários");
      }

      const data = await res.json();

      if (data.message) {
        setError(data.message);
      } else {
        setSlots(data.available || []);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro inesperado");
    } finally {
      setLoading(false);
    }
  }, []);

  return { slots, loading, error, fetchSlots };
}
