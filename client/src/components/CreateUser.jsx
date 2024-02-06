import {
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Divider,
  Autocomplete,
  DialogActions,
  Button,
  InputAdornment,
  Input,
  Snackbar,
  Alert as MuiAlert,
} from "@mui/material";
import axios from "axios";
import { createFilterOptions } from "@mui/material/Autocomplete";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import UploadIcon from "@mui/icons-material/Upload";
import ClearIcon from "@mui/icons-material/Clear";

const CreateUser = (props) => {
  const filter = createFilterOptions();
  const { createClicked, handleClose, handleCreateClick } = props;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [birthday, setBirthday] = useState(null);
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");
  const [emergencyNumber, setEmergencyNumber] = useState("");
  const [relationship, setRelationship] = useState("");
  const [relationshipOptions, setRelationshipOptions] = useState([]);
  const [createClickedTwo, setCreateClickedTwo] = useState(false);
  const [username, setUsername] = useState("");
  const [position, setPosition] = useState("");
  const [positionOptions, setPositionOptions] = useState([]);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("");
  const [roleOptions, setRoleOptions] = useState([]);
  const [employeeNumber, setEmployeeNumber] = useState("ACX-00-000");
  const [philhealth, setphilhealth] = useState("");
  const [pagibig, setPagibig] = useState("");
  const [tinnumber, setTinnumber] = useState("");
  const [nbiClearanceFile, setNbiClearanceFile] = useState(null);
  const [resumeCvFile, setResumeCvFile] = useState(null);
  const [portfolioFile, setPortfolioFile] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const dateObject = birthday instanceof dayjs ? birthday?.toDate() : null;

  const formattedBirthday = dateObject
    ? dateObject.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : null;

  const handleFileChangeCancel = (setFile) => {
    setFile(null);
  };

  const handleFileChange = (event, setFile) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handlePhilhealth = (e) => {
    setphilhealth(e.target.value);
  };

  const handlePagibigChange = (e) => {
    setPagibig(e.target.value);
  };

  const handleTinnumberChange = (e) => {
    setTinnumber(e.target.value);
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleBirthdayChange = (date) => {
    setBirthday(date);
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleContactNumberChange = (e) => {
    const input = e.target.value.replace(/\D/g, "");
    setContactNumber(input);
  };

  const handleEmergencyContactChange = (e) => {
    setEmergencyContact(e.target.value);
  };

  const handleEmergencyNumberChange = (e) => {
    const input = e.target.value.replace(/\D/g, "");
    setEmergencyNumber(input);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmployeeNumberChange = (e) => {
    setEmployeeNumber(e.target.value);
  };

  const clearData = () => {
    setFirstName("");
    setLastName("");
    setAddress("");
    setBirthday(null);
    setGender("");
    setEmail("");
    setContactNumber("");
    setEmergencyContact("");
    setEmergencyNumber("");
    setRelationship("");
    setUsername("");
    setPosition("");
    setPassword("");
    setShowPassword(false);
    setRole("");
    setEmployeeNumber("ACX-00-000");
    setphilhealth("");
    setPagibig("");
    setTinnumber("");
    setNbiClearanceFile(null);
    setResumeCvFile(null);
    setPortfolioFile(null);
  };

  const handleCancelclick = () => {
    clearData();
    handleClose();
  };

  const handleCancelclickPageTwo = () => {
    clearData();
    setCreateClickedTwo(false);
  };

  const handleNext = () => {
    setCreateClickedTwo(true);
    handleClose();
  };

  const handleCreateUser = async () => {
    const formData = new FormData();

    const userData = {
      first_name: firstName,
      last_name: lastName,
      address,
      birthday,
      gender,
      email,
      contact_number: contactNumber,
      emergency_contact: emergencyContact,
      emergency_number: emergencyNumber,
      relationship,
      username,
      position,
      password,
      role,
      employee_number: employeeNumber,
      philhealth,
      pagibig,
      tin_number: tinnumber,
      pod_designation: "Edda POD",
    };
    const userDataBlob = new Blob([JSON.stringify(userData)], {
      type: "application/json",
    });
    formData.append("user_data", userDataBlob, "user_data.json");

    formData.append("nbi_clearance", nbiClearanceFile);
    formData.append("resume_cv", resumeCvFile);
    formData.append("portfolio", portfolioFile);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      const site = import.meta.env.VITE_SITE;
      const result = await axios.post(
        `http://${site}:3000/api/user`,
        formData,
        config
      );

      if (result.status === 200) {
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error("Error creating user:", error.message);
    }
  };

  const customDialogStyles = {
    borderRadius: "40px",
    padding: "10px",
    minWidth: "80rem",
  };

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

  const fetchRelationships = async () => {
    const site = import.meta.env.VITE_SITE;
    const response = await axios.get(
      `http://${site}:3000/api/userRelationship`
    );
    const formattedRelationships = response.data.map((item) => ({
      label: item.relationship,
    }));
    setRelationshipOptions(formattedRelationships);
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
    const response = await axios.get(`http://${site}:3000/api/userRole/`);
    const formattedRoles = response.data.map((item) => ({
      label: item.role,
    }));

    setRoleOptions(formattedRoles);
  };

  useEffect(() => {
    fetchRelationships();
    fetchOptions();
    fetchRoles();
  }, []);

  return (
    <>
      <Dialog
        maxWidth="xl"
        open={createClicked}
        PaperProps={{ style: customDialogStyles }}
      >
        <DialogTitle>
          <Grid container>
            <Grid item xs={11.7}>
              <Stack direction="row">
                <p className="font-bold text-[28px] mb-[20px]">Create User</p>
              </Stack>
            </Grid>
            <Grid item xs={0.1}>
              <IconButton
                color="black"
                variant="contained"
                onClick={handleCancelclick}
              >
                <CloseIcon sx={{ color: "black" }} />
              </IconButton>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Stack>
                <InputLabel
                  htmlFor="first-name"
                  sx={{
                    fontWeight: "Bold",
                    marginBottom: "5px",
                  }}
                >
                  First Name
                </InputLabel>
                <TextField
                  fullWidth
                  id="first-name"
                  variant="outlined"
                  label="First Name"
                  value={firstName}
                  onChange={handleFirstNameChange}
                />
                <InputLabel
                  htmlFor="address"
                  sx={{
                    fontWeight: "Bold",
                    marginTop: "20px",
                    marginBottom: "5px",
                  }}
                >
                  Address
                </InputLabel>
                <TextField
                  fullWidth
                  id="address"
                  variant="outlined"
                  label="Address"
                  value={address}
                  onChange={handleAddressChange}
                />
                <InputLabel
                  htmlFor="email-address"
                  sx={{
                    fontWeight: "Bold",
                    marginTop: "20px",
                    marginBottom: "5px",
                  }}
                >
                  Email Address
                </InputLabel>
                <TextField
                  fullWidth
                  id="email-address"
                  variant="outlined"
                  label="Email Address"
                  value={email}
                  onChange={handleEmailChange}
                />
              </Stack>
            </Grid>
            <Grid item xs={6}>
              <Stack>
                <InputLabel
                  htmlFor="last-name"
                  sx={{
                    fontWeight: "Bold",
                    marginBottom: "5px",
                  }}
                >
                  Last Name
                </InputLabel>
                <TextField
                  fullWidth
                  id="last-name"
                  variant="outlined"
                  label="Last Name"
                  value={lastName}
                  onChange={handleLastNameChange}
                />
                <Stack direction="row">
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Stack>
                        <InputLabel
                          htmlFor="birthday"
                          sx={{
                            fontWeight: "Bold",
                            marginTop: "20px",
                            marginBottom: "5px",
                          }}
                        >
                          Birthday
                        </InputLabel>
                        <LocalizationProvider
                          dateAdapter={AdapterDayjs}
                          fullWidth
                        >
                          <DatePicker
                            label="MM/DD/YYYY"
                            fullWidth
                            value={birthday}
                            slotProps={{
                              field: { clearable: true },
                            }}
                            onChange={(newValue) =>
                              handleBirthdayChange(newValue)
                            }
                          />
                        </LocalizationProvider>
                      </Stack>
                    </Grid>
                    <Grid item xs={6}>
                      <Stack>
                        <InputLabel
                          htmlFor="gender"
                          sx={{
                            fontWeight: "Bold",
                            marginTop: "20px",
                            marginBottom: "5px",
                          }}
                        >
                          Gender
                        </InputLabel>
                        <FormControl fullWidth variant="outlined">
                          <InputLabel id="gender-label">Gender</InputLabel>
                          <Select
                            abelId="gender-label"
                            id="gender"
                            value={gender}
                            onChange={handleGenderChange}
                            label="Gender"
                          >
                            <MenuItem value="Male">Male</MenuItem>
                            <MenuItem value="Female">Female</MenuItem>
                          </Select>
                        </FormControl>
                      </Stack>
                    </Grid>
                  </Grid>
                </Stack>
                <InputLabel
                  htmlFor="contact-number"
                  sx={{
                    fontWeight: "Bold",
                    marginTop: "20px",
                    marginBottom: "5px",
                  }}
                >
                  Contact Number
                </InputLabel>
                <TextField
                  fullWidth
                  id="contact-number"
                  variant="outlined"
                  label="Enter Number"
                  value={contactNumber}
                  onChange={handleContactNumberChange}
                />
              </Stack>
            </Grid>
          </Grid>
          <Divider
            variant="middle"
            sx={{ marginTop: "50px", marginBottom: "50px" }}
          />
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <InputLabel
                htmlFor="first-name"
                sx={{
                  fontWeight: "Bold",
                  marginBottom: "5px",
                }}
              >
                Emergency Contact
              </InputLabel>
              <TextField
                fullWidth
                id="first-name"
                variant="outlined"
                label="Enter Full Name"
                value={emergencyContact}
                onChange={handleEmergencyContactChange}
              />
            </Grid>
            <Grid item xs={6}>
              <InputLabel
                htmlFor="emergency-number"
                sx={{
                  fontWeight: "Bold",
                  marginBottom: "5px",
                }}
              >
                Contact Number
              </InputLabel>
              <TextField
                fullWidth
                id="emergency-number"
                variant="outlined"
                label="Emergency Number"
                value={emergencyNumber}
                onChange={handleEmergencyNumberChange}
              />
            </Grid>
            <Grid item xs={6}>
              <InputLabel
                htmlFor="relationship"
                sx={{
                  fontWeight: "Bold",
                  marginBottom: "5px",
                }}
              >
                Relationship
              </InputLabel>
              <Autocomplete
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                options={relationshipOptions}
                fullWidth
                value={relationship}
                onChange={(event, newValue) => {
                  if (newValue && newValue.label.startsWith('Add "')) {
                    const extractedValue = newValue.label
                      .replace('Add "', "")
                      .replace('"', "");
                    setRelationship(extractedValue);
                  } else {
                    setRelationship(newValue.label);
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
                    label="Relationship"
                    variant="outlined"
                    fullWidth
                  />
                )}
                renderOption={(props, option) => (
                  <li {...props}>{option.label}</li>
                )}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: "flex-end",
            marginBottom: "20px",
            marginRight: "1rem",
          }}
        >
          <Button
            onClick={handleNext}
            variant="contained"
            sx={{
              textTransform: "none",
              borderRadius: "10px",
              paddingRight: "40px",
              paddingLeft: "40px",
              paddingTop: "5px",
              paddingBottom: "5px",
              marginLeft: "15px",
              backgroundColor: "#17A1FA",
              "&:hover": {
                backgroundColor: "#17A1FA",
              },
            }}
          >
            Next
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        maxWidth="xl"
        open={createClickedTwo}
        PaperProps={{ style: customDialogStyles }}
      >
        <DialogTitle>
          <Grid container>
            <Grid item xs={11.7}>
              <Stack direction="row">
                <p className="font-bold text-[28px] mb-[20px]">Create User</p>
              </Stack>
            </Grid>
            <Grid item xs={0.1}>
              <IconButton
                color="black"
                variant="contained"
                onClick={handleCancelclickPageTwo}
              >
                <CloseIcon sx={{ color: "black" }} />
              </IconButton>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <Stack direction="row">
            <Stack
              sx={{
                maxWidth: "20rem",
                minWidth: "20rem",
                paddingTop: "20px",
                paddingBottom: "20px",
                paddingLeft: "0px",
                paddingRight: "40px",
              }}
            >
              <p className="font-bold text-[22px]">{`${firstName} ${lastName}`}</p>
              <p className="mt-[5px] mb-[5px]">{address}</p>
              <p className="mt-[5px] mb-[5px]">{gender}</p>
              <p className="mt-[5px] mb-[5px]">{formattedBirthday}</p>
              <p className="mt-[5px] mb-[5px]">{contactNumber}</p>
              <p className="mt-[5px] mb-[40px]">{email}</p>
              <p className="font-bold text-[18px]">Emergency Contact</p>
              <p className="mt-[5px] mb-[5px]">{emergencyContact}</p>
              <p className="mt-[5px] mb-[5px]">{emergencyNumber}</p>
              <p className="mt-[5px] mb-[5px]">{relationship}</p>
            </Stack>
            <Divider orientation="vertical" flexItem />
            <Stack
              sx={{
                maxWidth: "60rem",
                minWidth: "60rem",
                paddingTop: "20px",
                paddingBottom: "20px",
                paddingLeft: "60px",
                paddingRight: "60px",
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Stack>
                    <InputLabel
                      htmlFor="user-name"
                      sx={{
                        fontWeight: "Bold",
                        marginBottom: "5px",
                      }}
                    >
                      Username
                    </InputLabel>
                    <TextField
                      fullWidth
                      id="user-name"
                      variant="outlined"
                      label="Username"
                      value={username}
                      onChange={handleUsernameChange}
                    />
                    <InputLabel
                      htmlFor="password"
                      sx={{
                        fontWeight: "Bold",
                        marginTop: "20px",
                        marginBottom: "5px",
                      }}
                    >
                      Password
                    </InputLabel>
                    <TextField
                      id="password"
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
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    <Button
                      sx={{
                        alignSelf: "flex-start",
                        marginTop: "35px",
                        textTransform: "none",
                        borderRadius: "10px",
                        backgroundColor: "#17A1FA",
                        "&:hover": {
                          backgroundColor: "#17A1FA",
                        },
                      }}
                      onClick={generateRandomPassword}
                      variant="contained"
                      color="primary"
                    >
                      Generate Password
                    </Button>
                  </Stack>
                </Grid>
                <Grid item xs={6}>
                  <Stack>
                    <InputLabel
                      htmlFor="position"
                      sx={{
                        fontWeight: "Bold",
                        marginBottom: "5px",
                      }}
                    >
                      Position
                    </InputLabel>
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
                          setPosition(newValue.label);
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
                    <InputLabel
                      htmlFor="role"
                      sx={{
                        fontWeight: "Bold",
                        marginTop: "20px",
                        marginBottom: "5px",
                      }}
                    >
                      Role
                    </InputLabel>
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
                          setRole(newValue.label);
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
                    <Stack
                      direction="row"
                      sx={{
                        marginTop: "20px",
                      }}
                    >
                      <InputLabel
                        htmlFor="employee-number"
                        sx={{
                          fontWeight: "Bold",
                          marginTop: "20px",
                          marginBottom: "5px",
                          marginRight: "20px",
                          overflow: "visible",
                        }}
                      >
                        Employee Number
                      </InputLabel>
                      <TextField
                        fullWidth
                        id="employee-number"
                        variant="outlined"
                        label="Employee Number"
                        value={employeeNumber}
                        onChange={handleEmployeeNumberChange}
                      />
                    </Stack>
                  </Stack>
                </Grid>
              </Grid>
              <Grid
                container
                spacing={2}
                sx={{
                  marginTop: "20px",
                }}
              >
                <Grid item xs={9}>
                  <Stack>
                    <InputLabel
                      htmlFor="philhealth"
                      sx={{
                        fontWeight: "Bold",
                        marginBottom: "5px",
                      }}
                    >
                      Philhealth
                    </InputLabel>
                    <TextField
                      fullWidth
                      id="philhealth"
                      variant="outlined"
                      label="Philhealth"
                      value={philhealth}
                      onChange={handlePhilhealth}
                    />
                    <InputLabel
                      htmlFor="pag-ibig"
                      sx={{
                        fontWeight: "Bold",
                        marginTop: "20px",
                        marginBottom: "5px",
                      }}
                    >
                      PAG-IBIG
                    </InputLabel>
                    <TextField
                      fullWidth
                      id="pag-ibig"
                      variant="outlined"
                      label="PAG-IBIG"
                      value={pagibig}
                      onChange={handlePagibigChange}
                    />
                    <InputLabel
                      htmlFor="tin-number"
                      sx={{
                        fontWeight: "Bold",
                        marginTop: "20px",
                        marginBottom: "5px",
                      }}
                    >
                      Tin Number
                    </InputLabel>
                    <TextField
                      fullWidth
                      id="tin-number"
                      variant="outlined"
                      label="Tin Number"
                      value={tinnumber}
                      onChange={handleTinnumberChange}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={3}>
                  <Stack>
                    <InputLabel
                      htmlFor="nbi-clearance"
                      sx={{ fontWeight: "Bold", marginBottom: "5px" }}
                    >
                      NBI Clearance
                    </InputLabel>
                    {nbiClearanceFile === null ? (
                      <>
                        <Input
                          type="file"
                          id="nbi-clearance"
                          sx={{ display: "none" }}
                          onChange={(event) => {
                            handleFileChange(event, setNbiClearanceFile);
                          }}
                        />
                        <label htmlFor="nbi-clearance">
                          <Button
                            variant="outlined"
                            component="span"
                            startIcon={<UploadIcon />}
                            sx={{ paddingX: "60px", paddingY: "15px" }}
                          >
                            Upload
                          </Button>
                        </label>
                      </>
                    ) : (
                      <>
                        <label htmlFor="nbi-clearance-cancel">
                          <Button
                            color="error"
                            variant="contained"
                            component="span"
                            startIcon={<ClearIcon />}
                            sx={{ paddingX: "65px", paddingY: "15px" }}
                            onClick={() =>
                              handleFileChangeCancel(setNbiClearanceFile)
                            }
                          >
                            Clear
                          </Button>
                        </label>
                      </>
                    )}
                    <InputLabel
                      htmlFor="resume-cv"
                      sx={{
                        fontWeight: "Bold",
                        marginTop: "20px",
                        marginBottom: "5px",
                      }}
                    >
                      Resume / CV
                    </InputLabel>
                    {resumeCvFile === null ? (
                      <>
                        <Input
                          type="file"
                          id="resume-cv"
                          sx={{ display: "none" }}
                          onChange={(event) =>
                            handleFileChange(event, setResumeCvFile)
                          }
                        />
                        <label htmlFor="resume-cv">
                          <Button
                            variant="outlined"
                            component="span"
                            startIcon={<UploadIcon />}
                            sx={{ paddingX: "60px", paddingY: "15px" }}
                          >
                            Upload
                          </Button>
                        </label>
                      </>
                    ) : (
                      <>
                        <label htmlFor="resume-cv-cancel">
                          <Button
                            color="error"
                            variant="contained"
                            component="span"
                            startIcon={<ClearIcon />}
                            sx={{ paddingX: "65px", paddingY: "15px" }}
                            onClick={() =>
                              handleFileChangeCancel(setResumeCvFile)
                            }
                          >
                            Clear
                          </Button>
                        </label>
                      </>
                    )}
                    <InputLabel
                      htmlFor="portfolio"
                      sx={{
                        fontWeight: "Bold",
                        marginTop: "20px",
                        marginBottom: "5px",
                      }}
                    >
                      Portfolio
                    </InputLabel>
                    {portfolioFile === null ? (
                      <>
                        <Input
                          type="file"
                          id="portfolio"
                          sx={{ display: "none" }}
                          onChange={(event) =>
                            handleFileChange(event, setPortfolioFile)
                          }
                        />
                        <label htmlFor="portfolio">
                          <Button
                            variant="outlined"
                            component="span"
                            startIcon={<UploadIcon />}
                            sx={{ paddingX: "60px", paddingY: "15px" }}
                          >
                            Upload
                          </Button>
                        </label>
                      </>
                    ) : (
                      <>
                        <label htmlFor="portfolio-cancel">
                          <Button
                            color="error"
                            variant="contained"
                            component="span"
                            startIcon={<ClearIcon />}
                            sx={{ paddingX: "65px", paddingY: "15px" }}
                            onClick={() =>
                              handleFileChangeCancel(setPortfolioFile)
                            }
                          >
                            Clear
                          </Button>
                        </label>
                      </>
                    )}
                  </Stack>
                </Grid>
              </Grid>
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: "flex-end",
            marginBottom: "20px",
            marginRight: "1rem",
          }}
        >
          <Button
            onClick={() => {
              handleCreateClick();
              setCreateClickedTwo(false);
            }}
            variant="contained"
            sx={{
              textTransform: "none",
              borderRadius: "10px",
              paddingRight: "40px",
              paddingLeft: "40px",
              paddingTop: "5px",
              paddingBottom: "5px",
              marginLeft: "15px",
              backgroundColor: "#17A1FA",
              "&:hover": {
                backgroundColor: "#17A1FA",
              },
            }}
          >
            Back
          </Button>
          <Button
            onClick={handleCreateUser}
            variant="contained"
            color="success"
            sx={{
              textTransform: "none",
              borderRadius: "10px",
              paddingRight: "40px",
              paddingLeft: "40px",
              paddingTop: "5px",
              paddingBottom: "5px",
              marginLeft: "15px",
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={1000}
        onClose={() => {
          setSnackbarOpen(false);
          clearData();
          setCreateClickedTwo(false);
          window.location.reload();
        }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        sx={{
          marginTop: "5rem",
        }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={() => {
            setSnackbarOpen(false);
          }}
          severity="success"
        >
          User Created
        </MuiAlert>
      </Snackbar>
    </>
  );
};

export default CreateUser;
