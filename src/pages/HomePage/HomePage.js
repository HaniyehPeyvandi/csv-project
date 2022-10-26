import { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const HomePage = () => {
  const [file, setFile] = useState(null);
  const [csvArray, setCsvArray] = useState([]);

  const fileReader = new FileReader();

  const changeHandler = (e) => {
    setFile(e.target.files[0]);
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

    setCsvArray(newArray);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (file) {
      fileReader.onload = function (event) {
        const csvOutput = event.target.result;
        csvFileToArray(csvOutput);
      };

      fileReader.readAsText(file);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        component="form"
        onSubmit={submitHandler}
        sx={{ bgcolor: "#ccc", pt: 2, pb: 2 }}
      >
        <Button color="secondary" component="label">
          <input accept=".csv" type="file" onChange={changeHandler} />
        </Button>
        <Button type="submit" variant="contained" color="secondary">
          show data
        </Button>
      </Box>
    </Container>
  );
};

export default HomePage;
