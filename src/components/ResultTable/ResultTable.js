import { useEffect, useState } from "react";
import { useUsers } from "../../Providers/UsersProvider";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import TagOutlinedIcon from "@mui/icons-material/TagOutlined";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import InputAdornment from "@mui/material/InputAdornment";
import CircularProgress from "@mui/material/CircularProgress";

const ResultTable = () => {
  const csvArray = useUsers();

  const [loading, setLoading] = useState(true);

  const [searchValue, setSearchValue] = useState("");

  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // This function handles changing the pages
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // This function handles changing rows per page option
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows
  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, filteredUsers.length - page * rowsPerPage);

  useEffect(() => {
    setUsers(csvArray);
    setFilteredUsers(csvArray);

    // Set timer intentionally to be able to see loading spinner
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  // This function filters users based on search item
  const filterUsers = (search) => {
    if (!search || search === "") {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter((user) => {
        return (
          user.firstName.toLowerCase().includes(search.toLowerCase()) ||
          user.lastName.toLowerCase().includes(search.toLowerCase())
        );
      });
      setFilteredUsers(filtered);
    }
  };

  const searchHandler = (e) => {
    setPage(0);
    setSearchValue(e.target.value);
    let search = e.target.value;
    filterUsers(search);
  };

  return (
    <Container component="main" maxWidth="md">
      <Box sx={{ mt: 3 }}>
        <TextField
          fullWidth
          label="Search"
          color="secondary"
          onChange={searchHandler}
          value={searchValue}
          placeholder="Enter first name or last name"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchOutlinedIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      {loading ? (
        <Paper sx={{ mt: 3, p: 2 }} align="center">
          <CircularProgress color="secondary" />
        </Paper>
      ) : users.length ? (
        <TableContainer component={Paper} sx={{ mt: 3, mb: 3 }}>
          <Table aria-label="simple table">
            <TableHead sx={{ backgroundColor: "#FFEA79" }}>
              <TableRow>
                <TableCell align="center">
                  <TagOutlinedIcon
                    fontSize="small"
                    sx={{ mr: 1, verticalAlign: "middle" }}
                  />
                  Index
                </TableCell>
                <TableCell align="center">
                  <AccountCircleOutlinedIcon
                    fontSize="small"
                    sx={{ mr: 1, verticalAlign: "middle" }}
                  />
                  First Name
                </TableCell>
                <TableCell align="center">
                  <AccountCircleOutlinedIcon
                    fontSize="small"
                    sx={{ mr: 1, verticalAlign: "middle" }}
                  />
                  Last Name
                </TableCell>
                <TableCell align="center">
                  <AssignmentIndOutlinedIcon
                    fontSize="small"
                    sx={{ mr: 1, verticalAlign: "middle" }}
                  />
                  User ID
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.length ? (
                filteredUsers
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow key={row.index}>
                      <TableCell align="center">{row.index}</TableCell>
                      <TableCell align="center">
                        {searchValue === "" ? (
                          row.firstName
                        ) : row.firstName
                            .toLowerCase()
                            .includes(searchValue.toLowerCase()) ? (
                          <strong style={{ color: "#7b1fa2" }}>
                            {row.firstName}
                          </strong>
                        ) : (
                          row.firstName
                        )}
                      </TableCell>
                      <TableCell align="center">
                        {searchValue === "" ? (
                          row.lastName
                        ) : row.lastName
                            .toLowerCase()
                            .includes(searchValue.toLowerCase()) ? (
                          <strong style={{ color: "#7b1fa2" }}>
                            {row.lastName}
                          </strong>
                        ) : (
                          row.lastName
                        )}
                      </TableCell>
                      <TableCell align="center">{row.id}</TableCell>
                    </TableRow>
                  ))
              ) : (
                <TableRow>
                  <TableCell align="center" colSpan={4}>
                    No user found in search
                  </TableCell>
                </TableRow>
              )}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={4} />
                </TableRow>
              )}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50, 100]}
            component="div"
            count={filteredUsers.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#FFEA79",
            }}
          />
        </TableContainer>
      ) : (
        <Paper sx={{ mt: 3, p: 2 }} align="center">
          <Typography variant="h6">No user found</Typography>
        </Paper>
      )}
    </Container>
  );
};

export default ResultTable;
