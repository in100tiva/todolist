// tarefas.js
export let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

function salvarTarefas() {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

export function adicionarTarefa(nomeTarefa, diaTarefa) {
    const novaTarefa = {
        nome: nomeTarefa,
        dia: diaTarefa,
        concluida: false,
        subtarefas: []
    };
    tarefas.push(novaTarefa);
    salvarTarefas();
}

export function excluirTarefa(index) {
    tarefas.splice(index, 1);
    salvarTarefas();
}

export function concluirTarefa(index, concluida) {
    tarefas[index].concluida = concluida;
    if (tarefas[index].subtarefas.length > 0) {
        tarefas[index].subtarefas.forEach(subtarefa => subtarefa.concluida = concluida);
    }
    salvarTarefas();
}

export function concluirSubtarefa(indexTarefa, indexSubtarefa, concluida) {
    tarefas[indexTarefa].subtarefas[indexSubtarefa].concluida = concluida;
    const todasSubtarefasConcluidas = tarefas[indexTarefa].subtarefas.every(subtarefa => subtarefa.concluida);
    tarefas[indexTarefa].concluida = todasSubtarefasConcluidas;
    salvarTarefas();
}

export function filtrarTarefas(dia) {
    if (dia === 'todos') {
        return tarefas;
    }
    return tarefas.filter(tarefa => tarefa.dia === dia);
}

export function traduzirDia(dia) {
    const dias = {
        segunda: 'Segunda-feira',
        terca: 'Terça-feira',
        quarta: 'Quarta-feira',
        quinta: 'Quinta-feira',
        sexta: 'Sexta-feira',
        sabado: 'Sábado',
        domingo: 'Domingo'
    };
    return dias[dia] || dia;
}
