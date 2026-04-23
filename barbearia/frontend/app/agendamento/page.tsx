"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Scissors, ChevronLeft, Check, Loader2, AlertCircle, Calendar, Clock, User, Phone } from "lucide-react";
import { toast } from "sonner";
import { useSlots } from "@/hooks/useSlots";
import { useAppointment } from "@/hooks/useAppointment";
import {
  formatTime,
  formatDate,
  toApiDate,
  getNextDays,
  shortWeekday,
  dayOfMonth,
  SERVICOS,
} from "@/lib/utils";

type Step = "data" | "horario" | "dados" | "confirmado";

export default function AgendamentoPage() {
  const [step, setStep] = useState<Step>("data");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<{ start: string; end: string } | null>(null);
  const [nome, setNome] = useState("");
  const [servico, setServico] = useState("");
  const [telefone, setTelefone] = useState("");

  const { slots, loading: loadingSlots, error: slotsError, fetchSlots } = useSlots();
  const { loading: loadingAppointment, error: appointmentError, success, result, createAppointment } = useAppointment();

  const nextDays = getNextDays(14);

  // Ao selecionar data, busca os slots
  useEffect(() => {
    if (selectedDate) {
      fetchSlots(toApiDate(selectedDate));
    }
  }, [selectedDate, fetchSlots]);

  // Ao confirmar agendamento
  useEffect(() => {
    if (success) {
      setStep("confirmado");
    }
  }, [success]);

  const handleSelectDate = (date: Date) => {
    setSelectedDate(date);
    setSelectedSlot(null);
    setStep("horario");
  };

  const handleSelectSlot = (slot: { start: string; end: string }) => {
    setSelectedSlot(slot);
    setStep("dados");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nome.trim() || nome.trim().length < 2) {
      toast.error("Informe seu nome completo");
      return;
    }
    if (!servico) {
      toast.error("Selecione um serviço");
      return;
    }
    if (!selectedSlot) {
      toast.error("Selecione um horário");
      return;
    }

    const ok = await createAppointment({
      nome: nome.trim(),
      servico,
      telefone,
      start: selectedSlot.start,
      end: selectedSlot.end,
    });

    if (!ok) {
      toast.error(appointmentError || "Erro ao agendar. Tente novamente.");
    }
  };

  const stepIndex = { data: 0, horario: 1, dados: 2, confirmado: 3 };
  const steps = [
    { key: "data", label: "Data" },
    { key: "horario", label: "Horário" },
    { key: "dados", label: "Dados" },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* HEADER */}
      <header className="border-b border-white/5 bg-[#0a0a0a]/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-white/40 hover:text-white transition-colors"
          >
            <ChevronLeft size={16} />
            <span className="text-xs tracking-widest uppercase" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Voltar
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <Scissors size={16} className="text-[#c9a84c]" strokeWidth={1.5} />
            <span
              className="text-sm font-bold tracking-widest uppercase"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Agendamento
            </span>
          </div>

          <div className="w-16" />
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12">
        {/* STEPS INDICATOR */}
        {step !== "confirmado" && (
          <div className="flex items-center justify-center gap-3 mb-12">
            {steps.map((s, i) => {
              const current = stepIndex[step];
              const isDone = i < current;
              const isActive = i === current;
              return (
                <div key={s.key} className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs transition-all ${
                        isDone
                          ? "bg-[#c9a84c] text-black"
                          : isActive
                          ? "bg-white text-black"
                          : "bg-white/10 text-white/30"
                      }`}
                    >
                      {isDone ? <Check size={12} /> : i + 1}
                    </div>
                    <span
                      className={`text-xs tracking-widest uppercase ${
                        isActive ? "text-white" : "text-white/30"
                      }`}
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {s.label}
                    </span>
                  </div>
                  {i < steps.length - 1 && (
                    <div
                      className={`w-12 h-px ${i < current ? "bg-[#c9a84c]" : "bg-white/10"}`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* STEP 1: SELECIONAR DATA */}
        {step === "data" && (
          <div>
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 text-[#c9a84c] mb-3">
                <Calendar size={16} />
                <span className="text-xs tracking-widest uppercase" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Escolha a data
                </span>
              </div>
              <h1
                className="text-4xl font-bold"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Quando você vem?
              </h1>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
              {nextDays.map((date) => {
                const isSelected =
                  selectedDate?.toDateString() === date.toDateString();
                return (
                  <button
                    key={date.toISOString()}
                    onClick={() => handleSelectDate(date)}
                    className={`p-3 border transition-all text-center group ${
                      isSelected
                        ? "border-[#c9a84c] bg-[#c9a84c]/10"
                        : "border-white/10 hover:border-white/30 hover:bg-white/5"
                    }`}
                  >
                    <div
                      className={`text-xs tracking-wider uppercase mb-1 ${
                        isSelected ? "text-[#c9a84c]" : "text-white/30"
                      }`}
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {shortWeekday(date)}
                    </div>
                    <div
                      className={`text-2xl font-bold ${
                        isSelected ? "text-[#c9a84c]" : "text-white/80"
                      }`}
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                      {dayOfMonth(date)}
                    </div>
                    <div
                      className="text-xs text-white/20 mt-1"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {date.toLocaleDateString("pt-BR", { month: "short" })}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 2: SELECIONAR HORÁRIO */}
        {step === "horario" && (
          <div>
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 text-[#c9a84c] mb-3">
                <Clock size={16} />
                <span className="text-xs tracking-widest uppercase" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Escolha o horário
                </span>
              </div>
              <h1
                className="text-4xl font-bold"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {selectedDate
                  ? formatDate(selectedDate.toISOString())
                  : "Que horas?"}
              </h1>
            </div>

            {loadingSlots && (
              <div className="flex flex-col items-center gap-4 py-16">
                <Loader2 size={32} className="text-[#c9a84c] animate-spin" />
                <p className="text-white/40 text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Verificando horários disponíveis...
                </p>
              </div>
            )}

            {slotsError && !loadingSlots && (
              <div className="flex flex-col items-center gap-4 py-16">
                <AlertCircle size={32} className="text-red-400" />
                <p className="text-white/60 text-sm text-center" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  {slotsError}
                </p>
              </div>
            )}

            {!loadingSlots && !slotsError && slots.length === 0 && (
              <div className="text-center py-16">
                <Clock size={32} className="text-white/20 mx-auto mb-4" />
                <p className="text-white/40 text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Nenhum horário disponível neste dia.
                </p>
                <button
                  onClick={() => setStep("data")}
                  className="mt-4 text-xs tracking-widest uppercase text-[#c9a84c] hover:text-white transition-colors"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  ← Escolher outra data
                </button>
              </div>
            )}

            {!loadingSlots && slots.length > 0 && (
              <>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                  {slots.map((slot) => {
                    const isSelected = selectedSlot?.start === slot.start;
                    return (
                      <button
                        key={slot.start}
                        onClick={() => handleSelectSlot(slot)}
                        className={`py-4 border text-center transition-all ${
                          isSelected
                            ? "border-[#c9a84c] bg-[#c9a84c]/10 text-[#c9a84c]"
                            : "border-white/10 hover:border-white/40 text-white/70 hover:text-white"
                        }`}
                      >
                        <span
                          className="text-lg font-bold"
                          style={{ fontFamily: "'Cormorant Garamond', serif" }}
                        >
                          {formatTime(slot.start)}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-6 text-center">
                  <button
                    onClick={() => setStep("data")}
                    className="text-xs tracking-widest uppercase text-white/30 hover:text-white transition-colors"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    ← Mudar data
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {/* STEP 3: DADOS DO CLIENTE */}
        {step === "dados" && (
          <div>
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 text-[#c9a84c] mb-3">
                <User size={16} />
                <span className="text-xs tracking-widest uppercase" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Seus dados
                </span>
              </div>
              <h1
                className="text-4xl font-bold"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Quase lá!
              </h1>

              {/* Resumo do agendamento */}
              {selectedDate && selectedSlot && (
                <div className="mt-4 inline-flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 text-xs text-white/50">
                  <span style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    {selectedDate.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" })}
                  </span>
                  <span className="text-white/20">|</span>
                  <span className="text-[#c9a84c]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    {formatTime(selectedSlot.start)}
                  </span>
                  <button
                    onClick={() => setStep("horario")}
                    className="text-white/30 hover:text-white transition-colors ml-2"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    alterar
                  </button>
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 max-w-md mx-auto">
              {/* Nome */}
              <div>
                <label
                  className="block text-xs tracking-widest uppercase text-white/40 mb-2"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Nome completo *
                </label>
                <div className="relative">
                  <User size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
                  <input
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Seu nome"
                    required
                    className="w-full bg-white/5 border border-white/10 text-white placeholder-white/20 pl-10 pr-4 py-3.5 text-sm focus:outline-none focus:border-[#c9a84c] transition-colors"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  />
                </div>
              </div>

              {/* Telefone */}
              <div>
                <label
                  className="block text-xs tracking-widest uppercase text-white/40 mb-2"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Telefone / WhatsApp
                </label>
                <div className="relative">
                  <Phone size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
                  <input
                    type="tel"
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                    placeholder="(19) 99999-9999"
                    className="w-full bg-white/5 border border-white/10 text-white placeholder-white/20 pl-10 pr-4 py-3.5 text-sm focus:outline-none focus:border-[#c9a84c] transition-colors"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  />
                </div>
              </div>

              {/* Serviço */}
              <div>
                <label
                  className="block text-xs tracking-widest uppercase text-white/40 mb-2"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Serviço *
                </label>
                <select
                  value={servico}
                  onChange={(e) => setServico(e.target.value)}
                  required
                  className="w-full bg-white/5 border border-white/10 text-white px-4 py-3.5 text-sm focus:outline-none focus:border-[#c9a84c] transition-colors appearance-none cursor-pointer"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  <option value="" disabled className="bg-[#111]">
                    Selecione um serviço
                  </option>
                  {SERVICOS.map((s) => (
                    <option key={s.value} value={s.value} className="bg-[#111]">
                      {s.label} — {s.duracao}
                    </option>
                  ))}
                </select>
              </div>

              {appointmentError && (
                <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 border border-red-400/20 px-4 py-3">
                  <AlertCircle size={14} />
                  <span style={{ fontFamily: "'DM Sans', sans-serif" }}>{appointmentError}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loadingAppointment}
                className="w-full py-4 bg-white text-black text-xs tracking-[0.2em] uppercase font-bold hover:bg-[#c9a84c] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {loadingAppointment ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    Confirmando...
                  </>
                ) : (
                  "Confirmar Agendamento"
                )}
              </button>
            </form>
          </div>
        )}

        {/* STEP 4: CONFIRMADO */}
        {step === "confirmado" && result && (
          <div className="text-center py-8">
            <div className="w-20 h-20 bg-[#c9a84c]/10 border border-[#c9a84c]/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check size={36} className="text-[#c9a84c]" />
            </div>

            <h1
              className="text-4xl font-bold mb-2"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Agendado!
            </h1>
            <p
              className="text-white/40 mb-8 text-sm"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Seu horário foi confirmado com sucesso.
            </p>

            {/* Resumo */}
            <div className="max-w-sm mx-auto border border-white/10 bg-white/5 divide-y divide-white/5 text-left mb-8">
              {[
                { label: "Nome", value: result.appointment.nome },
                {
                  label: "Serviço",
                  value:
                    SERVICOS.find((s) => s.value === result.appointment.servico)
                      ?.label || result.appointment.servico,
                },
                {
                  label: "Data",
                  value: formatDate(result.appointment.start),
                },
                {
                  label: "Horário",
                  value: `${formatTime(result.appointment.start)} – ${formatTime(result.appointment.end)}`,
                },
              ].map((item) => (
                <div key={item.label} className="flex justify-between px-5 py-3">
                  <span
                    className="text-xs text-white/30 tracking-wider uppercase"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {item.label}
                  </span>
                  <span
                    className="text-sm text-white font-medium"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/"
                className="text-xs tracking-[0.2em] uppercase font-bold px-8 py-3 bg-white text-black hover:bg-[#c9a84c] transition-colors"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Voltar ao início
              </Link>
              {result.eventLink && (
                <a
                  href={result.eventLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs tracking-[0.2em] uppercase font-bold px-8 py-3 border border-white/20 text-white/60 hover:border-white hover:text-white transition-colors"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Ver no Google Calendar
                </a>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
