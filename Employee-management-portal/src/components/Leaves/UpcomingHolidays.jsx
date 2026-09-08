import "../../styles/UpcomingHolidays.css";
const UpcomingHolidays = () => {
  const holidays = [
    {
      name: "Gandhi Jayanti",
      date: "02 Oct",
    },
    {
      name: "Dussehra",
      date: "20 Oct",
    },
    {
      name: "Diwali",
      date: "08 Nov",
    },
    {
      name: "Christmas",
      date: "25 Dec",
    },
  ];

  return (
    <div className="upcoming-holidays-card">
      <div className="upcoming-holidays-header">
        <h2>Upcoming Holidays</h2>
      </div>

      <div className="upcoming-holidays-list">
        {holidays.map((holiday) => (
          <div className="upcoming-holiday-item" key={holiday.name}>
            <span className="upcoming-holiday-name">{holiday.name}</span>

            <span className="upcoming-holiday-date">{holiday.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingHolidays;
