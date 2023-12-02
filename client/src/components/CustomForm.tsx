"use client";
import React, { useState, FormEventHandler } from "react";
import {
  Avatar,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Box,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import classes from "../styles/styles.module.css";
import Link from "next/link";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { loginService, registerService } from "@/services/auth-service";
import { useRouter } from "next/navigation";


const paperStyle = {
  padding: "30px 20px",
  width: 300,
  margin: "20px auto",
};

const headerStyle = {
  margin: 0,
};

const checkBoxStyle = {
  color: "#6f6f6f",
};

interface MyComponentProps {
  formType: string;
}

const CustomForm: React.FC<MyComponentProps> = ({ formType }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const router = useRouter();

  const formHandler: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (formType === "login") {
      loginService({
        email,
        password,
      }).then((dispatchedResult: any) => {
        if (!dispatchedResult.error) {
          router.push("/restaurants");
        }
      });
    } else {
      registerService({
        firstName,
        lastName,
        email,
        password,
        phone,
      }).then((dispatchedResult: any) => {
        if (!dispatchedResult.error) {
          router.push("/login");
        }
      });
    }
  };

  return formType === "register" ? (
    <Grid className={classes.gridContainer}>
      <Paper elevation={20} style={paperStyle}>
        <Grid
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ bgcolor: "green" }}></Avatar>
          <h2 style={headerStyle}>Sign Up</h2>
          <Typography variant="caption">
            Please register to create an account
          </Typography>
        </Grid>
        <form onSubmit={formHandler}>
          <Box
            sx={{ display: "flex", flexDirection: "column", rowGap: "15px" }}
          >
            <TextField
              fullWidth
              type="text"
              label="First Name"
              variant="outlined"
              sx={{ marginTop: "15px" }}
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
            ></TextField>
            <TextField
              fullWidth
              label="Last Name"
              type="text"
              variant="outlined"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
            ></TextField>
            <TextField
              fullWidth
              type="email"
              label="Email"
              variant="outlined"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            ></TextField>
            <FormControl
              sx={{ width: "100%" }}
              variant="outlined"
              error={false}
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
            <TextField
              fullWidth
              label="Phone"
              variant="outlined"
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            ></TextField>
          </Box>

          <FormControlLabel
            required
            control={<Checkbox />}
            label={
              <Typography variant="caption" style={checkBoxStyle}>
                I accept all terms & conditions
              </Typography>
            }
            className="text-sm"
          />
          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{ marginTop: "10px" }}
          >
            Sign Up
          </Button>
          <Box sx={{ display: "flex", justifyContent: "center", mt: "1rem" }}>
            <Typography sx={{ fontSize: "14px" }}>
              {" "}
              Already have an account?{" "}
              <Link href="/login" className="no-underline text-blue-600">
                {" "}
                Login Now
              </Link>
            </Typography>
          </Box>
        </form>
      </Paper>
    </Grid>
  ) : (
    <Grid className={classes.gridContainer}>
      <Paper elevation={20} style={paperStyle}>
        <Grid
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ bgcolor: "green" }}></Avatar>
          <h2 style={headerStyle}>Sign In</h2>
        </Grid>
        <form onSubmit={formHandler}>
          <Box
            sx={{ display: "flex", flexDirection: "column", rowGap: "16px" }}
          >
            <TextField
              fullWidth
              type="email"
              label="Email"
              variant="outlined"
              sx={{ marginTop: "15px" }}
              error={false}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></TextField>
            <FormControl
              sx={{ width: "100%" }}
              variant="outlined"
              error={false}
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
          </Box>

          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{ marginTop: "15px" }}
          >
            Sign In
          </Button>
          <Box sx={{ display: "flex", justifyContent: "center", mt: "1rem" }}>
            <Typography sx={{ fontSize: "14px" }}>
              {" "}
              Not Registered?{" "}
              <Link href="/register" className="no-underline text-blue-600">
                {" "}
                SignUp Here
              </Link>
            </Typography>
          </Box>
        </form>
      </Paper>
    </Grid>
  );
};

export default CustomForm;
