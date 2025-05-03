import React, { useState, useEffect } from 'react';
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, Paper } from '@mui/material';
import { Dashboard as DashboardIcon, Warning as WarningIcon, Speed as SpeedIcon } from '@mui/icons-material';
import StatusIndicator from './components/StatusIndicator';
import LineChart from './components/LineChart';
import GaugeChart from './components/GaugeChart';
import FaultTable from './components/FaultTable';

const drawerWidth = 240;

function App() {
  const [wsData, setWsData] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [faultEvents, setFaultEvents] = useState([]);

  /**
   * {"turbineId":"TURB-002",
   * ts":"2025-05-02T15:39:26.000Z",
   * "windSpeed":9.78,
   * "rpm":958,
   * "bearingTemp":56.5,
   * "vibration":1.34,
   * power":437
   * score: 0.0-1.0
   * severity: 1,2,3
   * fault: 0,1
   * }
   */
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:1880/ws/checkResult');

    ws.onopen = (event) => {
      console.log("websocket open", event);
    }

    ws.onclose = (event) => {
      console.log("websocket close", event);
    }

    ws.onerror = (error) => {
      console.log("ws on error", error);
    }

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("get data: ", data);
      setWsData(data);

      // Update chart data
      setChartData(prev => {
        const newData = [...prev, {
          ...data,
          timestamp: new Date(data.ts).toLocaleTimeString(),
          temperature: data.bearingTemp,
        }].slice(-60); // Keep last 60 seconds
        return newData;
      });

      // Update fault events
      if (data.fault === 1) {
        setFaultEvents(prev => [{
          timestamp: new Date(data.ts).toLocaleString(),
          severity: data.severity,
          score: data.score
        }, ...prev].slice(0, 10)); // Keep last 10 faults
      }
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <Box sx={{ overflow: 'auto', mt: 2 }}>
          <Typography variant="h6" sx={{ px: 2, mb: 2 }}>
            Turbine Dashboard
          </Typography>
          <List>
            <ListItem button>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <WarningIcon />
              </ListItemIcon>
              <ListItemText primary="Alerts" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <SpeedIcon />
              </ListItemIcon>
              <ListItemText primary="Performance" />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Box sx={{ mb: 3 }}>
          <StatusIndicator status={wsData?.fault === 1? "ERROR" : "NORMAL"} />
        </Box>

        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <Paper sx={{ flex: 2, p: 2 }}>
            <LineChart data={chartData} />
          </Paper>
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Paper sx={{ p: 2 }}>
              <GaugeChart
                value={wsData?.power || 0}
                label="Power (kW)"
                min={0}
                max={1000}
              />
            </Paper>
            <Paper sx={{ p: 2 }}>
              <GaugeChart
                value={wsData?.rpm || 0}
                label="Rotor Speed (RPM)"
                min={0}
                max={3000}
              />
            </Paper>
          </Box>
        </Box>

        <Paper sx={{ p: 2 }}>
          <FaultTable events={faultEvents} />
        </Paper>
      </Box>
    </Box>
  );
}

export default App; 