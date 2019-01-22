let events = [];

const fetchEvents = async () => {
  const url = 'http://localhost:3000/api/v1/events/';
  const response = await fetch(url);
  const results = await response.json();
  return results;
};

const appendNewEvent = (calEvent) => {
  $('.events-container').append(`
    <article class="event-article ${calEvent.category}">
      <h5 class="event-title-header">${calEvent.title}</h5>
      <p>${calEvent.date}, ${calEvent.time}</p>
      <p>${calEvent.comments}</p>
      <div class="event-task-container_append">
      </div>
    </article>
    `);
  $(`.${calEvent.category}`).css('background-color', calEvent.category);
};

const handlePageLoad = async () => {
  let events = await fetchEvents();
  events.forEach(calEvent => {
    appendNewEvent(calEvent);
    // fetchEventTasks(event.id);
  });
};

handlePageLoad();