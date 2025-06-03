const descInput = document.getElementById('desc-input');
const valorInput = document.getElementById('valor-input');
const tipoInput = document.getElementById('tipo-input');
const addBtn = document.getElementById('add-transacao');
const transacaoList = document.getElementById('transacao-list');
const saldoEl = document.getElementById('saldo');

let saldo = 0;

addBtn.addEventListener('click', () => {
    const desc = descInput.value.trim();
    const valor = parseFloat(valorInput.value);
    const tipo = tipoInput.value;

    if (desc === '' || isNaN(valor)) {
        alert('Preencha todos os campos corretamente!');
        return;
    }

    const data = new Date().toLocaleDateString('pt-BR');
    const transacao = {
        descricao: desc,
        valor: valor,
        tipo: tipo,
        data: data
    };

    adicionarTransacao(transacao);
    atualizarSaldo(transacao);
    limparCampos();
});

function adicionarTransacao(transacao) {
    const li = document.createElement('li');
    li.classList.add('transacao', transacao.tipo);

    const sinal = transacao.tipo === 'entrada' ? '+' : '-';
    li.innerHTML = `${transacao.data} | ${transacao.descricao}: ${sinal}R$ ${transacao.valor.toFixed(2)}`;

    transacaoList.appendChild(li);
}

function atualizarSaldo(transacao) {
    if (transacao.tipo === 'entrada') {
        saldo += transacao.valor;
    } else {
        saldo -= transacao.valor;
    }

    saldoEl.textContent = `R$ ${saldo.toFixed(2)}`;
}

function limparCampos() {
    descInput.value = '';
    valorInput.value = '';
    tipoInput.value = 'entrada';
}
