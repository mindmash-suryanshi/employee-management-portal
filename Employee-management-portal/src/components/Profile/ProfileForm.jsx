import { useState } from "react";

import { Button, TextField } from "@mui/material";

import "../../styles/ProfileForm.css";

const formatDateForInput = (date) => {
  if (!date) {
    return "";
  }

  const [year, month, day] = date.split("-");

  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
};

const ProfileForm = ({ user, onUpdate }) => {
  const [formData, setFormData] = useState({
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    email: user.email || "",
    username: user.username || "",
    phone: user.phone || "",
    birthDate: formatDateForInput(user.birthDate),
  });

  const handleChange = (field, value) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    onUpdate(formData);
  };

  return (
    <div className="profile-form-card">
      <div className="profile-form-heading">
        <h2>Personal Information</h2>
        <p>Update your account information below.</p>
      </div>

      <form className="profile-form" onSubmit={handleSubmit}>
        <TextField
          label="First Name"
          value={formData.firstName}
          onChange={(event) => handleChange("firstName", event.target.value)}
          fullWidth
        />

        <TextField
          label="Last Name"
          value={formData.lastName}
          onChange={(event) => handleChange("lastName", event.target.value)}
          fullWidth
        />

        <TextField
          label="Email"
          type="email"
          value={formData.email}
          onChange={(event) => handleChange("email", event.target.value)}
          fullWidth
        />

        <TextField
          label="Username"
          value={formData.username}
          onChange={(event) => handleChange("username", event.target.value)}
          fullWidth
        />

        <TextField
          label="Phone"
          value={formData.phone}
          onChange={(event) => handleChange("phone", event.target.value)}
          fullWidth
        />

        <TextField
          label="Birth Date"
          type="date"
          value={formData.birthDate}
          onChange={(event) => handleChange("birthDate", event.target.value)}
          fullWidth
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
        />

        <div className="profile-form-actions">
          <Button type="submit" variant="contained">
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
