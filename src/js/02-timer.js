import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const startBtn = document.querySelector('[data-start]');
const refs = {
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose,
};

const fp = flatpickr("#datetime-picker", options);

startBtn.setAttribute("disabled", "true");

function onClose(selectedDates) {
    console.log(selectedDates[0]);
      
    if (selectedDates[0] < options.defaultDate) {
        return Notiflix.Notify.info('Please choose a date in the future');
    } else {
        startBtn.removeAttribute("disabled");
    }
}

const onStartBtn = () => {
    setInterval((selectedDates) => {
        result = convertMs(); 
        /* refs.forEach(function (days, hours, minutes, seconds) {
  console.log(`${days}:${hours}:${minutes}:${seconds}`); 
});*/
     
  }, 1000);
    
}


startBtn.addEventListener('click', onStartBtn, onClose);


console.log(onStartBtn());
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}