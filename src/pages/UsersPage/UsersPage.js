import { useLocation } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

const UsersPage = () => {
  const { state } = useLocation();
  const { csvArray } = state;

  return (
    <Container component="main" maxWidth="md">
      {csvArray.length ? (
        <TableContainer component={Paper} sx={{ mt: 3 }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Index</TableCell>
                <TableCell align="center">First Name</TableCell>
                <TableCell align="center">Last Name</TableCell>
                <TableCell align="center">User ID</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {csvArray.map((row) => (
                <TableRow key={row.index}>
                  <TableCell align="center">{row.index}</TableCell>
                  <TableCell align="center">{row.firstName}</TableCell>
                  <TableCell align="center">{row.lastName}</TableCell>
                  <TableCell align="center">{row.id}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Paper sx={{ mt: 3, p: 2 }} align="center">
          <Typography variant="h6" gutterBottom>
            No users found.
          </Typography>
        </Paper>
      )}
    </Container>
  );
};

export default UsersPage;
