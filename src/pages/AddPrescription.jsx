
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Paper,
  Typography,
  TextField,
  MenuItem,
  Stack,
  Grid,
  IconButton,
  Alert,
  Divider,
} from "@mui/material";

import { useForm, useFieldArray, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

import Header from "../componets/Header";
import Sidebar from "../componets/Sidebar";

const API_URL = "http://localhost:2300/api";

const prescriptionSchema = z.object({
  patientId: z.string().min(1, "Please select patient"),
  doctorId: z.string().min(1, "Please select doctor"),
  diagnosis: z.string().min(1, "Diagnosis is required"),
  prescriptionDate: z.string().min(1, "Date is required"),

  medicines: z.array(
    z.object({
      medicineName: z.string().min(1, "Medicine name is required"),
      dosage: z.string().min(1, "Dosage is required"),
      frequency: z.string().min(1, "Frequency is required"),
      duration: z.string().min(1, "Duration is required"),
      instructions: z.string().optional(),
    })
  ).min(1, "At least one medicine is required"),

  notes: z.string().optional(),
});

const defaultValues = {
  patientId: "",
  doctorId: "",
  diagnosis: "",
  prescriptionDate: new Date().toISOString().split("T")[0],
  medicines: [
    {
      medicineName: "",
      dosage: "",
      frequency: "",
      duration: "",
      instructions: "",
    },
  ],
  notes: "",
};

function AddPrescription() {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(prescriptionSchema),
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "medicines",
  });

  // Fetch patients and doctors
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [patientResponse, doctorResponse] = await Promise.all([
          fetch(`${API_URL}/patients`),
          fetch(`${API_URL}/doctors`),
        ]);

        if (!patientResponse.ok || !doctorResponse.ok) {
          throw new Error("Failed to fetch data");
        }

        const patientResult = await patientResponse.json();
        const doctorResult = await doctorResponse.json();

        setPatients(patientResult.patients || []);
        setDoctors(doctorResult.doctors || []);
      } catch (error) {
        setMessage(error.message);
      }
    };

    fetchData();
  }, []);

  // Submit prescription
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setMessage("");

      const response = await fetch(`${API_URL}/add-prescription`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to add prescription");
      }

      setMessage("Prescription added successfully!");
      reset(defaultValues);

    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: "flex", bgcolor: "#f8fafc", minHeight: "100vh" }}>
      <Header />
      <Sidebar />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          mt: 8,
          overflow: "hidden",
        }}
      >
        <Container maxWidth="lg">
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
            mb={3}
          >
            <Box>
              <Typography variant="h5" fontWeight={700}>
                Add Prescription
              </Typography>
              <Typography color="text.secondary" variant="body2">
                Create a new patient prescription
              </Typography>
            </Box>
          </Stack>

          {message && (
            <Alert
              severity={
                message.toLowerCase().includes("success")
                  ? "success"
                  : "error"
              }
              sx={{ mb: 3 }}
            >
              {message}
            </Alert>
          )}

          <Paper elevation={0} sx={{ p: { xs: 2, md: 3 }, borderRadius: 3 }}>
            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
              <Typography variant="h6" fontWeight={600} mb={2}>
                Patient & Doctor Details
              </Typography>

              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Controller
                    name="patientId"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        select
                        fullWidth
                        label="Select Patient"
                        error={!!errors.patientId}
                        helperText={errors.patientId?.message}
                      >
                        {patients.map((patient) => (
                          <MenuItem
                            key={patient._id}
                            value={String(patient._id)}
                          >
                            {patient?.firstName}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <Controller
                    name="doctorId"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        select
                        fullWidth
                        label="Select Doctor"
                        error={!!errors.doctorId}
                        helperText={errors.doctorId?.message}
                      >
                        {doctors.map((doctor) => (
                          <MenuItem
                            key={doctor._id}
                            value={String(doctor._id)}
                          >
                            {doctor?.firstName}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    {...register("diagnosis")}
                    fullWidth
                    label="Diagnosis"
                    placeholder="Enter diagnosis"
                    error={!!errors.diagnosis}
                    helperText={errors.diagnosis?.message}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    {...register("prescriptionDate")}
                    fullWidth
                    type="date"
                    label="Prescription Date"
                    InputLabelProps={{ shrink: true }}
                    error={!!errors.prescriptionDate}
                    helperText={errors.prescriptionDate?.message}
                  />
                </Grid>
              </Grid>

              <Divider sx={{ my: 3 }} />

              <Stack
                direction={{ xs: "column", sm: "row" }}
                justifyContent="space-between"
                alignItems="center"
                spacing={2}
                mb={2}
              >
                <Typography variant="h6" fontWeight={600}>
                  Medicine Details
                </Typography>

                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={() =>
                    append({
                      medicineName: "",
                      dosage: "",
                      frequency: "",
                      duration: "",
                      instructions: "",
                    })
                  }
                >
                  Add Medicine
                </Button>
              </Stack>

              {fields.map((item, index) => (
                <Paper
                  key={item.id}
                  variant="outlined"
                  sx={{ p: 2, mb: 2, borderRadius: 2 }}
                >
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={2}
                  >
                    <Typography fontWeight={600}>
                      Medicine {index + 1}
                    </Typography>

                    {fields.length > 1 && (
                      <IconButton
                        color="error"
                        onClick={() => remove(index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    )}
                  </Stack>

                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <TextField
                        {...register(
                          `medicines.${index}.medicineName`
                        )}
                        fullWidth
                        label="Medicine Name"
                        error={
                          !!errors.medicines?.[index]?.medicineName
                        }
                        helperText={
                          errors.medicines?.[index]?.medicineName?.message
                        }
                      />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                      <TextField
                        {...register(`medicines.${index}.dosage`)}
                        fullWidth
                        label="Dosage"
                        placeholder="e.g. 500 mg"
                        error={!!errors.medicines?.[index]?.dosage}
                        helperText={
                          errors.medicines?.[index]?.dosage?.message
                        }
                      />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                      <TextField
                        {...register(`medicines.${index}.frequency`)}
                        select
                        fullWidth
                        label="Frequency"
                        defaultValue=""
                        error={!!errors.medicines?.[index]?.frequency}
                        helperText={
                          errors.medicines?.[index]?.frequency?.message
                        }
                      >
                        <MenuItem value="Once a day">Once a day</MenuItem>
                        <MenuItem value="Twice a day">Twice a day</MenuItem>
                        <MenuItem value="Thrice a day">Thrice a day</MenuItem>
                        <MenuItem value="As needed">As needed</MenuItem>
                      </TextField>
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                      <TextField
                        {...register(`medicines.${index}.duration`)}
                        fullWidth
                        label="Duration"
                        placeholder="e.g. 5 days"
                        error={!!errors.medicines?.[index]?.duration}
                        helperText={
                          errors.medicines?.[index]?.duration?.message
                        }
                      />
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                      <TextField
                        {...register(
                          `medicines.${index}.instructions`
                        )}
                        fullWidth
                        label="Medicine Instructions"
                        placeholder="e.g. Take after food"
                      />
                    </Grid>
                  </Grid>
                </Paper>
              ))}

              {errors.medicines?.message && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {errors.medicines.message}
                </Alert>
              )}

              <Divider sx={{ my: 3 }} />

              <Typography variant="h6" fontWeight={600} mb={2}>
                Additional Notes
              </Typography>

              <TextField
                {...register("notes")}
                fullWidth
                multiline
                rows={3}
                label="Notes"
                placeholder="Enter additional instructions..."
              />

              <Stack
                direction={{ xs: "column", sm: "row" }}
                justifyContent="flex-end"
                alignItems="center"
                spacing={2}
                mt={3}
              >
                <Button
                  variant="outlined"
                  color="inherit"
                  onClick={() => reset(defaultValues)}
                >
                  Reset
                </Button>

                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save Prescription"}
                </Button>
              </Stack>
            </Box>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
}

export default AddPrescription;

