function leDados() {
  let strDados = localStorage.getItem('db');
  let objDados = {};

  if (strDados) {
    objDados = JSON.parse(strDados);
  }
  else {
    objDados = {
      tarefas: [
        { id: "1", nome: "Trabalho TIAW", categoria: "Urgente", date: "23/10/2022", observacoes: "Não deve possuir Backend", concluida: "pendente" },
        { id: "2", nome: "Prova de IC", categoria: "Moderado", date: "22/10/2022", observacoes: "não deve possuir Backend", concluida: "pendente" },
        { id: "3", nome: "Trabalho PROG2", categoria: "Moderado", date: "22/10/2022", observacoes: "não deve possuir Backend", concluida: "pendente" },
        { id: "4", nome: "Trabalho AEDS I ", categoria: "Moderado", date: "22/10/2022", observacoes: "não deve possuir Backend", concluida: "pendente" },
        { id: "5", nome: "Trabalho Calculo", categoria: "Moderado", date: "22/10/2022", observacoes: "não deve possuir Backend", concluida: "pendente" }],
      categorias: [
        { id: 1, nome: "Urgente" },
        { id: 2, nome: "Moderado" },
        { id: 3, nome: "Fácil" }
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
  let n = 0
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
          <th>Status:</th>
          </tr>
          </thead>
          `
    tarefas.forEach((tarefa) => {
      n = n + 1
       
      list += `
            <tbody>
            <tr>
            <td>${tarefa.nome}</td>
            <td>${tarefa.categoria}</td>
            <td>${tarefa.date}</td>
            <td>${tarefa.observacoes}</td>
            <td>
            <form>
            <INPUT TYPE="RADIO" class="status" data-id-status="${tarefa.id}" NAME="${n}" VALUE="pendente"> Pendente
            <INPUT TYPE="RADIO" class="status" data-id-status="${tarefa.id}" NAME="${n}" VALUE="concluida"> Concluida
            <INPUT TYPE="RADIO" class="status" data-id-status="${tarefa.id}" NAME="${n}" VALUE="perdida"> Perdida
            </form>
            </td>
            </tr>
            </tbody>
            `
    })
    list += `</table>`
  }

  listContainer.innerHTML = list;
}

function attS (tarefas) {
  let n = 0;
let dados = leDados();
dados.tarefas.forEach(tarefa  => {
  n = n + 1;
  var radios = document.getElementsByName(n);  
  for (var i = 0; i < radios.length; i++) {
    if(radios[i].checked) {
      tarefa.concluida = radios[i].value;
    }
  }
  localStorage.setItem('db', JSON.stringify(dados));
})
alert("Status das Tarefas Alterado Com Sucesso, Cheque o Console para ver")
}

function preencheSelectCategorias(categorias) {
  const selectCategorias = document.getElementById("selectCategorias");
  
  categorias.forEach((categoria) => {
    let option = document.createElement("option");
    option.setAttribute('value', categoria.nome);
    
    let optionText = document.createTextNode(categoria.nome);
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
    tarefas = tarefas.filter((tarefa) => tarefa.categoria === filtroCategoria);
  }

  constroiListagem(tarefas);
  
}

function esvaziaLista() {
  listContainer.innerHTML = '';
}

filterButton.addEventListener("click", filtra);

render();

  document.getElementById ('btnAtualizar').addEventListener ('click', attS);