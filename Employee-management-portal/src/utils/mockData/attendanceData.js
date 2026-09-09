const EMPLOYEE_COUNT = 30;

const START_DATE = new Date("2026-08-01T00:00:00");
const END_DATE = new Date("2026-09-30T00:00:00");

const formatDate = (date) => {
  return date.toISOString().split("T")[0];
};

const isWeekend = (date) => {
  const day = date.getDay();

  return day === 0 || day === 6;
};

const getRandomAttendance = () => {
  return Math.random() < 0.85;
};

const getRandomTime = (hour, minMinute, maxMinute) => {
  const minute =
    Math.floor(Math.random() * (maxMinute - minMinute + 1)) + minMinute;

  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
};

const createAttendanceRecord = (employeeId, date) => {
  const isPresent = getRandomAttendance();

  return {
    id: `${formatDate(date)}-${employeeId}`,
    employeeId,
    date: formatDate(date),
    checkIn: isPresent ? getRandomTime(9, 0, 25) : null,
    checkOut: isPresent ? getRandomTime(18, 0, 30) : null,
    status: isPresent ? "Present" : "Absent",
  };
};

const generateAttendanceData = () => {
  const records = [];

  const currentDate = new Date(START_DATE);

  while (currentDate <= END_DATE) {
    if (!isWeekend(currentDate)) {
      for (let employeeId = 1; employeeId <= EMPLOYEE_COUNT; employeeId += 1) {
        records.push(createAttendanceRecord(employeeId, currentDate));
      }
    }

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return records;
};

export const attendanceData = generateAttendanceData();
