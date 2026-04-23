const express = require("express");
const router = express.Router();
const { createAppointment, cancelAppointment } = require("../services/googleCalendar");

/**
 * POST /api/appointments
 * Cria um novo agendamento
 * Body: { nome, servico, telefone, start, end }
 */
router.post("/", async (req, res) => {
  try {
    const { nome, servico, telefone, start, end } = req.body;

    // Validações
    if (!nome || !servico || !start || !end) {
      return res.status(400).json({
        error: "Campos obrigatórios: nome, servico, start, end",
      });
    }

    if (nome.trim().length < 2) {
      return res.status(400).json({ error: "Nome muito curto" });
    }

    const servicosValidos = ["corte", "sobrancelha", "luzes", "platinado", "corte-barba"];
    if (!servicosValidos.includes(servico)) {
      return res.status(400).json({ error: "Serviço inválido" });
    }

    // Verifica se a data/hora não é no passado
    if (new Date(start) <= new Date()) {
      return res.status(400).json({ error: "Não é possível agendar em horários passados" });
    }

    const event = await createAppointment({ nome, servico, telefone, start, end });

    res.status(201).json({
      success: true,
      message: "Agendamento confirmado!",
      eventId: event.id,
      eventLink: event.htmlLink,
      appointment: {
        nome,
        servico,
        start,
        end,
      },
    });
  } catch (error) {
    console.error("Erro ao criar agendamento:", error.message);

    // Erro de conflito no Google Calendar
    if (error.code === 409) {
      return res.status(409).json({ error: "Horário já ocupado. Por favor escolha outro." });
    }

    res.status(500).json({ error: "Erro ao criar agendamento" });
  }
});

/**
 * DELETE /api/appointments/:eventId
 * Cancela um agendamento
 */
router.delete("/:eventId", async (req, res) => {
  try {
    const { eventId } = req.params;

    if (!eventId) {
      return res.status(400).json({ error: "ID do evento é obrigatório" });
    }

    await cancelAppointment(eventId);

    res.json({ success: true, message: "Agendamento cancelado" });
  } catch (error) {
    console.error("Erro ao cancelar agendamento:", error.message);
    res.status(500).json({ error: "Erro ao cancelar agendamento" });
  }
});

module.exports = router;
