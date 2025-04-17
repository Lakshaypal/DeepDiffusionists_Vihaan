import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  Box,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
} from '@mui/material';
import { CloudUpload as CloudUploadIcon } from '@mui/icons-material';
import { uploadPrescription, getPrescriptions } from '../services/api';

function DoctorDashboard() {
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [recentPrescriptions, setRecentPrescriptions] = useState([]);
  const [patients, setPatients] = useState([
    { id: 1, name: 'John Doe', age: 35 },
    { id: 2, name: 'Jane Smith', age: 28 },
  ]);

  const [selectedPatient, setSelectedPatient] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [prescriptionData, setPrescriptionData] = useState({
    diagnosis: '',
    medications: '',
    notes: '',
  });

  const handlePatientSelect = (patient) => {
    setSelectedPatient(patient);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setPrescriptionData({
      diagnosis: '',
      medications: '',
      notes: '',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPrescriptionData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePrescriptionSubmit = async () => {
    try {
      const prescriptionPayload = {
        patientId: selectedPatient.id,
        doctor: 'Dr. Smith', // Replace with actual logged-in doctor's name
        ...prescriptionData,
      };
      await uploadPrescription(prescriptionPayload);
      setSnackbar({
        open: true,
        message: 'Prescription uploaded successfully',
        severity: 'success',
      });
      loadRecentPrescriptions();
      handleDialogClose();
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Failed to upload prescription: ' + error.message,
        severity: 'error',
      });
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Doctor Dashboard
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Patient List
            </Typography>
            <List>
              {patients.map((patient) => (
                <ListItem
                  key={patient.id}
                  button
                  onClick={() => handlePatientSelect(patient)}
                >
                  <ListItemText
                    primary={patient.name}
                    secondary={`Age: ${patient.age}`}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Recent Prescriptions
            </Typography>
            <List>
              {recentPrescriptions.map((prescription) => (
                <ListItem key={prescription.id}>
                  <ListItemText
                    primary={`Patient ID: ${prescription.patientId}`}
                    secondary={
                      <>
                        <Typography variant="body2">{prescription.diagnosis}</Typography>
                        <Typography variant="body2">{prescription.medications}</Typography>
                        <Typography variant="body2" color="textSecondary">
                          {prescription.date}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>

      <Dialog open={openDialog} onClose={handleDialogClose} maxWidth="md" fullWidth>
        <DialogTitle>
          New Prescription - {selectedPatient?.name}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Diagnosis"
              name="diagnosis"
              multiline
              rows={2}
              value={prescriptionData.diagnosis}
              onChange={handleInputChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Medications"
              name="medications"
              multiline
              rows={3}
              value={prescriptionData.medications}
              onChange={handleInputChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Additional Notes"
              name="notes"
              multiline
              rows={2}
              value={prescriptionData.notes}
              onChange={handleInputChange}
              margin="normal"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button
            variant="contained"
            startIcon={<CloudUploadIcon />}
            onClick={handlePrescriptionSubmit}
          >
            Upload Prescription
          </Button>
        </DialogActions>
      </Dialog>
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

export default DoctorDashboard;