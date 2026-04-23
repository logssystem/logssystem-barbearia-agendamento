# ✂️ Barbearia — Sistema de Agendamento

Site completo de agendamento para barbearia com integração ao **Google Calendar**.

## 🗂️ Estrutura do Projeto

```
barbearia/
├── frontend/        # Next.js 15 + TypeScript + Tailwind + shadcn/ui
└── backend/         # Node.js + Express + Google Calendar API
```

---

## 🚀 Como rodar localmente

### Pré-requisitos
- Node.js 18+
- pnpm (`npm install -g pnpm`)
- Conta Google com Google Calendar API habilitada

---

### 1. Configurar o Google Calendar API

1. Acesse [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um novo projeto (ex: `barbearia-agendamento`)
3. Ative a **Google Calendar API**
4. Vá em **Credenciais** → Criar credenciais → **Conta de serviço**
5. Baixe o arquivo JSON da conta de serviço
6. No seu Google Calendar, compartilhe o calendário com o e-mail da conta de serviço (com permissão de editar)
7. Copie o **Calendar ID** (em Configurações do calendário)

---

### 2. Backend

```bash
cd backend
npm install
cp .env.example .env
# Preencha as variáveis no .env
npm run dev
```

Variáveis do `.env`:
```env
PORT=3001
GOOGLE_SERVICE_ACCOUNT_EMAIL=sua-conta@projeto.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_CALENDAR_ID=seu-calendario@group.calendar.google.com
FRONTEND_URL=http://localhost:3000
```

---

### 3. Frontend

```bash
cd frontend
pnpm install
cp .env.example .env.local
# Preencha as variáveis no .env.local
pnpm dev
```

Variáveis do `.env.local`:
```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
```

---

## 🌐 Deploy

### Frontend → Vercel
1. Suba o repositório no GitHub
2. Conecte no [Vercel](https://vercel.com)
3. Configure as variáveis de ambiente
4. Deploy automático!

### Backend → Railway / Render
1. Conecte o repositório no [Railway](https://railway.app) ou [Render](https://render.com)
2. Configure as variáveis de ambiente
3. Deploy automático!

---

## ✨ Funcionalidades

- [x] Landing page da barbearia (design premium preto/branco)
- [x] Listagem de serviços
- [x] Calendário de agendamento integrado ao Google Calendar
- [x] Horários disponíveis/indisponíveis em tempo real
- [x] Confirmação de agendamento com criação de evento no Google Calendar
- [x] E-mail de confirmação para o cliente
- [ ] Pagamento (próxima fase — Mercado Pago / Stripe)
- [ ] Painel administrativo
- [ ] Login de cliente

---

## 🛠️ Tecnologias

| Parte | Tecnologia |
|-------|-----------|
| Frontend | Next.js 15, TypeScript, Tailwind CSS v4, shadcn/ui |
| Backend | Node.js, Express, googleapis |
| Calendário | Google Calendar API v3 |
| Deploy FE | Vercel |
| Deploy BE | Railway ou Render |
