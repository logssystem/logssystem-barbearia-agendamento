require("dotenv").config();
const express = require("express");
const cors = require("cors");

const calendarRoutes = require("./routes/calendar");
const appointmentRoutes = require("./routes/appointments");

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL || "http://localhost:3000",
      /\.vercel\.app$/,
    ],
    methods: ["GET", "POST", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Rotas
app.use("/api/calendar", calendarRoutes);
app.use("/api/appointments", appointmentRoutes);

// 404
app.use((req, res) => {
  res.status(404).json({ error: "Rota não encontrada" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Erro interno do servidor" });
});

app.listen(PORT, () => {
  console.log(`🚀 Backend rodando em http://localhost:${PORT}`);
});
