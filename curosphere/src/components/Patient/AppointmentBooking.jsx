import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Paper
} from '@mui/material';
import {
  CalendarToday as CalendarIcon,
  Schedule as TimeIcon,
  ArrowBack as BackIcon
} from '@mui/icons-material';
import axios from 'axios';

const AppointmentBooking = () => {
  let { doctorId } = useParams();

  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [doctor, setDoctor] = useState(null);
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);
  const [complain, setComplain] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const response = await axios.get(`/doctor/getdoctorbyid/${doctorId}`);
        console.log(response.data)
        localStorage.setItem('userId',response.data.data.userId)
        setDoctor(response.data.data);
      } catch (err) {
        console.error('Error fetching doctor details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorDetails();
  }, [doctorId]);

  useEffect(() => {
    if (doctorId && date) {
      const fetchAvailableSlots = async () => {
        try {
          const response = await axios.get('/appointment/available-slots', {
            params: {
              doctorId,
              date: new Date(date).toISOString()
            }
          });
          setAvailableSlots(response.data.data);
          setTimeSlot('');
        } catch (err) {
          console.error('Error fetching available slots:', err);
        }
      };

      fetchAvailableSlots();
    }
  }, [doctorId, date]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      // In a real app, you would get the patient ID from auth context or localStorage
      const patientId = localStorage.getItem("id") // Replace with actual patient ID
      doctorId = localStorage.getItem("userId")
      const response = await axios.post('/appointment/add', {
        patientId,
        doctorId,
        appointmentDate: date,
        appointmentTime: timeSlot,
        complain
      });

      navigate('/appointments', { state: { bookingSuccess: true } });
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to book appointment');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (!doctor) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h4" color="error">
          Doctor not found
        </Typography>
        <Button
          startIcon={<BackIcon />}
          onClick={() => navigate(-1)}
          sx={{ mt: 2 }}
        >
          Go Back
        </Button>
      </Container>
    );
  }

  // Generate dates for the next 30 days
  const generateDateOptions = () => {
    const options = [];
    const today = new Date();
    for (let i = 0; i < 30; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);
      options.push({
        value: date.toISOString().split('T')[0],
        label: date.toLocaleDateString('en-US', { 
          weekday: 'short', 
          month: 'short', 
          day: 'numeric' 
        })
      });
    }
    return options;
  };

  const dateOptions = generateDateOptions();

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
          Book Appointment with Dr. {doctor.firstName} {doctor.lastName}
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Appointment Date</InputLabel>
                <Select
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  label="Appointment Date"
                  startAdornment={<CalendarIcon sx={{ mr: 1 }} />}
                >
                  {dateOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required disabled={!date}>
                <InputLabel>Time Slot</InputLabel>
                <Select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  label="Time Slot"
                  startAdornment={<TimeIcon sx={{ mr: 1 }} />}
                >
                  {availableSlots.length > 0 ? (
                    availableSlots.map((slot) => (
                      <MenuItem key={slot} value={slot}>
                        {slot}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>
                      {date ? 'No available slots' : 'Select date first'}
                    </MenuItem>
                  )}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Reason for Appointment"
                multiline
                rows={4}
                fullWidth
                required
                value={complain}
                onChange={(e) => setComplain(e.target.value)}
              />
            </Grid>

            {error && (
              <Grid item xs={12}>
                <Typography color="error">{error}</Typography>
              </Grid>
            )}

            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <Button
                  variant="outlined"
                  onClick={() => navigate(-1)}
                  disabled={submitting}
                  startIcon={<BackIcon />}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={submitting || !timeSlot}
                >
                  {submitting ? (
                    <CircularProgress size={24} />
                  ) : (
                    'Book Appointment'
                  )}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default AppointmentBooking;