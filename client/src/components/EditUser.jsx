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
  LinearProgress,
  FormHelperText,
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
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

const EditUser = (props) => {
  const filter = createFilterOptions();
  const {
    editClicked,
    handleClose,
    handleEditClick,
    selectedRow,
    setSelectedRow,
  } = props;
  const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastName, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [address, setAddress] = useState("");
  const [addressError, setAddressError] = useState("");
  const [birthday, setBirthday] = useState(null);
  const [birthdayError, setBirthdayError] = useState(null);
  const [gender, setGender] = useState("");
  const [genderError, setGenderError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [contactNumberError, setContactNumberError] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");
  const [emergencyContactError, setEmergencyContactError] = useState("");
  const [emergencyNumber, setEmergencyNumber] = useState("");
  const [emergencyNumberError, setEmergencyNumberError] = useState("");
  const [relationship, setRelationship] = useState("");
  const [relationshipError, setRelationshipError] = useState("");
  const [relationshipOptions, setRelationshipOptions] = useState([]);
  const [editClickedTwo, setEditClickedTwo] = useState(false);
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [position, setPosition] = useState("");
  const [positionError, setPositionError] = useState("");
  const [positionOptions, setPositionOptions] = useState([]);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("");
  const [roleError, setRoleError] = useState("");
  const [roleOptions, setRoleOptions] = useState([]);
  const [employeeNumber, setEmployeeNumber] = useState("ACX-00-000");
  const [employeeNumberError, setEmployeeNumberError] = useState("");
  const [philhealth, setphilhealth] = useState("");
  const [philhealthError, setphilhealthError] = useState("");
  const [pagibig, setPagibig] = useState("");
  const [pagibigError, setPagibigError] = useState("");
  const [tinnumber, setTinnumber] = useState("");
  const [tinnumberError, setTinnumberError] = useState("");
  const [nbiClearanceFile, setNbiClearanceFile] = useState(null);
  const [nbiClearanceFileError, setNbiClearanceFileError] = useState("");
  const [resumeCvFile, setResumeCvFile] = useState(null);
  const [resumeCvFilError, setResumeCvFileError] = useState("");
  const [portfolioFile, setPortfolioFile] = useState(null);
  const [portfolioFileError, setPortfolioFileError] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [confirmEdit, setConfirmEdit] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleFileChange = (event, setFile, setError) => {
    const selectedFile = event.target.files[0];

    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setError("");
    } else {
      handleSnackbar(true, "error", "Please select a PDF file to proceed.");
      event.target.value = null;
    }
  };

  const onChangeHandler = (e, set, errorSet) => {
    errorSet("");
    set(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "-" && e.target.selectionStart === e.target.selectionEnd) {
      e.preventDefault();
    }
  };

  const onChangeNumberHandler = (e, set, type, gov, setError) => {
    setError("");
    switch (type) {
      case "acx": {
        let input = e.target.value.replace(/[^\dACX-]/g, "");

        if (!input.startsWith("ACX-")) {
          input = "ACX-" + input.slice(3);
        }

        if (input.length <= 10) {
          const dashCount = (input.match(/\-/g) || []).length;

          if (dashCount > 2) {
            input = input.slice(0, input.lastIndexOf("-"));
          }

          if (
            input.length === 6 &&
            input.charAt(5) !== "-" &&
            e.nativeEvent.inputType !== "deleteContentBackward"
          ) {
            input += "-";
          }

          set(input);
        }

        break;
      }
      case "gov": {
        let input = e.target.value.replace(/[^\d-]/g, "");

        switch (gov) {
          case "philhealth": {
            input = input.replace(/(\d{4}(?=\d))/g, "$1-");
            input = input.replace(/-$/, "");
            if (input.length <= 14) {
              set(input);
            }

            break;
          }
          case "pagibig": {
            input = input.replace(/(\d{4}(?=\d))/g, "$1-");
            input = input.replace(/-$/, "");
            if (input.length <= 14) {
              set(input);
            }

            break;
          }
          case "tinnumber": {
            input = input.replace(/(\d{3}(?=\d))/g, "$1-");
            input = input.replace(/-$/, "");
            if (input.length <= 15) {
              set(input);
            }

            break;
          }
        }

        break;
      }
      case "phone": {
        let input = e.target.value.replace(/[^\d+]/g, "");

        if (!input.startsWith("+63")) {
          input = "+63" + input.slice(3);
        }

        if (input.length <= 13) {
          const plusCount = (input.match(/\+/g) || []).length;

          if (plusCount > 1) {
            input = input.slice(0, input.lastIndexOf("+"));
          }

          set(input);
        }

        break;
      }
    }
  };

  const handleBirthdayChange = (date) => {
    setBirthday(date);
  };

  const clearData = () => {
    setUsernameError("");
    setPasswordError("");
    setPositionError("");
    setRoleError("");
    setEmployeeNumberError("");
    setphilhealthError("");
    setPagibigError("");
    setTinnumberError("");
    setNbiClearanceFileError("");
    setResumeCvFileError("");
    setPortfolioFileError("");
    setFirstNameError("");
    setLastNameError("");
    setAddressError("");
    setBirthdayError("");
    setGenderError("");
    setEmailError("");
    setContactNumberError("");
    setEmergencyContactError("");
    setEmergencyNumberError("");
    setRelationshipError("");
  };

  const handleCancelclick = () => {
    handleClose();
    clearData();
    setGender(selectedRow?.gender);
    setRelationship(selectedRow?.relationship.relationship);
    setConfirmEdit(true);
    setSelectedRow(null);
  };

  const handleCancelclickPageTwo = () => {
    clearData();
    setEditClickedTwo(false);
    setConfirmEdit(true);
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
    setIsLoading(true);
    const site = import.meta.env.VITE_SITE;
    const result = await axios.delete(
      `http://${site}:3000/api/user/${selectedRow?._id}`
    );

    if (result.status === 200) {
      setIsLoading(false);
      handleSnackbar(
        true,
        "success",
        "Operation complete. User successfully deleted."
      );
    }
  };

  const notEmpty = (data, field, setDataError) => {
    if (!data) {
      setDataError(`${field} is Required`);
      return false;
    }
    setDataError("");
    return true;
  };

  const phoneNotEmpty = (data, field, setDataError) => {
    if (data === "+63") {
      setDataError(`${field} is Required`);
      return false;
    }
    setDataError("");
    return true;
  };

  const isValidName = (data, field, setDataError) => {
    if (!data) {
      setDataError(`${field} is Required`);
      return false;
    }

    const nameRegex = /^[a-zA-Z\s'-]+$/;

    if (!nameRegex.test(data)) {
      setDataError(
        `${field} should only contain letters, spaces, apostrophes, and hyphens`
      );
      return false;
    }

    setDataError("");
    return true;
  };

  const isValidAddress = (data, field, setDataError) => {
    if (!data) {
      setDataError(`${field} is Required`);
      return false;
    }

    const addressRegex = /^[a-zA-Z0-9\s',.-]+$/;

    if (!addressRegex.test(data)) {
      setDataError(
        `${field} should only contain letters, numbers, spaces, commas, apostrophes, periods, and hyphens`
      );
      return false;
    }

    setDataError("");
    return true;
  };

  const isValidDate = (data, field, setDataError) => {
    if (!data) {
      setDataError(`${field} is Required`);
      return false;
    }

    const dateObject = new Date(data);

    if (isNaN(dateObject.getTime())) {
      setDataError(`${field} is not a valid date`);
      return false;
    }

    setDataError("");
    return true;
  };

  const isValidEmail = (data, field, setDataError) => {
    if (!data) {
      setDataError(`${field} is Required`);
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(data)) {
      setDataError(`${field} is not a valid email address`);
      return false;
    }

    setDataError("");
    return true;
  };

  const isValidPhone = (data, field, setDataError) => {
    if (!data) {
      setDataError(`${field} is Required`);
      return false;
    }

    const numericData = data.replace(/\D/g, "");
    if (numericData.length !== 12) {
      setDataError(`${field} is not a valid phone number`);
      return false;
    }

    setDataError("");
    return true;
  };

  const isValidSelection = (data, field, setDataError) => {
    if (!data || typeof data !== "string") {
      setDataError(`${field} is Required`);
      return false;
    }

    const textRegex = /^[a-zA-Z\s]+$/;

    if (!textRegex.test(data)) {
      setDataError(`${field} should only contain letters and spaces`);
      return false;
    }

    setDataError("");
    return true;
  };

  const validatePageOne = () => {
    const firstNameValid =
      notEmpty(firstName, "First Name", setFirstNameError) &&
      isValidName(firstName, "First Name", setFirstNameError);
    const lastNameValid =
      notEmpty(lastName, "Last Name", setLastNameError) &&
      isValidName(lastName, "Last Name", setLastNameError);
    const addressValid =
      notEmpty(address, "Address", setAddressError) &&
      isValidAddress(address, "Address", setAddressError);
    const birthdayValid =
      notEmpty(birthday, "Birthday", setBirthdayError) &&
      isValidDate(birthday?.$d, "Birthday", setBirthdayError);
    const genderValid = notEmpty(gender, "Gender", setGenderError);
    const emailValid =
      notEmpty(email, "Email Address", setEmailError) &&
      isValidEmail(email, "Email Address", setEmailError);
    const contactNumbervalid =
      phoneNotEmpty(contactNumber, "Contact Number", setContactNumberError) &&
      isValidPhone(contactNumber, "Contact Number", setContactNumberError);
    const emergencyContactValid =
      notEmpty(
        emergencyContact,
        "Emergency Contact",
        setEmergencyContactError
      ) &&
      isValidName(
        emergencyContact,
        "Emergency Contact",
        setEmergencyContactError
      );
    const emergencyNumberValid =
      phoneNotEmpty(
        emergencyNumber,
        "Contact Number",
        setEmergencyNumberError
      ) &&
      isValidPhone(emergencyNumber, "Contact Number", setEmergencyNumberError);
    const relationshipErrorValid =
      notEmpty(relationship, "Relationship", setRelationshipError) &&
      isValidSelection(relationship, "Relationship", setRelationshipError);

    if (
      firstNameValid &&
      lastNameValid &&
      addressValid &&
      birthdayValid &&
      genderValid &&
      emailValid &&
      contactNumbervalid &&
      emergencyContactValid &&
      emergencyNumberValid &&
      relationshipErrorValid
    ) {
      return true;
    }
    return false;
  };

  const employeeNumberValidate = () => {
    if (employeeNumber === "ACX-") {
      setEmployeeNumberError("Employee Number is Required");
      return false;
    }
    if (employeeNumber?.length !== 10) {
      setEmployeeNumberError("Employee Number is not a valid employee number");
      return false;
    }
    setEmployeeNumberError("");
    return true;
  };

  const isValidUsername = (data, field, setDataError) => {
    if (!data || typeof data !== "string") {
      setDataError(`${field} is Required`);
      return false;
    }

    const usernameRegex = /^[a-zA-Z0-9_-]+$/;

    if (!usernameRegex.test(data)) {
      setDataError(
        `${field} should only contain letters, numbers, underscores, and hyphens`
      );
      return false;
    }

    setDataError("");
    return true;
  };

  const isValidGovNumber = (data, field, setDataError) => {
    if (field === "Philhealth" || field === "PAG-IBIG") {
      if (data?.length !== 14) {
        setDataError(`${field} number is not valid`);
        return false;
      }
      setDataError("");
      return true;
    }
    if (field === "Tin Number") {
      if (data?.length !== 15) {
        setDataError(`${field} number is not valid`);
        return false;
      }
      setDataError("");
      return true;
    }
  };

  const ValidatePageTwo = () => {
    const usernameValid =
      notEmpty(username, "Username", setUsernameError) &&
      isValidUsername(username, "Username", setUsernameError);
    const positionValid =
      notEmpty(position, "Position", setPositionError) &&
      isValidSelection(position, "Position", setPositionError);
    const roleValid =
      notEmpty(role, "Role", setRoleError) &&
      isValidSelection(role, "Role", setRoleError);
    const employeeNumberValid = employeeNumberValidate();

    const philhealthValid =
      notEmpty(philhealth, "Philhealth", setphilhealthError) &&
      isValidGovNumber(philhealth, "Philhealth", setphilhealthError);
    const pagibigValid =
      notEmpty(pagibig, "PAG-IBIG", setPagibigError) &&
      isValidGovNumber(pagibig, "PAG-IBIG", setPagibigError);
    const tinnumberValid =
      notEmpty(tinnumber, "Tin Number", setTinnumberError) &&
      isValidGovNumber(tinnumber, "Tin Number", setTinnumberError);
    const nbiClearanceFileValid = notEmpty(
      nbiClearanceFile,
      "NBI Clearance",
      setNbiClearanceFileError
    );
    const resumeCvFileValid = notEmpty(
      resumeCvFile,
      "Resume / CV",
      setResumeCvFileError
    );
    const portfolioFileValid = notEmpty(
      portfolioFile,
      "Portfolio",
      setPortfolioFileError
    );

    if (
      usernameValid &&
      positionValid &&
      roleValid &&
      employeeNumberValid &&
      philhealthValid &&
      pagibigValid &&
      tinnumberValid
      // nbiClearanceFileValid &&
      // resumeCvFileValid &&
      // portfolioFileValid
    ) {
      return true;
    }
    return false;
  };

  const handleEditUser = async () => {
    const passed = ValidatePageTwo() && validatePageOne();

    if (!passed) {
      handleSnackbar(
        true,
        "error",
        "Please provide information in all fields."
      );
      return;
    }
    const formData = new FormData();

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
      setIsLoading(true);
      handleSnackbar(
        true,
        "success",
        "Operation complete. User successfully edited."
      );
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

  const handleSnackbar = (open, severity, message) => {
    if (open === true) {
      setSnackbarOpen(open);
      setSnackbarSeverity(severity);
      setSnackbarMessage(message);
    } else {
      setSnackbarOpen(open);
    }
  };

  useEffect(() => {
    fetchRelationships();
    fetchOptions();
    fetchRoles();
  }, []);

  useEffect(() => {
    if (!!selectedRow) {
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
                  error={!!firstNameError}
                  helperText={firstNameError}
                  disabled={isLoading || confirmEdit}
                  fullWidth
                  id="first-name"
                  variant="outlined"
                  label="First Name"
                  value={firstName}
                  onChange={(e) => {
                    onChangeHandler(e, setFirstName, setFirstNameError);
                  }}
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
                  error={!!addressError}
                  helperText={addressError}
                  disabled={isLoading || confirmEdit}
                  fullWidth
                  id="address"
                  variant="outlined"
                  label="Address"
                  value={address}
                  onChange={(e) => {
                    onChangeHandler(e, setAddress, setAddressError);
                  }}
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
                  error={!!emailError}
                  helperText={emailError}
                  disabled={isLoading || confirmEdit}
                  fullWidth
                  id="email-address"
                  variant="outlined"
                  label="Email Address"
                  value={email}
                  onChange={(e) => {
                    onChangeHandler(e, setEmail, setEmailError);
                  }}
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
                  error={!!lastNameError}
                  helperText={lastNameError}
                  disabled={isLoading || confirmEdit}
                  fullWidth
                  id="last-name"
                  variant="outlined"
                  label="Last Name"
                  value={lastName}
                  onChange={(e) => {
                    onChangeHandler(e, setLastName, setLastNameError);
                  }}
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
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            disabled={isLoading || confirmEdit}
                            label="MM/DD/YYYY"
                            fullWidth
                            value={birthday}
                            slotProps={{
                              field: { clearable: true },
                              textField: {
                                error: !!birthdayError,
                                helperText: birthdayError,
                              },
                            }}
                            renderInput={(params) => {
                              <TextField {...params} />;
                            }}
                            onChange={(newValue) => {
                              handleBirthdayChange(newValue);
                              setBirthdayError("");
                            }}
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
                        <FormControl
                          fullWidth
                          variant="outlined"
                          error={!!genderError}
                        >
                          <InputLabel id="gender-label">Gender</InputLabel>
                          <Select
                            disabled={isLoading || confirmEdit}
                            abelId="gender-label"
                            id="gender"
                            value={gender}
                            onChange={(e) => {
                              onChangeHandler(e, setGender, setGenderError);
                            }}
                            label="Gender"
                          >
                            <MenuItem value="Male">Male</MenuItem>
                            <MenuItem value="Female">Female</MenuItem>
                          </Select>
                          <FormHelperText>{genderError}</FormHelperText>
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
                  error={!!contactNumberError}
                  helperText={contactNumberError}
                  disabled={isLoading || confirmEdit}
                  fullWidth
                  id="contact-number"
                  variant="outlined"
                  label="Enter Number"
                  value={contactNumber}
                  onChange={(e) => {
                    onChangeNumberHandler(
                      e,
                      setContactNumber,
                      "phone",
                      "",
                      setContactNumberError
                    );
                  }}
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
                error={!!emergencyContactError}
                helperText={emergencyContactError}
                disabled={isLoading || confirmEdit}
                fullWidth
                id="first-name"
                variant="outlined"
                label="Enter Full Name"
                value={emergencyContact}
                onChange={(e) => {
                  onChangeHandler(
                    e,
                    setEmergencyContact,
                    setEmergencyContactError
                  );
                }}
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
                error={!!emergencyNumberError}
                helperText={emergencyNumberError}
                disabled={isLoading || confirmEdit}
                fullWidth
                id="emergency-number"
                variant="outlined"
                label="Enter Number"
                value={emergencyNumber}
                onChange={(e) => {
                  onChangeNumberHandler(
                    e,
                    setEmergencyNumber,
                    "phone",
                    "",
                    setEmergencyNumberError
                  );
                }}
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
                disabled={isLoading || confirmEdit}
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                options={relationshipOptions}
                fullWidth
                value={relationship}
                onChange={(event, newValue) => {
                  setRelationshipError("");
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
                    error={!!relationshipError}
                    helperText={relationshipError}
                  />
                )}
                renderOption={(props, option) => (
                  <li {...props}>{option.label}</li>
                )}
              />
            </Grid>
          </Grid>
          {isLoading && <LinearProgress sx={{ marginTop: "40px" }} />}
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
                      error={!!usernameError}
                      helperText={usernameError}
                      disabled={isLoading || confirmEdit}
                      fullWidth
                      id="user-name"
                      variant="outlined"
                      label="Username"
                      value={username}
                      onChange={(e) => {
                        onChangeHandler(e, setUsername, setUsernameError);
                      }}
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
                      error={!!passwordError}
                      helperText={passwordError}
                      disabled={isLoading || confirmEdit}
                      id="password"
                      label="Password"
                      variant="outlined"
                      fullWidth
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => {
                        onChangeHandler(e, setPassword, setPasswordError);
                      }}
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
                      disabled={isLoading || confirmEdit}
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
                      disabled={isLoading || confirmEdit}
                      selectOnFocus
                      clearOnBlur
                      handleHomeEndKeys
                      options={positionOptions}
                      fullWidth
                      value={position}
                      onChange={(event, newValue) => {
                        setPositionError("");
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
                          error={!!positionError}
                          helperText={positionError}
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
                      disabled={isLoading || confirmEdit}
                      selectOnFocus
                      clearOnBlur
                      handleHomeEndKeys
                      options={roleOptions}
                      fullWidth
                      value={role}
                      onChange={(event, newValue) => {
                        setRoleError("");
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
                          error={!!roleError}
                          helperText={roleError}
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
                        error={!!employeeNumberError}
                        helperText={employeeNumberError}
                        onKeyDown={handleKeyDown}
                        disabled={isLoading || confirmEdit}
                        fullWidth
                        id="employee-number"
                        variant="outlined"
                        label="Employee Number"
                        value={employeeNumber}
                        onChange={(e) => {
                          onChangeNumberHandler(
                            e,
                            setEmployeeNumber,
                            "acx",
                            "",
                            setEmployeeNumberError
                          );
                        }}
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
                      error={!!philhealthError}
                      helperText={philhealthError}
                      disabled={isLoading || confirmEdit}
                      fullWidth
                      id="philhealth"
                      variant="outlined"
                      label="Philhealth"
                      value={philhealth}
                      onChange={(e) => {
                        onChangeNumberHandler(
                          e,
                          setphilhealth,
                          "gov",
                          "philhealth",
                          setphilhealthError
                        );
                      }}
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
                      error={!!pagibigError}
                      helperText={pagibigError}
                      disabled={isLoading || confirmEdit}
                      fullWidth
                      id="pag-ibig"
                      variant="outlined"
                      label="PAG-IBIG"
                      value={pagibig}
                      onChange={(e) => {
                        onChangeNumberHandler(
                          e,
                          setPagibig,
                          "gov",
                          "pagibig",
                          setPagibigError
                        );
                      }}
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
                      error={!!tinnumberError}
                      helperText={tinnumberError}
                      disabled={isLoading || confirmEdit}
                      fullWidth
                      id="tin-number"
                      variant="outlined"
                      label="Tin Number"
                      value={tinnumber}
                      onChange={(e) => {
                        onChangeNumberHandler(
                          e,
                          setTinnumber,
                          "gov",
                          "tinnumber",
                          setTinnumberError
                        );
                      }}
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
                          disabled={isLoading || confirmEdit}
                          type="file"
                          id="nbi-clearance"
                          sx={{ display: "none" }}
                          onChange={(event) => {
                            handleFileChange(
                              event,
                              setNbiClearanceFile,
                              setNbiClearanceFileError
                            );
                          }}
                        />
                        <label htmlFor="nbi-clearance">
                          <Button
                            color={nbiClearanceFileError ? "error" : "primary"}
                            disabled={isLoading || confirmEdit}
                            variant="outlined"
                            component="span"
                            startIcon={<UploadIcon />}
                            sx={{ paddingX: "60px", paddingY: "15px" }}
                          >
                            Upload
                          </Button>
                        </label>
                        {nbiClearanceFileError && (
                          <FormHelperText sx={{ color: "#d32f2f" }}>
                            {nbiClearanceFileError}
                          </FormHelperText>
                        )}
                      </>
                    ) : (
                      <>
                        <label htmlFor="nbi-clearance-cancel">
                          <Button
                            disabled={isLoading || confirmEdit}
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
                          disabled={isLoading || confirmEdit}
                          type="file"
                          id="resume-cv"
                          sx={{ display: "none" }}
                          onChange={(event) =>
                            handleFileChange(
                              event,
                              setResumeCvFile,
                              setResumeCvFileError
                            )
                          }
                        />
                        <label htmlFor="resume-cv">
                          <Button
                            color={resumeCvFilError ? "error" : "primary"}
                            disabled={isLoading || confirmEdit}
                            variant="outlined"
                            component="span"
                            startIcon={<UploadIcon />}
                            sx={{ paddingX: "60px", paddingY: "15px" }}
                          >
                            Upload
                          </Button>
                        </label>
                        {resumeCvFilError && (
                          <FormHelperText sx={{ color: "#d32f2f" }}>
                            {resumeCvFilError}
                          </FormHelperText>
                        )}
                      </>
                    ) : (
                      <>
                        <label htmlFor="resume-cv-cancel">
                          <Button
                            disabled={isLoading || confirmEdit}
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
                          disabled={isLoading || confirmEdit}
                          type="file"
                          id="portfolio"
                          sx={{ display: "none" }}
                          onChange={(event) =>
                            handleFileChange(
                              event,
                              setPortfolioFile,
                              setPortfolioFileError
                            )
                          }
                        />
                        <label htmlFor="portfolio">
                          <Button
                            color={portfolioFileError ? "error" : "primary"}
                            disabled={isLoading || confirmEdit}
                            variant="outlined"
                            component="span"
                            startIcon={<UploadIcon />}
                            sx={{ paddingX: "60px", paddingY: "15px" }}
                          >
                            Upload
                          </Button>
                        </label>
                        {portfolioFileError && (
                          <FormHelperText sx={{ color: "#d32f2f" }}>
                            {portfolioFileError}
                          </FormHelperText>
                        )}
                      </>
                    ) : (
                      <>
                        <label htmlFor="portfolio-cancel">
                          <Button
                            disabled={isLoading || confirmEdit}
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
          {isLoading && <LinearProgress sx={{ marginTop: "20px" }} />}
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
          {isLoading && <LinearProgress sx={{ marginTop: "40px" }} />}
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
          if (
            snackbarMessage === "Operation complete. User successfully edited."
          ) {
            handleSnackbar(false, "", "");
            clearData();
            handleEditClick();
            window.location.reload();
            return;
          }
          if (
            snackbarMessage === "Operation complete. User successfully deleted."
          ) {
            handleSnackbar(false, "", "");
            setConfirmDelete(false);
            handleClose();
            window.location.reload();
            return;
          }
          handleSnackbar(false, "", "");
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
            if (
              snackbarMessage ===
              "Operation complete. User successfully edited."
            ) {
              handleSnackbar(false, "", "");
              clearData();
              handleEditClick();
              window.location.reload();
              return;
            }
            if (
              snackbarMessage ===
              "Operation complete. User successfully deleted."
            ) {
              handleSnackbar(false, "", "");
              setConfirmDelete(false);
              handleClose();
              window.location.reload();
              return;
            }
            handleSnackbar(false, "", "");
          }}
          severity={snackbarSeverity}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </>
  );
};

export default EditUser;
