import { useState } from "react";
import format from "date-fns/format";
import addMonths from "date-fns/addMonths";
import eachDayOfInterval from "date-fns/eachDayOfInterval";
import startOfWeek from "date-fns/startOfWeek";
import startOfMonth from "date-fns/startOfMonth";
import endOfMonth from "date-fns/endOfMonth";
import endOfWeek from "date-fns/endOfWeek";
import getDate from "date-fns/getDate";
import isSameMonth from "date-fns/isSameMonth";
import isSameDay from "date-fns/isSameDay";
import isToday from "date-fns/isToday";

export function DatePicker({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="date-picker-container">
      <button className="date-picker-button" onClick={() => setIsOpen(o => !o)}>
        {value == null ? "Select a Date" : format(value, "MMM do, yyyy")}
      </button>
      {isOpen && <DatePickerModal onChange={onChange} value={value} />}
    </div>
  );
}

function DatePickerModal({ value, onChange }) {
  const [visibleMonth, setVisibleMonth] = useState(value || new Date());
  function showPreviousMonth() {
    setVisibleMonth(currentMonth => {
      return addMonths(currentMonth, -1);
    });
  }
  function showNextMonth() {
    setVisibleMonth(currentMonth => {
      return addMonths(currentMonth, +1);
    });
  }
  const visibleDates = eachDayOfInterval({
    start: startOfWeek(startOfMonth(visibleMonth)),
    end: endOfWeek(endOfMonth(visibleMonth)),
  });
  return (
    <div className="date-picker">
      <div className="date-picker-header">
        <button
          className="prev-month-button month-button"
          onClick={showPreviousMonth}
        >
          &larr;
        </button>
        <div className="current-month">
          {format(visibleMonth, "MMMM - yyyy")}
        </div>
        <button
          className="next-month-button month-button"
          onClick={showNextMonth}
        >
          &rarr;
        </button>
      </div>
      <div className="date-picker-grid-header date-picker-grid">
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
      </div>
      <div className="date-picker-grid-dates date-picker-grid">
        {visibleDates.map(d => (
          <button
            className={`date ${
              !isSameMonth(d, visibleMonth) && "date-picker-other-month-date"
            }
            ${isSameDay(d, value) && "selected"} ${isToday(d) && "today"}
           `}
            key={d.toString()}
            onClick={() => onChange(d)}
          >
            {d.getDate()}
          </button>
        ))}
      </div>
    </div>
  );
}
