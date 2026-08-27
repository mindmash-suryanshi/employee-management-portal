import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Alert,
  CircularProgress,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Button,
} from "@mui/material";
import PersonOutlined from "@mui/icons-material/PersonOutlined";
import LockOutlined from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { loginUser } from "../services/authService";
import { setAuthUser } from "../utils/storage";

import "../styles/auth.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const data = await loginUser(username, password);

      setAuthUser(data);

      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <Paper className="login-container" elevation={0}>
        <section className="login-brand">
          <div className="brand-content">
            <div className="brand-icon">
              <PersonOutlined />
            </div>

            <h1>
              Let's make every day
              <br />
              meaningful together.
            </h1>

            <div className="brand-divider" />

            <p>
              Manage your workforce, attendance,
              <br />
              leaves and timesheets from one place.
            </p>
          </div>

          <div className="city-silhouette">
            <div className="building building-one" />
            <div className="building building-two" />
            <div className="building building-three" />
            <div className="building building-four" />
            <div className="building building-five" />
            <div className="building building-six" />
          </div>
        </section>

        {/* Right login section */}
        <section className="login-form-section">
          <div className="login-form-container">
            <div className="portal-branding">
              <div className="portal-icon">
                <PersonOutlined />
              </div>

              <div>
                <h2>Employee Portal</h2>
                <span>Employee Management System</span>
              </div>
            </div>

            <div className="welcome-section">
              <h1>Welcome back!</h1>
              <p>Please log in to continue to your account.</p>
            </div>

            <form className="login-form" onSubmit={handleSubmit}>
              <TextField
                label="Username"
                placeholder="Enter your username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                fullWidth
                required
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonOutlined />
                      </InputAdornment>
                    ),
                  },
                }}
              />

              <TextField
                label="Password"
                placeholder="Enter your password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                fullWidth
                required
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlined />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          type="button"
                          onClick={() =>
                            setShowPassword((previous) => !previous)
                          }
                          edge="end"
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          }
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />

              {error && <Alert severity="error">{error}</Alert>}

              <Button
                type="submit"
                variant="contained"
                fullWidth
                className="login-submit"
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress size="1.4rem" color="inherit" />
                ) : (
                  "Log In"
                )}
              </Button>
            </form>
          </div>
        </section>
      </Paper>
    </div>
  );
};

export default Login;
