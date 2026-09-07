const employees = Array.from({ length: 30 }, (_, index) => index + 1);

const startDate = new Date("2026-08-01");
const endDate = new Date("2026-09-07");

const getDateString = (date) => {
  return date.toISOString().split("T")[0];
};

const getCheckInTime = (employeeId, day) => {
  const variations = [
    "08:52",
    "08:57",
    "09:00",
    "09:03",
    "09:07",
    "09:11",
    "09:15",
    "09:20",
    "09:25",
  ];

  return variations[(employeeId + day) % variations.length];
};

const getCheckOutTime = (employeeId, day) => {
  const variations = [
    "17:05",
    "17:10",
    "17:15",
    "17:20",
    "17:25",
    "17:30",
    "17:35",
    "17:40",
  ];

  return variations[(employeeId * 2 + day) % variations.length];
};

const isAbsent = (employeeId, day) => {
  return (employeeId + day) % 17 === 0 || (employeeId * day) % 43 === 0;
};

const generateAttendance = () => {
  const records = [];
  let id = 1;

  for (
    let date = new Date(startDate);
    date <= endDate;
    date.setDate(date.getDate() + 1)
  ) {
    const dayOfWeek = date.getDay();

    // Skip Saturday and Sunday
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      continue;
    }

    const dateString = getDateString(date);
    const day = date.getDate();

    employees.forEach((employeeId) => {
      const absent = isAbsent(employeeId, day);

      records.push({
        id,
        employeeId,
        status: absent ? "Absent" : "Present",
        date: dateString,
        checkIn: absent ? null : getCheckInTime(employeeId, day),
        checkOut: absent ? null : getCheckOutTime(employeeId, day),
      });

      id += 1;
    });
  }

  return records;
};

export const attendanceData = generateAttendance();
