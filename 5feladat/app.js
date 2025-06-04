document.addEventListener('DOMContentLoaded', () => {
    const calendarDays = document.getElementById('calendarDays');
    const monthSelect = document.getElementById('monthSelect');
    const yearSelect = document.getElementById('yearSelect');
    const prevMonthBtn = document.getElementById('prevMonth');
    const nextMonthBtn = document.getElementById('nextMonth');
    const submitReservationBtn = document.querySelector('.submit-reservation-btn');

    let currentMonth = parseInt(monthSelect.value);
    let currentYear = parseInt(yearSelect.value);

    const initialHighlightedDates = [
    ];
    let selectedDates = new Set(initialHighlightedDates);

    function renderCalendar() {
        calendarDays.innerHTML = '';
        const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        const startingDayOfWeek = firstDayOfMonth.getDay();


        let actualStartingDay = startingDayOfWeek === 0 ? 6 : startingDayOfWeek - 1;

        for (let i = 0; i < actualStartingDay; i++) {
            const emptyDiv = document.createElement('div');
            emptyDiv.classList.add('calendar-day', 'empty');
            calendarDays.appendChild(emptyDiv);
        }

        for (let i = 1; i <= daysInMonth; i++) {
            const dayDiv = document.createElement('div');
            dayDiv.classList.add('calendar-day');
            dayDiv.textContent = i;
            const fullDate = new Date(currentYear, currentMonth, i);
            const dateString = fullDate.toDateString();

            if (initialHighlightedDates.includes(dateString)) {
                dayDiv.classList.add('highlighted-initial');
            }

            dayDiv.addEventListener('click', () => {
                if (dayDiv.classList.contains('highlighted-initial')) {
                    return;
                }
                if (selectedDates.has(dateString)) {
                    selectedDates.delete(dateString);
                    dayDiv.classList.remove('selected');
                } else {
                    selectedDates.add(dateString);
                    dayDiv.classList.add('selected');
                }
            });

            calendarDays.appendChild(dayDiv);
        }
    }

    prevMonthBtn.addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
            yearSelect.value = currentYear;
        }
        monthSelect.value = currentMonth;
        renderCalendar();
    });

    nextMonthBtn.addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
            yearSelect.value = currentYear;
        }
        monthSelect.value = currentMonth;
        renderCalendar();
    });

    monthSelect.addEventListener('change', (event) => {
        currentMonth = parseInt(event.target.value);
        renderCalendar();
    });

    yearSelect.addEventListener('change', (event) => {
        currentYear = parseInt(event.target.value);
        renderCalendar();
    });

    submitReservationBtn.addEventListener('click', () => {
        const sortedDates = Array.from(selectedDates).sort((a, b) => new Date(a) - new Date(b));
        alert('Kiválasztott dátumok: ' + (sortedDates.length > 0 ? sortedDates.join(', ') : 'Nincs kiválasztott dátum.'));
        console.log('Kiválasztott dátumok:', sortedDates);
    });

    renderCalendar();
});

const API_URL = 'https://p161-7ddfd-default-rtdb.europe-west1.firebasedatabase.app/offices.json';

const officeList = document.getElementById('office-list');
const selectedList = document.getElementById('selected-list');
const submitBtn = document.getElementById('submit-reservation');
const reservationDate = document.getElementById('reservation-date');

let selectedOffices = [];

function createOfficeCard(office, id) {
  const card = document.createElement('div');
  card.className = 'office-card';

  card.innerHTML = `
    <img src="${office.image || 'https://via.placeholder.com/300x150'}" alt="${office.name}">
    <h3>${office.name}</h3>
    <p><strong>Address:</strong> ${office.address}</p>
    <p><strong>Area:</strong> ${office.area_m2} m²</p>
    <p><strong>Base Fee:</strong> ${office.base_fee} €</p>
    <p><strong>Daily Price:</strong> ${office.daily_price} € / day</p>
    <button class="reserve-btn">Reserve</button>
  `;

  card.querySelector('.reserve-btn').addEventListener('click', () => {
    if (!selectedOffices.find(item => item.id === id)) {
      selectedOffices.push({ ...office, id });
      renderSelected();
    }
  });

  return card;
}

function renderSelected() {
  selectedList.innerHTML = '';
  selectedOffices.forEach((office, index) => {
    const item = document.createElement('li');
    item.innerHTML = `
      ${office.name} – ${office.address} | ${office.dailyPrice} €/day | ${office.basePrice} € base fee
      <button class="remove-btn">Remove</button>
    `;
    item.querySelector('.remove-btn').addEventListener('click', () => {
      selectedOffices.splice(index, 1);
      renderSelected();
    });
    selectedList.appendChild(item);
  });
}


async function loadOffices() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error('Could not fetch data.');
    const data = await res.json();

    Object.entries(data).forEach(([id, office]) => {
      const card = createOfficeCard(office, id);
      officeList.appendChild(card);
    });
  } catch (err) {
    console.error(err);
    officeList.innerHTML = '<p style="color: red;">Hiba történt az irodák betöltésekor.</p>';
  }
}

loadOffices();

document.addEventListener('DOMContentLoaded', () => {
    const officeSelect = document.getElementById('officeSelect');
    const submitBtn = document.getElementById('submitReservation');

    submitBtn.addEventListener('click', () => {
        const selectedOffice = officeSelect.value;
        alert(`Foglalás elküldve az alábbi irodára: ${selectedOffice}`);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const officeList = document.getElementById('office-list');

    searchBtn.addEventListener('click', () => {
        const searchTerm = searchInput.value.toLowerCase().trim();

        document.querySelectorAll('.office-card').forEach(card => {
            const officeName = card.querySelector('h3').textContent.toLowerCase();
            const officeAddress = card.querySelector('p').textContent.toLowerCase();

            if (officeName.includes(searchTerm) || officeAddress.includes(searchTerm)) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    });

    searchInput.addEventListener('input', () => {
        if (searchInput.value.trim() === "") {
            document.querySelectorAll('.office-card').forEach(card => {
                card.style.display = "block";
            });
        }
    });
});

