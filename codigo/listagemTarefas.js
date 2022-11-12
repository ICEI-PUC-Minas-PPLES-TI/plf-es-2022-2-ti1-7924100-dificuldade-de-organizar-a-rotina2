function leDados() {
  let strDados = localStorage.getItem('db');
  let objDados = {};

  if (strDados) {
    objDados = JSON.parse(strDados);
  }
  else {
    objDados = {
      tarefas: [
        { nomeTarefa: "Trabalho TIAW", categoriaTarefa: "Urgente", dataEntrega: "23/10/2022", observacoes: "Não deve possuir Backend", concluida: "true" },
        { nomeTarefa: "Prova de IC", categoriaTarefa: "Moderado", dataEntrega: "22/10/2022", observacoes: "não deve possuir Backend", concluida: "false" },
        { nomeTarefa: "Trabalho PROG2", categoriaTarefa: "Moderado", dataEntrega: "22/10/2022", observacoes: "não deve possuir Backend", concluida: "false" },
        { nomeTarefa: "Trabalho AEDS I ", categoriaTarefa: "Moderado", dataEntrega: "22/10/2022", observacoes: "não deve possuir Backend", concluida: "true" },
        { nomeTarefa: "Trabalho Calculo", categoriaTarefa: "Moderado", dataEntrega: "22/10/2022", observacoes: "não deve possuir Backend", concluida: "false" }],
      categorias: [
        { id: 1, nomeCategoria: "Urgente" },
        { id: 2, nomeCategoria: "Moderado" },
        { id: 3, nomeCategoria: "Fácil" }
      ]
    }
  }

  return objDados;
}

const listContainer = document.querySelector("#list");
const header = document.querySelector("#header");
const filterButton = document.querySelector("#btnFiltro");

function render() {
  const { tarefas, categorias } = leDados();


  if (categorias.length > 0) {
    preencheSelectCategorias(categorias);
  }

  constroiListagem(tarefas);

}

function constroiListagem(tarefas) {
  let list = '';

  if (tarefas.length <= 0) {
    list += `<div id="no-tarefas">Nenhuma tarefa disponível</div>`;
  } else {
    list += `
          <table id ='listaTarefas'>
          <thead>
          <tr>
          <th>Tarefa:</th>
          <th>Categoria:</th>
          <th>Data:</th>
          <th>Observação:</th>
          </tr>
          </thead>
          `
    tarefas.forEach((tarefa) => {
      list += `
            <tbody>
            <tr>
            <td>${tarefa.nomeTarefa}</td>
            <td>${tarefa.categoriaTarefa}</td>
            <td>${tarefa.dataEntrega}</td>
            <td>${tarefa.observacoes}</td>
            </tr>
            </tbody>
            `
    })
    list += `</table>`
  }

  listContainer.innerHTML = list;
}

function preencheSelectCategorias(categorias) {
  const selectCategorias = document.getElementById("selectCategorias");

  categorias.forEach((categoria) => {
    let option = document.createElement("option");
    option.setAttribute('value', categoria.nomeCategoria);

    let optionText = document.createTextNode(categoria.nomeCategoria);
    option.appendChild(optionText);

    selectCategorias.appendChild(option);
  })
}

function filtra() {
  esvaziaLista();

  let { tarefas } = leDados();
  
  const filtroCategoria = document.getElementById("selectCategorias").value;
  const filtroConcluida = document.getElementById("selectConcluida").value;

  if(filtroConcluida != "Todas"){
    tarefas = tarefas.filter((tarefa) => tarefa.concluida === filtroConcluida);
  }
  if( filtroCategoria != "Nenhuma"){
    tarefas = tarefas.filter((tarefa) => tarefa.categoriaTarefa === filtroCategoria);
  }

  constroiListagem(tarefas);

}

function esvaziaLista() {
  listContainer.innerHTML = '';
}

filterButton.addEventListener("click", filtra);

render();