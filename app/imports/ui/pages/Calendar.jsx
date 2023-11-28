import React from 'react';
import { Row, Col, Container, Table } from 'react-bootstrap';

const Calendar = () => {
  const getDaysInMonth = (year, month) => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];

    for (let date = new Date(firstDay); date <= lastDay; date.setDate(date.getDate() + 1)) {
      days.push(new Date(date));
    }

    return days;
  };

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const today = new Date();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const startingDay = firstDayOfMonth.getDay(); // 0 (Sunday) through 6 (Saturday)
  const daysInMonth = getDaysInMonth(currentYear, currentMonth);

  const formatDate = (date) => {
    if (!date) return '';
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const day = `${date.getDate()}`.padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const weeks = [];
  let currentWeek = [];

  // Add empty cells for the days before the first day of the month
  for (let i = 0; i < startingDay; i++) {
    currentWeek.push(null);
  }

  daysInMonth.forEach((date, index) => {
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
    currentWeek.push(date);
  });

  // Handle the last week if it's not complete
  while (currentWeek.length < 7) {
    currentWeek.push(null);
  }
  weeks.push(currentWeek);

  const cellStyle = {
    width: '8em', // 100% / 7
    paddingBottom: '10em', // Maintain a square aspect ratio
    textAlign: 'center',
    verticalAlign: 'middle',
    border: '1px solid #ccc',
  };


  return (
    <Container>
      <Row className="text-center py-5">
        <h1>{months[currentMonth]} {currentYear} Calendar</h1>
      </Row>
      <Row>
        <Table bordered responsive>
          <thead>
            <tr>
              <th>Sun</th>
              <th>Mon</th>
              <th>Tue</th>
              <th>Wed</th>
              <th>Thu</th>
              <th>Fri</th>
              <th>Sat</th>
            </tr>
          </thead>
          <tbody>
            {weeks.map((week, weekIndex) => (
              <tr key={weekIndex}>
                {week.map((date, dayIndex) => (
                  <td
                    key={dayIndex}
                    style={{
                      ...cellStyle,
                      backgroundColor: date && date.toDateString() === today.toDateString() ? '#ffffcc' : 'inherit',
                      fontWeight: date && date.toDateString() === today.toDateString() ? 'bold' : 'normal',
                    }}
                  >
                    {date ? date.getDate() : ''}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </Row>
    </Container>
  );
};

export default Calendar;