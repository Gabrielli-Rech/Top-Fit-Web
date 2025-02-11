// Função para abrir e fechar o menu lateral
function toggleMenu() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('active');
}

// Função para abrir e fechar o pop-up
function togglePopup() {
    const popup = document.getElementById('popup');
    popup.classList.toggle('active');
}

// Fechar o pop-up ao clicar fora dele
window.onclick = function (event) {
    const popup = document.getElementById('popup');
    if (event.target === popup) {
        popup.classList.remove('active');
    }
}

// Fechar o menu ao clicar fora dele
document.addEventListener("click", (event) => {
    const sidebar = document.getElementById("sidebar");
    const menuIcon = document.querySelector(".menu-icon");
    if (sidebar.classList.contains("active") && !sidebar.contains(event.target) && event.target !== menuIcon) {
        sidebar.classList.remove("active");
    }
});

// Validar o login (exemplo simples)
document.getElementById('login-form')?.addEventListener('submit', (event) => {
    event.preventDefault(); // Evita o envio do formulário

    const cpf = document.getElementById('cpf').value;
    const senha = document.getElementById('senha').value;

    if (!cpf || !senha) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    // Validação simples (isso pode ser substituído por uma validação real)
    if (cpf === '12345678900' && senha === '1234') {
        alert('Login realizado com sucesso!');
        togglePopup(); // Fecha o pop-up após login bem-sucedido
    } else {
        alert('CPF ou senha inválidos.');
    }
});

// Funções do carrossel
const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
let currentIndex = 0;

function updateCarousel() {
    const slideWidth = slides[0].getBoundingClientRect().width;
    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateCarousel();
}

// Automatizar o carrossel para exibir uma imagem de cada vez
setInterval(() => {
    nextSlide();
}, 3000); // Troca de slide a cada 3 segundos

// Configuração inicial do carrossel
updateCarousel();

// Funções para validar CPF, Email e Telefone
function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, ''); // Remove caracteres não numéricos
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

    let soma = 0, resto;
    for (let i = 1; i <= 9; i++) soma += parseInt(cpf[i - 1]) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf[9])) return false;

    soma = 0;
    for (let i = 1; i <= 10; i++) soma += parseInt(cpf[i - 1]) * (12 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    return resto === parseInt(cpf[10]);
}

function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function validarTelefone(telefone) {
    const regex = /^\(\d{2}\) \d{4,5}-\d{4}$/; // Formato: (XX) XXXXX-XXXX ou (XX) XXXX-XXXX
    return regex.test(telefone);
}

// Aviso de Mensagem Enviada ou Não
document.getElementById('form-contato')?.addEventListener('submit', (event) => {
    event.preventDefault(); // Evita envio padrão do formulário

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefone = document.getElementById('telefone').value.trim();
    const mensagem = document.getElementById('mensagem').value.trim();

    // Verificar campos
    if (!nome || !validarEmail(email) || !validarTelefone(telefone) || !mensagem) {
        alert('Por favor, preencha todos os campos corretamente.');
        return;
    }

    // Simular envio
    alert('Mensagem enviada com sucesso!');
    event.target.reset(); // Limpa o formulário
});

//Playlist

function playSong(songName) {
    alert(`Playing: ${songName}`);
}

document.getElementById('menu-button').addEventListener('click', () => {
    alert('Menu button clicked!');
});

// Variáveis para controlar o player de música
const audioPlayer = document.getElementById('audio-player');
const playButton = document.querySelector('.play-button');
const playIcon = document.getElementById('play-icon');

//Finalizar compras

// Função para validar se todos os campos obrigatórios foram preenchidos
document.querySelector('form').addEventListener('submit', function (event) {
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;
    const logradouro = document.getElementById('logradouro').value;
    const numero = document.getElementById('numero').value;
    const bairro = document.getElementById('bairro').value;
    const cidade = document.getElementById('cidade').value;
    const cep = document.getElementById('cep').value;
    const pagamento = document.getElementById('pagamento').value;

    // Verificando se todos os campos obrigatórios estão preenchidos
    if (!nome || !email || !telefone || !logradouro || !numero || !bairro || !cidade || !cep || !pagamento) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        event.preventDefault(); // Impede o envio do formulário
        return;
    }

    // Validação do CEP
    if (!/^\d{5}-\d{3}$/.test(cep)) {
        alert('Por favor, insira um CEP válido (xxxxx-xxx).');
        event.preventDefault();
        return;
    }

    // Caso todas as validações passem, o formulário é enviado
    alert('Compra finalizada com sucesso!');
});

// Mostrar os campos de pagamento com base na seleção
document.getElementById('pagamento').addEventListener('change', function () {
    const pagamentoSelecionado = this.value;

    // Esconder todos os campos de pagamento
    document.querySelectorAll('.campo').forEach(function (campo) {
        campo.style.display = 'none';
    });

    // Mostrar os campos correspondentes ao método de pagamento selecionado
    if (pagamentoSelecionado === 'cartao') {
        document.querySelectorAll('.cartao').forEach(function (campo) {
            campo.style.display = 'block';
        });
    } else if (pagamentoSelecionado === 'boleto') {
        document.querySelectorAll('.boleto').forEach(function (campo) {
            campo.style.display = 'block';
        });
    } else if (pagamentoSelecionado === 'pix') {
        document.querySelectorAll('.pix').forEach(function (campo) {
            campo.style.display = 'block';
        });
    }
});

// Seletores
const checkboxes = document.querySelectorAll(".beneficios input[type='checkbox']");
const carrinhoLista = document.getElementById("carrinho-lista");
const totalElemento = document.getElementById("total");
const carrinhoIcone = document.querySelector(".bi-cart2");
const dropdownCarrinho = document.getElementById("dropdown-carrinho");
const finalizarCompraBtn = document.getElementById("finalizar-compra");

let total = 0;
let itensNoCarrinho = [];

// Abrir/fechar dropdown ao clicar no ícone do carrinho
carrinhoIcone.addEventListener("click", (event) => {
    dropdownCarrinho.classList.toggle("ativo");
    event.stopPropagation(); // Evita fechar imediatamente ao clicar
});

// Fechar dropdown ao clicar fora dele
document.addEventListener("click", (event) => {
    if (!dropdownCarrinho.contains(event.target) && !carrinhoIcone.contains(event.target)) {
        dropdownCarrinho.classList.remove("ativo");
    }
});

// Atualizar carrinho ao selecionar/desmarcar itens
checkboxes.forEach(checkbox => {
    checkbox.addEventListener("change", function () {
        const itemNome = this.dataset.name;
        const itemValor = parseFloat(this.dataset.value);

        if (this.checked) {
            adicionarItemAoCarrinho(itemNome, itemValor);
        } else {
            removerItemDoCarrinho(itemNome, itemValor);
        }

        atualizarTotal();
        atualizarIconeCarrinho();
    });
});

// Adicionar item ao carrinho
function adicionarItemAoCarrinho(nome, valor) {
    const listItem = document.createElement("li");
    listItem.textContent = `${nome} - R$ ${valor.toFixed(2)}`;
    listItem.dataset.name = nome;
    carrinhoLista.appendChild(listItem);
    
    total += valor;
    itensNoCarrinho.push(nome);
}

// Remover item do carrinho
function removerItemDoCarrinho(nome, valor) {
    const itens = carrinhoLista.querySelectorAll("li");
    itens.forEach(item => {
        if (item.dataset.name === nome) {
            item.remove();
        }
    });

    total -= valor;
    itensNoCarrinho = itensNoCarrinho.filter(item => item !== nome);
}

// Atualizar total exibido no dropdown
function atualizarTotal() {
    totalElemento.textContent = total.toFixed(2);
}

// Atualizar o ícone do carrinho
function atualizarIconeCarrinho() {
    if (itensNoCarrinho.length > 0) {
        carrinhoIcone.classList.add("ativo");
    } else {
        carrinhoIcone.classList.remove("ativo");
    }
}

// Redirecionar para a página do carrinho ao clicar no botão
finalizarCompraBtn.addEventListener("click", () => {
    if (itensNoCarrinho.length === 0) {
        alert("Seu carrinho está vazio!");
    } else {
        window.location.href = "carrinho.html"; // Altere para a URL da sua página de carrinho
    }
});

