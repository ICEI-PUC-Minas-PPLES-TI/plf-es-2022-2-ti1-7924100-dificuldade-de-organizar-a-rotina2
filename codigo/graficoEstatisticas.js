function leDados() {
    let strDados = localStorage.getItem('db');
    let objDados = {};
  
    if (strDados) {
      objDados = JSON.parse(strDados);
    }
    else {
      objDados = {
        tarefas: [
          { nome: "Trabalho TIAW", categoria: "Urgente", date: "23/10/2022", observacoes: "Não deve possuir Backend", concluida: "concluida" },
          { nome: "Prova de IC", categoria: "Moderado", date: "22/10/2022", observacoes: "não deve possuir Backend", concluida: "concluida" },
          { nome: "Trabalho PROG2", categoria: "Moderado", date: "22/10/2022", observacoes: "não deve possuir Backend", concluida: "concluida"  },
          { nome: "Trabalho AEDS I ", categoria: "Moderado", date: "22/10/2022", observacoes: "não deve possuir Backend", concluida: "concluida"  },
          { nome: "Trabalho Calculo", categoria: "Moderado", date: "22/10/2022", observacoes: "não deve possuir Backend", concluida: "concluida"  }],
        categorias: [
          { id: 1, categoria: "Urgente" },
          { id: 2, categoria: "Moderado" },
          { id: 3, categoria: "Fácil" }
        ]
      }
    }
  
    return objDados;
  }
  
  function calculaDadosGraficoBarra(dados) {
    const nomesCategorias = [];
    const quantidadesCategorias = [];
    
    dados.categorias.map((categoria) => {
      const tarefasCategoria = dados.tarefas.filter(tarefa => tarefa.categoria == categoria.nome);
      nomesCategorias.push(categoria.nome);
      quantidadesCategorias.push(tarefasCategoria.length);
    });
  
    return {
      nomesCategorias,
      quantidadesCategorias
    };
  }
  
  function constroiGraficos() {
    const dados = leDados();
  
    constroiGraficoBarra(dados);
  
    constroiGraficoRosca(dados);
  
  }
  
  function constroiGraficoRosca(dados) {
  
    const concluidos = dados.tarefas.filter(tarefa => tarefa.concluida === "concluida");
    const naoConcluidos = dados.tarefas.filter(tarefa => tarefa.concluida !== "concluida");
  
    const data = {
      labels: ['Concluídas', 'Não Concluídas'],
      datasets: [{
        barPercentage: 0.5,
        backgroundColor: ['#0a6fb8', '#767a7d'],
        borderColor: '#ffffff',
        data: [concluidos.length, naoConcluidos.length],
      }]
    };
  
    const config = {
      type: 'doughnut',
      data: data,
      options: {
        plugins: {
          legend: {
            display: false
          }
        },
        ticks: {
          precision: 0
        },
        maintainAspectRatio: false
  
      }
    };
  
    new Chart(
      document.getElementById('graficoRosca'),
      config
    );
  }
  
  function constroiGraficoBarra(dados) {
  
    const { nomesCategorias, quantidadesCategorias } = calculaDadosGraficoBarra(dados);
  
    const data = {
      labels: nomesCategorias,
      datasets: [{
        barPercentage: 0.5,
        backgroundColor: '#0a6fb8',
        borderColor: '#ffffff',
        data: quantidadesCategorias,
      }]
    };
  
    const config = {
      type: 'bar',
      data: data,
      options: {
        plugins: {
          legend: {
            display: false
          }
        },
        ticks: {
          precision: 0
        }
  
      }
    };
  
    new Chart(
      document.getElementById('graficoBarra'),
      config
    );
  }
  
  constroiGraficos();