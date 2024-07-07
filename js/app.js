// app.js
import { adicionarTarefa, excluirTarefa, concluirTarefa, concluirSubtarefa, adicionarSubtarefa, editarTarefa, editarSubtarefa, filtrarTarefas } from './tarefas.js';
import { renderizarTarefas } from './ui.js';

export function iniciarAplicacao() {
    const entradaTarefa = document.getElementById('entradaTarefa');
    const seletorDia = document.getElementById('seletorDia');
    const botaoAdicionarTarefa = document.getElementById('botaoAdicionarTarefa');
    const listaTarefas = document.getElementById('listaTarefas');
    const botoesFiltro = document.querySelectorAll('.botao-filtro');

    botaoAdicionarTarefa.addEventListener('click', () => {
        const nomeTarefa = entradaTarefa.value.trim();
        const diaTarefa = seletorDia.value;
        if (nomeTarefa && diaTarefa) {
            adicionarTarefa(nomeTarefa, diaTarefa);
            entradaTarefa.value = '';
            seletorDia.value = '';
            renderizarTarefas();
        } else {
            alert('Por favor, insira um nome de tarefa e selecione um dia.');
        }
    });

    listaTarefas.addEventListener('click', (event) => {
        if (event.target.closest('.excluir-tarefa')) {
            const index = event.target.closest('.excluir-tarefa').dataset.index;
            const tarefaElemento = event.target.closest('.tarefa');
            tarefaElemento.classList.add('concluida');
            tarefaElemento.addEventListener('animationend', () => {
                excluirTarefa(index);
                renderizarTarefas();
            });
        } else if (event.target.closest('.adicionar-subtarefa')) {
            const index = event.target.closest('.adicionar-subtarefa').dataset.index;
            const nomeSubtarefa = prompt('Digite o nome da subtarefa:');
            if (nomeSubtarefa) {
                adicionarSubtarefa(index, nomeSubtarefa);
                renderizarTarefas();
            }
        } else if (event.target.closest('.botao-adicionar-subtarefa')) {
            const index = event.target.closest('.botao-adicionar-subtarefa').dataset.index;
            const inputSubtarefa = document.querySelector(`.input-subtarefa[data-index="${index}"]`);
            const nomeSubtarefa = inputSubtarefa.value.trim();
            if (nomeSubtarefa) {
                adicionarSubtarefa(index, nomeSubtarefa);
                renderizarTarefas();
            }
        } else if (event.target.closest('.editar-tarefa')) {
            const index = event.target.closest('.editar-tarefa').dataset.index;
            const nomeTarefa = prompt('Edite o nome da tarefa:', tarefas[index].nome);
            if (nomeTarefa) {
                editarTarefa(index, nomeTarefa);
                renderizarTarefas();
            }
        } else if (event.target.closest('.editar-subtarefa')) {
            const indexTarefa = event.target.closest('.editar-subtarefa').dataset.indexTarefa;
            const indexSubtarefa = event.target.closest('.editar-subtarefa').dataset.indexSubtarefa;
            const nomeSubtarefa = prompt('Edite o nome da subtarefa:', tarefas[indexTarefa].subtarefas[indexSubtarefa].nome);
            if (nomeSubtarefa) {
                editarSubtarefa(indexTarefa, indexSubtarefa, nomeSubtarefa);
                renderizarTarefas();
            }
        }
    });

    listaTarefas.addEventListener('change', (event) => {
        if (event.target.classList.contains('concluir-tarefa')) {
            const index = event.target.dataset.index;
            const tarefaElemento = event.target.closest('.tarefa');
            tarefaElemento.classList.add('concluida');
            tarefaElemento.addEventListener('animationend', () => {
                concluirTarefa(index, event.target.checked);
                renderizarTarefas();
            });
        }

        if (event.target.classList.contains('concluir-subtarefa')) {
            const indexTarefa = event.target.dataset.indexTarefa;
            const indexSubtarefa = event.target.dataset.indexSubtarefa;
            concluirSubtarefa(indexTarefa, indexSubtarefa, event.target.checked);
            renderizarTarefas();
        }
    });

    botoesFiltro.forEach(botao => {
        botao.addEventListener('click', () => {
            const dia = botao.dataset.dia;
            const tarefasFiltradas = filtrarTarefas(dia);
            renderizarTarefas(tarefasFiltradas);
        });
    });

    // Renderização inicial
    renderizarTarefas();
}
