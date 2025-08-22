const BASE_URL = 'http://localhost:3000';
const products = [
    {
        id: 1,
        name: "Arroz Integral",
        price: 8.50,
        description: "Arroz integral orgânico, rico em fibras e nutrientes",
        image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop"
    },
    {
        id: 2,
        name: "Feijão Preto",
        price: 6.80,
        description: "Feijão preto de qualidade, fonte de proteínas",
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop"
    },
    {
        id: 3,
        name: "Azeite de Oliva",
        price: 25.90,
        description: "Azeite extra virgem, prensado a frio",
        image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=300&fit=crop"
    },
    {
        id: 4,
        name: "Banana Prata",
        price: 4.50,
        description: "Banana prata fresca, rica em potássio",
        image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=300&fit=crop"
    },
    {
        id: 5,
        name: "Leite Integral",
        price: 3.90,
        description: "Leite integral fresco, rico em cálcio",
        image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&h=300&fit=crop"
    },
    {
        id: 6,
        name: "Pão Integral",
        price: 5.20,
        description: "Pão integral artesanal, rico em fibras",
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop"
    }
];

// Carrinho de compras
let cart = [];

// Inicialização da aplicação
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    loadCart();
    updateCartDisplay();
});

// Carregar produtos na página
function loadProducts() {
    const productsGrid = document.getElementById('productsGrid');
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-price">R$ ${product.price.toFixed(2)}</p>
                <p class="product-description">${product.description}</p>
                <button class="add-to-cart-btn" data-sku="${product.id}" data-variant="-" onclick="addToCart(${product.id})">
                    <i class="fas fa-cart-plus"></i> Adicionar ao Carrinho
                </button>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
}

// Adicionar produto ao carrinho (R01)
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    saveCart();
    updateCartDisplay();
    showNotification(`${product.name} adicionado ao carrinho!`);
}

// Remover produto do carrinho (R02)
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartDisplay();
    showNotification('Produto removido do carrinho!');
}

// Alterar quantidade de produto (R03)
function updateQuantity(productId, newQuantity) {
    if (newQuantity <= 0) {
        removeFromCart(productId);
        return;
    }
    
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = newQuantity;
        saveCart();
        updateCartDisplay();
    }
}

// Visualizar carrinho (R04)
function updateCartDisplay() {
    const cartItems = document.getElementById('cartItems');
    const cartCount = document.getElementById('cartCount');
    const cartTotal = document.getElementById('cartTotal');
    const checkoutBtn = document.getElementById('checkoutBtn');
    
    // Atualizar contador do carrinho
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Atualizar itens do carrinho
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; color: #666; padding: 2rem;">Seu carrinho está vazio</p>';
        checkoutBtn.disabled = true;
    } else {
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">R$ ${item.price.toFixed(2)}</div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <input type="number" class="quantity-input" value="${item.quantity}" 
                               onchange="updateQuantity(${item.id}, parseInt(this.value))" min="1">
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    </div>
                </div>
                <button class="remove-item-btn" onclick="removeFromCart(${item.id})">Remover</button>
            `;
            cartItems.appendChild(cartItem);
        });
        checkoutBtn.disabled = false;
    }
    
    // Atualizar total (R05)
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = total.toFixed(2);
}

// Esvaziar carrinho (R07)
function clearCart() {
    if (cart.length === 0) {
        showNotification('O carrinho já está vazio!');
        return;
    }
    
    if (confirm('Tem certeza que deseja esvaziar o carrinho?')) {
        cart = [];
        saveCart();
        updateCartDisplay();
        showNotification('Carrinho esvaziado!');
    }
}

// Finalizar compra (R08)
function checkout() {
    if (cart.length === 0) {
        showNotification('Adicione produtos ao carrinho primeiro!');
        return;
    }
    
    document.getElementById('checkoutModal').classList.add('show');
    toggleCart(); // Fechar carrinho
}

// Fechar modal de checkout
function closeCheckoutModal() {
    document.getElementById('checkoutModal').classList.remove('show');
}

// Fechar modal de sucesso
function closeSuccessModal() {
    document.getElementById('successModal').classList.remove('show');
}

// Processar pagamento
function processPayment(formData) {
    // Verificar se já está processando
    if (window.isProcessingPayment) {
        return;
    }
    
    // Marcar como processando
    window.isProcessingPayment = true;
    
    // Simular processamento de pagamento
    setTimeout(() => {
        closeCheckoutModal();
        
        // Simular envio de SMS (R09)
        simulateSMSSending(formData.get('customerPhone'), formData.get('paymentType'));
        
        // Atualizar mensagem de sucesso com tipo de pagamento
        updateSuccessMessage(formData.get('paymentType'));
        
        // Limpar carrinho após compra
        cart = [];
        saveCart();
        updateCartDisplay();
        
        // Mostrar modal de sucesso
        document.getElementById('successModal').classList.add('show');
        
        // Resetar flag de processamento
        window.isProcessingPayment = false;
    }, 2000);
}

// Simular envio de SMS
function simulateSMSSending(phone, paymentType) {
    const paymentText = paymentType === 'debit' ? 'débito' : 'crédito';
    console.log(`SMS enviado para ${phone}: Sua compra no Satiro Comercial foi confirmada! Pagamento via cartão de ${paymentType} processado com sucesso. Obrigado por escolher nossos produtos.`);
    showNotification(`SMS de confirmação enviado! Pagamento via ${paymentText} confirmado.`);
}

// Atualizar mensagem de sucesso com tipo de pagamento
function updateSuccessMessage(paymentType) {
    const paymentText = paymentType === 'debit' ? 'débito' : 'crédito';
    const successModal = document.getElementById('successModal');
    const modalBody = successModal.querySelector('.modal-body');
    
    modalBody.innerHTML = `
        <p>Seu pedido foi processado com sucesso!</p>
        <p>Pagamento realizado via cartão de <strong>${paymentText}</strong>.</p>
        <p>Você receberá uma confirmação por SMS em breve.</p>
        <p>Obrigado por escolher o Satiro Comercial!</p>
    `;
}

// Toggle do carrinho
function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    const cartOverlay = document.getElementById('cartOverlay');
    
    cartSidebar.classList.toggle('open');
    cartOverlay.classList.toggle('open');
}

// Salvar carrinho no localStorage (R06)
function saveCart() {
    localStorage.setItem('satiroCart', JSON.stringify(cart));
}

// Carregar carrinho do localStorage (R06)
function loadCart() {
    const savedCart = localStorage.getItem('satiroCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

// Scroll para seção de produtos
function scrollToProducts() {
    document.getElementById('produtos').scrollIntoView({ behavior: 'smooth' });
}

// Mostrar notificação
function showNotification(message) {
    // Criar elemento de notificação
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #28a745;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1003;
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover após 3 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Event listener para formulário de checkout
document.getElementById('checkoutForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Verificar se já está processando
    if (window.isProcessingPayment) {
        showNotification('Pagamento já está sendo processado. Aguarde...');
        return;
    }
    
    const formData = new FormData(this);
    
    // Validações básicas dos campos obrigatórios
    if (!formData.get('customerName') || !formData.get('customerEmail') || !formData.get('customerPhone')) {
        showNotification('Por favor, preencha todos os campos obrigatórios!');
        return;
    }
    
    if (!formData.get('paymentType')) {
        showNotification('Por favor, selecione o tipo de pagamento!');
        return;
    }
    
    // Validar campos de pagamento
    const paymentType = formData.get('paymentType');
    const cardFields = document.getElementById('cardFields');
    const bankFields = document.getElementById('bankFields');

    if (paymentType === 'credit' || paymentType === 'debit') {
    if (!formData.get('cardNumber') || !formData.get('cardExpiry') || !formData.get('cardCvv') || !formData.get('cardName')) {
        showNotification('Por favor, preencha todos os dados do cartão!');
        return;
    }
        const validationResult = validateCardData(formData);
        if (!validationResult.isValid) {
            showNotification(validationResult.message);
            return;
        }
    } else if (paymentType === 'bank') {
        if (!formData.get('bankName') || !formData.get('bankAgency') || !formData.get('bankAccount') || !formData.get('accountHolder') || !formData.get('cpfCnpj')) {
            showNotification('Por favor, preencha todos os dados da conta bancária!');
        return;
    }
    
        const bankValidationResult = validateBankData(formData);
        if (!bankValidationResult.isValid) {
            showNotification(bankValidationResult.message);
        return;
        }
    }
    
    // Simular processamento
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Processando...';
    submitBtn.disabled = true;
    
    // Processar pagamento
    processPayment(formData);
    
    // Resetar formulário
    this.reset();
    
    // Restaurar botão
    setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
});

// Função para validar dados do cartão
function validateCardData(formData) {
    const cardNumber = formData.get('cardNumber').replace(/\s/g, '');
    const cardExpiry = formData.get('cardExpiry');
    const cardCvv = formData.get('cardCvv');
    const cardName = formData.get('cardName');
    const paymentType = formData.get('paymentType');
    
    // Validar número do cartão
    if (cardNumber.length < 13 || cardNumber.length > 19) {
        return {
            isValid: false,
            message: 'Número do cartão deve ter entre 13 e 19 dígitos!'
        };
    }
    
    // Validar se contém apenas números
    if (!/^\d+$/.test(cardNumber)) {
        return {
            isValid: false,
            message: 'Número do cartão deve conter apenas números!'
        };
    }
    
    // Validar algoritmo de Luhn (verificação básica de cartão válido)
    if (!validateLuhn(cardNumber)) {
        return {
            isValid: false,
            message: 'Número do cartão inválido!'
        };
    }
    
    // Validar data de vencimento
    const currentDate = new Date();
    const expiryDate = new Date(cardExpiry + '-01'); // Adiciona dia 01 para criar data completa
    
    if (expiryDate < currentDate) {
        return {
            isValid: false,
            message: 'Cartão vencido! Selecione uma data de vencimento válida.'
        };
    }
    
    // Validar se a data não é muito no futuro (máximo 10 anos)
    const maxFutureDate = new Date();
    maxFutureDate.setFullYear(maxFutureDate.getFullYear() + 10);
    
    if (expiryDate > maxFutureDate) {
        return {
            isValid: false,
            message: 'Data de vencimento muito no futuro!'
        };
    }
    
    // Validar CVV
    if (cardCvv.length < 3 || cardCvv.length > 4) {
        return {
            isValid: false,
            message: 'CVV deve ter 3 ou 4 dígitos!'
        };
    }
    
    if (!/^\d+$/.test(cardCvv)) {
        return {
            isValid: false,
            message: 'CVV deve conter apenas números!'
        };
    }
    
    // Validar nome no cartão
    if (cardName.trim().length < 3) {
        return {
            isValid: false,
            message: 'Nome no cartão deve ter pelo menos 3 caracteres!'
        };
    }
    
    if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(cardName)) {
        return {
            isValid: false,
            message: 'Nome no cartão deve conter apenas letras e espaços!'
        };
    }
    
    // Validações específicas por tipo de cartão
    if (paymentType === 'credit') {
        // Validações específicas para cartão de crédito
        if (cardNumber.length < 15) {
            return {
                isValid: false,
                message: 'Cartão de crédito deve ter pelo menos 15 dígitos!'
            };
        }
    } else if (paymentType === 'debit') {
        // Validações específicas para cartão de débito
        if (cardNumber.length < 13) {
            return {
                isValid: false,
                message: 'Cartão de débito deve ter pelo menos 13 dígitos!'
            };
        }
    }
    
    return { isValid: true, message: 'Dados válidos!' };
}

// Algoritmo de Luhn para validar número do cartão
function validateLuhn(cardNumber) {
    let sum = 0;
    let isEven = false;
    
    // Percorrer do último dígito para o primeiro
    for (let i = cardNumber.length - 1; i >= 0; i--) {
        let digit = parseInt(cardNumber.charAt(i));
        
        if (isEven) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }
        
        sum += digit;
        isEven = !isEven;
    }
    
    return sum % 10 === 0;
}

// Função para validar dados da conta bancária
function validateBankData(formData) {
    const bankName = formData.get('bankName');
    const bankAgency = formData.get('bankAgency');
    const bankAccount = formData.get('bankAccount');
    const accountHolder = formData.get('accountHolder');
    const cpfCnpj = formData.get('cpfCnpj');

    // Validar nome do banco
    if (!bankName || bankName.trim().length < 3) {
        return {
            isValid: false,
            message: 'Nome do banco deve ter pelo menos 3 caracteres!'
        };
    }

    // Validar agência
    if (!bankAgency || bankAgency.length < 4 || bankAgency.length > 5) {
        return {
            isValid: false,
            message: 'Agência deve ter 4 ou 5 dígitos!'
        };
    }

    // Validar conta corrente
    if (!bankAccount || bankAccount.length < 5 || bankAccount.length > 10) {
        return {
            isValid: false,
            message: 'Conta corrente deve ter entre 5 e 10 dígitos!'
        };
    }

    // Validar nome do titular
    if (!accountHolder || accountHolder.trim().length < 3) {
        return {
            isValid: false,
            message: 'Nome do titular deve ter pelo menos 3 caracteres!'
        };
    }

    // Validar CPF/CNPJ
    if (!cpfCnpj || cpfCnpj.length < 11 || cpfCnpj.length > 14) {
        return {
            isValid: false,
            message: 'CPF/CNPJ deve ter entre 11 e 14 dígitos!'
        };
    }

    if (!/^\d+$/.test(cpfCnpj)) {
        return {
            isValid: false,
            message: 'CPF/CNPJ deve conter apenas números!'
        };
    }

    return { isValid: true, message: 'Dados da conta bancária válidos!' };
}

// Função para alternar campos de pagamento
function togglePaymentFields() {
    const paymentType = document.getElementById('paymentType').value;
    const cardFields = document.getElementById('cardFields');
    const bankFields = document.getElementById('bankFields');
    
    // Esconder todos os campos primeiro
    cardFields.style.display = 'none';
    bankFields.style.display = 'none';
    
    // Mostrar campos apropriados baseado no tipo de pagamento
    if (paymentType === 'credit' || paymentType === 'debit') {
        cardFields.style.display = 'block';
        // Tornar campos obrigatórios
        makeFieldsRequired(cardFields, true);
        makeFieldsRequired(bankFields, false);
    } else if (paymentType === 'bank') {
        bankFields.style.display = 'block';
        // Tornar campos obrigatórios
        makeFieldsRequired(cardFields, false);
        makeFieldsRequired(bankFields, true);
    } else {
        // Nenhum tipo selecionado
        makeFieldsRequired(cardFields, false);
        makeFieldsRequired(bankFields, false);
    }
}

// Função para tornar campos obrigatórios ou não
function makeFieldsRequired(container, required) {
    const inputs = container.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.required = required;
    });
}

// Fechar modais ao clicar fora
window.addEventListener('click', function(e) {
    const checkoutModal = document.getElementById('checkoutModal');
    const successModal = document.getElementById('successModal');
    
    if (e.target === checkoutModal) {
        closeCheckoutModal();
    }
    
    if (e.target === successModal) {
        closeSuccessModal();
    }
});

// Fechar carrinho com ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const cartSidebar = document.getElementById('cartSidebar');
        if (cartSidebar.classList.contains('open')) {
            toggleCart();
        }
    }
});

// Formatação automática do número do cartão
document.addEventListener('DOMContentLoaded', function() {
    const cardNumberInput = document.getElementById('cardNumber');
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, ''); // Remove tudo que não é dígito
            
            // Limita o número de caracteres
            if (value.length > 19) {
                value = value.substring(0, 19);
            }
            
            // Formata com espaços a cada 4 dígitos
            let formattedValue = '';
            for (let i = 0; i < value.length; i++) {
                if (i > 0 && i % 4 === 0) {
                    formattedValue += ' ';
                }
                formattedValue += value[i];
            }
            
            e.target.value = formattedValue;
            
            // Validação visual em tempo real
            validateCardNumberRealTime(value);
        });
        
        // Previne entrada de caracteres inválidos
        cardNumberInput.addEventListener('keypress', function(e) {
            if (!/\d/.test(e.key)) {
                e.preventDefault();
            }
        });
    }
    
    // Formatação automática do CVV
    const cardCvvInput = document.getElementById('cardCvv');
    if (cardCvvInput) {
        cardCvvInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, ''); // Remove tudo que não é dígito
            
            // Limita o número de caracteres (3 para maioria, 4 para American Express)
            if (value.length > 4) {
                value = value.substring(0, 4);
            }
            
            e.target.value = value;
            
            // Validação visual em tempo real
            validateCvvRealTime(value);
        });
        
        // Previne entrada de caracteres inválidos
        cardCvvInput.addEventListener('keypress', function(e) {
            if (!/\d/.test(e.key)) {
                e.preventDefault();
            }
        });
    }
    
    // Formatação automática da data de vencimento (aceita apenas números e barra)
    const cardExpiryInput = document.getElementById('cardExpiry');
    if (cardExpiryInput) {
        cardExpiryInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/[^\d/]/g, ''); // Apenas números e barra
            // Formata para MM/AA ou MM/AAAA
            if (value.length === 2 && !value.includes('/')) {
                value += '/';
            }
            if (value.length > 7) {
                value = value.substring(0, 7);
            }
            e.target.value = value;
        });
        cardExpiryInput.addEventListener('keypress', function(e) {
            if (!/\d/.test(e.key) && e.key !== '/') {
                e.preventDefault();
            }
        });
        cardExpiryInput.addEventListener('change', function(e) {
            validateExpiryRealTime(e.target.value);
        });
    }
    
    // Formatação automática do nome no cartão
    const cardNameInput = document.getElementById('cardName');
    if (cardNameInput) {
        cardNameInput.addEventListener('input', function(e) {
            let value = e.target.value;
            
            // Remove caracteres especiais, mantém apenas letras, espaços e acentos
            value = value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '');
            
            // Limita o comprimento
            if (value.length > 50) {
                value = value.substring(0, 50);
            }
            
            e.target.value = value;
            
            // Validação visual em tempo real
            validateCardNameRealTime(value);
        });
    }
});

// Validação em tempo real do número do cartão
function validateCardNumberRealTime(cardNumber) {
    const cardNumberInput = document.getElementById('cardNumber');
    const cardNumberGroup = cardNumberInput.closest('.form-group');
    
    // Remove classes de validação anteriores
    cardNumberInput.classList.remove('valid', 'invalid');
    cardNumberGroup.classList.remove('has-error', 'has-success');
    
    if (cardNumber.length === 0) {
        return; // Campo vazio, não validar
    }
    
    if (cardNumber.length < 13 || cardNumber.length > 19) {
        cardNumberInput.classList.add('invalid');
        cardNumberGroup.classList.add('has-error');
        showFieldError(cardNumberGroup, 'Número deve ter entre 13 e 19 dígitos');
    } else if (!validateLuhn(cardNumber)) {
        cardNumberInput.classList.add('invalid');
        cardNumberGroup.classList.add('has-error');
        showFieldError(cardNumberGroup, 'Número do cartão inválido');
    } else {
        cardNumberInput.classList.add('valid');
        cardNumberGroup.classList.add('has-success');
        hideFieldError(cardNumberGroup);
    }
}

// Validação em tempo real do CVV
function validateCvvRealTime(cvv) {
    const cardCvvInput = document.getElementById('cardCvv');
    const cardCvvGroup = cardCvvInput.closest('.form-group');
    
    // Remove classes de validação anteriores
    cardCvvInput.classList.remove('valid', 'invalid');
    cardCvvGroup.classList.remove('has-error', 'has-success');
    
    if (cvv.length === 0) {
        return; // Campo vazio, não validar
    }
    
    if (cvv.length < 3 || cvv.length > 4) {
        cardCvvInput.classList.add('invalid');
        cardCvvGroup.classList.add('has-error');
        showFieldError(cardCvvGroup, 'CVV deve ter 3 ou 4 dígitos');
    } else {
        cardCvvInput.classList.add('valid');
        cardCvvGroup.classList.add('has-success');
        hideFieldError(cardCvvGroup);
    }
}

// Validação em tempo real da data de vencimento
function validateExpiryRealTime(expiry) {
    const cardExpiryInput = document.getElementById('cardExpiry');
    const cardExpiryGroup = cardExpiryInput.closest('.form-group');
    
    // Remove classes de validação anteriores
    cardExpiryInput.classList.remove('valid', 'invalid');
    cardExpiryGroup.classList.remove('has-error', 'has-success');
    
    if (!expiry) {
        return; // Campo vazio, não validar
    }
    
    const currentDate = new Date();
    const expiryDate = new Date(expiry + '-01');
    
    if (expiryDate < currentDate) {
        cardExpiryInput.classList.add('invalid');
        cardExpiryGroup.classList.add('has-error');
        showFieldError(cardExpiryGroup, 'Cartão vencido!');
    } else {
        cardExpiryInput.classList.add('valid');
        cardExpiryGroup.classList.add('has-success');
        hideFieldError(cardExpiryGroup);
    }
}

// Validação em tempo real do nome no cartão
function validateCardNameRealTime(name) {
    const cardNameInput = document.getElementById('cardName');
    const cardNameGroup = cardNameInput.closest('.form-group');
    
    // Remove classes de validação anteriores
    cardNameInput.classList.remove('valid', 'invalid');
    cardNameGroup.classList.remove('has-error', 'has-success');
    
    if (name.length === 0) {
        return; // Campo vazio, não validar
    }
    
    if (name.trim().length < 3) {
        cardNameInput.classList.add('invalid');
        cardNameGroup.classList.add('has-error');
        showFieldError(cardNameGroup, 'Nome deve ter pelo menos 3 caracteres');
    } else {
        cardNameInput.classList.add('valid');
        cardNameGroup.classList.add('has-success');
        hideFieldError(cardNameGroup);
    }
}

// Mostrar erro de campo
function showFieldError(formGroup, message) {
    // Remove erro anterior se existir
    hideFieldError(formGroup);
    
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    errorElement.style.cssText = `
        color: #dc3545;
        font-size: 0.875rem;
        margin-top: 0.25rem;
        display: block;
    `;
    
    formGroup.appendChild(errorElement);
}

// Esconder erro de campo
function hideFieldError(formGroup) {
    const existingError = formGroup.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}
