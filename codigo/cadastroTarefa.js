function leTarefa() {
    let strDados = localStorage.getItem('db');
    let objDados = {};
    
    if (strDados) {
        objDados = JSON.parse (strDados);
    }
    else {
        objDados = { tarefas: [ 
            {nomeTarefa: "Trabalho TIAW", categoriaTarefa: "Urgente", dataEntrega: "23/10/2022", observacoes: "Não deve possuir Backend"},
            {nomeTarefa: "Trabalho tiaw", categoriaTarefa: "moderado", dataEntrega: "22/10/2022", observacoes: "não deve possuir Backend"} ]
        }
    }

    return objDados;
}

function SalvarTarefa(dados) {
    localStorage.setItem('db', JSON.stringify (dados));

}

function incluirTarefa() {
    let objDados = leTarefa();
    
    let strNomeTarefa = document.getElementById ('nomeTarefa').value;
    let strCategoriaTarefa = document.getElementById ('categoriaTarefa').value;
    let strDataEntrega = document.getElementById ('dataEntrega').value;
    let strObservacoes = document.getElementById ('observacoes').value;
    let novaTarefa = {
        tarefa: strNomeTarefa,
        categoria: strCategoriaTarefa,
        dataEntrega: strDataEntrega,
        observacoes: strObservacoes
    };
    objDados.tarefas.push (novaTarefa);

    SalvarTarefa (objDados);
}

//Botão salvar

document.getElementById ('btnCadastrar').addEventListener ('click', incluirTarefa);
