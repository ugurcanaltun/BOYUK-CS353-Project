import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const theme = createTheme();

export default function SignUp() {
  const [role, setRole] = React.useState("");
  const [birthDate, setBirthDate] = React.useState("");
  const [openDialog, setOpenDialog] = React.useState(false);
  const [expertise, setExpertise] = React.useState("");
  const [hospitalId, setHospitalId] = React.useState("");
  const [bankAccountNo, setBankAccountNo] = React.useState("");
  const [warehouseId, setWarehouseId] = React.useState("");
  const [pharmacyId, setPharmacyId] = React.useState("");

  const handleCloseDialog = () => {
    setOpenDialog(false);
  }

  const handleRoleChange = (event) => {
    setRole(event.target.value);
    setOpenDialog(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="tckNumber"
                  label="TCK Number"
                  name="tckNumber"
                  autoComplete="tckNumber"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="address"
                  label="Your Address"
                  name="address"
                  autoComplete="address"
                />
              </Grid>
              <Grid item xs={12} sm={7}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker 
                      label="Birth Year"
                      value={birthDate}
                      onChange={(newDate) => setBirthDate(newDate)}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={5}>
                <FormControl fullWidth sx={{mt: 1}}>
                  <InputLabel id="role-label">Role</InputLabel>
                  <Select
                    labelId="role-label"
                    id="role-select"
                    value={role}
                    label="Role"
                    onChange={handleRoleChange}
                  >
                    <MenuItem value={"doctor"}>Doctor</MenuItem>
                    <MenuItem value={"patient"}>Patient</MenuItem>
                    <MenuItem value={"pharmaceuticalwarehouseworker"}>Pharmaceutical Warehouse Worker</MenuItem>
                    <MenuItem value={"pharmacist"}>Pharmacist</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
          <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle>Fill Additional Information for Role</DialogTitle>
            <DialogContent>
              <DialogContentText sx={{mb: 2}}>
                Please fill the additional information related with your role.
              </DialogContentText>
                {
                  role === "doctor" 
                  ?
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        autoComplete="expertise-field"
                        name="expertiseField"
                        required
                        fullWidth
                        id="expertiseField"
                        label="Your Expertise Field"
                        autoFocus
                        value={expertise}
                        onChange={(event) => {
                          setExpertise(event.target.value)
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        autoComplete="hospital-id"
                        name="HospitalId"
                        required
                        fullWidth
                        id="hospitalId"
                        label="Your Hospital Id"
                        autoFocus
                        value={hospitalId}
                        onChange={(event) => {
                          setHospitalId(event.target.value)
                        }}
                      />
                    </Grid>
                  </Grid>
                  :
                  role === "patient"
                  ?
                  <>
                  <TextField
                    autoComplete="bank-account-No"
                    name="bankAccountNo"
                    required
                    fullWidth
                    id="bankAccountNo"
                    label="Your Bank Account No"
                    autoFocus
                    value={bankAccountNo}
                    onChange={(event) => {
                      setBankAccountNo(event.target.value)
                    }}
                  />
                  </>
                  :
                  role === "pharmaceuticalwarehouseworker"
                  ?
                  <>
                  <TextField
                    autoComplete="warehouse-id"
                    name="warehouseId"
                    required
                    fullWidth
                    id="warehouseId"
                    label="Your Warehouse ID"
                    autoFocus
                    value={warehouseId}
                    onChange={(event) => {
                      setWarehouseId(event.target.value)
                    }}
                  />
                  </>
                  :
                  role === "pharmacist"
                  ?
                  <>
                  <TextField
                    autoComplete="pharmacy-id"
                    name="pharmacyId"
                    required
                    fullWidth
                    id="pharmacyId"
                    label="Your Pharmacy Id"
                    autoFocus
                    value={pharmacyId}
                    onChange={(event) => {
                      setPharmacyId(event.target.value)
                    }}
                  />
                  </>
                  :
                  <div/>
                }
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Submit</Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Container>
    </ThemeProvider>
  );
}