
import { useState } from "react";

import {
    AppBar,
    Avatar,
    Badge,
    Box,
    Card,
    CardContent,
    CssBaseline,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
    Grid,
    Paper,
    Chip,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Menu,
    MenuItem,
} from "@mui/material";

import {
    Dashboard as DashboardIcon,
    People,
    MedicalServices,
    CalendarMonth,
    Medication,
    Assessment,
    Settings,
    Logout,
    Notifications,
    Search,
    MoreVert,
    TrendingUp,
    EventAvailable,
    LocalHospital,
    PersonAdd,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router";
import Sidebar from "../componets/Sidebar";
import Header from "../componets/Header";

const drawerWidth = 250;


const appointments = [
    {
        patient: "Rahul Sharma",
        doctor: "Dr. Amit Verma",
        time: "09:30 AM",
        type: "General",
        status: "Confirmed",
    },
    {
        patient: "Priya Singh",
        doctor: "Dr. Neha Patel",
        time: "10:30 AM",
        type: "Dental",
        status: "Pending",
    },
    {
        patient: "Aman Gupta",
        doctor: "Dr. Raj Mehta",
        time: "12:00 PM",
        type: "Cardiology",
        status: "Confirmed",
    },
    {
        patient: "Sneha Jain",
        doctor: "Dr. Kavita Sharma",
        time: "02:30 PM",
        type: "General",
        status: "Cancelled",
    },
];

function Dashboard() {
    const navitage =useNavigate()
   

    

    return (
        <Box sx={{ display: "flex", bgcolor: "#f8fafc", minHeight: "100vh" }}>
            <CssBaseline />

            {/* Navbar */}
            <Header/>

            {/* Sidebar */}
           <Sidebar/>

            {/* Main Content */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: {
                        xs: 2,
                        md: 4,
                    },
                    mt: 8,
                    overflow: "hidden",
                }}
            >
                {/* Welcome */}
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h4" fontWeight={700}>
                        Good Morning, Admin 👋
                    </Typography>

                    <Typography color="text.secondary" sx={{ mt: 0.5 }}>
                        Here's what's happening in your clinic today.
                    </Typography>
                </Box>

                {/* Statistics */}
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                        <StatCard
                            title="Total Patients"
                            value="2,450"
                            change="+12.5%"
                            icon={<People />}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                        <StatCard
                            title="Total Doctors"
                            value="48"
                            change="+4.2%"
                            icon={<MedicalServices />}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                        <StatCard
                            title="Appointments"
                            value="186"
                            change="+8.7%"
                            icon={<CalendarMonth />}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                        <StatCard
                            title="Revenue"
                            value="₹2.45L"
                            change="+15.4%"
                            icon={<TrendingUp />}
                        />
                    </Grid>
                </Grid>

                {/* Charts + Quick Actions */}
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    <Grid size={{ xs: 12, lg: 8 }}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 3,
                                borderRadius: 3,
                                border: "1px solid #e5e7eb",
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    mb: 3,
                                }}
                            >
                                <Box>
                                    <Typography variant="h6" fontWeight={700}>
                                        Patient Overview
                                    </Typography>

                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        Patient visits during this week
                                    </Typography>
                                </Box>

                                <IconButton>
                                    <MoreVert />
                                </IconButton>
                            </Box>

                            {/* Simple Chart */}
                            <Box
                                sx={{
                                    height: 260,
                                    display: "flex",
                                    alignItems: "end",
                                    gap: {
                                        xs: 1,
                                        sm: 2,
                                    },
                                    px: 2,
                                }}
                            >
                                {[55, 75, 48, 90, 68, 82, 60].map(
                                    (height, index) => (
                                        <Box
                                            key={index}
                                            sx={{
                                                flex: 1,
                                                height: `${height}%`,
                                                bgcolor: "#2563eb",
                                                borderRadius: "8px 8px 0 0",
                                                minWidth: 20,
                                                opacity: 0.9,
                                                transition: "0.3s",

                                                "&:hover": {
                                                    opacity: 1,
                                                    transform: "translateY(-5px)",
                                                },
                                            }}
                                        />
                                    )
                                )}
                            </Box>

                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-around",
                                    mt: 1,
                                }}
                            >
                                {[
                                    "Mon",
                                    "Tue",
                                    "Wed",
                                    "Thu",
                                    "Fri",
                                    "Sat",
                                    "Sun",
                                ].map((day) => (
                                    <Typography
                                        key={day}
                                        variant="caption"
                                        color="text.secondary"
                                    >
                                        {day}
                                    </Typography>
                                ))}
                            </Box>
                        </Paper>
                    </Grid>

                    <Grid size={{ xs: 12, lg: 4 }}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 3,
                                borderRadius: 3,
                                border: "1px solid #e5e7eb",
                                height: "100%",
                            }}
                        >
                            <Typography variant="h6" fontWeight={700}>
                                Quick Actions
                            </Typography>

                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ mb: 3 }}
                            >
                                Frequently used actions
                            </Typography>

                            <QuickAction
                                icon={<PersonAdd />}
                                title="Add Patient"
                                route='addPatient'
                            />

                            <QuickAction
                                icon={<EventAvailable />}
                                title="Book Appointment"
                            />

                            <QuickAction
                                icon={<MedicalServices />}
                                title="Add Doctor"
                            />

                            <QuickAction
                                icon={<Medication />}
                                title="Create Prescription"
                            />
                        </Paper>
                    </Grid>
                </Grid>

                {/* Appointments */}
                <Paper
                    elevation={0}
                    sx={{
                        borderRadius: 3,
                        border: "1px solid #e5e7eb",
                        overflow: "hidden",
                    }}
                >
                    <Box
                        sx={{
                            p: 3,
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <Box>
                            <Typography variant="h6" fontWeight={700}>
                                Today's Appointments
                            </Typography>

                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                Upcoming patient appointments
                            </Typography>
                        </Box>

                        <Typography
                            sx={{
                                color: "#2563eb",
                                cursor: "pointer",
                                fontWeight: 600,
                            }}
                        >
                            View All
                        </Typography>
                    </Box>

                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow sx={{ bgcolor: "#f8fafc" }}>
                                    <TableCell>
                                        <b>Patient</b>
                                    </TableCell>

                                    <TableCell>
                                        <b>Doctor</b>
                                    </TableCell>

                                    <TableCell>
                                        <b>Time</b>
                                    </TableCell>

                                    <TableCell>
                                        <b>Type</b>
                                    </TableCell>

                                    <TableCell>
                                        <b>Status</b>
                                    </TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {appointments.map((appointment) => (
                                    <TableRow key={appointment.patient}>
                                        <TableCell>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: 1.5,
                                                }}
                                            >
                                                <Avatar
                                                    sx={{
                                                        width: 34,
                                                        height: 34,
                                                        bgcolor: "#dbeafe",
                                                        color: "#2563eb",
                                                        fontSize: 14,
                                                    }}
                                                >
                                                    {appointment.patient.charAt(0)}
                                                </Avatar>

                                                {appointment.patient}
                                            </Box>
                                        </TableCell>

                                        <TableCell>{appointment.doctor}</TableCell>

                                        <TableCell>{appointment.time}</TableCell>

                                        <TableCell>{appointment.type}</TableCell>

                                        <TableCell>
                                            <Chip
                                                label={appointment.status}
                                                size="small"
                                                color={
                                                    appointment.status === "Confirmed"
                                                        ? "success"
                                                        : appointment.status === "Pending"
                                                            ? "warning"
                                                            : "error"
                                                }
                                                variant="outlined"
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Box>
        </Box>
    );
}

/* Statistic Card */
function StatCard({ title, value, change, icon }) {
    return (
        <Card
            elevation={0}
            sx={{
                borderRadius: 3,
                border: "1px solid #e5e7eb",
            }}
        >
            <CardContent>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 2,
                    }}
                >
                    <Typography color="text.secondary">
                        {title}
                    </Typography>

                    <Box
                        sx={{
                            width: 42,
                            height: 42,
                            borderRadius: 2,
                            bgcolor: "#eff6ff",
                            color: "#2563eb",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        {icon}
                    </Box>
                </Box>

                <Typography variant="h4" fontWeight={700}>
                    {value}
                </Typography>

                <Typography
                    variant="body2"
                    sx={{
                        color: "#16a34a",
                        mt: 1,
                        fontWeight: 600,
                    }}
                >
                    {change} from last month
                </Typography>
            </CardContent>
        </Card>
    );
}

/* Quick Action */
function QuickAction({ icon, title, route }) {
    return (
        <Link style={{ textDecoration: 'none' }} to={route}>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    p: 1.5,
                    mb: 1.5,
                    borderRadius: 2,
                    cursor: "pointer",
                    transition: "0.2s",

                    "&:hover": {
                        bgcolor: "#f1f5f9",
                    },
                }}
            >
                <Box
                    sx={{
                        width: 42,
                        height: 42,
                        borderRadius: 2,
                        bgcolor: "#eff6ff",
                        color: "#2563eb",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    {icon}
                </Box>

                <Typography fontWeight={600}>{title}</Typography>
            </Box>
        </Link>

    );
}

export default Dashboard;
