const corsAnywhereUrl = 'https://cors-anywhere.herokuapp.com/';

const fetchEvents = async () => {
  const url = `http://localhost:3000/api/v1/events/`;
  const response = await fetch(url);
  const results = await response.json();
  return results;
};

const fetchEventTasks = async (id) => {
  const url = `http://localhost:3000/api/v1/events/${id}/tasks`;
  const response = await fetch(url);
  const results = await response.json();
  return results;
};

const appendNewEvent = (calEvent, tasks) => {
  $('.events-container').append(`
    <article class="event-article ${calEvent.category}">
      <h5 class="event-title-header">${calEvent.title}</h5>
      <p>${calEvent.date}, ${calEvent.time}</p>
      <p>${calEvent.comments}</p>
      <button id="${calEvent.id}" class="delete-event-button"> Delete Event </button>
      <div class="event-task-container_append" id="event-${calEvent.id}">
      <h5>Tasks:</h5>
      </div>
    </article>
    `);
  $(`.${calEvent.category}`).css('border-color', calEvent.category);
  if (tasks.length) {
    appendEventTasks(calEvent.id, tasks);
  }
};

const appendEventTasks = (id, tasks) => {
    tasks.forEach(task => {
      $(`#event-${id}`).append(`
    <div class="event-task-div">
      <h5 class="event-title-header">${task.name}</h5>
      <p>${task.priority}</p>
      <button id="${id}-${task.id}" class="delete-task-button"> Delete Task </button>
    </div>
    `);
    })
};

const saveEvent = (event) => {
  event.preventDefault();
  let title = $('#create-event-input-title').val();
  let date = $('#create-event-input-date').val();
  let time = $('#create-event-input-time').val();
  let isPublic = $('#event-public-dropdown').val();
  let category = $('#create-event-input-category').val();
  let newEvent = { title, date, time, isPublic, category }
  console.log(newEvent)
  appendNewEvent(newEvent);
  // addEventToDB(newEvent);
}

// const addEventToDB = async (newEvent) => {
//   const url = `${corsAnywhereUrl}http://localhost:3000/api/v1/events/`;
//   const response = await fetch(url, {
//     method: 'POST',
//     body: JSON.stringify({
//       title: newEvent.title,
//       category: newEvent.category
//     }),
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   });
//   const results = await response.json();
//   console.log(results);
//   return await results;
// };

// const deleteEventFromDatabase = async (eventId) => {
//   const url = `http://localhost:3000/api/v1/events/${eventId}`;
//   const response = await fetch(url, {
//     method: 'DELETE'
//   });
//   const results = await response.json();
//   console.log(results)
// };


const handleDeleteEvent = async (event) => {
  let eventId = $(event.target).attr('id');
  console.log(eventId)
  // deleteEventFromDatabase(eventId);
  event.target.closest('article').remove();
};

const handleDeleteTask = async (event) => {
  let taskId = $(event.target).attr('id');
  console.log(taskId)
  // deleteEventFromDatabase(eventId);
  event.target.closest('div').remove();
};

const handlePageLoad = async () => {
  let events = await fetchEvents();
  events.forEach(async calEvent => {
    let tasks = await fetchEventTasks(calEvent.id);
    appendNewEvent(calEvent, tasks);
  });
};

handlePageLoad();

$('.create-event-submit-button').click((event) => saveEvent(event));
$('.events-container').on('click', 'article .delete-event-button', handleDeleteEvent);
$('.events-container').on('click', 'article .delete-task-button', handleDeleteTask);
$('#calendar').datepicker({
  inline: true,
  firstDay: 1,
  showOtherMonths: true,
  dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
});