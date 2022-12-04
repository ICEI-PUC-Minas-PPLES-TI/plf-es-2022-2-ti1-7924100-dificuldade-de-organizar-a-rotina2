function leDados() {
    let strDados = localStorage.getItem('events');
    let objDados = {};
  
    if (strDados) {
      objDados = JSON.parse(strDados);
    }
    else {
      objDados = {
        tarefas: [
          { nomeTarefa: "Trabalho TIAW", categoriaTarefa: "Urgente", dataEntrega: "23/10/2022", observacoes: "Não deve possuir Backend", concluida: true },
          { nomeTarefa: "Prova de IC", categoriaTarefa: "Moderado", dataEntrega: "22/10/2022", observacoes: "não deve possuir Backend", concluida: false },
          { nomeTarefa: "Trabalho PROG2", categoriaTarefa: "Moderado", dataEntrega: "22/10/2022", observacoes: "não deve possuir Backend", concluida: false },
          { nomeTarefa: "Trabalho AEDS I ", categoriaTarefa: "Moderado", dataEntrega: "22/10/2022", observacoes: "não deve possuir Backend", concluida: true },
          { nomeTarefa: "Trabalho Calculo", categoriaTarefa: "Moderado", dataEntrega: "22/10/2022", observacoes: "não deve possuir Backend", concluida: false }],
        categorias: [
          { id: 1, nomeCategoria: "Urgente" },
          { id: 2, nomeCategoria: "Moderado" },
          { id: 3, nomeCategoria: "Fácil" }
        ]
      }
    }
  
    return objDados;
  }
  
  function calculaDadosGraficoBarra(dados) {
    const nomesCategorias = [];
    const quantidadesCategorias = [];
  
    dados.categorias.map((categoria) => {
      const tarefasCategoria = dados.tarefas.filter(tarefa => tarefa.categoriaTarefa == categoria.nomeCategoria);
      nomesCategorias.push(categoria.nomeCategoria);
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
  
    const concluidos = dados.tarefas.filter(tarefa => tarefa.concluida);
    const naoConcluidos = dados.tarefas.filter(tarefa => !tarefa.concluida);
  
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