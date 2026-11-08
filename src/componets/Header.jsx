import React, { useState } from 'react'

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
const drawerWidth = 250;

function Header() {
    const [anchorEl, setAnchorEl] = useState(null);
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <AppBar
            position="fixed"
            elevation={0}
            sx={{
                width: {
                    md: `calc(100% - ${drawerWidth}px)`,
                },
                ml: {
                    md: `${drawerWidth}px`,
                },
                bgcolor: "white",
                color: "#111827",
                borderBottom: "1px solid #e5e7eb",
            }}
        >
            <Toolbar sx={{ justifyContent: "space-between" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography
                        variant="h6"
                        fontWeight={700}
                        sx={{
                            display: {
                                xs: "block",
                                md: "none",
                            },
                        }}
                    >
                        MediCare
                    </Typography>

                    <Typography
                        variant="h6"
                        fontWeight={700}
                        sx={{
                            display: {
                                xs: "none",
                                md: "block",
                            },
                        }}
                    >
                        Dashboard
                    </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <IconButton>
                        <Search />
                    </IconButton>

                    <IconButton>
                        <Badge badgeContent={4} color="error">
                            <Notifications />
                        </Badge>
                    </IconButton>

                    <IconButton onClick={handleMenu}>
                        <Avatar
                            sx={{
                                width: 38,
                                height: 38,
                                bgcolor: "#2563eb",
                            }}
                        >
                            A
                        </Avatar>
                    </IconButton>

                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                        <MenuItem onClick={handleClose}>Settings</MenuItem>
                        <MenuItem onClick={handleClose}>Logout</MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Header