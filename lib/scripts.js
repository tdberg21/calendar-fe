let events = [];
let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let selectYear = $('#year');
let selectMonth = $('#month');
let monthAndYear = $('#monthAndYear');

let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const showCalendar = (year, month) => {
  let firstDay = (new Date(year, month)).getDay();
  let numberOfDays = daysInMonth(year, month);

  let tbl = $('#calendar-body');

  tbl.html('');

  monthAndYear.html(months[month] + ' ' + year);
  selectYear.val(year);
  selectMonth.val(month);

  let date = 1;
    for (let i = 0; i < 6; i++) {
      $('.table').append(`<tr class='row-${i}'> </tr>`);
      let row = $(`.row-${i}`);

      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstDay) {
          row.append(`<td class='cell-${j}'> </td>`);
          cell = $(`.cell-${j}`);

          row.append(cell);
        } else if (date > daysInMonth(year, month)) {
          break;
        } else {
          cell = document.createElement('td');
          row.append(`
            <td class='cell-${j}'> 
              <p> ${date} </p>
            </td>`
          );
          cell = $(`.cell-${j}`);
          events.forEach(event => {
            
           let splitDate = event.date.split('-');
           let eventYear = parseInt(splitDate[0]);
           let eventMonth = parseInt(splitDate[1].split('0')[1] - 1);
           let eventDay = parseInt(splitDate[2].split('0')[1]);
           if (currentYear === eventYear && currentMonth === eventMonth && date === eventDay) {
             cell.append(`<p> ${event.title} </p>`);
           }

          })
          date++;
        }
      }

      tbl.append(row);
    }
};

const daysInMonth = (iYear, iMonth) => {
  let dateNumber = new Date(iYear, iMonth, 32).getDate();
  numberOfDays = parseInt(32 - dateNumber)
  return numberOfDays;
};

const next = () => {
  currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
  currentMonth = (currentMonth + 1) % 12;
  showCalendar(currentYear, currentMonth);
}

const previous = () => {
  currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
  currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
  showCalendar(currentYear, currentMonth);
}

const jump = () => {
  currentYear = parseInt(selectYear.val());
  currentMonth = parseInt(selectMonth.val());
  showCalendar(currentYear, currentMonth);
}

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

const fillEvents = () => {

};

const appendNewEvent = (calEvent, tasks) => {
  $('.events-container').append(`
    <article class='event-article ${calEvent.category}'>
      <h5 class='event-title-header'>${calEvent.title}</h5>
      <p>${calEvent.date}, ${calEvent.time}</p>
      <p>${calEvent.comments}</p>
      <button id='${calEvent.id}' class='delete-event-button'> Delete Event </button>
      <div class='event-task-container_append' id='event-${calEvent.id}'>
      <h5>Tasks:</h5>
      </div>
    </article>
    `);
  $(`.${calEvent.category}`).css('border-color', calEvent.category);
  if (tasks && tasks.length) {
    tasks.forEach(task => {
      appendEventTasks(calEvent.id, task);
    })
  }
};

const appendEventTasks = (id, task) => {
      $(`#event-${id}`).append(`
    <div class='event-task-div'>
      <h5 class='event-title-header'>${task.name}</h5>
      <p>${task.priority}</p>
      <button id='${id}-${task.id}' class='delete-task-button'> Delete Task </button>
    </div>
    `);
};

const saveEvent = (event) => {
  event.preventDefault();
  let title = $('#create-event-input-title').val();
  let date = $('#create-event-input-date').val();
  let time = $('#create-event-input-time').val();
  let cleanedTime = cleanTime(time);
  let isPublic = $('#event-public-dropdown').val();
  let category = $('#create-event-input-category').val();
  let newEvent = { title, date, cleanedTime, isPublic, category }
  appendNewEvent(newEvent);
  // addEventToDB(newEvent);
}

const cleanTime = (time) => {
  if (time.includes('T')) {
    let splitTime1 = time.split('T');
    let splitTime2 = splitTime1[1].split(':');
    splitTime2.pop();
    return splitTime2.join(':');
  } else {
    return time
  }  
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
  // deleteEventFromDatabase(eventId);
  event.target.closest('article').remove();
};

const handleDeleteTask = async (event) => {
  let taskId = $(event.target).attr('id');
  // deleteEventFromDatabase(eventId);
  event.target.closest('div').remove();
};

const handlePageLoad = async () => {
  events = await fetchEvents();
  events.forEach(async calEvent => {
    calEvent.time = cleanTime(calEvent.time)
    let tasks = await fetchEventTasks(calEvent.id);
    appendNewEvent(calEvent, tasks);
  });
  showCalendar(currentYear, currentMonth);
};

handlePageLoad();
// fillEvents();

$('.create-event-submit-button').click((event) => saveEvent(event));
$('.events-container').on('click', 'article .delete-event-button', handleDeleteEvent);
$('.events-container').on('click', 'article .delete-task-button', handleDeleteTask);
