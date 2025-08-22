# 🛒 Satiro Comercial - E-commerce de Mercado

## 📋 Descrição do Projeto

O **Satiro Comercial** é uma aplicação web de e-commerce desenvolvida como projeto de portfólio pessoal. A aplicação implementa um sistema completo de carrinho de compras com todas as funcionalidades solicitadas nos requisitos funcionais.

## 🎯 Objetivo

Criar uma aplicação web responsiva que permita aos clientes:
- Navegar por produtos de mercado
- Gerenciar um carrinho de compras completo
- Realizar pagamentos via cartão de crédito
- Receber confirmações de compra

## ✨ Funcionalidades Implementadas

### ✅ Requisitos Funcionais Atendidos

| ID | Título do Requisito | Status | Descrição |
|----|---------------------|---------|-----------|
| **R01** | Adição de produto ao carrinho | ✅ Implementado | Usuário pode adicionar produtos com quantidade inicial 1 |
| **R02** | Remoção de produto do carrinho | ✅ Implementado | Botão de remoção individual para cada produto |
| **R03** | Alteração de quantidade de produto | ✅ Implementado | Controles +/- para ajustar quantidades |
| **R04** | Visualização do carrinho | ✅ Implementado | Sidebar responsivo com todos os itens |
| **R05** | Totalizador do carrinho | ✅ Implementado | Cálculo automático do valor total |
| **R06** | Persistência temporária do carrinho | ✅ Implementado | LocalStorage para manter dados durante navegação |
| **R07** | Limpeza do carrinho | ✅ Implementado | Botão para esvaziar todo o carrinho |
| **R08** | Finalização da compra | ✅ Implementado | Modal de checkout com formulário de pagamento (crédito/débito) |
| **R09** | Confirmação de compra | ✅ Implementado | Simulação de envio de SMS + modal de sucesso com tipo de pagamento |

## 🛠️ Tecnologias Utilizadas

- **HTML5** - Estrutura semântica da aplicação
- **CSS3** - Estilos responsivos com Grid e Flexbox
- **JavaScript (ES6+)** - Lógica da aplicação e funcionalidades
- **Font Awesome** - Ícones da interface
- **LocalStorage** - Persistência de dados do carrinho

## 🚀 Como Executar

### Pré-requisitos
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Servidor web local (opcional, mas recomendado)

### Instalação
1. Clone ou baixe os arquivos do projeto
2. Abra o arquivo `index.html` em seu navegador
3. Ou use um servidor local:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Node.js
   npx http-server
   
   # PHP
   php -S localhost:8000
   ```

## 📱 Funcionalidades da Interface

### 🏠 Página Principal
- **Header fixo** com navegação e ícone do carrinho
- **Seção Hero** com chamada para ação
- **Grid de produtos** responsivo
- **Seções informativas** sobre a empresa e contato

### 🛍️ Carrinho de Compras
- **Sidebar deslizante** da direita
- **Contador de itens** no ícone do carrinho
- **Gerenciamento de quantidades** com botões +/-
- **Remoção individual** de produtos
- **Totalizador automático** em tempo real
- **Botão de esvaziar** todo o carrinho

### 💳 Sistema de Checkout
- **Modal responsivo** para dados de pagamento
- **Formulário completo** com validações
- **Opção de pagamento** via cartão de crédito ou débito
- **Validação de campos** com feedback visual
- **Formatação automática** do número do cartão
- **Simulação de processamento** de pagamento
- **Modal de sucesso** após compra com tipo de pagamento
- **Simulação de SMS** de confirmação

## 🎨 Características de Design

### Responsividade
- **Mobile-first** approach
- **Grid adaptativo** para diferentes tamanhos de tela
- **Sidebar responsivo** que se adapta a dispositivos móveis

### Interface Moderna
- **Gradientes** e sombras para profundidade
- **Animações suaves** e transições
- **Ícones intuitivos** para melhor UX
- **Cores consistentes** e acessíveis

### Interatividade
- **Hover effects** em botões e cards
- **Notificações toast** para feedback do usuário
- **Animações de entrada/saída** para modais
- **Feedback visual** para todas as ações

## 📊 Estrutura do Projeto

```
satiro-comercial/
├── index.html          # Página principal HTML
├── styles.css          # Estilos CSS responsivos
├── script.js           # Lógica JavaScript
└── README.md           # Documentação do projeto
```

## 🔧 Arquitetura da Aplicação

### Estrutura de Dados
```javascript
// Produto
{
    id: number,
    name: string,
    price: number,
    description: string,
    image: string
}

// Item do Carrinho
{
    id: number,
    name: string,
    price: number,
    image: string,
    quantity: number
}
```

### Funcionalidades Principais
- **Gestão de Estado**: Carrinho mantido em memória com persistência no LocalStorage
- **Renderização Dinâmica**: Produtos e itens do carrinho renderizados via JavaScript
- **Validação de Formulários**: Validações client-side para dados de pagamento
- **Sistema de Notificações**: Feedback visual para todas as ações do usuário

## 🧪 Testes e Validações

### Funcionalidades Testadas
- ✅ Adição de produtos ao carrinho
- ✅ Remoção de produtos individuais
- ✅ Alteração de quantidades
- ✅ Cálculo automático de totais
- ✅ Persistência de dados no LocalStorage
- ✅ Responsividade em diferentes dispositivos
- ✅ Validação de formulários
- ✅ Fluxo completo de checkout

### Compatibilidade
- ✅ Chrome (versão 80+)
- ✅ Firefox (versão 75+)
- ✅ Safari (versão 13+)
- ✅ Edge (versão 80+)

## 🚀 Melhorias Futuras

### Funcionalidades Adicionais
- [ ] Sistema de usuários e login
- [ ] Histórico de pedidos
- [ ] Filtros e busca de produtos
- [ ] Sistema de avaliações
- [ ] Cupons de desconto
- [ ] Múltiplas formas de pagamento

### Melhorias Técnicas
- [ ] Implementação de PWA (Progressive Web App)
- [ ] Integração com APIs reais de pagamento
- [ ] Sistema de notificações push
- [ ] Cache offline para produtos
- [ ] Testes automatizados

## 📝 Licença

Este projeto foi desenvolvido como projeto de portfólio pessoal. Sinta-se livre para usar como referência ou base para seus próprios projetos.

## 👨‍💻 Desenvolvedor

**Satiro Comercial** - Projeto de Portfólio
- **Tecnologias**: HTML5, CSS3, JavaScript
- **Tipo**: Single Page Application (SPA)
- **Categoria**: E-commerce / Carrinho de Compras

## 🔗 Links Úteis

- **Font Awesome**: [https://fontawesome.com/](https://fontawesome.com/)
- **Unsplash**: [https://unsplash.com/](https://unsplash.com/) (imagens dos produtos)
- **MDN Web Docs**: [https://developer.mozilla.org/](https://developer.mozilla.org/)

---

**🎉 Projeto desenvolvido com sucesso atendendo a todos os requisitos funcionais solicitados!**
