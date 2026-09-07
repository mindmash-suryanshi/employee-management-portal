import { useEffect, useState } from "react";

import { fetchAttendance } from "../services/attendanceService";

const useAttendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadAttendance = async () => {
      try {
        const data = await fetchAttendance();

        setAttendance(data);
      } catch (err) {
        setError("Failed to load attendance.");
      } finally {
        setLoading(false);
      }
    };

    loadAttendance();
  }, []);

  return {
    attendance,
    loading,
    error,
  };
};

export default useAttendance;
