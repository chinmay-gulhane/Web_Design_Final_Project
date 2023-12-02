"use client";
import React, { useState } from "react";
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
import { green } from "@mui/material/colors";
import { useAppSelector } from "@/redux/store";

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
  const [showPassword, setShowPassword] = useState(false);

  const loading = useAppSelector((state) => state.auth.loading);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return formType === "register" ? (
    <Grid className={classes.gridContainer}>
      <Paper elevation={20} style={paperStyle}>
        <Grid align="center">
          <Avatar sx={{ bgcolor: "green" }}></Avatar>
          <h2 style={headerStyle}>Sign Up</h2>
          <Typography variant="caption">
            Please register to create an account
          </Typography>
        </Grid>
        <form>
          <Box
            sx={{ display: "flex", flexDirection: "column", rowGap: "15px" }}
          >
            <TextField
              fullWidth
              label="First Name"
              variant="outlined"
              sx={{ marginTop: "15px" }}
            ></TextField>
            <TextField
              fullWidth
              label="Last Name"
              variant="outlined"
            ></TextField>
            <TextField fullWidth label="Email" variant="outlined"></TextField>
            <TextField
              fullWidth
              label="Password"
              variant="outlined"
            ></TextField>
            <TextField fullWidth label="Phone" variant="outlined"></TextField>
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
        <Grid align="center">
          <Avatar sx={{ bgcolor: "green" }}></Avatar>
          <h2 style={headerStyle}>Sign In</h2>
        </Grid>
        <form>
          <Box
            sx={{ display: "flex", flexDirection: "column", rowGap: "16px" }}
          >
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              sx={{ marginTop: "15px" }}
              error={false}
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
