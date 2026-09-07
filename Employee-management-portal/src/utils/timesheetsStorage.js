const TIMESHEET_STORAGE_KEY = "timesheets";

export const getStoredTimesheets = () => {
  const storedTimesheets = localStorage.getItem(TIMESHEET_STORAGE_KEY);

  if (!storedTimesheets) {
    return null;
  }

  return JSON.parse(storedTimesheets);
};

export const saveTimesheets = (timesheets) => {
  localStorage.setItem(TIMESHEET_STORAGE_KEY, JSON.stringify(timesheets));
};

export const updateTimesheetStatus = (timesheetId, status) => {
  const timesheets = getStoredTimesheets() || [];

  const updatedTimesheets = timesheets.map((timesheet) =>
    timesheet.id === timesheetId ? { ...timesheet, status } : timesheet,
  );

  saveTimesheets(updatedTimesheets);

  return updatedTimesheets;
};

export const addTimesheet = (timesheet) => {
  const timesheets = getStoredTimesheets() || [];

  const newTimesheet = {
    ...timesheet,
    id:
      timesheets.length > 0
        ? Math.max(...timesheets.map((item) => item.id)) + 1
        : 1,
  };

  const updatedTimesheets = [...timesheets, newTimesheet];

  saveTimesheets(updatedTimesheets);

  return updatedTimesheets;
};
