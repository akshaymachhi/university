// Navigation

let btn = document.querySelector(".toggle-btn");
let nav = document.querySelector(".navigation-right");

btn.addEventListener("click", () => {
  nav.classList.toggle("display-navigation");
  btn.classList.toggle("active-toggle");
});

// Scroll to top

let mybutton = document.getElementById("scrolltop");

window.addEventListener("scroll", () => {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
});

mybutton.addEventListener("click", () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});


// navigation scroll effect
let prevscroll = window.scrollY;

window.onscroll = function () {
    let currentscroll = window.scrollY;

    // navigation 
    if (prevscroll < 80) {
        document.querySelector('header').classList.remove("with-bg");
    }
    else {
        document.querySelector('header').classList.add("with-bg");
    }
    
    prevscroll = currentscroll;
}


// Calender

// Get the current date, month, and year
const currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();
const currentDay = currentDate.getDate();

// List of holidays (for example purposes, we'll add New Year's Day and Christmas Day)
const holidays = {
  "1-1": "New Year's Day", // January 1st
  "12-25": "Christmas Day", // December 25th
};

// Days of the week names
const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Function to generate the calendar for the specified month and year
function generateCalendar(month, year) {
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  const firstDay = firstDayOfMonth.getDay(); // Day of the week the month starts on
  const lastDate = lastDayOfMonth.getDate(); // Last date of the month

  let calendarHTML = "";
  let dayCounter = 1;

  // Set the header with the month and year
  document.getElementById(
    "calendar-header"
  ).innerHTML = `${firstDayOfMonth.toLocaleString("default", {
    month: "long",
  })} ${year}`;

  // Add the days of the week headers
  daysOfWeek.forEach((day) => {
    calendarHTML += `<div class="day-name">${day}</div>`;
  });

  // Add empty spaces for the first week
  for (let i = 0; i < firstDay; i++) {
    calendarHTML += `<div class="day"></div>`;
  }

  // Loop through each day of the month
  for (let i = firstDay; i < 7 && dayCounter <= lastDate; i++) {
    // Check if the current day is a holiday or Sunday
    const dateStr = `${month + 1}-${dayCounter}`;
    const isHoliday = holidays[dateStr];
    let dayClass = "day";

    if (i === 0) {
      // Mark Sundays with red background
      dayClass += " sunday";
    }

    if (isHoliday) {
      // Mark holidays with red background
      dayClass += " holiday";
    } else if (dayCounter === currentDay) {
      // Highlight today's date
      dayClass += " today";
    }

    calendarHTML += `<div class="${dayClass}">${dayCounter}</div>`;
    dayCounter++;
  }

  // Add remaining days of the month in the following weeks
  while (dayCounter <= lastDate) {
    for (let i = 0; i < 7 && dayCounter <= lastDate; i++) {
      const dateStr = `${month + 1}-${dayCounter}`;
      const isHoliday = holidays[dateStr];
      let dayClass = "day";

      if (i === 0) {
        // Mark Sundays with red background
        dayClass += " sunday";
      }

      if (isHoliday) {
        // Mark holidays with red background
        dayClass += " holiday";
      } else if (dayCounter === currentDay) {
        // Highlight today's date
        dayClass += " today";
      }

      calendarHTML += `<div class="${dayClass}">${dayCounter}</div>`;
      dayCounter++;
    }
  }

  document.getElementById("calendar").innerHTML = calendarHTML;
}

// Event listeners for Prev and Next buttons
document.getElementById("prev-month").addEventListener("click", () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  generateCalendar(currentMonth, currentYear);
});

document.getElementById("next-month").addEventListener("click", () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  generateCalendar(currentMonth, currentYear);
});

// Generate the calendar for the current month
generateCalendar(currentMonth, currentYear);
