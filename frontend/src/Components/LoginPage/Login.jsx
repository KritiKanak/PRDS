import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import '../Loader/Loader2.css'
import { BASE_URL } from '../Config.js';


const theme = createTheme();

export default function SignIn() {
  const [loading, setLoading] = React.useState(false)

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    setLoading(true)
    event.preventDefault();
    const Data = new FormData(event.currentTarget);
    const userData = {
      email: Data.get("email"),
      password: Data.get("password"),
    };
    const myurl = BASE_URL + "login";

    try {
      const { data } = await axios.post(myurl, userData);
      const code = data.status;
      if (code === 400) alert("All inputs are required");
      else if (code === 401) alert("Invalid Credientials");
      else if ((code === 200) & (data.message === "Emp Login")) {

        localStorage.setItem("empId", JSON.stringify(data.empId));
        navigate("/main/EmployeeSection");
      } else if ((code === 200) & (data.message === "HR Login")) {
        localStorage.setItem("curuser", JSON.stringify(data.user));
        localStorage.setItem("empId", JSON.stringify(data.empId));

        navigate("/main2/HR");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled = {loading}
            >
             {loading ? <span className="loader2"></span>
                : "Login"}
            </Button>
           
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
