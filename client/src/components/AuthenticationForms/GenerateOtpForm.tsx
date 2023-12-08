import React from "react";
import { paperStyle, headerStyle, buttonStyle } from "./formStyles";
import {
  Avatar,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
} from "@mui/material";
import classes from "../../styles/styles.module.css";
import Link from "next/link";
import { GenerateOtpFormProps } from "@/models/auth";

const GenerateOtpForm: React.FC<GenerateOtpFormProps> = ({
  formHandler,
  email,
  setEmail
}) => {
  return (
    <>
      <Grid className={classes.gridContainer}>
        <Paper elevation={20} style={paperStyle}>
          <Grid
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ bgcolor: "rgba(3,193,103,255)" }}></Avatar>
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
                marginTop: "25px",
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
              style={buttonStyle}
            >
              Send Otp
            </Button>
            <Box sx={{ display: "flex", justifyContent: "center", mt: "1rem" }}>
              <Typography sx={{ fontSize: "14px" }}>
                <Link href="/login" className="no-underline text-gray-500">
                  {`<< Back to Login`}
                </Link>
              </Typography>
            </Box>
          </form>
        </Paper>
      </Grid>
    </>
  );
};

export default GenerateOtpForm;
