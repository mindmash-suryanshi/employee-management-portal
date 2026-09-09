import { useEffect, useState } from "react";

import { fetchEmployeeById } from "../services/employeeService";
import { getAuthUser, setAuthUser } from "../utils/storage";

const useProfile = () => {
  const [user, setUser] = useState(getAuthUser());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const authUser = getAuthUser();

        if (!authUser) {
          setError("Unable to load profile.");
          return;
        }

        const employee = await fetchEmployeeById(authUser.id);

        const profile = {
          ...authUser,
          ...employee,
        };

        setUser(profile);
        setAuthUser(profile);
      } catch (err) {
        setError("Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const updateProfile = (updatedData) => {
    const updatedUser = {
      ...user,
      ...updatedData,
    };

    setUser(updatedUser);
    setAuthUser(updatedUser);
    setIsEditing(false);
  };

  return {
    user,
    loading,
    error,
    isEditing,
    setIsEditing,
    updateProfile,
  };
};

export default useProfile;
