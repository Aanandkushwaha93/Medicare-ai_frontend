import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Divider,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import SaveIcon from "@mui/icons-material/Save";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import Header from "../componets/Header";
import Sidebar from "../componets/Sidebar";

// Zod validation schema
const doctorSchema = z.object({
  firstName: z.string().trim().min(2, "First name must contain at least 2 characters"),
  lastName: z.string().trim().min(2, "Last name must contain at least 2 characters"),

  email: z.string().trim().email("Enter a valid email address"),

  phone: z.string().regex(/^[0-9]{10}$/, "Enter a valid 10-digit phone number"),

  gender: z.enum(["Male", "Female", "Other"], {
    error: "Please select gender",
  }),

  specialization: z.string().trim().min(1, "Specialization is required"),

  qualification: z.string().trim().min(1, "Qualification is required"),

  experience: z.coerce
    .number()
    .min(0, "Experience cannot be negative")
    .max(70, "Enter a valid experience"),

  consultationFee: z.coerce
    .number()
    .positive("Consultation fee must be greater than zero"),

  licenseNumber: z.string().trim().min(1, "License number is required"),

  department: z.string().trim().min(1, "Department is required"),

  availableDays: z
    .array(z.string())
    .min(1, "Select at least one available day"),

  startTime: z.string().min(1, "Start time is required"),

  endTime: z.string().min(1, "End time is required"),

  address: z.string().trim().min(5, "Enter a valid address"),

  bio: z.string().optional(),
}).refine(
  (data) => data.startTime < data.endTime,
  {
    message: "End time must be later than start time",
    path: ["endTime"],
  }
);

const defaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  gender: "",
  specialization: "",
  qualification: "",
  experience: "",
  consultationFee: "",
  licenseNumber: "",
  department: "",
  availableDays: [],
  startTime: "",
  endTime: "",
  address: "",
  bio: "",
};

const specializations = [
  "General Physician",
  "Cardiologist",
  "Dermatologist",
  "Neurologist",
  "Orthopedic",
  "Pediatrician",
  "Gynecologist",
  "Dentist",
  "Ophthalmologist",
  "Psychiatrist",
  "ENT Specialist",
  "Other",
];

const departments = [
  "General Medicine",
  "Cardiology",
  "Dermatology",
  "Neurology",
  "Orthopedics",
  "Pediatrics",
  "Gynecology",
  "Dental",
  "Ophthalmology",
  "Emergency",
  "Other",
];

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const AddDoctor = () => {
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(doctorSchema),
    defaultValues,
  });

  const selectedDays = watch("availableDays");

  const onSubmit = async (data) => {
    try {
      setServerError("");
      setSuccessMessage("");

      const response = await fetch(
        "http://localhost:2300/api/doctors",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to add doctor");
      }

      console.log("Doctor created:", result);
      setSuccessMessage("Doctor added successfully!");

      reset(defaultValues);
    } catch (error) {
      console.error("Add doctor error:", error);

      setServerError(
        error.message || "Something went wrong while adding the doctor."
      );
    }
  };

  const handleReset = () => {
    reset(defaultValues);
    setServerError("");
    setSuccessMessage("");
  };

  const handleDayChange = (day) => {
    const updatedDays = selectedDays.includes(day)
      ? selectedDays.filter((item) => item !== day)
      : [...selectedDays, day];

    setValue("availableDays", updatedDays, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };
  const drawerWidth = 250;

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: "#f8fafc", minHeight: "100vh" }}>

      {/* Navbar */}
      <Header />

      {/* Sidebar */}
      <Sidebar />
      <Box sx={{
        width: {
          md: `calc(100% - ${drawerWidth}px)`,
        },
        ml: {
          md: `${drawerWidth}px`,
        },
        mt: 6, maxWidth: 1100, mx: "auto"
      }}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Add Doctor
        </Typography>

        <Typography color="text.secondary" sx={{ mb: 3 }}>
          Register a new doctor in your clinic.
        </Typography>

        <Paper
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          elevation={0}
          sx={{
            p: { xs: 2, md: 4 },
            borderRadius: 3,
            border: "1px solid #e2e8f0",
          }}
        >
          {serverError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {serverError}
            </Alert>
          )}

          {successMessage && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {successMessage}
            </Alert>
          )}

          {/* Personal Information */}
          <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
            Personal Information
          </Typography>

          <Grid container spacing={2.5}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="First Name"
                {...register("firstName")}
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Last Name"
                {...register("lastName")}
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Email Address"
                type="email"
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Phone Number"
                {...register("phone")}
                error={!!errors.phone}
                helperText={errors.phone?.message}
                inputProps={{ maxLength: 10, inputMode: "numeric" }}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth error={!!errors.gender}>
                <InputLabel>Gender</InputLabel>
                <Select
                  label="Gender"
                  defaultValue=""
                  {...register("gender")}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
                <FormHelperText>
                  {errors.gender?.message}
                </FormHelperText>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Medical License Number"
                {...register("licenseNumber")}
                error={!!errors.licenseNumber}
                helperText={errors.licenseNumber?.message}
              />
            </Grid>
          </Grid>

          <Divider sx={{ my: 4 }} />

          {/* Professional Information */}
          <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
            Professional Information
          </Typography>

          <Grid container spacing={2.5}>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth error={!!errors.specialization}>
                <InputLabel>Specialization</InputLabel>
                <Select
                  label="Specialization"
                  defaultValue=""
                  {...register("specialization")}
                >
                  {specializations.map((item) => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  {errors.specialization?.message}
                </FormHelperText>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth error={!!errors.department}>
                <InputLabel>Department</InputLabel>
                <Select
                  label="Department"
                  defaultValue=""
                  {...register("department")}
                >
                  {departments.map((item) => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  {errors.department?.message}
                </FormHelperText>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Qualification"
                placeholder="e.g. MBBS, MD"
                {...register("qualification")}
                error={!!errors.qualification}
                helperText={errors.qualification?.message}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Experience (years)"
                type="number"
                {...register("experience")}
                error={!!errors.experience}
                helperText={errors.experience?.message}
                slotProps={{ htmlInput: { min: 0, max: 70 } }}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Consultation Fee (₹)"
                type="number"
                {...register("consultationFee")}
                error={!!errors.consultationFee}
                helperText={errors.consultationFee?.message}
                slotProps={{ htmlInput: { min: 1 } }}
              />
            </Grid>
          </Grid>

          <Divider sx={{ my: 4 }} />

          {/* Availability */}
          <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
            Availability
          </Typography>

          <Typography variant="body2" sx={{ mb: 1 }}>
            Select available days
          </Typography>

          <Grid container spacing={1} sx={{ mb: 1 }}>
            {days.map((day) => (
              <Grid key={day} size={{ xs: 6, sm: 4, md: 3 }}>
                <Button
                  fullWidth
                  variant={
                    selectedDays.includes(day) ? "contained" : "outlined"
                  }
                  onClick={() => handleDayChange(day)}
                  type="button"
                  sx={{ textTransform: "none" }}
                >
                  {day}
                </Button>
              </Grid>
            ))}
          </Grid>

          {errors.availableDays && (
            <Typography color="error" variant="caption">
              {errors.availableDays.message}
            </Typography>
          )}

          <Grid container spacing={2.5} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Start Time"
                type="time"
                {...register("startTime")}
                error={!!errors.startTime}
                helperText={errors.startTime?.message}
                slotProps={{ inputLabel: { shrink: true } }}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="End Time"
                type="time"
                {...register("endTime")}
                error={!!errors.endTime}
                helperText={errors.endTime?.message}
                slotProps={{ inputLabel: { shrink: true } }}
              />
            </Grid>
          </Grid>

          <Divider sx={{ my: 4 }} />

          {/* Contact Information */}
          <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
            Contact Information
          </Typography>

          <Grid container spacing={2.5}>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Clinic / Office Address"
                multiline
                minRows={2}
                {...register("address")}
                error={!!errors.address}
                helperText={errors.address?.message}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Doctor Bio (Optional)"
                multiline
                minRows={3}
                {...register("bio")}
                helperText="Brief introduction or professional background"
              />
            </Grid>
          </Grid>

          <Divider sx={{ my: 4 }} />

          <Box
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "flex-end",
              flexWrap: "wrap",
            }}
          >
            <Button
              variant="outlined"
              color="inherit"
              startIcon={<RestartAltIcon />}
              onClick={handleReset}
              type="button"
              disabled={isSubmitting}
            >
              Reset
            </Button>

            <Button
              variant="contained"
              startIcon={
                isSubmitting ? null : <SaveIcon />
              }
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Add Doctor"
              )}
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default AddDoctor;