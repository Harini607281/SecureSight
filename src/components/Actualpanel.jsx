import React, { useState } from 'react';
import {
  Typography, Box, Paper, Divider, List, ListItemButton, useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import LockIcon from '@mui/icons-material/Lock';
import GppBadIcon from '@mui/icons-material/GppBad';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const incidents = [
  {
    id: 1,
    type: 'Unauthorised Access',
    time: '14:35 - 14:37 on 7-Jul-2025',
    location: 'Shop Floor Camera A',
    icon: <LockIcon sx={{ color: 'orange' }} />,
    thumbnail: '/thumbnails/thumb1.jpg',
    video: './maincam.png',
  },
  {
    id: 2,
    type: 'Gun Threat',
    time: '14:35 - 14:37 on 7-Jul-2025',
    location: 'Shop Floor Camera A',
    icon: <GppBadIcon sx={{ color: 'red' }} />,
    thumbnail: '/thumbnails/thumb2.jpg',
    video: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFTtAZ3DN0f0j6ckzHdxF8SpZxXrQCBkoUKg&s',
  },
  {
    id: 3,
    type: 'Unauthorised Access',
    time: '14:35 - 14:37 on 7-Jul-2025',
    location: 'Shop Floor Camera A',
    icon: <LockIcon sx={{ color: 'orange' }} />,
    thumbnail: '/thumbnails/thumb1.jpg',
    video: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSK6P6RL5Xa_8VOqqs1vLsdPXWfIt43rCCrhg&s',
  },
  {
    id: 4,
    type: 'Unauthorised Access',
    time: '14:35 - 14:37 on 7-Jul-2025',
    location: 'Shop Floor Camera A',
    icon: <LockIcon sx={{ color: 'orange' }} />,
    thumbnail: '/thumbnails/thumb1.jpg',
    video: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYcv8Yt9hIhsbnNrKjvn5AHm-brPbPdMx1bg&s',
  },
  {
    id: 5,
    type: 'Unauthorised Access',
    time: '14:35 - 14:37 on 7-Jul-2025',
    location: 'Shop Floor Camera A',
    icon: <LockIcon sx={{ color: 'orange' }} />,
    thumbnail: '/thumbnails/thumb1.jpg',
    video: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-DYkWHMJq82dfS5KgnQ9pwEVoHNnu1OOeSg&s',
  },
];

function Actualpanel() {
  const [selectedIncident, setSelectedIncident] = useState(incidents[0]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ height: '100vh', bgcolor: '#121212', color: 'white', overflow: 'auto' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          height: 'calc(100vh - 64px)',
        }}
      >
        {/* Video Panel */}
        <Box sx={{ flex: isMobile ? 'none' : 2.5, p: 2, height: isMobile ? '50%' : '100%' }}>
          <Paper elevation={2} sx={{ height: '100%', overflow: 'hidden', bgcolor: '#000' }}>
            {selectedIncident ? (
              <img
                src={selectedIncident.video}
                alt="Video"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            ) : null}
          </Paper>
        </Box>

        {/* Incident List */}
        <Box
          sx={{
            flex: isMobile ? 'none' : 1.2,
            p: 2,
            bgcolor: '#1e1e1e',
            height: isMobile ? 'auto' : '100%',
          }}
        >
          <Typography
            variant={isMobile ? 'subtitle1' : 'h6'}
            sx={{
              mb: 2,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <WarningAmberIcon sx={{ color: 'red' }} />
            15 Unresolved Incidents
          </Typography>

          <Divider sx={{ bgcolor: '#333', mb: 1 }} />

          <List dense={isMobile}>
            {incidents.map((incident) => (
              <ListItemButton
                key={incident.id}
                onClick={() => setSelectedIncident(incident)}
                sx={{
                  alignItems: 'flex-start',
                  mb: 1,
                  borderRadius: 2,
                  bgcolor: '#2c2c2c',
                  flexDirection: isMobile ? 'column' : 'row',
                }}
              >
                <img
                  src={incident.video}
                  alt="thumb"
                  style={{
                    height: isMobile ? 150 : 70,
                    width: isMobile ? '100%' : 100,
                    borderRadius: 4,
                    objectFit: 'cover',
                    marginBottom: isMobile ? 8 : 0,
                    marginRight: isMobile ? 0 : 10,
                  }}
                />
                <Box sx={{ flex: 1 }}>
                  <Typography sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 1 }}>
                    {incident.icon}
                    {incident.type}
                  </Typography>
                  <Typography variant="body2">{incident.location}</Typography>
                  <Typography variant="caption" color="gray">
                    {incident.time}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    marginLeft: 'auto',
                    display: 'flex',
                    alignItems: 'center',
                    color: '#FFD700',
                    fontSize: 14,
                    mt: isMobile ? 1 : 0,
                  }}
                >
                  Resolve <ChevronRightIcon fontSize="small" />
                </Box>
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Box>
    </Box>
  );
}

export default Actualpanel;
