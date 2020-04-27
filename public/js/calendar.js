export const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
let startYear = new Date().getFullYear();
let endYear = 2022;
let month = new Date().getMonth();
let year = 0;
let selectedDays = new Array();
let mousedown = false;
let mousemove = false;

// DOM Elements
const clndr = document.querySelector('.calendar');
const clndrDays = document.querySelector('#calendarDays');

// function getReserveDate(day) {
export const getReserveDate = (day, month, year) => {
  // let date = new Date(year + ' ' + month + ', ' + day);
  let date = new Date(year + ' ' + month + ', ' + day);
  date.setHours(date.getHours() + 2);
  let fullYear = date.getFullYear();
  let monthInt = date.getMonth();
  let getDate = date.getDate();
  date = fullYear + '-' + (monthInt + 1) + '-' + getDate;
  if (date) {
    clndr.classList.add('fade-out');

    window.setTimeout(() => {
      clndr.classList.add('d-none');
      clndr.classList.remove('fade-out');
      document.querySelector('.confirmation-container').style.display = 'block';
    }, 1000);
  }
  return date;
};

// function loadCalendarMonths() {
export const loadCalendarMonths = () => {
  for (var i = 0; i < months.length; i++) {
    var doc = document.createElement('div');
    doc.innerHTML = months[i];
    doc.classList.add('dropdown-item');

    doc.onclick = (function () {
      var selectedMonth = i;
      return function () {
        month = selectedMonth;
        document.getElementById('curMonth').innerHTML = months[month];
        loadCalendarDays();
        return month;
      };
    })();

    document.getElementById('months').appendChild(doc);
  }
};

// function loadCalendarYears() {
export const loadCalendarYears = () => {
  document.getElementById('years').innerHTML = '';

  for (var i = startYear; i <= endYear; i++) {
    var doc = document.createElement('div');
    doc.innerHTML = i;
    doc.classList.add('dropdown-item');

    doc.onclick = (function () {
      var selectedYear = i;
      return function () {
        year = selectedYear;
        document.getElementById('curYear').innerHTML = year;
        loadCalendarDays();
        return year;
      };
    })();

    document.getElementById('years').appendChild(doc);
  }
};

export const loadCalendarDays = () => {
  document.getElementById('calendarDays').innerHTML = '';

  var tmpDate = new Date(year, month, 0);
  var num = daysInMonth(month, year);
  var dayofweek = tmpDate.getDay(); // find where to start calendar day of week

  // Check if current year is leap year, if so add 1 day to days in feb
  // if (month === 1) {
  //   if (year % 4 == 0) {
  //     num += 1;
  //   } else {
  //     console.log('this year is NOT a leap year!');
  //   }
  // }

  for (var i = 0; i <= dayofweek; i++) {
    var d = document.createElement('div');
    d.classList.add('day');
    d.classList.add('blank');
    document.getElementById('calendarDays').appendChild(d);
  }

  for (var i = 0; i < num; i++) {
    var tmp = i + 1;
    var d = document.createElement('div');
    d.id = 'calendarday_' + tmp;
    d.className = 'day';
    d.innerHTML = tmp;
    d.dataset.day = tmp;

    d.addEventListener('click', function () {
      this.classList.toggle('selected');
      let day = this.innerHTML;
      let month = document.getElementById('curMonth').innerHTML;
      let year = document.getElementById('curYear').innerHTML;
      getReserveDate(day, month, year);

      if (!selectedDays.includes(this.dataset.day)) {
        selectedDays.push(this.dataset.day);
        console.log(this.dataset.day);
      } else selectedDays.splice(selectedDays.indexOf(this.dataset.day), 1);
    });

    d.addEventListener('mousemove', function (e) {
      e.preventDefault();
      if (mousedown) {
        this.classList.add('selected');

        if (!selectedDays.includes(this.dataset.day))
          selectedDays.push(this.dataset.day);
      }
    });

    d.addEventListener('mousedown', function (e) {
      e.preventDefault();
      mousedown = true;
    });

    d.addEventListener('mouseup', function (e) {
      e.preventDefault();
      mousedown = false;
    });

    document.getElementById('calendarDays').appendChild(d);
    checkDate();
  }

  var clear = document.createElement('div');
  clear.className = 'clear';
  document.getElementById('calendarDays').appendChild(clear);
};

export const daysInMonth = (month, year) => {
  var d = new Date(year, month + 1, 0);
  return d.getDate();
};

export const calendar = () => {
  var date = new Date();
  month = date.getMonth();
  year = date.getFullYear();
  document.getElementById('curMonth').innerHTML = months[month];
  document.getElementById('curYear').innerHTML = year;
  loadCalendarMonths();
  loadCalendarYears();
  loadCalendarDays();
};

export const checkDate = () => {
  let date = new Date().getDate();
  let curMonth = new Date().getMonth();
  let curYear = new Date().getFullYear();
  const datesArray = [...clndrDays.children];
  datesArray.forEach((el) => {
    if (curMonth > month) {
      el.classList.add('avoid-clicks');
    }
    if (el.innerHTML < date) {
      el.classList.add('avoid-clicks');
    }
    if (curYear < year) {
      el.classList.remove('avoid-clicks');
    }
  });
};
