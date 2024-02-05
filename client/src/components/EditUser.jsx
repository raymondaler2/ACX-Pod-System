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
import {
  TroubleshootOutlined,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import UploadIcon from "@mui/icons-material/Upload";
import ClearIcon from "@mui/icons-material/Clear";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

const EditUser = (props) => {
  const filter = createFilterOptions();
  const { editClicked, handleClose, handleEditClick, selectedRow } = props;
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
  const [editClickedTwo, setEditClickedTwo] = useState(false);
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
  const [snackbarOpenDeleted, setSnackbarOpenDeleted] = useState(false);
  const [confirmEdit, setConfirmEdit] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState(false);

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

  const handleCancelclick = () => {
    handleClose();
  };

  const handleCancelclickPageTwo = () => {
    setEditClickedTwo(false);
  };

  const handleNext = () => {
    setEditClickedTwo(true);
    handleClose();
  };

  const handleConfirmEdit = () => {
    setConfirmEdit(!confirmEdit);
  };

  const handleUserDelete = () => {
    setConfirmDelete(true);
  };

  const handleOnDelete = async () => {
    const site = import.meta.env.VITE_SITE;
    const result = await axios.delete(
      `http://${site}:3000/api/user/${selectedRow?._id}`
    );

    if (result.status === 200) {
      setSnackbarOpenDeleted(true);
    }
  };

  const handleEditUser = async () => {
    const parsedDate = dayjs(selectedRow?.birthday);

    const selectedRowValues = {
      first_name: selectedRow?.firstName,
      last_name: selectedRow?.lastName,
      address: selectedRow?.address,
      birthday: parsedDate,
      gender: selectedRow?.gender,
      email: selectedRow?.email,
      contact_number: selectedRow?.contact_number,
      emergency_contact: selectedRow?.emergency_contact,
      emergency_number: selectedRow?.emergency_number,
      relationship: selectedRow?.relationship?.relationship,
      username: selectedRow?.username,
      position: selectedRow?.position,
      role: selectedRow?.role,
      employee_number: selectedRow?.employee_number,
      philhealth: selectedRow?.philhealth,
      pagibig: selectedRow?.pagibig,
      tin_number: selectedRow?.tin_number,
      pod_designation: "Edda POD",
    };

    const data = {
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
      // nbi_clearance: nbiClearanceFile,
      // resume_cv: resumeCvFile,
      // portfolio: portfolioFile,
      pod_designation: "Edda POD",
    };

    Object.keys(data).forEach((key) => {
      if (data[key] === selectedRowValues[key]) {
        delete data[key];
      }
    });

    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value !== "")
    );

    const site = import.meta.env.VITE_SITE;
    const result = await axios.put(
      `http://${site}:3000/api/user/${selectedRow?._id}`,
      filteredData
    );

    if (result.status === 200) {
      setSnackbarOpen(true);
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

  const fetchUserData = () => {
    const parsedDate = dayjs(selectedRow?.birthday);

    setFirstName(selectedRow?.firstName);
    setLastName(selectedRow?.lastName);
    setAddress(selectedRow?.address);
    setBirthday(parsedDate);
    setGender(selectedRow?.gender);
    setEmail(selectedRow?.email);
    setContactNumber(selectedRow?.contact_number);
    setEmergencyContact(selectedRow?.emergency_contact);
    setEmergencyNumber(selectedRow?.emergency_number);
    setRelationship(selectedRow?.relationship?.relationship);
    setUsername(selectedRow?.username);
    setPosition(selectedRow?.position);
    setRole(selectedRow?.role);
    setEmployeeNumber(selectedRow?.employee_number);
    setphilhealth(selectedRow?.philhealth);
    setPagibig(selectedRow?.pagibig);
    setTinnumber(selectedRow?.tin_number);
  };

  useEffect(() => {
    fetchRelationships();
    fetchOptions();
    fetchRoles();
  }, []);

  useEffect(() => {
    if (!firstName) {
      fetchUserData();
    }
  }, [selectedRow]);

  return (
    <>
      <Dialog
        maxWidth="xl"
        open={editClicked}
        PaperProps={{ style: customDialogStyles }}
      >
        <DialogTitle>
          <Grid container>
            <Grid item xs={10.9}>
              <Stack direction="row">
                <p className="font-bold text-[28px] mb-[20px]">Edit User</p>
              </Stack>
            </Grid>
            <Grid item xs={1.1}>
              <Stack direction="row">
                <IconButton
                  color="#f44336"
                  variant="contained"
                  onClick={handleUserDelete}
                >
                  <DeleteOutlineOutlinedIcon sx={{ color: "#f44336" }} />
                </IconButton>
                <IconButton
                  color="#388e3c"
                  variant="contained"
                  onClick={handleConfirmEdit}
                >
                  <EditOutlinedIcon
                    sx={confirmEdit ? { color: "gray" } : { color: "#388e3c" }}
                  />
                </IconButton>
                <IconButton
                  color="black"
                  variant="contained"
                  onClick={handleCancelclick}
                >
                  <CloseIcon sx={{ color: "black" }} />
                </IconButton>
              </Stack>
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
                  disabled={confirmEdit}
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
                  disabled={confirmEdit}
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
                  disabled={confirmEdit}
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
                  disabled={confirmEdit}
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
                            disabled={confirmEdit}
                            label="MM/DD/YYYY"
                            fullWidth
                            value={birthday ?? null}
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
                            disabled={confirmEdit}
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
                  disabled={confirmEdit}
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
                disabled={confirmEdit}
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
                disabled={confirmEdit}
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
                disabled={confirmEdit}
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
          <Button
            disabled={confirmEdit}
            onClick={handleEditUser}
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
      <Dialog
        maxWidth="xl"
        open={editClickedTwo}
        PaperProps={{ style: customDialogStyles }}
      >
        <DialogTitle>
          <Grid container>
            <Grid item xs={11}>
              <Stack direction="row">
                <p className="font-bold text-[28px] mb-[20px]">Edit User</p>
              </Stack>
            </Grid>
            <Grid item xs={1}>
              <Stack direction="row">
                <IconButton
                  color="#f44336"
                  variant="contained"
                  onClick={handleUserDelete}
                >
                  <DeleteOutlineOutlinedIcon sx={{ color: "#f44336" }} />
                </IconButton>
                <IconButton
                  color="#388e3c"
                  variant="contained"
                  onClick={handleConfirmEdit}
                >
                  <EditOutlinedIcon
                    sx={confirmEdit ? { color: "gray" } : { color: "#388e3c" }}
                  />
                </IconButton>
                <IconButton
                  color="black"
                  variant="contained"
                  onClick={handleCancelclickPageTwo}
                >
                  <CloseIcon sx={{ color: "black" }} />
                </IconButton>
              </Stack>
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
                      disabled={confirmEdit}
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
                      disabled={confirmEdit}
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
                      disabled={confirmEdit}
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
                      disabled={confirmEdit}
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
                      disabled={confirmEdit}
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
                        disabled={confirmEdit}
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
                      disabled={confirmEdit}
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
                      disabled={confirmEdit}
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
                      disabled={confirmEdit}
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
                          disabled={confirmEdit}
                          type="file"
                          id="nbi-clearance"
                          sx={{ display: "none" }}
                          onChange={(event) => {
                            handleFileChange(event, setNbiClearanceFile);
                          }}
                        />
                        <label htmlFor="nbi-clearance">
                          <Button
                            disabled={confirmEdit}
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
                            disabled={confirmEdit}
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
                          disabled={confirmEdit}
                          type="file"
                          id="resume-cv"
                          sx={{ display: "none" }}
                          onChange={(event) =>
                            handleFileChange(event, setResumeCvFile)
                          }
                        />
                        <label htmlFor="resume-cv">
                          <Button
                            disabled={confirmEdit}
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
                            disabled={confirmEdit}
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
                          disabled={confirmEdit}
                          type="file"
                          id="portfolio"
                          sx={{ display: "none" }}
                          onChange={(event) =>
                            handleFileChange(event, setPortfolioFile)
                          }
                        />
                        <label htmlFor="portfolio">
                          <Button
                            disabled={confirmEdit}
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
                            disabled={confirmEdit}
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
            marginRight: "1.5rem",
          }}
        >
          <Button
            onClick={() => {
              handleEditClick();
              setEditClickedTwo(false);
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
            disabled={confirmEdit}
            onClick={handleEditUser}
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
      <Dialog
        open={confirmDelete}
        PaperProps={{
          style: {
            minWidth: "50rem",
            borderRadius: "40px",
            padding: "20px",
          },
        }}
      >
        <DialogTitle>
          <p className="font-bold text-[28px] mb-[20px]">Confirmation</p>
        </DialogTitle>
        <DialogContent>
          <p className="mt-[5px] mb-[5px]">
            Are you sure you want to delete this user?
          </p>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setConfirmDelete(false);
            }}
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
            No
          </Button>
          <Button
            onClick={handleOnDelete}
            variant="contained"
            color="error"
            sx={{
              textTransform: "none",
              borderRadius: "10px",
              paddingRight: "30px",
              paddingLeft: "30px",
              paddingTop: "5px",
              paddingBottom: "5px",
              marginLeft: "15px",
            }}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={1000}
        onClose={() => {
          setSnackbarOpen(false);
          setEditClickedTwo(false);
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
          User Edited
        </MuiAlert>
      </Snackbar>
      <Snackbar
        open={snackbarOpenDeleted}
        autoHideDuration={1000}
        onClose={() => {
          setSnackbarOpenDeleted(false);
          setConfirmDelete(false);
          setEditClickedTwo(false);
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
            setSnackbarOpenDeleted(false);
          }}
          severity="success"
        >
          User Deleted
        </MuiAlert>
      </Snackbar>
    </>
  );
};

export default EditUser;
