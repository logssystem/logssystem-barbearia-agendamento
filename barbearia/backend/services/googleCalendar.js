const { google } = require("googleapis");

const SCOPES = ["https://www.googleapis.com/auth/calendar"];

const BUSINESS_START = parseInt(process.env.BUSINESS_START_HOUR || "9");
const BUSINESS_END = parseInt(process.env.BUSINESS_END_HOUR || "19");
const SLOT_DURATION = parseInt(process.env.SLOT_DURATION_MINUTES || "60");

function getAuthClient() {
  const auth = new google.auth.JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    scopes: SCOPES,
  });
  return auth;
}

function getCalendar() {
  const auth = getAuthClient();
  return google.calendar({ version: "v3", auth });
}

/**
 * Gera todos os slots de horário para um dia
 */
function generateDaySlots(date) {
  const slots = [];
  const day = new Date(date);

  // Pula fins de semana (0 = domingo, 6 = sábado)
  // Remova esse check se trabalhar nos fins de semana
  const dayOfWeek = day.getDay();
  if (dayOfWeek === 0 || dayOfWeek === 6) return slots;

  for (let hour = BUSINESS_START; hour < BUSINESS_END; hour++) {
    const start = new Date(day);
    start.setHours(hour, 0, 0, 0);

    const end = new Date(start);
    end.setMinutes(end.getMinutes() + SLOT_DURATION);

    slots.push({ start: start.toISOString(), end: end.toISOString() });
  }

  return slots;
}

/**
 * Busca eventos ocupados no Google Calendar para uma data
 */
async function getBusySlots(date) {
  const calendar = getCalendar();
  const calendarId = process.env.GOOGLE_CALENDAR_ID;

  const dayStart = new Date(date);
  dayStart.setHours(0, 0, 0, 0);

  const dayEnd = new Date(date);
  dayEnd.setHours(23, 59, 59, 999);

  const response = await calendar.freebusy.query({
    requestBody: {
      timeMin: dayStart.toISOString(),
      timeMax: dayEnd.toISOString(),
      items: [{ id: calendarId }],
    },
  });

  const busyTimes = response.data.calendars[calendarId]?.busy || [];
  return busyTimes;
}

/**
 * Verifica se dois intervalos de tempo se sobrepõem
 */
function isOverlapping(slot, busyPeriod) {
  const slotStart = new Date(slot.start);
  const slotEnd = new Date(slot.end);
  const busyStart = new Date(busyPeriod.start);
  const busyEnd = new Date(busyPeriod.end);

  return slotStart < busyEnd && slotEnd > busyStart;
}

/**
 * Retorna horários disponíveis para uma data
 */
async function getAvailableSlots(date) {
  const allSlots = generateDaySlots(date);

  if (allSlots.length === 0) {
    return { available: [], message: "Sem atendimento neste dia" };
  }

  const busySlots = await getBusySlots(date);

  const now = new Date();
  const available = allSlots.filter((slot) => {
    // Remove slots no passado
    if (new Date(slot.start) <= now) return false;

    // Remove slots ocupados
    const isBusy = busySlots.some((busy) => isOverlapping(slot, busy));
    return !isBusy;
  });

  return { available };
}

/**
 * Cria um evento no Google Calendar
 */
async function createAppointment({ nome, servico, telefone, start, end }) {
  const calendar = getCalendar();
  const calendarId = process.env.GOOGLE_CALENDAR_ID;

  const servicosMap = {
    corte: "Corte de Cabelo",
    sobrancelha: "Sobrancelha",
    luzes: "Luzes",
    platinado: "Platinado",
    "corte-barba": "Corte + Barba",
  };

  const nomeServico = servicosMap[servico] || servico;

  const event = {
    summary: `${nomeServico} — ${nome}`,
    description: `Serviço: ${nomeServico}\nCliente: ${nome}\nTelefone: ${telefone || "Não informado"}`,
    start: {
      dateTime: start,
      timeZone: "America/Sao_Paulo",
    },
    end: {
      dateTime: end,
      timeZone: "America/Sao_Paulo",
    },
    colorId: "1", // Azul no Google Calendar
  };

  const response = await calendar.events.insert({
    calendarId,
    requestBody: event,
  });

  return response.data;
}

/**
 * Cancela um agendamento (deleta o evento)
 */
async function cancelAppointment(eventId) {
  const calendar = getCalendar();
  const calendarId = process.env.GOOGLE_CALENDAR_ID;

  await calendar.events.delete({
    calendarId,
    eventId,
  });
}

module.exports = {
  getAvailableSlots,
  createAppointment,
  cancelAppointment,
};
