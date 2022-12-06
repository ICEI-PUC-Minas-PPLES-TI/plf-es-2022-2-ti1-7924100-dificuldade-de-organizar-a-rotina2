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
document.getElementById("btnCadastrar").addEventListener('click', function(){
  const dados = leDados();
  var inputCategoria = document.getElementById("nomeCategoria");
  const nomeCategoria = inputCategoria.value;
  
  if(dados.categorias > 0){
    dados.categorias.push({
        "id": (dados.categorias[dados.categorias.length-1].id + 1),
        "nome": nomeCategoria
    });
  }else{
    dados.categorias.push({
      "id": 1,
      "nome": nomeCategoria
    });
  }
  localStorage.setItem('db', JSON.stringify(dados));
  inputCategoria.value = '';
})