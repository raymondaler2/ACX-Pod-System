import {
  Grid,
  Paper,
  Stack,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  InputAdornment,
  Autocomplete,
} from "@mui/material";
import { createFilterOptions } from "@mui/material/Autocomplete";
import dayjs from "dayjs";
import NavSideBar from "./../components/NavSideBar.jsx";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useEffect, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";

const CreateUser = () => {
  const filter = createFilterOptions();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthday, setBirthday] = useState(null);
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");
  const [relationship, setRelationship] = useState("");
  const [emergencyNumber, setEmergencyNumber] = useState("");
  const [username, setUsername] = useState("");
  const [position, setPosition] = useState("");
  const [positionOptions, setPositionOptions] = useState([]);
  const [podDesignation, setPodDesignation] = useState("");
  const [role, setRole] = useState("");
  const [roleOptions, setRoleOptions] = useState([]);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleFirstNameChange = (e) => setFirstName(e.target.value);
  const handleLastNameChange = (e) => setLastName(e.target.value);
  const handleBirthdayChange = (date) => setBirthday(date);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleContactNumberChange = (e) => {
    const input = e.target.value.replace(/\D/g, "");
    setContactNumber(input);
  };
  const handleEmergencyContactChange = (e) =>
    setEmergencyContact(e.target.value);
  const handleRelationshipChange = (e) => setRelationship(e.target.value);
  const handleEmergencyNumberChange = (e) => {
    const input = e.target.value.replace(/\D/g, "");
    setEmergencyNumber(input);
  };
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePodDesignationChange = (e) => setPodDesignation(e.target.value);
  const handleRoleChange = (e) => setRole(e.target.value);

  const generateRandomPassword = () => {
    const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
    const specialCharacters = '!@#$%^&*()-_=+[{]}|;:",<.>/?';
    const numbers = "0123456789";

    const allCharacters =
      uppercaseLetters + lowercaseLetters + specialCharacters + numbers;

    const getRandomChar = (characters) =>
      characters.charAt(Math.floor(Math.random() * characters.length));

    const generatedPassword =
      getRandomChar(uppercaseLetters) +
      getRandomChar(lowercaseLetters) +
      getRandomChar(specialCharacters) +
      getRandomChar(numbers) +
      Array.from({ length: 6 }, () => getRandomChar(allCharacters)).join("");

    const shuffledPassword = generatedPassword
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");

    setPassword(shuffledPassword);
  };

  const handleCreateUser = async () => {
    const dateObject = birthday instanceof dayjs ? birthday.toDate() : null;

    const formattedBirthday = dateObject
      ? `${dateObject.getFullYear()}-${String(
          dateObject.getMonth() + 1
        ).padStart(2, "0")}-${String(dateObject.getDate()).padStart(2, "0")}`
      : null;

    const site = import.meta.env.VITE_SITE;
    const result = await axios.post(`http://${site}:3000/api/user`, {
      first_name: firstName,
      last_name: lastName,
      birthday: formattedBirthday,
      email,
      contact_number: contactNumber,
      emergency_contact: emergencyContact,
      relationship,
      emergency_number: emergencyNumber,
      username,
      password,
      position,
      podDesignation,
      user_role: role,
    });
  };

  const fetchOptions = async () => {
    const site = import.meta.env.VITE_SITE;
    const response = await axios.get(`http://${site}:3000/api/userPosition/`);
    const formattedOptions = response.data.map((item) => ({
      label: item.position,
    }));

    setPositionOptions(formattedOptions);
  };

  const fetchRoles = async () => {
    const site = import.meta.env.VITE_SITE;
    const response = await axios.get(`http://${site}:3000/api/userRoleRoute/`);
    const formattedRoles = response.data.map((item) => ({
      label: item.position,
    }));

    setRoleOptions(formattedRoles);
  };

  useEffect(() => {
    fetchOptions();
    fetchRoles();
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={1.9}>
        <NavSideBar />
      </Grid>
      <Grid item xs={10.1}>
        <Paper
          elevation={3}
          sx={{
            padding: 8,
            marginTop: "1.25rem",
            marginLeft: 4,
            marginRight: 4,
            borderRadius: "3.5rem",
            overflowY: "scroll",
            maxHeight: "110vh",
            minHeight: "110vh",
          }}
        >
          <Stack spacing={2}>
            <Stack direction="row" spacing={2}>
              <TextField
                label="First Name"
                variant="outlined"
                fullWidth
                value={firstName}
                onChange={handleFirstNameChange}
              />
              <TextField
                label="Last Name"
                variant="outlined"
                fullWidth
                value={lastName}
                onChange={handleLastNameChange}
              />
            </Stack>
            <LocalizationProvider dateAdapter={AdapterDayjs} fullWidth>
              <DatePicker
                label="Birthday"
                fullWidth
                value={birthday}
                slotProps={{
                  field: { clearable: true },
                }}
                onChange={(newValue) => handleBirthdayChange(newValue)}
              />
            </LocalizationProvider>
            <TextField
              label="Email Address"
              variant="outlined"
              fullWidth
              value={email}
              onChange={handleEmailChange}
            />
            <TextField
              label="Contact Number"
              variant="outlined"
              fullWidth
              value={contactNumber}
              onChange={handleContactNumberChange}
            />
            <Stack direction="row" spacing={2}>
              <TextField
                label="Emergency Contact"
                variant="outlined"
                fullWidth
                value={emergencyContact}
                onChange={handleEmergencyContactChange}
              />
              <TextField
                label="Relationship"
                variant="outlined"
                fullWidth
                value={relationship}
                onChange={handleRelationshipChange}
              />
            </Stack>
            <TextField
              label="Emergency Number"
              variant="outlined"
              fullWidth
              value={emergencyNumber}
              onChange={handleEmergencyNumberChange}
            />
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              value={username}
              onChange={handleUsernameChange}
            />
            <Stack direction="row" spacing={2}>
              <TextField
                label="Password"
                variant="outlined"
                fullWidth
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                onClick={generateRandomPassword}
                variant="contained"
                color="primary"
              >
                Generate
              </Button>
            </Stack>
            <Autocomplete
              selectOnFocus
              clearOnBlur
              handleHomeEndKeys
              options={positionOptions}
              fullWidth
              value={position}
              onChange={(event, newValue) => {
                if (newValue && newValue.label.startsWith('Add "')) {
                  const extractedValue = newValue.label
                    .replace('Add "', "")
                    .replace('"', "");
                  setPosition(extractedValue);
                } else {
                  setPosition("");
                }
              }}
              getOptionLabel={(option) =>
                typeof option === "string" ? option : option.label
              }
              isOptionEqualToValue={(option, value) =>
                option.label === value.label
              }
              filterOptions={(options, params) => {
                const filtered = filter(options, params);

                if (params.inputValue !== "") {
                  filtered.push({
                    label: `Add "${params.inputValue}"`,
                    value: params.inputValue,
                  });
                }

                return filtered;
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Position"
                  variant="outlined"
                  fullWidth
                />
              )}
              renderOption={(props, option) => (
                <li {...props}>{option.label}</li>
              )}
            />
            <Stack direction="row" spacing={2}>
              <Autocomplete
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                options={roleOptions}
                fullWidth
                value={role}
                onChange={(event, newValue) => {
                  if (newValue && newValue.label.startsWith('Add "')) {
                    const extractedValue = newValue.label
                      .replace('Add "', "")
                      .replace('"', "");
                    setRole(extractedValue);
                  } else {
                    setRole("");
                  }
                }}
                getOptionLabel={(option) =>
                  typeof option === "string" ? option : option.label
                }
                isOptionEqualToValue={(option, value) =>
                  option.label === value.label
                }
                filterOptions={(options, params) => {
                  const filtered = filter(options, params);

                  if (params.inputValue !== "") {
                    filtered.push({
                      label: `Add "${params.inputValue}"`,
                      value: params.inputValue,
                    });
                  }

                  return filtered;
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Role"
                    variant="outlined"
                    fullWidth
                  />
                )}
                renderOption={(props, option) => (
                  <li {...props}>{option.label}</li>
                )}
              />
              <FormControl fullWidth variant="outlined">
                <InputLabel id="pod-designation-label">
                  POD Designation
                </InputLabel>
                <Select
                  labelId="pod-designation-label"
                  id="pod-designation"
                  value={podDesignation}
                  onChange={handlePodDesignationChange}
                  label="POD Designation"
                >
                  <MenuItem value="A">A</MenuItem>
                  <MenuItem value="B">B</MenuItem>
                  <MenuItem value="C">C</MenuItem>
                </Select>
              </FormControl>
            </Stack>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCreateUser}
            >
              Create User
            </Button>
          </Stack>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default CreateUser;
