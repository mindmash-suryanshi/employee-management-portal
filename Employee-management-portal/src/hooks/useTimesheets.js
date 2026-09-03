import { useEffect, useState } from "react";
import { fetchTimesheets } from "../services/timesheetService";

const useTimesheets = () => {
  const [timesheets, setTimesheets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadTimesheets = async () => {
      try {
        const data = await fetchTimesheets();

        setTimesheets(data);
      } catch (error) {
        setError("Failed to fetch timesheets.");
      } finally {
        setLoading(false);
      }
    };

    loadTimesheets();
  }, []);

  return {
    timesheets,
    loading,
    error,
  };
};

export default useTimesheets;
