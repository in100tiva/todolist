// ui.js
import { tarefas, traduzirDia, adicionarSubtarefa } from './tarefas.js';

export function renderizarTarefas(tarefasFiltradas = tarefas) {
    const listaTarefas = document.getElementById('listaTarefas');
    listaTarefas.innerHTML = '';
    tarefasFiltradas.forEach((tarefa, index) => {
        const itemTarefa = document.createElement('li');
        itemTarefa.classList.add('tarefa');
        if (tarefa.recente) {
            itemTarefa.classList.add('adicionada');
            delete tarefa.recente;
        }
        itemTarefa.innerHTML = `
            <div class="tarefa-header">
                <input type="checkbox" ${tarefa.concluida ? 'checked' : ''} data-index="${index}" class="concluir-tarefa">
                <span class="nome-tarefa">${tarefa.nome} (${traduzirDia(tarefa.dia)})</span>
                <button data-index="${index}" class="editar-tarefa"><i class="fas fa-edit"></i></button>
                <button data-index="${index}" class="adicionar-subtarefa"><i class="fas fa-plus"></i></button>
                <button data-index="${index}" class="excluir-tarefa"><i class="fas fa-trash"></i></button>
            </div>
        `;
        if (tarefa.subtarefas.length > 0) {
            const listaSubtarefas = document.createElement('ul');
            listaSubtarefas.classList.add('subtarefas');
            tarefa.subtarefas.forEach((subtarefa, subIndex) => {
                const itemSubtarefa = document.createElement('li');
                itemSubtarefa.innerHTML = `
                    <input type="checkbox" ${subtarefa.concluida ? 'checked' : ''} data-index-tarefa="${index}" data-index-subtarefa="${subIndex}" class="concluir-subtarefa">
                    <span class="nome-subtarefa">${subtarefa.nome}</span>
                    <button data-index-tarefa="${index}" data-index-subtarefa="${subIndex}" class="editar-subtarefa"><i class="fas fa-edit"></i></button>
                `;
                listaSubtarefas.appendChild(itemSubtarefa);
            });
            listaSubtarefas.innerHTML += `
                <li class="nova-subtarefa">
                    <input type="text" placeholder="Nova subtarefa..." data-index="${index}" class="input-subtarefa">
                    <button data-index="${index}" class="botao-adicionar-subtarefa"><i class="fas fa-plus"></i></button>
                </li>
            `;
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
