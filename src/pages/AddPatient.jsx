
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// import axios from "axios";

import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  MenuItem,
  TextField,
  Typography,
  Alert,
  CircularProgress,
} from "@mui/material";

import {
  PersonAdd,
  Save,
  RestartAlt,
} from "@mui/icons-material";
import Sidebar from "../componets/Sidebar";

/* =========================================================
   ZOD SCHEMA
========================================================= */

const patientSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .min(2, "First name must contain at least 2 characters"),

  lastName: z
    .string()
    .min(1, "Last name is required")
    .min(2, "Last name must contain at least 2 characters"),

  email: z
    .string()
    .email("Enter a valid email address")
    .or(z.literal("")),

  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^[0-9]{10}$/, "Phone number must contain 10 digits"),

  dateOfBirth: z
    .string()
    .min(1, "Date of birth is required"),

  gender: z
    .string()
    .min(1, "Gender is required"),

  bloodGroup: z
    .string()
    .min(1, "Blood group is required"),

  occupation: z.string(),

  address: z.string(),

  city: z.string(),

  state: z.string(),

  pincode: z
    .string()
    .regex(/^[0-9]{6}$/, "Pincode must contain 6 digits")
    .or(z.literal("")),

  emergencyName: z.string(),

  emergencyPhone: z
    .string()
    .regex(
      /^[0-9]{10}$/,
      "Emergency phone must contain 10 digits"
    )
    .or(z.literal("")),

  emergencyRelation: z.string(),

  medicalHistory: z.string(),

  allergies: z.string(),

  currentMedication: z.string(),
});

/* =========================================================
   DEFAULT VALUES
========================================================= */

const defaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  dateOfBirth: "",
  gender: "",
  bloodGroup: "",
  occupation: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
  emergencyName: "",
  emergencyPhone: "",
  emergencyRelation: "",
  medicalHistory: "",
  allergies: "",
  currentMedication: "",
};

/* =========================================================
   COMPONENT
========================================================= */

function AddPatient() {
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm({
    resolver: zodResolver(patientSchema),
    defaultValues,
  });

  /* =======================================================
     SUBMIT
  ======================================================= */

const onSubmit = async (data) => {
  try {
    setServerError("");
    setSuccessMessage("");

    const response = await fetch(
      "http://localhost:2300/api/patients",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const result = await response.json();

    // Check if API returned an error status
    if (!response.ok) {
      throw new Error(
        result.message || "Failed to add patient."
      );
    }

    console.log("Patient created:", result);

    setSuccessMessage("Patient added successfully!");

    // Clear all fields after successful API request
    reset(defaultValues);
  } catch (error) {
    console.error("Add patient error:", error);

    setServerError(
      error.message ||
        "Something went wrong while adding the patient."
    );
  }
};

  /* =======================================================
     RESET
  ======================================================= */

  const handleReset = () => {
    reset(defaultValues);

    setServerError("");
    setSuccessMessage("");
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* ===================================================
          HEADER
      =================================================== */}
           <Sidebar/>


      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 4,
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Box>
          <Typography
            variant="h4"
            fontWeight={700}
            sx={{ color: "#111827" }}
          >
            Add Patient
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 0.5 }}
          >
            Add a new patient to the hospital management
            system.
          </Typography>
        </Box>

        <Box
          sx={{
            width: 52,
            height: 52,
            borderRadius: 3,
            bgcolor: "#eff6ff",
            color: "#2563eb",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <PersonAdd />
        </Box>
      </Box>

      {/* ===================================================
          SERVER MESSAGES
      =================================================== */}

      {successMessage && (
        <Alert
          severity="success"
          sx={{ mb: 3 }}
          onClose={() => setSuccessMessage("")}
        >
          {successMessage}
        </Alert>
      )}

      {serverError && (
        <Alert
          severity="error"
          sx={{ mb: 3 }}
          onClose={() => setServerError("")}
        >
          {serverError}
        </Alert>
      )}

      {/* ===================================================
          FORM
      =================================================== */}

      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        {/* =================================================
            BASIC INFORMATION
        ================================================= */}

        <Card
          elevation={0}
          sx={{
            border: "1px solid #e5e7eb",
            borderRadius: 3,
            mb: 3,
          }}
        >
          <CardContent sx={{ p: { xs: 2, md: 3 } }}>
            <Typography variant="h6" fontWeight={700}>
              Basic Information
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 0.5, mb: 3 }}
            >
              Enter the patient's personal information.
            </Typography>

            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={2.5}>
              {/* First Name */}
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="First Name"
                  {...register("firstName")}
                  error={Boolean(errors.firstName)}
                  helperText={errors.firstName?.message}
                  
                />
              </Grid>

              {/* Last Name */}
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Last Name"
                  {...register("lastName")}
                  error={Boolean(errors.lastName)}
                  helperText={errors.lastName?.message}
                  
                />
              </Grid>

              {/* Email */}
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  type="email"
                  label="Email Address"
                  {...register("email")}
                  error={Boolean(errors.email)}
                  helperText={errors.email?.message}
                />
              </Grid>

              {/* Phone */}
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  {...register("phone")}
                  error={Boolean(errors.phone)}
                  helperText={errors.phone?.message}
                  inputProps={{
                    maxLength: 10,
                  }}
                  
                />
              </Grid>

              {/* Date of Birth */}
              <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                  fullWidth
                  type="date"
                  label="Date of Birth"
                  {...register("dateOfBirth")}
                  error={Boolean(errors.dateOfBirth)}
                  helperText={errors.dateOfBirth?.message}
                  slotProps={{
                    inputLabel: {
                      shrink: true,
                    },
                  }}
                  
                />
              </Grid>

              {/* Gender */}
              <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                  select
                  fullWidth
                  label="Gender"
                  defaultValue=""
                  {...register("gender")}
                  error={Boolean(errors.gender)}
                  helperText={errors.gender?.message}
                  
                >
                  <MenuItem value="Male">
                    Male
                  </MenuItem>

                  <MenuItem value="Female">
                    Female
                  </MenuItem>

                  <MenuItem value="Other">
                    Other
                  </MenuItem>
                </TextField>
              </Grid>

              {/* Blood Group */}
              <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                  select
                  fullWidth
                  label="Blood Group"
                  defaultValue=""
                  {...register("bloodGroup")}
                  error={Boolean(errors.bloodGroup)}
                  helperText={errors.bloodGroup?.message}
                  
                >
                  <MenuItem value="A+">A+</MenuItem>
                  <MenuItem value="A-">A-</MenuItem>
                  <MenuItem value="B+">B+</MenuItem>
                  <MenuItem value="B-">B-</MenuItem>
                  <MenuItem value="AB+">AB+</MenuItem>
                  <MenuItem value="AB-">AB-</MenuItem>
                  <MenuItem value="O+">O+</MenuItem>
                  <MenuItem value="O-">O-</MenuItem>
                </TextField>
              </Grid>

              {/* Occupation */}
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="Occupation"
                  {...register("occupation")}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* =================================================
            ADDRESS
        ================================================= */}

        <Card
          elevation={0}
          sx={{
            border: "1px solid #e5e7eb",
            borderRadius: 3,
            mb: 3,
          }}
        >
          <CardContent sx={{ p: { xs: 2, md: 3 } }}>
            <Typography variant="h6" fontWeight={700}>
              Address Information
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 0.5, mb: 3 }}
            >
              Enter the patient's residential address.
            </Typography>

            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={2.5}>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  label="Address"
                  {...register("address")}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                  fullWidth
                  label="City"
                  {...register("city")}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                  fullWidth
                  label="State"
                  {...register("state")}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                  fullWidth
                  label="Pincode"
                  {...register("pincode")}
                  error={Boolean(errors.pincode)}
                  helperText={errors.pincode?.message}
                  inputProps={{
                    maxLength: 6,
                  }}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* =================================================
            EMERGENCY CONTACT
        ================================================= */}

        <Card
          elevation={0}
          sx={{
            border: "1px solid #e5e7eb",
            borderRadius: 3,
            mb: 3,
          }}
        >
          <CardContent sx={{ p: { xs: 2, md: 3 } }}>
            <Typography variant="h6" fontWeight={700}>
              Emergency Contact
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 0.5, mb: 3 }}
            >
              Someone we can contact in case of emergency.
            </Typography>

            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={2.5}>
              <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                  fullWidth
                  label="Contact Name"
                  {...register("emergencyName")}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                  fullWidth
                  label="Contact Phone"
                  {...register("emergencyPhone")}
                  error={Boolean(errors.emergencyPhone)}
                  helperText={
                    errors.emergencyPhone?.message
                  }
                  inputProps={{
                    maxLength: 10,
                  }}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                  select
                  fullWidth
                  label="Relationship"
                  defaultValue=""
                  {...register("emergencyRelation")}
                >
                  <MenuItem value="Father">
                    Father
                  </MenuItem>

                  <MenuItem value="Mother">
                    Mother
                  </MenuItem>

                  <MenuItem value="Brother">
                    Brother
                  </MenuItem>

                  <MenuItem value="Sister">
                    Sister
                  </MenuItem>

                  <MenuItem value="Spouse">
                    Spouse
                  </MenuItem>

                  <MenuItem value="Friend">
                    Friend
                  </MenuItem>

                  <MenuItem value="Other">
                    Other
                  </MenuItem>
                </TextField>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* =================================================
            MEDICAL INFORMATION
        ================================================= */}

        <Card
          elevation={0}
          sx={{
            border: "1px solid #e5e7eb",
            borderRadius: 3,
            mb: 3,
          }}
        >
          <CardContent sx={{ p: { xs: 2, md: 3 } }}>
            <Typography variant="h6" fontWeight={700}>
              Medical Information
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 0.5, mb: 3 }}
            >
              Add relevant medical history and medication
              details.
            </Typography>

            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={2.5}>
              <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Medical History"
                  {...register("medicalHistory")}
                  placeholder="Previous diseases, surgeries, etc."
                />
              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Allergies"
                  {...register("allergies")}
                  placeholder="Medicine or food allergies"
                />
              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Current Medication"
                  {...register("currentMedication")}
                  placeholder="Current medicines"
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* =================================================
            BUTTONS
        ================================================= */}

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <Button
            type="button"
            variant="outlined"
            startIcon={<RestartAlt />}
            onClick={handleReset}
            disabled={isSubmitting}
            sx={{
              minWidth: 120,
              textTransform: "none",
            }}
          >
            Reset
          </Button>

          <Button
            type="submit"
            variant="contained"
            startIcon={
              isSubmitting ? (
                <CircularProgress
                  size={20}
                  color="inherit"
                />
              ) : (
                <Save />
              )
            }
            disabled={isSubmitting}
            sx={{
              minWidth: 160,
              textTransform: "none",
              bgcolor: "#2563eb",

              "&:hover": {
                bgcolor: "#1d4ed8",
              },
            }}
          >
            {isSubmitting ? "Saving..." : "Add Patient"}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default AddPatient;

