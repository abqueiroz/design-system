# Design System 🎨

Boilerplate de Design System construído com **React**, **TypeScript**, **Tailwind CSS** e **Storybook**.

Este projeto foi configurado para funcionar como uma biblioteca privada (ou pública) instalável diretamente via repositório Git.

---

## 🚀 Instalação

Para utilizar este Design System em um projeto externo, adicione-o via npm:

```bash
npm install git+https://github.com/abqueiroz/design-system.git
```

Ou via SSH:

```bash
npm install git+ssh://git@github.com:abqueiroz/design-system.git
```

---

## 🛠️ Uso

Após a instalação, você pode importar os componentes e os estilos globais no seu projeto:

### 1. Importar Estilos
No seu arquivo de entrada principal (ex: `main.tsx` ou `app.tsx`):

```tsx
import 'design-system/styles';
```

### 2. Usar Componentes
```tsx
import { Button, Typography } from 'design-system';

function App() {
  return (
    <div>
      <Typography variant="h1">Olá Mundo</Typography>
      <Button variant="primary">Clique aqui</Button>
    </div>
  );
}
```

---

## 📂 Estrutura do Projeto

*   `src/components`: Componentes atômicos, moléculas e organismos.
*   `src/hooks`: Hooks reaproveitáveis.
*   `src/lib`: Utilitários e configurações (ex: `cn` helper).
*   `src/index.ts`: Ponto de entrada que exporta tudo o que deve ser público.
*   `dist/`: Arquivos compilados (gerados pelo `tsup`).

---

## 💻 Desenvolvimento

### Scripts Disponíveis

*   `npm run dev`: Inicia o Storybook para desenvolvimento.
*   `npm run build`: Gera a versão de produção na pasta `dist/`.
*   `npm run typecheck`: Executa a verificação de tipos do TypeScript.
*   `npm run test`: Executa os testes unitários com Vitest.

---

## 🤖 Workflows (GitHub Actions)

O projeto possui automações configuradas:

1.  **CI (Continuous Integration)**: Roda automaticamente em cada Push ou Pull Request para a branch `main`. Ele verifica se a tipagem está correta (`typecheck`) e se o `build` está funcionando.
2.  **Release (Manual)**: Permite gerar uma nova versão da biblioteca de forma controlada.
    *   Vá em **Actions** -> **Release** no GitHub.
    *   Clique em **Run workflow**.
    *   Escolha o tipo de incremento (`patch`, `minor`, `major`).
    *   O workflow irá:
        1. Aumentar a versão no `package.json`.
        2. Gerar uma nova build (`dist/`).
        3. Commitar os arquivos compilados e a nova versão diretamente na `main`.
        4. Criar uma Tag Git (ex: `v1.0.1`).

---

## ⚠️ Boas Práticas

*   **Arquivos de Stories**: Arquivos `*.stories.*` são excluídos automaticamente da build para manter a biblioteca leve.
*   **Acesso ao código compilado**: Como a instalação é via Git, a pasta `dist/` está incluída no repositório para garantir que o consumidor não precise rodar a build localmente.
