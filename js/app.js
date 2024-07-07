// app.js
import { adicionarTarefa, excluirTarefa, concluirTarefa, concluirSubtarefa, filtrarTarefas } from './tarefas.js';
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
        if (event.target.classList.contains('excluir-tarefa')) {
            const index = event.target.dataset.index;
            excluirTarefa(index);
            renderizarTarefas();
        }
    });

    listaTarefas.addEventListener('change', (event) => {
        if (event.target.classList.contains('concluir-tarefa')) {
            const index = event.target.dataset.index;
            concluirTarefa(index, event.target.checked);
            renderizarTarefas();
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
