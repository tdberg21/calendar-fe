/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/scripts.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/scripts.js":
/*!************************!*\
  !*** ./lib/scripts.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var events = [];
var today = new Date();
var currentMonth = today.getMonth();
var currentYear = today.getFullYear();
var selectYear = $('#year');
var selectMonth = $('#month');
var monthAndYear = $('#monthAndYear');

var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

var showCalendar = function showCalendar(year, month) {
  var firstDay = new Date(year, month).getDay();
  var numberOfDays = daysInMonth(year, month);

  var tbl = $('#calendar-body');

  tbl.html('');

  monthAndYear.html(months[month] + ' ' + year);
  selectYear.val(year);
  selectMonth.val(month);

  var date = 1;
  for (var i = 0; i < 6; i++) {
    $('.table').append('<tr class=\'row-' + i + '\'> </tr>');
    var row = $('.row-' + i);

    for (var j = 0; j < 7; j++) {
      if (i === 0 && j < firstDay) {
        row.append('<td class=\'cell-' + j + '\'> </td>');
        cell = $('.cell-' + j);

        row.append(cell);
      } else if (date > daysInMonth(year, month)) {
        break;
      } else {
        row.append('\n            <td class=\'' + i + '-cell-' + j + '\'> \n              <p> ' + date + ' </p>\n            </td>');
        cell = $('.' + i + '-cell-' + j);
        events.forEach(function (event) {
          var splitDate = event.date.split('-');
          var eventYear = parseInt(splitDate[0]);
          var eventMonth = parseInt(splitDate[1] - 1);
          var eventDay = parseInt(splitDate[2]);
          if (currentYear === eventYear && currentMonth === eventMonth && date === eventDay) {
            cell.append('<div class=\'mini-event-container ' + event.category + '\'>\n                            <p> ' + event.title + ' </p>\n                            <p> ' + event.time + ' </p>\n                            <p> ' + (event.category || '') + ' </p>\n                            <p> ' + (event.comments || '') + ' </p>\n                          </div>');
            $('.' + event.category).css('border-color', event.category);
          }
        });
        date++;
      }
    }
    tbl.append(row);
  }
};

var daysInMonth = function daysInMonth(iYear, iMonth) {
  var dateNumber = new Date(iYear, iMonth, 32).getDate();
  numberOfDays = parseInt(32 - dateNumber);
  return numberOfDays;
};

var next = function next() {
  currentYear = currentMonth === 11 ? currentYear + 1 : currentYear;
  currentMonth = (currentMonth + 1) % 12;
  showCalendar(currentYear, currentMonth);
};

var previous = function previous() {
  currentYear = currentMonth === 0 ? currentYear - 1 : currentYear;
  currentMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  showCalendar(currentYear, currentMonth);
};

var jump = function jump() {
  currentYear = parseInt(selectYear.val());
  currentMonth = parseInt(selectMonth.val());
  showCalendar(currentYear, currentMonth);
};

var fetchEvents = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var url, response, results;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            url = 'http://localhost:3000/api/v1/events/';
            _context.next = 3;
            return fetch(url);

          case 3:
            response = _context.sent;
            _context.next = 6;
            return response.json();

          case 6:
            results = _context.sent;
            return _context.abrupt('return', results);

          case 8:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function fetchEvents() {
    return _ref.apply(this, arguments);
  };
}();

var fetchEventTasks = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(id) {
    var url, response, results;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            url = 'http://localhost:3000/api/v1/events/' + id + '/tasks';
            _context2.next = 3;
            return fetch(url);

          case 3:
            response = _context2.sent;
            _context2.next = 6;
            return response.json();

          case 6:
            results = _context2.sent;
            return _context2.abrupt('return', results);

          case 8:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function fetchEventTasks(_x) {
    return _ref2.apply(this, arguments);
  };
}();

var appendNewEvent = function appendNewEvent(calEvent, tasks) {
  $('.events-container').append('\n    <article class=\'event-article ' + calEvent.category + ' event-' + calEvent.id + '\'>\n      <div class=\'event-details-container\'>\n        <h5 class=\'event-title-header\' contenteditable="true">' + calEvent.title + '</h5>\n        <p class=\'event-date\' contenteditable="true">' + calEvent.date + '</p>\n        <p class=\'event-time\' contenteditable="true">Time: ' + calEvent.time + '</p>\n        <p class=\'event-comments\' >' + (calEvent.comments || '') + '</p>\n        <button id=\'' + calEvent.id + '\' class=\'delete-event-button\'> Delete Event </button>\n        <button value=\'' + calEvent.id + '\' class=\'update-event-button\'> Update Event </button>\n      </div>\n      <div class=\'event-task-container\' id=\'event-' + calEvent.id + '\'>\n      <h5>Tasks:</h5>\n      </div>\n    </article>\n    ');
  $('.' + calEvent.category).css('border-color', calEvent.category);
  if (tasks && tasks.length) {
    tasks.sort(function (a, b) {
      return a.priority - b.priority;
    });
    tasks.forEach(function (task) {
      appendEventTasks(calEvent.id, task);
    });
  }
};

var appendEventTasks = function appendEventTasks(id, task) {
  $('#event-' + id).append('\n    <div class=\'event-task-div\'>\n      <h5 class=\'event-title-header\'>' + task.name + ' - (Priority: ' + task.priority + ')</h5>\n      <button id=\'' + id + '-' + task.id + '\' class=\'delete-task-button\'> Delete Task </button>\n    </div>\n    ');
};

var saveEvent = function saveEvent(event) {
  event.preventDefault();
  var title = $('#create-event-input-title').val();
  var date = $('#create-event-input-date').val();
  var time = $('#create-event-input-time').val();
  var isPublic = $('#event-public-dropdown').val();
  var category = $('#create-event-input-category').val();
  var newEvent = { title: title, date: date, time: time, isPublic: isPublic, category: category };
  events.push(newEvent);
  appendNewEvent(newEvent);
  // addEventToDB(newEvent);
};

var cleanTime = function cleanTime(time) {
  if (time.includes('T')) {
    var splitTime1 = time.split('T');
    var splitTime2 = splitTime1[1].split(':');
    splitTime2.pop();
    return splitTime2.join(':');
  } else {
    return time;
  }
};

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


var handleDeleteEvent = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(event) {
    var eventId;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            eventId = $(event.target).attr('id');
            // deleteEventFromDatabase(eventId);

            event.target.closest('article').remove();

          case 2:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function handleDeleteEvent(_x2) {
    return _ref3.apply(this, arguments);
  };
}();

var handleDeleteTask = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(event) {
    var taskId;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            taskId = $(event.target).attr('id');
            // deleteEventFromDatabase(eventId);

            event.target.closest('div').remove();

          case 2:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function handleDeleteTask(_x3) {
    return _ref4.apply(this, arguments);
  };
}();

// const handleUpdateEvent = async (event) => {
//   let eventToUpdate = $(`.event-${event.target.value}`).children().children();
//   let title = $(`.event-${event.target.value}:first-child:first-child:first-child`);
//   console.log(title);
//   let date = eventToUpdate[1].val();
//   let time = eventToUpdate[2].val();
//   let updatedEvent = { title, date, time };
//   console.log(updatedEvent);
// };

var handlePageLoad = function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return fetchEvents();

          case 2:
            events = _context6.sent;

            events.forEach(function () {
              var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(calEvent) {
                var tasks;
                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                  while (1) {
                    switch (_context5.prev = _context5.next) {
                      case 0:
                        calEvent.time = cleanTime(calEvent.time);
                        _context5.next = 3;
                        return fetchEventTasks(calEvent.id);

                      case 3:
                        tasks = _context5.sent;

                        appendNewEvent(calEvent, tasks);

                      case 5:
                      case 'end':
                        return _context5.stop();
                    }
                  }
                }, _callee5, undefined);
              }));

              return function (_x4) {
                return _ref6.apply(this, arguments);
              };
            }());
            showCalendar(currentYear, currentMonth);

          case 5:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined);
  }));

  return function handlePageLoad() {
    return _ref5.apply(this, arguments);
  };
}();

handlePageLoad();
// fillEvents();

$('.create-event-submit-button').click(function (event) {
  return saveEvent(event);
});
$('.events-container').on('click', 'article .delete-event-button', handleDeleteEvent);
// $('.events-container').on('click', 'article .update-event-button', handleUpdateEvent);
$('.events-container').on('click', 'article .delete-task-button', handleDeleteTask);

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbGliL3NjcmlwdHMuanMiXSwibmFtZXMiOlsiZXZlbnRzIiwidG9kYXkiLCJEYXRlIiwiY3VycmVudE1vbnRoIiwiZ2V0TW9udGgiLCJjdXJyZW50WWVhciIsImdldEZ1bGxZZWFyIiwic2VsZWN0WWVhciIsIiQiLCJzZWxlY3RNb250aCIsIm1vbnRoQW5kWWVhciIsIm1vbnRocyIsInNob3dDYWxlbmRhciIsInllYXIiLCJtb250aCIsImZpcnN0RGF5IiwiZ2V0RGF5IiwibnVtYmVyT2ZEYXlzIiwiZGF5c0luTW9udGgiLCJ0YmwiLCJodG1sIiwidmFsIiwiZGF0ZSIsImkiLCJhcHBlbmQiLCJyb3ciLCJqIiwiY2VsbCIsImZvckVhY2giLCJzcGxpdERhdGUiLCJldmVudCIsInNwbGl0IiwiZXZlbnRZZWFyIiwicGFyc2VJbnQiLCJldmVudE1vbnRoIiwiZXZlbnREYXkiLCJjYXRlZ29yeSIsInRpdGxlIiwidGltZSIsImNvbW1lbnRzIiwiY3NzIiwiaVllYXIiLCJpTW9udGgiLCJkYXRlTnVtYmVyIiwiZ2V0RGF0ZSIsIm5leHQiLCJwcmV2aW91cyIsImp1bXAiLCJmZXRjaEV2ZW50cyIsInVybCIsImZldGNoIiwicmVzcG9uc2UiLCJqc29uIiwicmVzdWx0cyIsImZldGNoRXZlbnRUYXNrcyIsImlkIiwiYXBwZW5kTmV3RXZlbnQiLCJjYWxFdmVudCIsInRhc2tzIiwibGVuZ3RoIiwic29ydCIsImEiLCJiIiwicHJpb3JpdHkiLCJhcHBlbmRFdmVudFRhc2tzIiwidGFzayIsIm5hbWUiLCJzYXZlRXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsImlzUHVibGljIiwibmV3RXZlbnQiLCJwdXNoIiwiY2xlYW5UaW1lIiwiaW5jbHVkZXMiLCJzcGxpdFRpbWUxIiwic3BsaXRUaW1lMiIsInBvcCIsImpvaW4iLCJoYW5kbGVEZWxldGVFdmVudCIsImV2ZW50SWQiLCJ0YXJnZXQiLCJhdHRyIiwiY2xvc2VzdCIsInJlbW92ZSIsImhhbmRsZURlbGV0ZVRhc2siLCJ0YXNrSWQiLCJoYW5kbGVQYWdlTG9hZCIsImNsaWNrIiwib24iXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbEZBLElBQUlBLFNBQVMsRUFBYjtBQUNBLElBQUlDLFFBQVEsSUFBSUMsSUFBSixFQUFaO0FBQ0EsSUFBSUMsZUFBZUYsTUFBTUcsUUFBTixFQUFuQjtBQUNBLElBQUlDLGNBQWNKLE1BQU1LLFdBQU4sRUFBbEI7QUFDQSxJQUFJQyxhQUFhQyxFQUFFLE9BQUYsQ0FBakI7QUFDQSxJQUFJQyxjQUFjRCxFQUFFLFFBQUYsQ0FBbEI7QUFDQSxJQUFJRSxlQUFlRixFQUFFLGVBQUYsQ0FBbkI7O0FBRUEsSUFBSUcsU0FBUyxDQUFDLFNBQUQsRUFBWSxVQUFaLEVBQXdCLE9BQXhCLEVBQWlDLE9BQWpDLEVBQTBDLEtBQTFDLEVBQWlELE1BQWpELEVBQXlE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S0E5Qyx5QkFBYVAsV0FBYixFQUEwQkYsWUFBMUI7O0FBUHFCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQWpCOztBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQU47O0FBVUFtRjtBQUNBOztBQUVBOUUsRUFBRSw2QkFBRixFQUFpQytFLEtBQWpDLENBQXVDLFVBQUN6RCxLQUFEO0FBQUEsU0FBV3FDLFVBQVVyQyxLQUFWLENBQVg7QUFBQSxDQUF2QztBQUNBdEIsRUFBRSxtQkFBRixFQUF1QmdGLEVBQXZCLENBQTBCLE9BQTFCLEVBQW1DLDhCQUFuQyxFQUFtRVYsaUJBQW5FO0FBQ0E7QUFDQXRFLEVBQUUsbUJBQUYsRUFBdUJnRixFQUF2QixDQUEwQixPQUExQixFQUFtQyw2QkFBbkMsRUFBa0VKLGdCQUFsRSxFIiwiZmlsZSI6ImRpc3QvbWFpbi5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL2xpYi9zY3JpcHRzLmpzXCIpO1xuIiwibGV0IGV2ZW50cyA9IFtdO1xubGV0IHRvZGF5ID0gbmV3IERhdGUoKTtcbmxldCBjdXJyZW50TW9udGggPSB0b2RheS5nZXRNb250aCgpO1xubGV0IGN1cnJlbnRZZWFyID0gdG9kYXkuZ2V0RnVsbFllYXIoKTtcbmxldCBzZWxlY3RZZWFyID0gJCgnI3llYXInKTtcbmxldCBzZWxlY3RNb250aCA9ICQoJyNtb250aCcpO1xubGV0IG1vbnRoQW5kWWVhciA9ICQoJyNtb250aEFuZFllYXInKTtcblxubGV0IG1vbnRocyA9IFsnSmFudWFyeScsICdGZWJydWFyeScsICdNYXJjaCcsICdBcHJpbCcsICdNYXknLCAnSnVuZScsICdKdWx5JywgJ0F1Z3VzdCcsICdTZXB0ZW1iZXInLCAnT2N0b2JlcicsICdOb3ZlbWJlcicsICdEZWNlbWJlciddO1xuXG5jb25zdCBzaG93Q2FsZW5kYXIgPSAoeWVhciwgbW9udGgpID0+IHtcbiAgbGV0IGZpcnN0RGF5ID0gKG5ldyBEYXRlKHllYXIsIG1vbnRoKSkuZ2V0RGF5KCk7XG4gIGxldCBudW1iZXJPZkRheXMgPSBkYXlzSW5Nb250aCh5ZWFyLCBtb250aCk7XG5cbiAgbGV0IHRibCA9ICQoJyNjYWxlbmRhci1ib2R5Jyk7XG5cbiAgdGJsLmh0bWwoJycpO1xuXG4gIG1vbnRoQW5kWWVhci5odG1sKG1vbnRoc1ttb250aF0gKyAnICcgKyB5ZWFyKTtcbiAgc2VsZWN0WWVhci52YWwoeWVhcik7XG4gIHNlbGVjdE1vbnRoLnZhbChtb250aCk7XG5cbiAgbGV0IGRhdGUgPSAxO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNjsgaSsrKSB7XG4gICAgICAkKCcudGFibGUnKS5hcHBlbmQoYDx0ciBjbGFzcz0ncm93LSR7aX0nPiA8L3RyPmApO1xuICAgICAgbGV0IHJvdyA9ICQoYC5yb3ctJHtpfWApO1xuXG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDc7IGorKykge1xuICAgICAgICBpZiAoaSA9PT0gMCAmJiBqIDwgZmlyc3REYXkpIHtcbiAgICAgICAgICByb3cuYXBwZW5kKGA8dGQgY2xhc3M9J2NlbGwtJHtqfSc+IDwvdGQ+YCk7XG4gICAgICAgICAgY2VsbCA9ICQoYC5jZWxsLSR7an1gKTtcblxuICAgICAgICAgIHJvdy5hcHBlbmQoY2VsbCk7XG4gICAgICAgIH0gZWxzZSBpZiAoZGF0ZSA+IGRheXNJbk1vbnRoKHllYXIsIG1vbnRoKSkge1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJvdy5hcHBlbmQoYFxuICAgICAgICAgICAgPHRkIGNsYXNzPScke2l9LWNlbGwtJHtqfSc+IFxuICAgICAgICAgICAgICA8cD4gJHtkYXRlfSA8L3A+XG4gICAgICAgICAgICA8L3RkPmBcbiAgICAgICAgICApO1xuICAgICAgICAgIGNlbGwgPSAkKGAuJHtpfS1jZWxsLSR7an1gKTtcbiAgICAgICAgICBldmVudHMuZm9yRWFjaChldmVudCA9PiB7XG4gICAgICAgICAgICBsZXQgc3BsaXREYXRlID0gZXZlbnQuZGF0ZS5zcGxpdCgnLScpO1xuICAgICAgICAgICAgbGV0IGV2ZW50WWVhciA9IHBhcnNlSW50KHNwbGl0RGF0ZVswXSk7XG4gICAgICAgICAgICBsZXQgZXZlbnRNb250aCA9IHBhcnNlSW50KHNwbGl0RGF0ZVsxXSAtIDEpO1xuICAgICAgICAgICAgbGV0IGV2ZW50RGF5ID0gcGFyc2VJbnQoc3BsaXREYXRlWzJdKTtcbiAgICAgICAgICAgIGlmIChjdXJyZW50WWVhciA9PT0gZXZlbnRZZWFyICYmIGN1cnJlbnRNb250aCA9PT0gZXZlbnRNb250aCAmJiBkYXRlID09PSBldmVudERheSkge1xuICAgICAgICAgICAgICBjZWxsLmFwcGVuZChgPGRpdiBjbGFzcz0nbWluaS1ldmVudC1jb250YWluZXIgJHtldmVudC5jYXRlZ29yeX0nPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPiAke2V2ZW50LnRpdGxlfSA8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+ICR7ZXZlbnQudGltZX0gPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPiAke2V2ZW50LmNhdGVnb3J5IHx8ICcnfSA8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+ICR7ZXZlbnQuY29tbWVudHMgfHwgJyd9IDwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+YCk7XG4gICAgICAgICAgICAgICQoYC4ke2V2ZW50LmNhdGVnb3J5fWApLmNzcygnYm9yZGVyLWNvbG9yJywgZXZlbnQuY2F0ZWdvcnkpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgICBkYXRlKys7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRibC5hcHBlbmQocm93KTtcbiAgICB9XG59O1xuXG5jb25zdCBkYXlzSW5Nb250aCA9IChpWWVhciwgaU1vbnRoKSA9PiB7XG4gIGxldCBkYXRlTnVtYmVyID0gbmV3IERhdGUoaVllYXIsIGlNb250aCwgMzIpLmdldERhdGUoKTtcbiAgbnVtYmVyT2ZEYXlzID0gcGFyc2VJbnQoMzIgLSBkYXRlTnVtYmVyKVxuICByZXR1cm4gbnVtYmVyT2ZEYXlzO1xufTtcblxuY29uc3QgbmV4dCA9ICgpID0+IHtcbiAgY3VycmVudFllYXIgPSAoY3VycmVudE1vbnRoID09PSAxMSkgPyBjdXJyZW50WWVhciArIDEgOiBjdXJyZW50WWVhcjtcbiAgY3VycmVudE1vbnRoID0gKGN1cnJlbnRNb250aCArIDEpICUgMTI7XG4gIHNob3dDYWxlbmRhcihjdXJyZW50WWVhciwgY3VycmVudE1vbnRoKTtcbn1cblxuY29uc3QgcHJldmlvdXMgPSAoKSA9PiB7XG4gIGN1cnJlbnRZZWFyID0gKGN1cnJlbnRNb250aCA9PT0gMCkgPyBjdXJyZW50WWVhciAtIDEgOiBjdXJyZW50WWVhcjtcbiAgY3VycmVudE1vbnRoID0gKGN1cnJlbnRNb250aCA9PT0gMCkgPyAxMSA6IGN1cnJlbnRNb250aCAtIDE7XG4gIHNob3dDYWxlbmRhcihjdXJyZW50WWVhciwgY3VycmVudE1vbnRoKTtcbn1cblxuY29uc3QganVtcCA9ICgpID0+IHtcbiAgY3VycmVudFllYXIgPSBwYXJzZUludChzZWxlY3RZZWFyLnZhbCgpKTtcbiAgY3VycmVudE1vbnRoID0gcGFyc2VJbnQoc2VsZWN0TW9udGgudmFsKCkpO1xuICBzaG93Q2FsZW5kYXIoY3VycmVudFllYXIsIGN1cnJlbnRNb250aCk7XG59XG5cbmNvbnN0IGZldGNoRXZlbnRzID0gYXN5bmMgKCkgPT4ge1xuICBjb25zdCB1cmwgPSBgaHR0cDovL2xvY2FsaG9zdDozMDAwL2FwaS92MS9ldmVudHMvYDtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwpO1xuICBjb25zdCByZXN1bHRzID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICByZXR1cm4gcmVzdWx0cztcbn07XG5cbmNvbnN0IGZldGNoRXZlbnRUYXNrcyA9IGFzeW5jIChpZCkgPT4ge1xuICBjb25zdCB1cmwgPSBgaHR0cDovL2xvY2FsaG9zdDozMDAwL2FwaS92MS9ldmVudHMvJHtpZH0vdGFza3NgO1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCk7XG4gIGNvbnN0IHJlc3VsdHMgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gIHJldHVybiByZXN1bHRzO1xufTtcblxuY29uc3QgYXBwZW5kTmV3RXZlbnQgPSAoY2FsRXZlbnQsIHRhc2tzKSA9PiB7XG4gICQoJy5ldmVudHMtY29udGFpbmVyJykuYXBwZW5kKGBcbiAgICA8YXJ0aWNsZSBjbGFzcz0nZXZlbnQtYXJ0aWNsZSAke2NhbEV2ZW50LmNhdGVnb3J5fSBldmVudC0ke2NhbEV2ZW50LmlkfSc+XG4gICAgICA8ZGl2IGNsYXNzPSdldmVudC1kZXRhaWxzLWNvbnRhaW5lcic+XG4gICAgICAgIDxoNSBjbGFzcz0nZXZlbnQtdGl0bGUtaGVhZGVyJyBjb250ZW50ZWRpdGFibGU9XCJ0cnVlXCI+JHtjYWxFdmVudC50aXRsZX08L2g1PlxuICAgICAgICA8cCBjbGFzcz0nZXZlbnQtZGF0ZScgY29udGVudGVkaXRhYmxlPVwidHJ1ZVwiPiR7Y2FsRXZlbnQuZGF0ZX08L3A+XG4gICAgICAgIDxwIGNsYXNzPSdldmVudC10aW1lJyBjb250ZW50ZWRpdGFibGU9XCJ0cnVlXCI+VGltZTogJHtjYWxFdmVudC50aW1lfTwvcD5cbiAgICAgICAgPHAgY2xhc3M9J2V2ZW50LWNvbW1lbnRzJyA+JHtjYWxFdmVudC5jb21tZW50cyB8fCAnJ308L3A+XG4gICAgICAgIDxidXR0b24gaWQ9JyR7Y2FsRXZlbnQuaWR9JyBjbGFzcz0nZGVsZXRlLWV2ZW50LWJ1dHRvbic+IERlbGV0ZSBFdmVudCA8L2J1dHRvbj5cbiAgICAgICAgPGJ1dHRvbiB2YWx1ZT0nJHtjYWxFdmVudC5pZH0nIGNsYXNzPSd1cGRhdGUtZXZlbnQtYnV0dG9uJz4gVXBkYXRlIEV2ZW50IDwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPSdldmVudC10YXNrLWNvbnRhaW5lcicgaWQ9J2V2ZW50LSR7Y2FsRXZlbnQuaWR9Jz5cbiAgICAgIDxoNT5UYXNrczo8L2g1PlxuICAgICAgPC9kaXY+XG4gICAgPC9hcnRpY2xlPlxuICAgIGApO1xuICAkKGAuJHtjYWxFdmVudC5jYXRlZ29yeX1gKS5jc3MoJ2JvcmRlci1jb2xvcicsIGNhbEV2ZW50LmNhdGVnb3J5KTtcbiAgaWYgKHRhc2tzICYmIHRhc2tzLmxlbmd0aCkge1xuICAgIHRhc2tzLnNvcnQoKGEsIGIpID0+IGEucHJpb3JpdHkgLSBiLnByaW9yaXR5KVxuICAgIHRhc2tzLmZvckVhY2godGFzayA9PiB7XG4gICAgICBhcHBlbmRFdmVudFRhc2tzKGNhbEV2ZW50LmlkLCB0YXNrKTtcbiAgICB9KVxuICB9XG59O1xuXG5jb25zdCBhcHBlbmRFdmVudFRhc2tzID0gKGlkLCB0YXNrKSA9PiB7XG4gICAgICAkKGAjZXZlbnQtJHtpZH1gKS5hcHBlbmQoYFxuICAgIDxkaXYgY2xhc3M9J2V2ZW50LXRhc2stZGl2Jz5cbiAgICAgIDxoNSBjbGFzcz0nZXZlbnQtdGl0bGUtaGVhZGVyJz4ke3Rhc2submFtZX0gLSAoUHJpb3JpdHk6ICR7dGFzay5wcmlvcml0eX0pPC9oNT5cbiAgICAgIDxidXR0b24gaWQ9JyR7aWR9LSR7dGFzay5pZH0nIGNsYXNzPSdkZWxldGUtdGFzay1idXR0b24nPiBEZWxldGUgVGFzayA8L2J1dHRvbj5cbiAgICA8L2Rpdj5cbiAgICBgKTtcbn07XG5cbmNvbnN0IHNhdmVFdmVudCA9IChldmVudCkgPT4ge1xuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICBsZXQgdGl0bGUgPSAkKCcjY3JlYXRlLWV2ZW50LWlucHV0LXRpdGxlJykudmFsKCk7XG4gIGxldCBkYXRlID0gJCgnI2NyZWF0ZS1ldmVudC1pbnB1dC1kYXRlJykudmFsKCk7XG4gIGxldCB0aW1lID0gJCgnI2NyZWF0ZS1ldmVudC1pbnB1dC10aW1lJykudmFsKCk7XG4gIGxldCBpc1B1YmxpYyA9ICQoJyNldmVudC1wdWJsaWMtZHJvcGRvd24nKS52YWwoKTtcbiAgbGV0IGNhdGVnb3J5ID0gJCgnI2NyZWF0ZS1ldmVudC1pbnB1dC1jYXRlZ29yeScpLnZhbCgpO1xuICBsZXQgbmV3RXZlbnQgPSB7IHRpdGxlLCBkYXRlLCB0aW1lLCBpc1B1YmxpYywgY2F0ZWdvcnkgfVxuICBldmVudHMucHVzaChuZXdFdmVudCk7XG4gIGFwcGVuZE5ld0V2ZW50KG5ld0V2ZW50KTtcbiAgLy8gYWRkRXZlbnRUb0RCKG5ld0V2ZW50KTtcbn1cblxuY29uc3QgY2xlYW5UaW1lID0gKHRpbWUpID0+IHtcbiAgaWYgKHRpbWUuaW5jbHVkZXMoJ1QnKSkge1xuICAgIGxldCBzcGxpdFRpbWUxID0gdGltZS5zcGxpdCgnVCcpO1xuICAgIGxldCBzcGxpdFRpbWUyID0gc3BsaXRUaW1lMVsxXS5zcGxpdCgnOicpO1xuICAgIHNwbGl0VGltZTIucG9wKCk7XG4gICAgcmV0dXJuIHNwbGl0VGltZTIuam9pbignOicpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB0aW1lXG4gIH0gIFxufVxuXG4vLyBjb25zdCBhZGRFdmVudFRvREIgPSBhc3luYyAobmV3RXZlbnQpID0+IHtcbi8vICAgY29uc3QgdXJsID0gYCR7Y29yc0FueXdoZXJlVXJsfWh0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9hcGkvdjEvZXZlbnRzL2A7XG4vLyAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsLCB7XG4vLyAgICAgbWV0aG9kOiAnUE9TVCcsXG4vLyAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuLy8gICAgICAgdGl0bGU6IG5ld0V2ZW50LnRpdGxlLFxuLy8gICAgICAgY2F0ZWdvcnk6IG5ld0V2ZW50LmNhdGVnb3J5XG4vLyAgICAgfSksXG4vLyAgICAgaGVhZGVyczoge1xuLy8gICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuLy8gICAgIH1cbi8vICAgfSk7XG4vLyAgIGNvbnN0IHJlc3VsdHMgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4vLyAgIGNvbnNvbGUubG9nKHJlc3VsdHMpO1xuLy8gICByZXR1cm4gYXdhaXQgcmVzdWx0cztcbi8vIH07XG5cbi8vIGNvbnN0IGRlbGV0ZUV2ZW50RnJvbURhdGFiYXNlID0gYXN5bmMgKGV2ZW50SWQpID0+IHtcbi8vICAgY29uc3QgdXJsID0gYGh0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9hcGkvdjEvZXZlbnRzLyR7ZXZlbnRJZH1gO1xuLy8gICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCwge1xuLy8gICAgIG1ldGhvZDogJ0RFTEVURSdcbi8vICAgfSk7XG4vLyAgIGNvbnN0IHJlc3VsdHMgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4vLyAgIGNvbnNvbGUubG9nKHJlc3VsdHMpXG4vLyB9O1xuXG5cbmNvbnN0IGhhbmRsZURlbGV0ZUV2ZW50ID0gYXN5bmMgKGV2ZW50KSA9PiB7XG4gIGxldCBldmVudElkID0gJChldmVudC50YXJnZXQpLmF0dHIoJ2lkJyk7XG4gIC8vIGRlbGV0ZUV2ZW50RnJvbURhdGFiYXNlKGV2ZW50SWQpO1xuICBldmVudC50YXJnZXQuY2xvc2VzdCgnYXJ0aWNsZScpLnJlbW92ZSgpO1xufTtcblxuY29uc3QgaGFuZGxlRGVsZXRlVGFzayA9IGFzeW5jIChldmVudCkgPT4ge1xuICBsZXQgdGFza0lkID0gJChldmVudC50YXJnZXQpLmF0dHIoJ2lkJyk7XG4gIC8vIGRlbGV0ZUV2ZW50RnJvbURhdGFiYXNlKGV2ZW50SWQpO1xuICBldmVudC50YXJnZXQuY2xvc2VzdCgnZGl2JykucmVtb3ZlKCk7XG59O1xuXG4vLyBjb25zdCBoYW5kbGVVcGRhdGVFdmVudCA9IGFzeW5jIChldmVudCkgPT4ge1xuLy8gICBsZXQgZXZlbnRUb1VwZGF0ZSA9ICQoYC5ldmVudC0ke2V2ZW50LnRhcmdldC52YWx1ZX1gKS5jaGlsZHJlbigpLmNoaWxkcmVuKCk7XG4vLyAgIGxldCB0aXRsZSA9ICQoYC5ldmVudC0ke2V2ZW50LnRhcmdldC52YWx1ZX06Zmlyc3QtY2hpbGQ6Zmlyc3QtY2hpbGQ6Zmlyc3QtY2hpbGRgKTtcbi8vICAgY29uc29sZS5sb2codGl0bGUpO1xuLy8gICBsZXQgZGF0ZSA9IGV2ZW50VG9VcGRhdGVbMV0udmFsKCk7XG4vLyAgIGxldCB0aW1lID0gZXZlbnRUb1VwZGF0ZVsyXS52YWwoKTtcbi8vICAgbGV0IHVwZGF0ZWRFdmVudCA9IHsgdGl0bGUsIGRhdGUsIHRpbWUgfTtcbi8vICAgY29uc29sZS5sb2codXBkYXRlZEV2ZW50KTtcbi8vIH07XG5cbmNvbnN0IGhhbmRsZVBhZ2VMb2FkID0gYXN5bmMgKCkgPT4ge1xuICBldmVudHMgPSBhd2FpdCBmZXRjaEV2ZW50cygpO1xuICBldmVudHMuZm9yRWFjaChhc3luYyBjYWxFdmVudCA9PiB7XG4gICAgY2FsRXZlbnQudGltZSA9IGNsZWFuVGltZShjYWxFdmVudC50aW1lKVxuICAgIGxldCB0YXNrcyA9IGF3YWl0IGZldGNoRXZlbnRUYXNrcyhjYWxFdmVudC5pZCk7XG4gICAgYXBwZW5kTmV3RXZlbnQoY2FsRXZlbnQsIHRhc2tzKTtcbiAgfSk7XG4gIHNob3dDYWxlbmRhcihjdXJyZW50WWVhciwgY3VycmVudE1vbnRoKTtcbn07XG5cbmhhbmRsZVBhZ2VMb2FkKCk7XG4vLyBmaWxsRXZlbnRzKCk7XG5cbiQoJy5jcmVhdGUtZXZlbnQtc3VibWl0LWJ1dHRvbicpLmNsaWNrKChldmVudCkgPT4gc2F2ZUV2ZW50KGV2ZW50KSk7XG4kKCcuZXZlbnRzLWNvbnRhaW5lcicpLm9uKCdjbGljaycsICdhcnRpY2xlIC5kZWxldGUtZXZlbnQtYnV0dG9uJywgaGFuZGxlRGVsZXRlRXZlbnQpO1xuLy8gJCgnLmV2ZW50cy1jb250YWluZXInKS5vbignY2xpY2snLCAnYXJ0aWNsZSAudXBkYXRlLWV2ZW50LWJ1dHRvbicsIGhhbmRsZVVwZGF0ZUV2ZW50KTtcbiQoJy5ldmVudHMtY29udGFpbmVyJykub24oJ2NsaWNrJywgJ2FydGljbGUgLmRlbGV0ZS10YXNrLWJ1dHRvbicsIGhhbmRsZURlbGV0ZVRhc2spO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==