import { useEffect, useState } from "react";
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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Chip,
} from "@mui/material";

import Grid from "@mui/material/Grid";
import AddIcon from "@mui/icons-material/Add";
import EventNoteIcon from "@mui/icons-material/EventNote";

import Header from "../componets/Header";
import Sidebar from "../componets/Sidebar";

const API_URL = "http://localhost:2300/api";

const Appointmentchema = z.object({
  patientId: z.string().min(1, "Please select a patient"),
  doctorId: z.string().min(1, "Please select a doctor"),
  date: z.string().min(1, "Appointment date is required"),
  time: z.string().min(1, "Appointment time is required"),
  type: z.string().min(1, "Please select appointment type"),
  reason: z.string().trim().min(3, "Please enter a reason"),
});

const defaultValues = {
  patientId: "",
  doctorId: "",
  date: "",
  time: "",
  type: "",
  reason: "",
};

const getFullName = (person) =>
  [person?.firstName, person?.lastName].filter(Boolean).join(" ") ||
  "Unknown";

const getRecordId = (record) => record?._id || record?.id || "";

function Appointment() {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [Appointment, setAppointment] = useState([]);

  const [loading, setLoading] = useState(true);
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(Appointmentchema),
    defaultValues,
  });

  const fetchAppointment = async () => {
    const response = await fetch(`${API_URL}/appointment`);

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to load Appointment");
    }

    setAppointment(
      Array.isArray(result)
        ? result
        : result.appointments || []
    );
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        setServerError("");

        const [patientResponse, doctorResponse] = await Promise.all([
          fetch(`${API_URL}/patients`),
          fetch(`${API_URL}/doctors`),
        ]);

        const patientResult = await patientResponse.json();
        const doctorResult = await doctorResponse.json();

        if (!patientResponse.ok) {
          throw new Error(
            patientResult.message || "Failed to load patients"
          );
        }

        if (!doctorResponse.ok) {
          throw new Error(
            doctorResult.message || "Failed to load doctors"
          );
        }

        setPatients(
          Array.isArray(patientResult)
            ? patientResult
            : patientResult.patients || []
        );

        setDoctors(
          Array.isArray(doctorResult)
            ? doctorResult
            : doctorResult.doctors || []
        );

        await fetchAppointment();
      } catch (error) {
        setServerError(error.message || "Failed to load page data");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const onSubmit = async (data) => {
    try {
      setServerError("");
      setSuccessMessage("");

      const response = await fetch(`${API_URL}/appointment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to book appointment");
      }

      reset(defaultValues);
      await fetchAppointment();

      setSuccessMessage("Appointment booked successfully!");
    } catch (error) {
      setServerError(
        error.message || "Something went wrong while booking."
      );
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        bgcolor: "#f8fafc",
        minHeight: "100vh",
      }}
    >
      {/* Navbar */}
      <Header />

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minWidth: 0,
          p: { xs: 2, md: 4 },
          mt: 6,
          overflow: "hidden",
        }}
      >
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" fontWeight={700}>
            Appointment
          </Typography>

          <Typography color="text.secondary" sx={{ mt: 1 }}>
            Schedule and manage clinic Appointment.
          </Typography>
        </Box>

        {serverError && (
          <Alert
            severity="error"
            sx={{ mb: 3 }}
            onClose={() => setServerError("")}
          >
            {serverError}
          </Alert>
        )}

        {successMessage && (
          <Alert
            severity="success"
            sx={{ mb: 3 }}
            onClose={() => setSuccessMessage("")}
          >
            {successMessage}
          </Alert>
        )}

        {/* Add Appointment Form */}
        <Paper
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          elevation={0}
          sx={{
            p: { xs: 2, md: 3 },
            border: "1px solid #e5e7eb",
            borderRadius: 3,
            mb: 4,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
            <EventNoteIcon color="primary" />

            <Typography variant="h6" fontWeight={700}>
              Book New Appointment
            </Typography>
          </Box>

          <Typography color="text.secondary" variant="body2" sx={{ mb: 3 }}>
            Select a registered patient and doctor to schedule a visit.
          </Typography>

          <Divider sx={{ mb: 3 }} />

          <Grid container spacing={2.5}>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth error={!!errors.patientId}>
                <InputLabel id="patient-label">Patient</InputLabel>

                <Select
                  labelId="patient-label"
                  label="Patient"
                  defaultValue=""
                  {...register("patientId")}
                >
                  {patients.map((patient) => (
                    <MenuItem
                      key={getRecordId(patient)}
                      value={getRecordId(patient)}
                    >
                      {getFullName(patient)}
                    </MenuItem>
                  ))}
                </Select>

                <FormHelperText>
                  {errors.patientId?.message}
                  {!patients.length && !loading
                    ? "No patients found. Add a patient first."
                    : ""}
                </FormHelperText>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth error={!!errors.doctorId}>
                <InputLabel id="doctor-label">Doctor</InputLabel>

                <Select
                  labelId="doctor-label"
                  label="Doctor"
                  defaultValue=""
                  {...register("doctorId")}
                >
                  {doctors.map((doctor) => (
                    <MenuItem
                      key={getRecordId(doctor)}
                      value={getRecordId(doctor)}
                    >
                      Dr. {getFullName(doctor)} — {doctor.specialization}
                    </MenuItem>
                  ))}
                </Select>

                <FormHelperText>
                  {errors.doctorId?.message}
                  {!doctors.length && !loading
                    ? "No doctors found. Add a doctor first."
                    : ""}
                </FormHelperText>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Appointment Date"
                type="date"
                slotProps={{ inputLabel: { shrink: true } }}
                {...register("date")}
                error={!!errors.date}
                helperText={errors.date?.message}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Appointment Time"
                type="time"
                slotProps={{ inputLabel: { shrink: true } }}
                {...register("time")}
                error={!!errors.time}
                helperText={errors.time?.message}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth error={!!errors.type}>
                <InputLabel id="type-label">Appointment Type</InputLabel>

                <Select
                  labelId="type-label"
                  label="Appointment Type"
                  defaultValue=""
                  {...register("type")}
                >
                  <MenuItem value="General">General Consultation</MenuItem>
                  <MenuItem value="Follow-up">Follow-up</MenuItem>
                  <MenuItem value="Emergency">Emergency</MenuItem>
                  <MenuItem value="Specialist">Specialist Consultation</MenuItem>
                </Select>

                <FormHelperText>{errors.type?.message}</FormHelperText>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Reason for Appointment"
                placeholder="Describe the reason for the visit"
                multiline
                minRows={3}
                {...register("reason")}
                error={!!errors.reason}
                helperText={errors.reason?.message}
              />
            </Grid>
          </Grid>

          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
            <Button
              type="submit"
              variant="contained"
              startIcon={
                isSubmitting ? null : <AddIcon />
              }
              disabled={
                isSubmitting ||
                loading ||
                !patients.length ||
                !doctors.length
              }
              sx={{ minWidth: 180, textTransform: "none" }}
            >
              {isSubmitting ? (
                <CircularProgress size={23} color="inherit" />
              ) : (
                "Book Appointment"
              )}
            </Button>
          </Box>
        </Paper>

        {/* Appointment Table */}
        <Paper
          elevation={0}
          sx={{
            border: "1px solid #e5e7eb",
            borderRadius: 3,
            overflow: "hidden",
          }}
        >
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight={700}>
              All Appointment
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Recently scheduled Appointment
            </Typography>
          </Box>

          <Divider />

          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", p: 5 }}>
              <CircularProgress />
            </Box>
          ) : (
            <TableContainer sx={{ overflowX: "auto" }}>
              <Table sx={{ minWidth: 750 }}>
                <TableHead>
                  <TableRow sx={{ bgcolor: "#f8fafc" }}>
                    <TableCell><b>Patient</b></TableCell>
                    <TableCell><b>Doctor</b></TableCell>
                    <TableCell><b>Date</b></TableCell>
                    <TableCell><b>Time</b></TableCell>
                    <TableCell><b>Type</b></TableCell>
                    <TableCell><b>Status</b></TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {Appointment.map((appointment) => {
                    const patient =
                      appointment.patient &&
                      typeof appointment.patient === "object"
                        ? appointment.patient
                        : patients.find(
                            (item) =>
                              getRecordId(item) ===
                              (appointment.patientId ||
                                appointment.patient)
                          );

                    const doctor =
                      appointment.doctor &&
                      typeof appointment.doctor === "object"
                        ? appointment.doctor
                        : doctors.find(
                            (item) =>
                              getRecordId(item) ===
                              (appointment.doctorId ||
                                appointment.doctor)
                          );

                    return (
                      <TableRow key={getRecordId(appointment)} hover>
                        <TableCell>{getFullName(patient)}</TableCell>
                        <TableCell>
                          {doctor ? `Dr. ${getFullName(doctor)}` : "Unknown"}
                        </TableCell>
                        <TableCell>
                          {appointment.date
                            ? appointment.date.slice(0, 10)
                            : "—"}
                        </TableCell>
                        <TableCell>{appointment.time || "—"}</TableCell>
                        <TableCell>{appointment.type || "—"}</TableCell>
                        <TableCell>
                          <Chip
                            label={appointment.status || "Scheduled"}
                            color={
                              appointment.status === "Cancelled"
                                ? "error"
                                : appointment.status === "Completed"
                                  ? "success"
                                  : "primary"
                            }
                            size="small"
                            variant="outlined"
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}

                  {!Appointment.length && (
                    <TableRow>
                      <TableCell colSpan={6} align="center" sx={{ py: 5 }}>
                        No Appointment found. Book your first appointment above.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Paper>
      </Box>
    </Box>
  );
}

export default Appointment;