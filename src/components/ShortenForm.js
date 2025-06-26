import React, { useState } from 'react';
import { TextField, Button, Grid, Box } from '@mui/material';
import { isValidUrl } from '../utils/helpers';
function ShortenForm({ onSubmit }) {
  const [inputs, setInputs] = useState([{ original: '', shortcode: '', validity: '' }]);
  const [errors, setErrors] = useState([{}]);
  const handleChange = (i, field, value) => {
    const updatedInputs = [...inputs];
    updatedInputs[i][field] = value;
    setInputs(updatedInputs);
    const updatedErrors = [...errors];
    updatedErrors[i] = { ...updatedErrors[i], [field]: '' };
    setErrors(updatedErrors);
  };
  const addField = () => {
    if (inputs.length < 5) {
      setInputs([...inputs, { original: '', shortcode: '', validity: '' }]);
      setErrors([...errors, {}]);
    }
  };
  const validateInputs = () => {
    const newErrors = inputs.map((input) => {
      const errorObj = {};
      if (!isValidUrl(input.original)) {
        errorObj.original = 'Invalid URL';
      }
      if (input.shortcode && !/^[a-zA-Z0-9]{3,10}$/.test(input.shortcode)) {
        errorObj.shortcode = 'Must be 3–10 alphanumeric characters';
      }
      if (input.validity && !/^[0-9]+$/.test(input.validity)) {
        errorObj.validity = 'Validity must be a number';
      }
      return errorObj;
    });
    setErrors(newErrors);
    return newErrors.every((err) => Object.keys(err).length === 0);
  };
  const handleSubmit = () => {
    if (validateInputs()) {
      const validEntries = inputs.map(({ original, shortcode, validity }) => ({
        original,
        shortcode,
        validity: validity ? parseInt(validity) : undefined,
      }));
      onSubmit(validEntries);
    }
  };
  return (
    <Box>
      {inputs.map((input, i) => (
        <Grid container spacing={2} key={i} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Original URL"
              value={input.original}
              onChange={(e) => handleChange(i, 'original', e.target.value)}
              error={!!errors[i]?.original}
              helperText={errors[i]?.original}
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField
              fullWidth
              label="Shortcode (optional)"
              value={input.shortcode}
              onChange={(e) => handleChange(i, 'shortcode', e.target.value)}
              error={!!errors[i]?.shortcode}
              helperText={errors[i]?.shortcode}
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField
              fullWidth
              label="Validity (mins)"
              value={input.validity}
              onChange={(e) => handleChange(i, 'validity', e.target.value)}
              error={!!errors[i]?.validity}
              helperText={errors[i]?.validity}
            />
          </Grid>
        </Grid>
      ))}
      <Box sx={{ mb: 2 }}>
        <Button onClick={addField} disabled={inputs.length >= 5} sx={{ mr: 2 }}>
          + Add URL
        </Button>
        <Button variant="contained" onClick={handleSubmit}>
          Shorten URLs
        </Button>
      </Box>
    </Box>
  );
}
export default ShortenForm;
