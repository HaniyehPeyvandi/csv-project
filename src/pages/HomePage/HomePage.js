import { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";


const HomePage = () => {
  const [file, setFile] = useState(null);

  const changeHandler = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        component="form"
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
