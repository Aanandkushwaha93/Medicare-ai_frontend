
import { useState } from "react";

import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  InputAdornment,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

import {
  Search,
  Add,
  Visibility,
  Print,
} from "@mui/icons-material";
import Header from "../componets/Header";
import Sidebar from "../componets/Sidebar";
import { useNavigate } from "react-router";

const prescriptionsData = [
  {
    id: "RX-1001",
    patient: "Rahul Sharma",
    doctor: "Dr. Amit Verma",
    date: "28 Oct 2026",
    status: "Issued",
  },
  {
    id: "RX-1002",
    patient: "Priya Verma",
    doctor: "Dr. Neha Jain",
    date: "28 Oct 2026",
    status: "Draft",
  },
  {
    id: "RX-1003",
    patient: "Aman Patel",
    doctor: "Dr. Amit Verma",
    date: "27 Oct 2026",
    status: "Issued",
  },
];

export default function Prescription() {
  const navigate = useNavigate()
  const [search, setSearch] = useState("");

  const filteredPrescriptions = prescriptionsData.filter(
    (item) =>
      item.patient.toLowerCase().includes(search.toLowerCase()) ||
      item.id.toLowerCase().includes(search.toLowerCase())
  );

  const handlePrint = () => {
    window.print();
  };
  const drawerWidth = 300;
  return (
    <Box sx={{
      p: { xs: 2, md: 3 }, width: {
        md: `calc(100% - ${drawerWidth}px)`,
      },
      ml: {
        md: `${250}px`,
      },
       mt: 6
    }}>
      {/* Navbar */}
      <Header />

      {/* Sidebar */}
      <Sidebar />

   
<Stack
  direction={{ xs: "column", sm: "row" }}
  justifyContent="space-between"
  alignItems={{ xs: "center", sm: "center" }}
  spacing={2}
  width="100%"
  mb={3}
>
  <Box sx={{ flex: 1 }}>
    <Typography variant="h4" fontWeight={700}>
      Prescriptions
    </Typography>

    <Typography color="text.secondary" mt={0.5}>
      Manage patient prescriptions
    </Typography>
  </Box>

  <Button
    variant="contained"
    startIcon={<Add />}
    onClick={() => navigate("/addprescription")}
    sx={{
      minWidth: 170,
      whiteSpace: "nowrap",
      flexShrink: 0,
    }}
  >
    Add Prescription
  </Button>
</Stack>

      {/* Summary Cards */}
      <Grid container spacing={2} mb={3}>
        {[
          {
            title: "Total Prescriptions",
            value: prescriptionsData.length,
          },
          {
            title: "Issued",
            value: prescriptionsData.filter(
              (item) => item.status === "Issued"
            ).length,
          },
          {
            title: "Drafts",
            value: prescriptionsData.filter(
              (item) => item.status === "Draft"
            ).length,
          },
        ].map((card) => (
          <Grid size={{ xs: 12, sm: 4 }} key={card.title}>
            <Card variant="outlined">
              <CardContent>
                <Typography color="text.secondary">
                  {card.title}
                </Typography>
                <Typography variant="h4" fontWeight={700} mt={1}>
                  {card.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Search */}
      <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Search by patient name or prescription ID"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            },
          }}
        />
      </Paper>

      {/* Prescriptions Table */}
      <TableContainer component={Paper} variant="outlined">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Prescription ID</TableCell>
              <TableCell>Patient</TableCell>
              <TableCell>Doctor</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredPrescriptions.length > 0 ? (
              filteredPrescriptions.map((item) => (
                <TableRow key={item.id} hover>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.patient}</TableCell>
                  <TableCell>{item.doctor}</TableCell>
                  <TableCell>{item.date}</TableCell>
                  <TableCell>
                    <Chip
                      size="small"
                      label={item.status}
                      color={
                        item.status === "Issued"
                          ? "success"
                          : "warning"
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <Button
                        size="small"
                        onClick={() =>
                          alert(`View ${item.id}`)
                        }
                        startIcon={<Visibility />}
                      >
                        View
                      </Button>

                      <Button
                        size="small"
                        onClick={handlePrint}
                        startIcon={<Print />}
                      >
                        Print
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No prescriptions found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
