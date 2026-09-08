import "../../styles/LeaveSchedule.css";
const LeaveSchedule = ({ leaves, employees }) => {
  const today = new Date();

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const formatDate = (date) => {
    return date.toISOString().split("T")[0];
  };

  const getEmployeesOnLeave = (date) => {
    return leaves.filter(
      (leave) =>
        leave.status === "Approved" &&
        leave.startDate <= date &&
        leave.endDate >= date,
    );
  };

  const todayLeaves = getEmployeesOnLeave(formatDate(today));

  const tomorrowLeaves = getEmployeesOnLeave(formatDate(tomorrow));

  const renderEmployeeNames = (records) => {
    return records.slice(0, 4).map((leave) => {
      const employee = employees.find((item) => item.id === leave.employeeId);

      return employee
        ? `${employee.firstName} ${employee.lastName}`
        : "Unknown";
    });
  };

  const sections = [
    {
      title: "Today",
      records: todayLeaves,
    },
    {
      title: "Tomorrow",
      records: tomorrowLeaves,
    },
  ];

  return (
    <div className="leave-schedule-card">
      <div className="leave-schedule-header">
        <h2>Upcoming Leaves</h2>
      </div>

      <div className="leave-schedule-list">
        {sections.map((section) => {
          const names = renderEmployeeNames(section.records);

          return (
            <div className="leave-schedule-item" key={section.title}>
              <div className="leave-schedule-info">
                <h3>{section.title}</h3>

                <p>
                  {section.records.length === 0
                    ? "No one is on leave"
                    : `${section.records.length} ${
                        section.records.length === 1 ? "person" : "people"
                      } will be off`}
                </p>
              </div>

              <div className="leave-schedule-employees">
                {names.map((name, index) => (
                  <div
                    className="leave-avatar"
                    title={name}
                    key={`${name}-${index}`}
                  >
                    {name
                      .split(" ")
                      .map((word) => word[0])
                      .join("")
                      .slice(0, 2)}
                  </div>
                ))}

                {section.records.length > 4 && (
                  <div className="leave-avatar leave-avatar-more">
                    +{section.records.length - 4}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LeaveSchedule;
