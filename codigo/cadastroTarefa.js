
function leTarefa() {
    let strDados = localStorage.getItem('events');
    let objDados = {};
    
    if (strDados) {
        objDados = JSON.parse (strDados);
    }
    else {
        objDados = { tarefas: [ 
            {id: 1, nomeTarefa: "Trabalho TIAW", categoriaTarefa: "pendente", date: "23/10/2022", observacoes: "Não deve possuir Backend", concluida: "pendente"},
            {id: 2, nomeTarefa: "Trabalho tiaw", categoriaTarefa: "perdido", date: "22/10/2022", observacoes: "não deve possuir Backend", concluida: "pendente"}],
            categorias: [
                { id: 1, nomeCategoria: "Urgente" },
                { id: 2, nomeCategoria: "Moderado" },
                { id: 3, nomeCategoria: "Fácil" }
              ] 
        }
    }

    return objDados;
}

function SalvarTarefa(dados) {
    localStorage.setItem('events', JSON.stringify (dados));

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
        nomeTarefa: strNomeTarefa,
        categoriaTarefa: strCategoriaTarefa,
        date: strDataEntrega,
        observacoes: strObservacoes,
        concluida: "pendente"
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
