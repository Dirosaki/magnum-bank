<img src="https://imgur.com/klM8zaK.png"/>

# Desafio Front-End Magnum Bank

### Screenshots

| Login                                        | Cadastro                                     | Home                                         | Modal de Transferência                       |
| -------------------------------------------- | -------------------------------------------- | -------------------------------------------- | -------------------------------------------- |
| ![Screenshot](https://imgur.com/4So0BNJ.png) | ![Screenshot](https://imgur.com/pir5B3s.png) | ![Screenshot](https://imgur.com/2TNqOOv.png) | ![Screenshot](https://imgur.com/mFbGahI.png) |

---

### Demonstração

Visualize a aplicação:
[https://magnum-bank.vercel.app/](https://magnum-bank.vercel.app/)

---

### Rodando localmente

Clone o projeto

```bash
  git clone https://github.com/Dirosaki/magnum-bank.git
```

Entre no diretório do projeto

```bash
  cd magnum-bank
```

Instale as dependências

```bash
  npm install
```

Inicie o servidor

```bash
  npm run dev
```

---

### Variáveis de ambiente

```
DATABASE_URL=
DIRECT_URL=
JWT_SECRET=
```

---

### Tecnologias e serviços utilizados

**Princípais:** `ReactJS`, `NextJS`, `Prisma`, `Typescript`, `Zustand`, `React Query`, `React-Router-Dom`, `React-Hook-Form`, `Zod`, `TailwindCSS`, `ShadCn`, `Motion`, `Vercel` e `Neon`.
**Outras:** `Eslint`, `Prettier`, `Husky` e `Lint-Staged`.

<details>
<summary>Por que as escolhi?</summary>

- `NextJS`: Como precisava de um fluxo de autenticação JWT, decidi usar o NextJS para poder criar, e acabei criando o back-end das transações também, além de aprender um pouco sobre o Next 15 que ainda não tinha utilizado.

- `Zustand`: Ele é bem leve e bem performático, nessa aplicação lidei com poucos estados, utilizei ele mais para gerenciar o saldo do usuário e os modais.

- `React Query`: Utilizei essa biblioteca para lidar com o gerenciamento de estados assíncronos, tem muitas outras ferramentas dessa biblioteca que faltou utilizar para aprimorar ainda mais essa aplicação.

- `react-hook-form`: Sintaxe mais simples, mais performático e o `formik` caiu no esquecimento.

- `tailwindCSS`: Quando se fala de produtividade acho que esta biblioteca se sobressai muito em relação ao `styled-components`, apesar de ter mais experiência com styled-components, estou optando por tailwindCSS em todos os projetos novos.

- `react-router-dom`: Quando se fala de roteamento definitivamente essa é a biblioteca mais utilizada e com maior comunidade, além de me sentir totalmente confortável com ela.

</details>

---

### Referências

- [ChatGPT](https://chat.openai.com/) - Utilizei o ChatGPT para me auxiliar na criação da função que gera um saldo aleatório para o usuário.
- [Prisma](https://www.prisma.io/docs) - Utilizei a documentação para me auxiliar com a criação do endpoint `/transactions/new`.

---

### Observações

- No momento atual as transferências só são permitidas através de e-mails previamente cadastrados.
