# 🚀 Como Subir no GitHub e Testar Localmente

## 📋 Pré-requisitos

Instale antes de começar:
- [Node.js 18+](https://nodejs.org/) — baixe a versão LTS
- [Git](https://git-scm.com/downloads)
- [pnpm](https://pnpm.io/) — rode: `npm install -g pnpm`

---

## 1️⃣ Criando o repositório no GitHub

1. Acesse [github.com](https://github.com) e faça login
2. Clique em **"New repository"** (botão verde no canto)
3. Configure:
   - **Repository name:** `barbearia-agendamento`
   - **Description:** Site de agendamento para barbearia
   - **Visibility:** Public (ou Private — sua escolha)
   - ⚠️ **NÃO marque** "Add a README file"
4. Clique em **"Create repository"**

---

## 2️⃣ Subindo o código no GitHub

Abra o terminal na pasta do projeto e rode:

```bash
# Entrar na pasta do projeto
cd barbearia

# Iniciar o git
git init

# Adicionar todos os arquivos
git add .

# Primeiro commit
git commit -m "feat: projeto inicial de agendamento para barbearia"

# Conectar ao repositório do GitHub (substitua SEU-USUARIO)
git remote add origin https://github.com/SEU-USUARIO/barbearia-agendamento.git

# Subir o código
git branch -M main
git push -u origin main
```

✅ Acesse seu GitHub — o código estará lá!

---

## 3️⃣ Configurando o Google Calendar API

### 3.1 Criar projeto no Google Cloud

1. Acesse [console.cloud.google.com](https://console.cloud.google.com)
2. Clique em **"Selecionar projeto"** → **"Novo projeto"**
3. Nome: `barbearia-agendamento` → **Criar**

### 3.2 Ativar a API

1. No menu lateral: **APIs e serviços** → **Biblioteca**
2. Pesquise: `Google Calendar API`
3. Clique → **Ativar**

### 3.3 Criar conta de serviço

1. Menu: **APIs e serviços** → **Credenciais**
2. **+ Criar credenciais** → **Conta de serviço**
3. Nome: `barbearia-calendar` → **Criar e continuar** → **Concluir**
4. Clique na conta de serviço criada
5. Aba **Chaves** → **Adicionar chave** → **Criar nova chave**
6. Tipo: **JSON** → **Criar**
7. ⬇️ O arquivo JSON será baixado — **guarde bem!**

### 3.4 Compartilhar o calendário com a conta de serviço

1. Abra o [Google Calendar](https://calendar.google.com)
2. Na barra lateral, encontre o calendário que quer usar (ou crie um novo)
3. Clique nos **3 pontinhos** → **Configurações e compartilhamento**
4. Em **"Compartilhar com pessoas específicas"** → **+ Adicionar pessoas**
5. Cole o e-mail da conta de serviço (está no JSON, campo `client_email`)
   - Ex: `barbearia-calendar@barbearia-agendamento.iam.gserviceaccount.com`
6. Permissão: **Fazer alterações em eventos** → **Enviar**

### 3.5 Pegar o Calendar ID

1. Na mesma página de configurações do calendário
2. Role até **"Integrar calendário"**
3. Copie o **"ID do calendário"**
   - Ex: `abc123xyz@group.calendar.google.com`

---

## 4️⃣ Rodando o Backend localmente

```bash
# Entrar na pasta do backend
cd barbearia/backend

# Instalar dependências
npm install

# Criar arquivo de configuração
cp .env.example .env
```

Abra o arquivo `.env` e preencha:

```env
PORT=3001
GOOGLE_SERVICE_ACCOUNT_EMAIL=cole-aqui-o-client_email-do-json
GOOGLE_PRIVATE_KEY="cole-aqui-o-private_key-do-json"
GOOGLE_CALENDAR_ID=cole-aqui-o-id-do-calendario
FRONTEND_URL=http://localhost:3000
```

⚠️ **Atenção com o GOOGLE_PRIVATE_KEY:**
- Abra o JSON baixado da conta de serviço
- Copie o valor do campo `"private_key"` (incluindo `-----BEGIN PRIVATE KEY-----`)
- Cole entre aspas duplas no `.env`

```bash
# Rodar o backend
npm run dev
```

✅ Você verá: `🚀 Backend rodando em http://localhost:3001`

**Teste rápido:** Abra no navegador:
`http://localhost:3001/health` → deve aparecer `{"status":"ok"}`

---

## 5️⃣ Rodando o Frontend localmente

```bash
# Abrir outro terminal e entrar na pasta do frontend
cd barbearia/frontend

# Instalar dependências
pnpm install

# Criar arquivo de configuração
cp .env.example .env.local
```

O `.env.local` já vem configurado para local:
```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
```

```bash
# Rodar o frontend
pnpm dev
```

✅ Acesse: [http://localhost:3000](http://localhost:3000)

---

## 6️⃣ Testando o sistema completo

Com os dois rodando:

1. Acesse `http://localhost:3000`
2. Clique em **"Agendar Horário"**
3. Escolha uma data
4. Veja os horários disponíveis puxados do Google Calendar
5. Selecione um horário
6. Preencha nome e serviço
7. Confirme

📅 Abra seu Google Calendar — o evento foi criado!

---

## 7️⃣ Deploy (publicar online)

### Frontend → Vercel (grátis)

1. Acesse [vercel.com](https://vercel.com) → Login com GitHub
2. **"Add New Project"** → Importe o repositório
3. **Root Directory:** `frontend`
4. Em **Environment Variables**, adicione:
   ```
   NEXT_PUBLIC_BACKEND_URL = https://sua-url-do-backend.railway.app
   ```
5. **Deploy!**

### Backend → Railway (grátis)

1. Acesse [railway.app](https://railway.app) → Login com GitHub
2. **"New Project"** → **"Deploy from GitHub repo"**
3. Selecione seu repositório
4. **Root Directory:** `backend`
5. Em **Variables**, adicione as mesmas variáveis do `.env`
6. **Deploy!**

Após o deploy do backend, volte ao Vercel e atualize a variável `NEXT_PUBLIC_BACKEND_URL` com a URL do Railway.

---

## 🐛 Problemas comuns

| Problema | Solução |
|---------|---------|
| `Cannot find module 'googleapis'` | Rode `npm install` no backend |
| `CORS error` no frontend | Verifique se `FRONTEND_URL` no backend está correto |
| Slots não aparecem | Verifique se o calendário foi compartilhado com a conta de serviço |
| `invalid_grant` | A chave privada pode ter formatação errada — as `\n` precisam ser reais |
| Backend não conecta | Certifique-se que `NEXT_PUBLIC_BACKEND_URL` aponta para a porta correta |

---

## 📁 Estrutura final do projeto

```
barbearia/
├── README.md
├── .gitignore
│
├── frontend/                    # Next.js 15 + TypeScript + Tailwind
│   ├── app/
│   │   ├── layout.tsx           # Layout raiz (fontes, toaster)
│   │   ├── globals.css          # Estilos globais premium
│   │   ├── page.tsx             # Landing page da barbearia
│   │   └── agendamento/
│   │       └── page.tsx         # Página de agendamento (3 steps)
│   ├── hooks/
│   │   ├── useSlots.ts          # Busca horários disponíveis
│   │   └── useAppointment.ts    # Cria agendamentos
│   ├── lib/
│   │   └── utils.ts             # Helpers de formatação
│   ├── .env.example
│   └── package.json
│
└── backend/                     # Node.js + Express
    ├── server.js                # Servidor principal
    ├── routes/
    │   ├── calendar.js          # GET /api/calendar/slots
    │   └── appointments.js      # POST/DELETE /api/appointments
    ├── services/
    │   └── googleCalendar.js    # Integração com Google Calendar API
    ├── .env.example
    └── package.json
```
