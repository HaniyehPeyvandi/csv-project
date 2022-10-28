import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUsersActions } from "../../Providers/UsersProvider";
import styles from "./UploadForm.module.css";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import VisibilityIcon from "@mui/icons-material/Visibility";

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const setUsers = useUsersActions();

  const fileReader = new FileReader();

  const changeHandler = (e) => {
    setFile(e.target.files[0]);
    setError(null);
  };

  const csvFileToArray = (text) => {
    const headers = text.slice(0, text.indexOf("\r")).split(",");
    const rows = text
      .slice(text.indexOf("\n") + 1, text.lastIndexOf("\r"))
      .split("\r\n");

    const newArray = [];

    rows.forEach((row) => {
      const values = row.split(",");

      if (
        values[0].length !== 0 &&
        !isNaN(values[0]) &&
        values[1].length >= 2 &&
        values[2].length >= 2 &&
        /^\d{10}$/.test(values[3])
      ) {
        const object = headers.reduce((obj, header, i) => {
          obj[header] = values[i];
          return obj;
        }, {});
        newArray.push(object);
      }
    });

    setUsers(newArray);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (file) {
      if (file.type === "text/csv") {
        fileReader.onload = function (event) {
          const csvOutput = event.target.result;
          csvFileToArray(csvOutput);
          navigate("/users");
        };
        fileReader.onerror = function (event) {
          setError("File has error");
        };
        fileReader.readAsText(file);
      } else {
        setError("File type is invalid");
      }
    } else {
      setError("Please choose a file");
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Paper component="form" onSubmit={submitHandler} sx={{ p: 2, mt: 3 }}>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Please upload your csv file
        </Typography>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 2 }}
          alignItems={{ xs: "flex-start", sm: "center" }}
          justifyContent={{ sm: "space-between" }}
        >
          <Button
            color="secondary"
            variant="outlined"
            component="label"
            className={styles.fileInputLabel}
          >
            Upload
            <input
              className={styles.fileInput}
              accept=".csv"
              type="file"
              onChange={changeHandler}
            />
          </Button>
          <Button type="submit" variant="contained" color="secondary">
            <VisibilityIcon sx={{ mr: 1 }} />
            show data
          </Button>
        </Stack>
        {error && (
          <Typography variant="body2" sx={{ color: "red", mt: 1 }}>
            {error}
          </Typography>
        )}
      </Paper>
    </Container>
  );
};

export default UploadForm;
