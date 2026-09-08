import { useEffect, useState } from "react";

import { fetchLeaves } from "../services/leaveService";

const STORAGE_KEY = "employee_leaves";

const useLeaves = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadLeaves = async () => {
      try {
        const storedLeaves = localStorage.getItem(STORAGE_KEY);

        if (storedLeaves) {
          setLeaves(JSON.parse(storedLeaves));
        } else {
          const data = await fetchLeaves();

          setLeaves(data);

          localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        }
      } catch (err) {
        setError("Failed to load leave records.");
      } finally {
        setLoading(false);
      }
    };

    loadLeaves();
  }, []);

  const updateLeaveStatus = (leaveId, status) => {
    setLeaves((currentLeaves) => {
      const updatedLeaves = currentLeaves.map((leave) =>
        leave.id === leaveId ? { ...leave, status } : leave,
      );

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedLeaves));

      return updatedLeaves;
    });
  };

  const addLeave = (newLeave) => {
    setLeaves((currentLeaves) => {
      const updatedLeaves = [...currentLeaves, newLeave];

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedLeaves));

      return updatedLeaves;
    });
  };

  return {
    leaves,
    loading,
    error,
    updateLeaveStatus,
    addLeave,
  };
};

export default useLeaves;
