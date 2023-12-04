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
import {
  getOtpService,
  loginService,
  registerService,
  updatePasswordService,
} from "@/services/auth-service";
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
  const [otp, setOtp] = useState("");

  const [hidePasswordUpdationForm, setHidePasswordUpdationForm] =
    useState(true);

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
    } else if (formType === "register") {
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
    } else if (formType === "forgot-password" && hidePasswordUpdationForm) {
      getOtpService(email).then((dispatchedResult: any) => {
        if (!dispatchedResult.error) {
          setHidePasswordUpdationForm(false);
        }
      });
    }else if (formType === "forgot-password" && !hidePasswordUpdationForm) {
      updatePasswordService({email, otp, password}).then((dispatchedResult: any) => {
        if (!dispatchedResult.error) {
          router.push("/login");
        }
      });
    }
  };

  return (
    <>
      {formType === "register" && (
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
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  rowGap: "15px",
                }}
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
              <Box
                sx={{ display: "flex", justifyContent: "center", mt: "1rem" }}
              >
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
      )}
      {formType === "login" && (
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
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  rowGap: "16px",
                }}
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

              <Typography
                sx={{
                  textAlign: "right",
                  color: "#2196F3",
                  fontSize: "13px",
                  mt: "5px",
                }}
              >
                <Link href="forgot-password" className="text-decoration-none">
                  {" "}
                  Forgot Password?
                </Link>
              </Typography>

              <Button
                fullWidth
                type="submit"
                variant="contained"
                sx={{ marginTop: "15px" }}
              >
                Sign In
              </Button>
              <Box
                sx={{ display: "flex", justifyContent: "center", mt: "1rem" }}
              >
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
      )}

      {formType === "forgot-password" && hidePasswordUpdationForm && (
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
              <h2 style={headerStyle}>OTP</h2>
              <Typography variant="caption">
                Please enter email to get otp
              </Typography>
            </Grid>
            <form onSubmit={formHandler}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: "15px",
                }}
              >
                <TextField
                  fullWidth
                  type="email"
                  label="Email"
                  variant="outlined"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                ></TextField>
              </Box>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                sx={{ marginTop: "20px" }}
              >
                Send Otp
              </Button>
              <Box
                sx={{ display: "flex", justifyContent: "center", mt: "1rem" }}
              >
                <Typography sx={{ fontSize: "14px" }}>
                  <Link href="/login" className="no-underline text-gray-500">
                    {`<< Back to Login`}
                  </Link>
                </Typography>
              </Box>
            </form>
          </Paper>
        </Grid>
      )}

      {formType === "forgot-password" && !hidePasswordUpdationForm && (
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
              <h2 style={headerStyle}>New Password</h2>
              <Typography variant="caption">Please verify your otp</Typography>
            </Grid>
            <form onSubmit={formHandler}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: "15px",
                  rowGap: "15px"
                }}
              >
                <TextField
                  fullWidth
                  type="email"
                  label="Email"
                  variant="outlined"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                ></TextField>
                <TextField
                  fullWidth
                  type="text"
                  label="Otp"
                  variant="outlined"
                  onChange={(e) => setOtp(e.target.value)}
                  value={otp}
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
                sx={{ marginTop: "20px" }}
              >
                Update Password
              </Button>
              <Box
                sx={{ display: "flex", justifyContent: "center", mt: "1rem" }}
              >
                <Typography sx={{ fontSize: "14px" }}>
                  <Link href="/login" className="no-underline text-gray-500">
                    {`<< Back to Login`}
                  </Link>
                </Typography>
              </Box>
            </form>
          </Paper>
        </Grid>
      )}
    </>
  );
};

export default CustomForm;
