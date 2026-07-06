# 📅 Agendamento Fácil — Salão Digital

Sistema de **auto agendamento** para salões de beleza. O cliente acessa o link, escolhe a data, horário e confirma o atendimento — sem precisar ligar ou mandar mensagem.

---

## ✨ Funcionalidades

- Auto agendamento pelo cliente, sem intervenção do salão
- Calendário visual com navegação por mês
- Bloqueio automático de datas e horários já ocupados
- Bloqueio de horários passados no dia atual
- Seleção de múltiplos serviços com profissional por serviço *(implementado, desativado temporariamente)*
- Resumo do total antes de confirmar
- Tela de sucesso após confirmação
- Layout responsivo — funciona em celular, tablet e desktop
- `empresaId` recebido via URL (`?empresaId=3`), sem variáveis de ambiente

---

## 🛠 Tecnologias utilizadas

| Tecnologia | Uso |
|---|---|
| [React 19](https://react.dev) | Interface do usuário |
| [TypeScript](https://www.typescriptlang.org) | Tipagem estática |
| [Vite](https://vite.dev) | Bundler e servidor de desenvolvimento |
| [CSS Modules](https://github.com/css-modules/css-modules) | Estilização com escopo por componente |
| [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) | Comunicação com a API REST |
| [Oxlint](https://oxc.rs/docs/guide/usage/linter) | Linting rápido do código |

---

## 🗂 Estrutura do projeto

```
src/
├── components/
│   ├── AgendamentoForm.tsx      # Formulário principal de agendamento
│   ├── CalendarioSelector.tsx   # Calendário customizado com grade de dias
│   ├── Field.tsx                # Campo de formulário reutilizável com label e erro
│   └── SuccessScreen.tsx        # Tela exibida após confirmação do agendamento
├── mock/
│   └── horarios.ts              # Mock de horários ocupados e helpers de validação
├── utils/
│   ├── formatereal.ts           # Formatação de valores monetários (R$)
│   └── formatPhone.ts           # Formatação de telefone
├── api.ts                       # Funções de comunicação com a API REST
├── types.ts                     # Interfaces e tipos TypeScript
├── App.tsx                      # Componente raiz, lê empresaId da URL
└── index.css                    # Variáveis CSS globais (paleta de cores)
```

---

## 🎨 Paleta de cores

| Variável | Cor | Uso |
|---|---|---|
| `--bg` | `#F5F0E8` | Fundo da página |
| `--dark1` | `#4A4035` | Texto principal |
| `--dark2` | `#3D3535` | Texto secundário |
| `--grad-start` | `#D4A5A5` | Início do gradiente |
| `--grad-end` | `#C4855A` | Fim do gradiente / destaque |
| `--accent1` | `#7A9E87` | Status em andamento |
| `--accent2` | `#C9A84C` | Status agendado |

---

## 🔌 API

Base URL: `https://meu-salao-digital-api.onrender.com/api/v1`

| Método | Endpoint | Descrição |
|---|---|---|
| `POST` | `/atendimento/cadastrar` | Cria um novo atendimento |
| `POST` | `/atendimento-servico/cadastrar` | Associa um serviço ao atendimento |
| `GET` | `/servico/buscar?empresaId=` | Lista os serviços da empresa |
| `GET` | `/usuario/buscar-todos?empresaId=` | Lista os profissionais da empresa |

---

## 🚀 Como rodar

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento (acessível na rede local)
npm run dev

# Build para produção
npm run build
```

Acesse no navegador:
```
http://localhost:5173/?empresaId=3
```

Para acessar pelo celular na mesma rede Wi-Fi, use o endereço **Network** exibido no terminal:
```
http://192.168.x.x:5173/?empresaId=3
```

---

## 📋 Observações

- O parâmetro `empresaId` é **obrigatório** na URL. Sem ele, o sistema exibe uma mensagem de erro amigável.
- Os horários disponíveis são: `08:00`, `09:00`, `10:00`, `11:00`, `13:00`, `14:00`, `15:00`, `16:00`, `17:00`.
- O agendamento só permite datas dentro de um intervalo de **hoje até 7 dias à frente**.
- Os horários ocupados estão atualmente em mock (`src/mock/horarios.ts`) e podem ser substituídos por uma consulta real à API.
