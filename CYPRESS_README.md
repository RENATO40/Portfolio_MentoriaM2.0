# Cypress - Satiro Comercial

Este documento explica como configurar e executar testes automatizados com Cypress para o projeto Satiro Comercial.

## 🚀 Configuração Inicial

### 1. Instalar Dependências
```bash
npm install
```

### 2. Configurações Disponíveis

O Cypress está configurado com as seguintes URLs:

- **Local**: `http://localhost:3000` (padrão)
- **Desenvolvimento**: `http://localhost:8080`
- **Staging**: `https://staging.satirocomercial.com`
- **Produção**: `https://satirocomercial.com`

### 3. URLs de Login para Automação

O sistema inclui URLs específicas para automação de login:

- **Login via Parâmetro**: `http://localhost:3000/?action=login`
- **Login Direto**: `http://localhost:3000/login`
- **Login via JavaScript**: `openLoginModal()`

### 4. Executar o Projeto Localmente

Para executar os testes, primeiro inicie o servidor local:

```bash
# Se você tiver um servidor local rodando na porta 3000
# Caso contrário, ajuste a baseUrl no cypress.config.js
```

## 🧪 Executando os Testes

### Abrir o Cypress
```bash
npx cypress open
```

### Executar no Terminal
```bash
npx cypress run
```

### Executar Testes Específicos
```bash
npx cypress run --spec "cypress/e2e/login.cy.js"
```

## 📋 Testes Disponíveis

### Sistema de Login (`login.cy.js`)

#### Testes de Autenticação:
1. **Abertura do Modal**: Verifica se o modal de login abre corretamente
2. **Login Admin**: Testa login com usuário administrador
3. **Login Customer**: Testa login com usuário cliente
4. **Login Manager**: Testa login com usuário gerente
5. **Credenciais Inválidas**: Testa validação de credenciais incorretas
6. **Logout**: Testa o processo de logout
7. **Login via URL**: Testa abertura automática via parâmetro `?action=login`
8. **Validação de Campos**: Testa campos obrigatórios

#### Testes de Funcionalidades:
1. **Carregamento da Página**: Verifica se a página inicial carrega corretamente
2. **Carrinho de Compras**: Testa abertura e funcionalidade do carrinho
3. **Modal de Checkout**: Verifica abertura do formulário de finalização
4. **Formulário de Checkout**: Testa preenchimento de dados do cliente
5. **Tipos de Pagamento**: Testa alternância entre cartão e conta bancária
6. **Navegação**: Testa navegação entre seções da página

## 🛠️ Comandos Personalizados

### Comandos de Login:
- `cy.login(username, password)` - Faz login com usuário e senha
- `cy.logout()` - Faz logout do sistema
- `cy.isLoggedIn()` - Verifica se está logado
- `cy.isNotLoggedIn()` - Verifica se não está logado
- `cy.openLoginViaUrl()` - Abre login via URL com parâmetro

### Comandos de Funcionalidades:
- `cy.openCart()` - Abre o carrinho de compras
- `cy.openCheckout()` - Abre o modal de checkout
- `cy.fillCustomerData(name, email, phone)` - Preenche dados do cliente
- `cy.fillCardData(cardNumber, expiry, cvv, cardName)` - Preenche dados do cartão
- `cy.fillBankData(bankName, agency, account, holder, cpf)` - Preenche dados bancários
- `cy.navigateToSection(sectionId)` - Navega para uma seção específica

## 👤 Usuários de Teste

O sistema inclui usuários pré-configurados para automação:

| Usuário | Senha | Role | Nome |
|---------|-------|------|------|
| `admin` | `admin123` | admin | Administrador |
| `customer` | `customer123` | customer | Cliente Teste |
| `manager` | `manager123` | manager | Gerente |

## 🔧 Configurações Avançadas

### Mudar Ambiente de Teste

Para testar em um ambiente diferente, modifique o `baseUrl` no `cypress.config.js`:

```javascript
baseUrl: 'https://staging.satirocomercial.com'
```

### URLs de Login por Ambiente

```javascript
env: {
  localUrl: 'http://localhost:3000',
  loginUrl: '/?action=login',
  directLoginUrl: '/login'
}
```

### Dados de Teste

Os dados de teste estão configurados no arquivo de configuração:

```javascript
env: {
  testUsers: {
    admin: { username: 'admin', password: 'admin123' },
    customer: { username: 'customer', password: 'customer123' },
    manager: { username: 'manager', password: 'manager123' }
  }
}
```

## 📱 Configurações de Viewport

- **Desktop**: 1280x720 (padrão)
- **Tablet**: 768x1024
- **Mobile**: 375x667

Para testar em diferentes resoluções, modifique no `cypress.config.js`:

```javascript
viewportWidth: 375,
viewportHeight: 667
```

## 🎯 Exemplos de Uso

### Teste de Login Simples
```javascript
describe('Login Test', () => {
  it('deve fazer login com sucesso', () => {
    cy.login('admin', 'admin123')
    cy.isLoggedIn()
  })
})
```

### Teste de Login via URL
```javascript
it('deve abrir login via URL', () => {
  cy.openLoginViaUrl()
  cy.get('#loginModal').should('be.visible')
})
```

### Teste de Fluxo Completo
```javascript
it('deve fazer login e checkout', () => {
  cy.login('customer', 'customer123')
  cy.openCheckout()
  cy.fillCustomerData('João Silva', 'joao@email.com', '11999999999')
})
```

## 🎯 Próximos Passos

1. **Adicionar Mais Testes**: Criar testes para funcionalidades específicas
2. **Testes de API**: Adicionar testes para endpoints backend
3. **Testes de Performance**: Implementar testes de carga
4. **Integração CI/CD**: Configurar execução automática nos pipelines
5. **Testes de Segurança**: Implementar testes de vulnerabilidades

## 📞 Suporte

Para dúvidas sobre os testes, consulte:
- [Documentação do Cypress](https://docs.cypress.io/)
- [Guia de Boas Práticas](https://docs.cypress.io/guides/references/best-practices)
- [Comandos Personalizados](https://docs.cypress.io/api/cypress-api/custom-commands)
