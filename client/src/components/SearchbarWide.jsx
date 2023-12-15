import { IconButton, InputAdornment, TextField } from "@mui/material";
import { withStyles } from "@material-ui/core/styles";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

const StyledTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "#17A1FA",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#17A1FA",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "white",
      },
      "&:hover fieldset": {
        borderColor: "black",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#17A1FA",
      },
    },
  },
})(TextField);

const SearchbarWide = () => {
  return (
    <StyledTextField
      id="outlined-basic input-with-icon-adornment"
      fullWidth
      label="Search"
      variant="outlined"
      className="bg-white rounded-full"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton color="black">
              <SearchOutlinedIcon />
            </IconButton>
          </InputAdornment>
        ),
        style: {
          borderRadius: "100px",
        },
      }}
    />
  );
};

export default SearchbarWide;
