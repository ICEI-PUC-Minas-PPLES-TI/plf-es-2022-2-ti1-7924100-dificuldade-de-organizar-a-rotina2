
function leTarefa() {
    let strDados = localStorage.getItem('db');
    let objDados = {};
    
    if (strDados) {
        objDados = JSON.parse (strDados);
    }
    else {
        objDados = { tarefas: [ 
            {id: 1, tarefa: "Trabalho TIAW", categoria: "Urgente", dataEntrega: "23/10/2022", observacoes: "Não deve possuir Backend"},
            {id: 2, tarefa: "Trabalho tiaw", categoria: "moderado", dataEntrega: "22/10/2022", observacoes: "não deve possuir Backend"} ]
        }
    }

    return objDados;
}

function SalvarTarefa(dados) {
    localStorage.setItem('db', JSON.stringify (dados));

}

function incluirTarefa() {
    let objDados = leTarefa();

    let novoId = 1;
    if (objDados.tarefas.length != 0) 
      novoId = objDados.tarefas[objDados.tarefas.length - 1].id + 1;
    let strNomeTarefa = document.getElementById ('nomeTarefa').value;
    let strCategoriaTarefa = document.getElementById ('categoriaTarefa').value;
    let strDataEntrega = document.getElementById ('dataEntrega').value;
    let strObservacoes = document.getElementById ('observacoes').value;
    let novaTarefa = {
        id: novoId,
        tarefa: strNomeTarefa,
        categoria: strCategoriaTarefa,
        dataEntrega: strDataEntrega,
        observacoes: strObservacoes
    };
    objDados.tarefas.push (novaTarefa);
    if(novaTarefa.categoria == "Escolha uma cor"){
        alert("Informe uma categoria");
    }
    else{
    SalvarTarefa (objDados);
    }
}

//Botão salvar

document.getElementById ('btnCadastrar').addEventListener ('click', incluirTarefa);
