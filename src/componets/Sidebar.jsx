import { Box, Divider, Drawer, List, ListItemButton, Typography } from '@mui/material'
import React, { useState } from 'react'
import {
    Dashboard as DashboardIcon,
    People,
    MedicalServices,
    CalendarMonth,
    Medication,
    Assessment,
    Settings,
    Logout,

} from "@mui/icons-material";
import { Link, useLocation } from "react-router";
import {
   
    ListItemIcon,
    ListItemText,
  
} from "@mui/material";


const drawerWidth = 250;


function Sidebar() {
        const [mobileOpen, setMobileOpen] = useState(false);
    const location = useLocation();
       const menuItems = [
    {
        name: "Dashboard",
        icon: <DashboardIcon />,
        link:'/dashboard',
    },
    {
        name: "Patients",
        icon: <People />,
        link:'/addPatient',
    },
    {
        name: "Doctors",
        icon: <MedicalServices />,
        link:'/addDoctor',

    },
    {
        name: "Appointments",
        icon: <CalendarMonth />,
        link:'/appointment',
    },
    {
        name: "Prescriptions",
        icon: <Medication />,
        link:'/prescription',
    },
    {
        name: "Reports",
        icon: <Assessment />,
    },
];

        const drawer = (
            <Box sx={{ height: "100%", bgcolor: "#111827", color: "white" }}>
                {/* Logo */}
                <Box
                    sx={{
                        height: 70,
                        display: "flex",
                        alignItems: "center",
                        px: 3,
                        gap: 1.5,
                    }}
                >
                    <Box
                        sx={{
                            width: 38,
                            height: 38,
                            borderRadius: 2,
                            bgcolor: "#ffffff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        {/* <LocalHospital /> */}
                        <img src='/meidacare-ai-favicon.png' style={{width:'34px'}}/>
                    </Box>
    
                    <Typography
                        variant="h6"
                        fontWeight={700}
                        sx={{ letterSpacing: 0.5 }}
                    >
                        MediCare
                    </Typography>
                </Box>
    
                <Divider sx={{ borderColor: "#374151" }} />
    
                {/* Main Menu */}
                <Box sx={{ px: 1.5, py: 2 }}>
                    <Typography
                        variant="caption"
                        sx={{
                            color: "#9ca3af",
                            px: 1.5,
                            textTransform: "uppercase",
                        }}
                    >
                        Main Menu
                    </Typography>
    
                   <List>
  {menuItems.map((item) => (
    <ListItemButton
      key={item.name}
      component={Link}
      to={item.link}
      selected={location.pathname === item.link}
      sx={{
        borderRadius: 2,
        mb: 0.5,
        color: "#d1d5db",

        "&.Mui-selected": {
          bgcolor: "#2563eb",
          color: "#ffffff",

          "&:hover": {
            bgcolor: "#1d4ed8",
          },
        },

        "&:hover": {
          bgcolor: "#1f2937",
        },
      }}
    >
      <ListItemIcon
        sx={{
          color: "inherit",
          minWidth: 40,
        }}
      >
        {item.icon}
      </ListItemIcon>

      <ListItemText primary={item.name} />
    </ListItemButton>
  ))}
</List>
                </Box>
    
                <Divider sx={{ borderColor: "#374151" }} />
    
                {/* Bottom Menu */}
                <Box sx={{ px: 1.5, py: 2 }}>
                    <List>
                        <ListItemButton
                            sx={{
                                borderRadius: 2,
                                color: "#d1d5db",
                                "&:hover": {
                                    bgcolor: "#1f2937",
                                },
                            }}
                        >
                            <ListItemIcon sx={{ color: "inherit", minWidth: 40 }}>
                                <Settings />
                            </ListItemIcon>
    
                            <ListItemText primary="Settings" />
                        </ListItemButton>
    
                        <ListItemButton
                            sx={{
                                borderRadius: 2,
                                color: "#f87171",
                                "&:hover": {
                                    bgcolor: "#1f2937",
                                },
                            }}
                        >
                            <ListItemIcon sx={{ color: "inherit", minWidth: 40 }}>
                                <Logout />
                            </ListItemIcon>
    
                            <ListItemText primary="Logout" />
                        </ListItemButton>
                    </List>
                </Box>
            </Box>
        );
 
  return (
    <div>
         <Box
                component="nav"
                sx={{
                    width: {
                        md: drawerWidth,
                    },
                    flexShrink: {
                        md: 0,
                    },
                }}
            >
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={() => setMobileOpen(false)}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: {
                            xs: "block",
                            md: "none",
                        },
                        "& .MuiDrawer-paper": {
                            width: drawerWidth,
                            boxSizing: "border-box",
                        },
                    }}
                >
                    {drawer}
                </Drawer>

                <Drawer
                    variant="permanent"
                    sx={{
                        display: {
                            xs: "none",
                            md: "block",
                        },
                        "& .MuiDrawer-paper": {
                            width: drawerWidth,
                            boxSizing: "border-box",
                            border: "none",
                        },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
    </div>
  )
}

export default Sidebar