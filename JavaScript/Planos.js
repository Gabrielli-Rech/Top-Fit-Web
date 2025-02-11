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



// Função para atualizar o carrinho e o total
function atualizarCarrinho() {
    let total = 0;
    carrinhoLista.innerHTML = ''; // Limpa o carrinho antes de adicionar os novos itens

    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            const valor = parseFloat(checkbox.getAttribute('data-value'));
            total += valor;
            const nomeBeneficio = checkbox.nextElementSibling.textContent; // Nome do benefício

            // Adiciona o benefício selecionado ao carrinho
            const itemCarrinho = document.createElement('li');
            itemCarrinho.textContent = `${nomeBeneficio} - R$${valor.toFixed(2)}`;
            carrinhoLista.appendChild(itemCarrinho);
        }
    });

    // Atualiza o total no carrinho
    totalElement.textContent = `Total dos Benefícios: R$${total.toFixed(2)}`;
}

// Adicionando um ouvinte de evento para cada checkbox
checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', atualizarCarrinho);
});

// Chama a função para garantir que o carrinho seja atualizado na inicialização
atualizarCarrinho();
