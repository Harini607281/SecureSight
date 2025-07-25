import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  IconButton,
  Stack,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";
import PhotoCameraBackIcon from "@mui/icons-material/PhotoCameraBack";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import GroupIcon from "@mui/icons-material/Group";
import { useTheme } from "@mui/material/styles";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md")); // true on small devices

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon sx={{ color: "gold" }} /> },
    { text: "Cameras", icon: <VideoCameraFrontIcon /> },
    { text: "Scenes", icon: <PhotoCameraBackIcon /> },
    { text: "Incidents", icon: <WarningAmberIcon /> },
    { text: "Users", icon: <GroupIcon /> },
  ];

  return (
    <>
      <AppBar
        position="static"
        sx={{
          background: "linear-gradient(to right, #1c1c1c, #3f3d00)",
          boxShadow: "none",
          paddingX: 2,
        }}
      >
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          {/* Logo */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpiVb_MKMTzgnVFD98xNn3aGpG6QB77YiYlA&s"
              alt="logo"
              width={40}
              height={40}
              style={{ objectFit: "fill" }}
            />
            <Typography variant="h6" fontWeight="bold">
              SecureSight
            </Typography>
          </Box>

          {/* Menu Items */}
          {isMobile ? (
            <IconButton onClick={() => setDrawerOpen(true)} sx={{ color: "#fff" }}>
              <MenuIcon />
            </IconButton>
          ) : (
            <Stack direction="row" spacing={4} alignItems="center" sx={{ color: "#fff" }}>
              {menuItems.map((item, idx) => (
                <Box key={idx} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  {item.icon}
                  <Typography fontWeight={item.text === "Dashboard" ? "bold" : "normal"} color={item.text === "Dashboard" ? "gold" : "#fff"}>
                    {item.text}
                  </Typography>
                </Box>
              ))}
            </Stack>
          )}

          {/* User Avatar */}
          {!isMobile && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Avatar alt="John Doe" src="https://randomuser.me/api/portraits/men/32.jpg" />
              <Box>
                <Typography variant="body2" fontWeight="bold">
                  johnDoe
                </Typography>
                <Typography variant="caption">user@gmail.com</Typography>
              </Box>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Drawer for Mobile */}
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 250, paddingTop: 2 }}>
          <List>
            {menuItems.map((item, index) => (
              <ListItem button key={index}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
            <ListItem>
              <ListItemIcon>
                <Avatar alt="John Doe" src="https://randomuser.me/api/portraits/men/32.jpg" />
              </ListItemIcon>
              <ListItemText primary="johnDoe" secondary="user@gmail.com" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
