var relatorioGeral = [];

function cadastrarVigilante() {
    var nome = document.getElementById('nome').value;
    var matricula = document.getElementById('matricula').value;
    var posto = document.getElementById('posto').value;
    var arma = document.getElementById('arma').value;
    var colete = document.getElementById('colete').value;
    var dataValidadeVigilante = document.getElementById('dataValidadeVigilante').value;
    var dataValidadeFerias = document.getElementById('dataValidadeFerias').value; // Adicione esta linha
    var dataValidadeUniforme = document.getElementById('dataValidadeUniforme').value; // Adicione esta linha
    var atividades = document.getElementById('atividades').value;

    var vigilante = { nome, matricula, posto, arma, colete, dataValidadeVigilante, dataValidadeFerias, dataValidadeUniforme, atividades }; // Adicione os campos faltantes
    console.log('Vigilante cadastrado:', vigilante);

    verificarDataValidadeProximaVencer(dataValidadeVigilante, 'Data de Validade do Vigilante');

    relatorioGeral.push({ tipo: 'Vigilante', dados: vigilante });
    exibirRelatorio();
}
function cadastrarVigilante() {
    var nome = document.getElementById('nome').value;
    var matricula = document.getElementById('matricula').value;
    var posto = document.getElementById('posto').value;
    var arma = document.getElementById('arma').value;
    var colete = document.getElementById('colete').value;
    var dataValidadeVigilante = document.getElementById('dataValidadeVigilante').value;
    var atividades = document.getElementById('atividades').value;

    var vigilante = {
        nome: nome,
        matricula: matricula,
        posto: posto,
        arma: arma,
        colete: colete,
        dataValidadeVigilante: dataValidadeVigilante,
        atividades: atividades
    };

    relatorioGeral.push(vigilante);
    exibirRelatorio();
}


function implantacao() {
    registrarAcaoOperacional('Implantação realizada.');
}

function recolhimento() {
    registrarAcaoOperacional('Recolhimento realizado.');
}

function remanejamento() {
    registrarAcaoOperacional('Remanejamento realizado.');
}

function ferias() {
    registrarAcaoOperacional('Período de férias registrado.');
    verificarDataValidadeProximaVencer(document.getElementById('dataValidadeFerias').value, 'Vencimento do Período de Férias');
}

function comUniforme() {
    registrarAcaoOperacional('Vigilante com uniforme.');
    verificarDataValidadeProximaVencer(document.getElementById('dataValidadeUniforme').value, 'Vencimento do Uniforme');
}

function encerramentoPosto() {
    registrarAcaoOperacional('Encerramento do posto registrado.');
}

function ocorrencia() {
    var descricao = prompt('Descreva a ocorrência:');
    registrarAcaoOperacional('Ocorrência registrada: ' + descricao);
}

function numeracaoArmaColete() {
    var arma = prompt('Informe a numeração da arma:');
    var colete = prompt('Informe a numeração do colete:');
    registrarAcaoEquipamentosDocumentacao('Numeração de armamento e colete registrada: Arma ' + arma + ', Colete ' + colete);
}

function equipamentosNovos() {
    var equipamento = prompt('Informe o equipamento novo:');
    registrarAcaoEquipamentosDocumentacao('Equipamento novo registrado: ' + equipamento);
}

function procedimentoNovoCliente() {
    registrarAcaoEquipamentosDocumentacao('Procedimento novo de cliente registrado.');
}

function documentosEntregues() {
    registrarAcaoEquipamentosDocumentacao('Documentos entregues registrados.');
}

function verificarDataValidadeProximaVencer(data, tipo) {
    var dataAtual = new Date();
    var dataValidade = new Date(data);

    // Adicionando 30 dias à data atual para verificar se está a um mês de vencer
    var umMesAntes = new Date(dataAtual);
    umMesAntes.setMonth(umMesAntes.getMonth() + 1);

    if (dataValidade < umMesAntes) {
        var mensagem = tipo + ' está a um mês de vencer!';
        alert(mensagem);

        relatorioGeral.push({ tipo: 'Alerta', descricao: mensagem });
        exibirRelatorio();
    }
}

function registrarAcaoOperacional(descricao) {
    relatorioGeral.push({ tipo: 'Ação Operacional', descricao });
    exibirRelatorio();
}

function registrarAcaoEquipamentosDocumentacao(descricao) {
    relatorioGeral.push({ tipo: 'Ação Equipamentos/Documentação', descricao });
    exibirRelatorio();
}

function exibirRelatorio() {
    var listaRelatorio = document.getElementById('lista-relatorio');
    listaRelatorio.innerHTML = '';

    for (var i = 0; i < relatorioGeral.length; i++) {
        var item = document.createElement('li');
        item.textContent = relatorioGeral[i].tipo + ': ' + relatorioGeral[i].descricao;
        listaRelatorio.appendChild(item);
    }
}

// Função para enviar o e-mail com o PDF anexado
function enviarEmail() {
    Email.send({
        Host: "smtp.youremail.com",
        Username: "yourusername",
        Password: "yourpassword",
        To: "recipient@example.com",
        From: "you@example.com",
        Subject: "Relatório Geral",
        Body: "Por favor, encontre em anexo o relatório geral.",
        Attachments: [
            {
                name: "relatorio.pdf",
                data: "base64encodedstring" // Aqui você insere o conteúdo do PDF como uma string codificada em base64
            }
        ]
    }).then(
      message => alert(message)
    );
}
