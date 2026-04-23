const express = require("express");
const router = express.Router();
const { getAvailableSlots } = require("../services/googleCalendar");

/**
 * GET /api/calendar/slots?date=2024-01-15
 * Retorna horários disponíveis para uma data
 */
router.get("/slots", async (req, res) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ error: "Parâmetro 'date' é obrigatório (formato: YYYY-MM-DD)" });
    }

    // Valida formato da data
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
      return res.status(400).json({ error: "Formato de data inválido. Use YYYY-MM-DD" });
    }

    // Não permite datas no passado
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      return res.status(400).json({ error: "Não é possível agendar em datas passadas" });
    }

    const result = await getAvailableSlots(date);
    res.json(result);
  } catch (error) {
    console.error("Erro ao buscar horários:", error.message);
    res.status(500).json({ error: "Erro ao buscar horários disponíveis" });
  }
});

module.exports = router;
