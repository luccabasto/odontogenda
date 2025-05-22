
# 🦷 OdontGenda

Sistema mobile de agendamento odontológico feito em React Native com Expo, utilizando uma API fake com `json-server`.

## 👨‍💻 Integrantes

- Lucas Basto - **553771**
- Erick Lopes - **553927**
- Marcelo Galli - **553654**

---

## 🚀 Tecnologias utilizadas

- React Native
- Expo
- TypeScript
- React Navigation
- Context API
- JSON Server (para simular backend)

---

## 📦 Instalação do Projeto

### 1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/odontgenda.git
cd odontgenda/Agenda
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Inicie o servidor fake
```bash
npx json-server --watch db.json --port 3000
```
> Certifique-se de que o `json-server` esteja instalado globalmente:
> ```bash
> npm install -g json-server
> ```

### 4. Inicie o app
```bash
npx expo start
```

---

## 📱 Funcionalidades

- Login de usuários 👤
- Visualização de agendamentos 📅
- Cadastro de pacientes 📝
- Navegação entre telas com React Navigation

---

## 🌐 Back-end com JSON Server

### Arquivo `db.json` de exemplo:
```json
{
  "usuarios": [
    {
      "id": "1",
      "username": "usuario1",
      "password": "senha1"
    }
  ]
}
```

A aplicação se conecta via `fetch` para `http://localhost:3000/usuarios`. Para APKs reais, hospede o `db.json` em um servidor como [Render](https://render.com) ou [Replit](https://replit.com).

---

## 🧪 Teste Rápido (Exemplo)

1. Execute `json-server`
2. Abra o app
3. Use:
   - **Usuário:** usuario1
   - **Senha:** senha1

---

## 🛠 Scripts úteis

```bash
npm run start         # Inicia o Expo
npm run android       # Build para Android
npm run ios           # Build para iOS
npm run server        # Inicia o JSON Server
```

Para adicionar:
```json
"scripts": {
  "server": "json-server --watch db.json --port 3000"
}
```

---

## 📦 Build com EAS

```bash
eas build:configure
eas build -p android --profile preview
```

Acesse `eas build:list` para ver links de APK gerados.

---

## 🧠 Observações

- O `json-server` é apenas para desenvolvimento.

---
