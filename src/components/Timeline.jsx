import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Typography,
  Divider,
  Chip,
  Tooltip,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  VideoCall,
  Lock,
  Face,
  Warning,
  Report,
  Traffic,
  SkipPrevious,
  PlayArrow,
  Pause,
  SkipNext,
} from "@mui/icons-material";
import { motion } from "framer-motion";

const timelineData = [
  {
    camera: "Camera - 01",
    events: [
      { label: "Unauthorised Access", time: "03:00", icon: <Lock fontSize="small" />, color: "#7b2c0d" },
      { label: "4 Multiple Events", time: "11:00", icon: <Warning fontSize="small" />, color: "#44403c" },
      { label: "Unauthorised Access", time: "13:45", icon: <Lock fontSize="small" />, color: "#7b2c0d" },
      { label: "Gun Threat", time: "13:50", icon: <Report fontSize="small" />, color: "#7f1d1d" },
    ],
  },
  {
    camera: "Camera - 02",
    events: [
      { label: "Unauthorised Access", time: "02:30", icon: <Lock fontSize="small" />, color: "#7b2c0d" },
      { label: "Face Recognised", time: "07:00", icon: <Face fontSize="small" />, color: "#1e3a8a" },
    ],
  },
  {
    camera: "Camera - 03",
    events: [
      { label: "Traffic congestion", time: "05:00", icon: <Traffic fontSize="small" />, color: "#065f46" },
      { label: "Unauthorised Access", time: "13:00", icon: <Lock fontSize="small" />, color: "#7b2c0d" },
    ],
  },
];

const timeLabels = Array.from({ length: 16 }, (_, i) => `${i.toString().padStart(2, "0")}:00`);

export default function Timeline() {
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    clearInterval(intervalRef.current);
    if (!paused) {
      intervalRef.current = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 0.2));
      }, 100);
    }
    return () => clearInterval(intervalRef.current);
  }, [paused]);

  const handleLineClick = () => setPaused((prev) => !prev);

  const getCurrentTime = () => {
    const totalMinutes = 16 * 60;
    const currentMinute = Math.floor((progress / 100) * totalMinutes);
    const hours = String(Math.floor(currentMinute / 60)).padStart(2, "0");
    const mins = String(currentMinute % 60).padStart(2, "0");
    return `${hours}:${mins}`;
  };

  return (
    <Box sx={{ backgroundColor: "#0f0f0f", color: "white", p: 2 }}>
      {/* Controls */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mb: 2,
          flexWrap: "wrap",
        }}
      >
        <IconButton color="inherit"><SkipPrevious /></IconButton>
        <IconButton color="inherit" onClick={() => setPaused((p) => !p)}>
          {paused ? <PlayArrow /> : <Pause />}
        </IconButton>
        <IconButton color="inherit"><SkipNext /></IconButton>
        <Typography variant="body2" sx={{ minWidth: 90 }}>{getCurrentTime()} (15-Jun-2025)</Typography>
        <Typography sx={{ ml: "auto", fontSize: "0.875rem" }}>1x</Typography>
      </Box>

      <Typography variant="h6" gutterBottom>
        Camera List
      </Typography>

      {/* Time Labels */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          pl: isMobile ? 0 : 12,
          overflowX: "auto",
          whiteSpace: "nowrap",
          mb: 1,
        }}
      >
        {timeLabels.map((label) => (
          <Typography key={label} variant="caption" sx={{ color: "gray", minWidth: 40 }}>
            {label}
          </Typography>
        ))}
      </Box>

      <Divider sx={{ borderColor: "#333", my: 1, ml: isMobile ? 0 : 12 }} />

      {/* Timeline Rows */}
      <Box sx={{ overflowX: "auto", whiteSpace: "nowrap" }}>
        {timelineData.map(({ camera, events }, idx) => (
          <Box
            key={camera}
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 3,
              minWidth: isMobile ? "600px" : "100%",
            }}
          >
            <Box sx={{ width: isMobile ? 100 : 160, display: "flex", alignItems: "center", gap: 1 }}>
              <VideoCall fontSize="small" />
              <Typography variant="body2" noWrap>
                {camera}
              </Typography>
            </Box>

            <Box sx={{ position: "relative", flexGrow: 1, height: 60 }}>
              <motion.div
                style={{
                  position: "absolute",
                  top: -20,
                  left: `${progress}%`,
                  transform: "translateX(-50%)",
                  color: "#eab308",
                  fontSize: "0.75rem",
                }}
              >
                {getCurrentTime()}
              </motion.div>

              <motion.div
                style={{
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  width: "2px",
                  backgroundColor: "#eab308",
                  left: `${progress}%`,
                  cursor: "pointer",
                }}
                onClick={handleLineClick}
                transition={{ type: "tween", ease: "linear", duration: 0.1 }}
              />

              {events.map((event, idx) => {
                const [hour, minute] = event.time.split(":").map(Number);
                const left = ((hour * 60 + minute) / (16 * 60)) * 100;

                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    style={{ position: "absolute", left: `${left}%` }}
                  >
                    <Tooltip title={`${event.label} - ${event.time}`} arrow>
                      <Chip
                        icon={event.icon}
                        label={event.label}
                        size="small"
                        sx={{
                          backgroundColor: event.color,
                          color: "white",
                          fontSize: "0.7rem",
                          maxWidth: isMobile ? 100 : "auto",
                        }}
                      />
                    </Tooltip>
                  </motion.div>
                );
              })}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
