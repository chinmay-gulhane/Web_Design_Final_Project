"use client";
import React, { useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Stepper, Step, StepLabel, Box, Button } from "@mui/material";
import Header from "@/components/Header/Header";
import AddressForm from "../../components/AddressForm/AddressForm";
import PaymentForm from "../../components/PaymentForm/PaymentForm";
import "./checkout.scss";
import Address from "@/models/address";

const CenteredCard: React.FC = () => {
  const steps = ["Delivery address", "Payment details"];

  const [activeStep, setActiveStep] = React.useState(0);
  const [formData, setFormData] = React.useState<Address | null>(null);

  const handleNext = (data: Address) => {
    setFormData(data);
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleNextClick = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    } else {
      // Handle "Place order" here
    }
  };

  useEffect(() => {
    console.log("Address Form Data:", formData);
  }, [formData]);

  function getStepContent(step: number) {
    switch (step) {
      case 0:
        return <AddressForm onNext={handleNext} />;
      case 1:
        return <PaymentForm />;
      default:
        throw new Error("Unknown step");
    }
  }

  return (
    <>
      <Header></Header>
      <div className="checkout-container-div">
        <Card className="checkout-card">
          <CardContent>
            <Typography component="h1" variant="h4" align="center">
              Checkout
            </Typography>
            <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}
                {activeStep === steps.length - 1 && (
                  <Button
                    variant="contained"
                    onClick={handleNextClick}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    Place order
                  </Button>
                )}
              </Box>
            </React.Fragment>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default CenteredCard;
