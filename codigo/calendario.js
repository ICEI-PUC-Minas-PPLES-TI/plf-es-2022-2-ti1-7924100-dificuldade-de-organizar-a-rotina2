let nav = 0;
let clicked = null;
var db = localStorage.getItem('db') ? JSON.parse(localStorage.getItem('db')) : [];
var alreadyLoaded = false;

const calendar = document.getElementById('calendar');
const newEventModal = document.getElementById('newEventModal');
const deleteEventModal = document.getElementById('deleteEventModal');
const backDrop = document.getElementById('modalBackDrop');
const eventDescriptionInput = document.getElementById('eventText');
const weekdays = ['Domingo', 'Segunda', 'Terca', 'Quarta', 'Quinta', 'Sexta', 'Sabado'];
const deleteEventTitle = document.getElementById('deleteEventTitle');
const deleteEventCategory = document.getElementById('deleteEventCategory');

function redirectToCreate(date) {
  clicked = date;
  const eventForDay = db.tarefas.find(e => e.date === clicked);

  if (!eventForDay) {
    window.location.href = './CadastroTarefas.html';
  } else {
    eventDescriptionInput.innerHTML = `<b>Observacoes: </b>${eventForDay.observacoes}`;
    deleteEventTitle.innerHTML = eventForDay.nome;
    deleteEventCategory.innerHTML = `<b>Categoria: </b>${eventForDay.categoria}`;
    deleteEventModal.style.display = 'block';
    backDrop.style.display = 'block';
  }
}

function load() {
  if(alreadyLoaded){
    calendar.innerHTML = '';
  }
  alreadyLoaded = true;
  if(db.length == 0){
    const dbSetup = {
      "tarefas": [],
      "categorias": []
    };
    localStorage.setItem('db', JSON.stringify(dbSetup));
    db = dbSetup;
  }
    const dt = new Date();

  if (nav !== 0) {
    dt.setMonth(new Date().getMonth() + nav);
  }

  const day = dt.getDate();
  const month = dt.getMonth();
  const year = dt.getFullYear();

  const firstDayOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  const dateString = firstDayOfMonth.toLocaleDateString('pt-br', {
    weekday: 'long',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });
  const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);

  document.getElementById('monthDisplay').innerText = 
    `${dt.toLocaleDateString('pt-br', { month: 'long' })} ${year}`;


  for(let i = 0; i <= paddingDays + daysInMonth; i++) {
    const daySquare = document.createElement('div');
    daySquare.classList.add('day');

    const dayString = `${month + 1}/${i - paddingDays}/${year}`;

    if (i > paddingDays) {
      daySquare.innerText = i - paddingDays;
      let eventForDay;
      db.tarefas ? eventForDay = db.tarefas.filter(e => e.date === dayString) : eventForDay = null;

      if (i - paddingDays === day && nav === 0) {
        daySquare.id = 'currentDay';
      }

      if (eventForDay && eventForDay.length > 0) {
        const eventDiv = document.createElement('div');
        eventDiv.classList.add('event');
        eventDiv.innerText = eventForDay[0].nome;
        daySquare.appendChild(eventDiv);
      }

      daySquare.addEventListener('click', () => redirectToCreate(dayString));
    } else {
      daySquare.classList.add('padding');
    }

    calendar.appendChild(daySquare);    
  }
  
}

function closeModal() {
  eventTitleInput.classList.remove('error');
  newEventModal.style.display = 'none';
  deleteEventModal.style.display = 'none';
  backDrop.style.display = 'none';
  eventTitleInput.value = '';
  clicked = null;
}

function deleteEvent() {
  db.tarefas = db.tarefas.filter(e => e.date !== clicked);
  localStorage.setItem('db', JSON.stringify(db));
  closeModal();
  load();
}

function initButtons() {
  document.getElementById('nextButton').addEventListener('click', () => {
    nav++;
    load();
  });

  document.getElementById('backButton').addEventListener('click', () => {
    nav--;
    load();
  });

  document.getElementById('cancelButton').addEventListener('click', closeModal);
  document.getElementById('deleteButton').addEventListener('click', deleteEvent);
  document.getElementById('closeButton').addEventListener('click', closeModal);
}

initButtons();
load();
