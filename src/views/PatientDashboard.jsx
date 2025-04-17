import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondary,
  Divider,
  Box,
  Chip,
  Alert,
  Snackbar,
} from '@mui/material';
import { LocalHospital as HospitalIcon } from '@mui/icons-material';
import { getPrescriptions, getHealthHistory } from '../services/api';

function PatientDashboard() {
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [prescriptions, setPrescriptions] = useState([
    {
      id: 1,
      date: '2023-07-20',
      doctor: 'Dr. Smith',
      diagnosis: 'Common Cold',
      medications: 'Paracetamol 500mg',
      notes: 'Take twice daily after meals',
    },
    {
      id: 2,
      date: '2023-07-15',
      doctor: 'Dr. Johnson',
      diagnosis: 'Allergic Rhinitis',
      medications: 'Cetirizine 10mg',
      notes: 'Take once daily before bedtime',
    },
  ]);

  const [healthHistory, setHealthHistory] = useState([
    {
      id: 1,
      condition: 'Asthma',
      diagnosedDate: '2020-03-15',
      status: 'Ongoing',
    },
    {
      id: 2,
      condition: 'Appendicitis',
      diagnosedDate: '2019-06-10',
      status: 'Resolved',
    },
  ]);

  const loadPatientData = async () => {
    try {
      // Replace with actual patient ID from authentication
      const patientId = 1;
      const [prescriptionsData, historyData] = await Promise.all([
        getPrescriptions(patientId),
        getHealthHistory(patientId)
      ]);
      setPrescriptions(prescriptionsData);
      setHealthHistory(historyData);
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Failed to load patient data: ' + error.message,
        severity: 'error'
      });
    }
  };

  useEffect(() => {
    loadPatientData();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Patient Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Recent Prescriptions
            </Typography>
            <List>
              {prescriptions.map((prescription) => (
                <React.Fragment key={prescription.id}>
                  <ListItem alignItems="flex-start">
                    <ListItemText
                      primary={
                        <Box display="flex" alignItems="center" gap={1}>
                          <HospitalIcon color="primary" />
                          <Typography variant="subtitle1">
                            {prescription.doctor} - {prescription.date}
                          </Typography>
                        </Box>
                      }
                      secondary={
                        <Box sx={{ mt: 1 }}>
                          <Typography component="span" variant="body2" color="text.primary">
                            Diagnosis: {prescription.diagnosis}
                          </Typography>
                          <br />
                          <Typography component="span" variant="body2">
                            Medications: {prescription.medications}
                          </Typography>
                          <br />
                          <Typography component="span" variant="body2">
                            Notes: {prescription.notes}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Health History
            </Typography>
            <List>
              {healthHistory.map((condition) => (
                <ListItem key={condition.id}>
                  <ListItemText
                    primary={condition.condition}
                    secondary={`Diagnosed: ${condition.diagnosedDate}`}
                  />
                  <Chip
                    label={condition.status}
                    color={condition.status === 'Ongoing' ? 'primary' : 'success'}
                    size="small"
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default PatientDashboard;