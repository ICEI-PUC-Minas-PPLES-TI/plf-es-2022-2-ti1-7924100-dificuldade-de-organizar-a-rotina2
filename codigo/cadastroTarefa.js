
function leDados() {
    let strDados = localStorage.getItem('db');
    let objDados = {};

    if (strDados) {
        objDados = JSON.parse(strDados);
    }
    else {
        objDados = {
            tarefas: [
                { id: 1, nome: "Trabalho TIAW", categoria: "pendente", date: "23/10/2022", observacoes: "Não deve possuir Backend", concluida: "pendente" },
                { id: 2, nome: "Trabalho tiaw", categoria: "perdido", date: "22/10/2022", observacoes: "não deve possuir Backend", concluida: "pendente" }],
            categorias: [
                { id: 1, nome: "Urgente" },
                { id: 2, nome: "Moderado" },
                { id: 3, nome: "Fácil" }
            ]
        }
    }

    return objDados;
}

function SalvarTarefa(dados) {
    localStorage.setItem('db', JSON.stringify(dados));

}

function incluirTarefa() {
    let objDados = leDados();

    let novoId = 1;
    if (objDados.tarefas.length != 0)
        novoId = objDados.tarefas[objDados.tarefas.length - 1].id + 1;
    let strnome = document.getElementById('nomeTarefa');
    let strcategoria = document.getElementById('categoriaTarefa');
    let strdata = document.getElementById('dataTarefa');
    let strObservacoes = document.getElementById('observacoesTarefa');
    let novaTarefa = {
        id: novoId,
        nome: strnome.value,
        categoria: strcategoria.value,
        date: strdata.value,
        observacoes: strObservacoes.value,
        concluida: "pendente"
    };
    objDados.tarefas.push(novaTarefa);
    if (novaTarefa.categoria == "Escolha uma cor") {
        alert("Informe uma categoria");
    }
    else {
        SalvarTarefa(objDados);
    }

    strnome.value = '';
    strcategoria.value = '';
    strdata.value = '';
    strObservacoes.value = '';
}

function preencheSelectCategorias() {
    const {categorias} = leDados();

    const selectCategorias = document.getElementById("categoriaTarefa");

    categorias.forEach((categoria) => {
        let option = document.createElement("option");
        option.setAttribute('value', categoria.nome);

        let optionText = document.createTextNode(categoria.nome);
        option.appendChild(optionText);

        selectCategorias.appendChild(option);
    })
}

preencheSelectCategorias();
document.getElementById('btnCadastrar').addEventListener('click', incluirTarefa);
