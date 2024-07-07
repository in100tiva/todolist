// ui.js
import { tarefas, traduzirDia } from './tarefas.js';

export function renderizarTarefas(tarefasFiltradas = tarefas) {
    const listaTarefas = document.getElementById('listaTarefas');
    listaTarefas.innerHTML = '';
    tarefasFiltradas.forEach((tarefa, index) => {
        const itemTarefa = document.createElement('li');
        itemTarefa.classList.add('tarefa');
        itemTarefa.innerHTML = `
            <input type="checkbox" ${tarefa.concluida ? 'checked' : ''} data-index="${index}" class="concluir-tarefa">
            <span>${tarefa.nome} (${traduzirDia(tarefa.dia)})</span>
            <button data-index="${index}" class="excluir-tarefa">Excluir</button>
        `;
        if (tarefa.subtarefas.length > 0) {
            const listaSubtarefas = document.createElement('ul');
            listaSubtarefas.classList.add('subtarefas');
            tarefa.subtarefas.forEach((subtarefa, subIndex) => {
                const itemSubtarefa = document.createElement('li');
                itemSubtarefa.innerHTML = `
                    <input type="checkbox" ${subtarefa.concluida ? 'checked' : ''} data-index-tarefa="${index}" data-index-subtarefa="${subIndex}" class="concluir-subtarefa">
                    <span>${subtarefa.nome}</span>
                `;
                listaSubtarefas.appendChild(itemSubtarefa);
            });
            itemTarefa.appendChild(listaSubtarefas);
        }
        listaTarefas.appendChild(itemTarefa);
    });
    atualizarProgresso();
}

function atualizarProgresso() {
    const barraProgresso = document.getElementById('barraProgresso');
    const tarefasConcluidas = tarefas.filter(tarefa => tarefa.concluida).length;
    const totalTarefas = tarefas.length;
    const progresso = totalTarefas === 0 ? 0 : (tarefasConcluidas / totalTarefas) * 100;
    barraProgresso.value = progresso;
}
