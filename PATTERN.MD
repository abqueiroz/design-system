Com certeza! Aqui está o conteúdo do seu Design System totalmente traduzido e adaptado para o formato de um `README.md` em português, mantendo a clareza técnica:

---

# Padrões e Convenções de API do Design System

## 🎯 Objetivo

Estabelecer e justificar as diretrizes arquiteturais para a nomenclatura de propriedades (props) dentro dos componentes do nosso Design System. O foco principal é:

* **Otimizar a Experiência do Desenvolvedor (DX).**
* **Reduzir a carga cognitiva** durante a implementação.
* **Garantir previsibilidade** ao integrar com o HTML padrão.

---

## 1. O Prefixo `$` para Propriedades do Design System

Em ecossistemas baseados em componentes (como **React**), componentes base (ex: `Button`, `Input`, `Box`) frequentemente precisam repassar propriedades nativas do HTML enquanto recebem propriedades exclusivas do Design System para controlar sua aparência.

Adotamos o **prefixo `$**` para todas as propriedades exclusivas de estilo e variantes do Design System (ex: `$variant`, `$size`, `$color`).

### Justificativas e Benefícios:

* **Priorização no Autocomplete da IDE:** IDEs como o VS Code ordenam símbolos primeiro. O `$` força as props do Design System para o topo da lista, tornando-as visíveis imediatamente.
* **Separação Clara de Responsabilidades:** Torna visualmente óbvio o que é comportamento HTML/Acessibilidade e o que é injeção de estilo.
* **Prevenção de Vazamento no DOM (Transient Props):** Em bibliotecas de CSS-in-JS (*Styled Components* ou *Emotion*), props com `$` são tratadas como "transientes", ou seja, são consumidas pelo estilo e descartadas antes de chegarem à tag HTML final, evitando erros no console do React.

### Exemplo de Uso:

```tsx
// ❌ Ruim: Mistura mental de atributos nativos e props de estilo
<Button 
  type="submit" 
  variant="destructive" 
  size="sm" 
  aria-label="Delete item" 
  fullWidth
>
  Excluir
</Button>

// ✅ Bom: Distinção clara de responsabilidades
<Button 
  type="submit" 
  aria-label="Delete item" 
  $variant="destructive" 
  $size="sm" 
  $fullWidth
>
  Excluir
</Button>

```

---

## 2. Convenções de Nomenclatura para Estados e Valores

A consistência nos nomes das props dita a curva de aprendizado do Design System.

### 2.1. Propriedades Booleanas (Flags de Estado)

Devem sempre começar com verbos auxiliares que indiquem uma pergunta de "sim ou não": `is`, `has`, `should`, `can`.

* **`hasError` vs `error**`: A palavra `error` é ambígua (é um booleano ou uma mensagem?). `hasError` é estritamente booleano.
* **Exemplos**: `isLoading`, `isDisabled`, `hasIcon`.

### 2.2. Valores de Texto ou Dados Específicos

Quando a prop espera um valor específico (string, node, objeto), seu nome deve ser um substantivo que descreva exatamente o que está sendo passado.

* **`errorMessage`**: Obviamente espera uma string (funciona perfeitamente em conjunto com `hasError`).
* **`helperText`**: Em vez de apenas `help`.
* **`iconRight` / `iconLeft**`: Em vez de apenas `icon` (se a posição for relevante).

### 2.3. Callbacks e Eventos

Funções de callback devem seguir o padrão nativo do DOM, prefixadas com `on` + **Nome do Evento**, ou `on` + **Entidade** + **Ação**.

* **Exemplos**: `onValueChange`, `onPress`, `onSubmit`, `onClose`.

### Exemplo Comparativo:

```tsx
// ❌ Ruim: Tipagem ambígua e nomenclatura confusa
<Input 
  error={true} 
  message="Senha inválida" 
  loading={true} 
  change={(val) => console.log(val)} 
  $variant="outline"
/>

// ✅ Bom: Tipos previsíveis apenas pela leitura do nome
<Input 
  hasError={true} 
  errorMessage="Senha inválida" 
  isLoading={true} 
  onChange={(val) => console.log(val)} 
  $variant="outline"
/>

```

---

## 3. Princípios Fundamentais para Code Review

Ao revisar a criação de um novo componente, devemos validar as seguintes regras:

1. **Props de Estilo:** A prop altera exclusivamente o aspecto visual (cor, tamanho, espaçamento)? **Deve ter o prefixo `$`.**
2. **Props de DOM/A11y:** A prop é repassada ao elemento DOM ou afeta acessibilidade (`id`, `aria-*`, `role`)? **NÃO deve ter prefixo.**
3. **Booleanos:** É um tipo booleano? **Deve começar com `is`, `has`, `should` ou `can`.**
4. **Ações:** É uma função disparada pelo usuário? **Deve começar com `on`.**

---

> [!TIP]
> Seguir esses padrões garante que nossa biblioteca escale de forma sustentável e reduz o tempo de integração de novos desenvolvedores.