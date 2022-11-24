import * as React from "react";
import axios from "axios";
import { url } from "../apiurl/url";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useState } from "react";
import { useEffect } from "react";

const columns = [
  {
    id: "storeName",
    label: "Store Name",
    minWidth: 100,
    align: "center",
  },
  {
    id: "storeIsActive",
    label: "Active",
    minWidth: 100,
    align: "center",
    format: (value) => {
      if (value === true) {
        return "Yes";
      } else {
        return "No";
      }
    },
  },
];

export default function CustomerStore() {
  const [getGroups, setGetGroups] = useState([]);
  const [getStores, setGetStores] = useState([]);
  const [storeName, setStoreName] = useState("");
  const [storeIsActive, setStoreIsActive] = useState(false);
  // const [CustomerGroupId, setCustomerGroupId] = useState(0);
  const [currentStore, setCurrentStore] = useState([]);

  useEffect(() => {
    getCustomerStores();
  }, []);

  async function getCustomerGroups(){
    try {
      const apiGroups = await axios.get(`${url}/api/customergroup/`);
      const data = apiGroups.data;
      setGetGroups(data);
    } catch (err) {
      console.log(err);
    }
  };

  const getCustomerStores = async () => {
    try {
      const apiStores = await axios.get(`${url}/api/customerstore/`);
      const data = apiStores.data;
      setGetStores(data);
    } catch (err) {
      console.log(err);
    }
  };

  const addCustomerStores = async (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    try {
      const apiAddStores = await axios.post(`${url}/api/customerstore/`, {
        storeName,
        storeIsActive,
        // CustomerGroupId,
      });
      console.log(apiAddStores);
      handleCloseAdd();
      getCustomerStores();
      getCustomerGroups()
    } catch (err) {
      console.log(err);
    }
  };

  const editCustomerStores = async () => {
    try {
      await axios.patch(`${url}/api/customerstore/${currentStore.id}`, {
        storeName: currentStore.storeName,
        storeIsActive: currentStore.storeIsActive,
      });
      handleCloseEdit();
      getCustomerStores();
    } catch (err) {
      console.log(err);
    }
  };

  function handleChangeName(e) {
    setCurrentStore({
      ...currentStore,
      storeName: e.target.value,
    });
  }

  function handleChangeActive(e) {
    setCurrentStore({
      ...currentStore,
      storeIsActive: e.target.value,
    });
  }

  const deleteCustomerStores = async (id) => {
    try {
      await axios.delete(`${url}/api/customerstore/${id}`);
      getCustomerStores();
    } catch (err) {
      console.log(err);
    }
  };

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [openEdit, setOpenEdit] = React.useState(false);
  const [openAdd, setOpenAdd] = React.useState(false);

  const handleOpenEdit = (store) => {
    setCurrentStore(store);
    setOpenEdit(true);
  };

  const handleOpenAdd = () => {
    setOpenAdd(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

  return (
    <>
      <div style={{ marginLeft: "300px", marginTop: "20px" }}>
        <span>
          You have {getStores.length}{" "}
          {getStores.length > 1 ? "stores" : "store"} in total
        </span>
        <Button
          style={{ marginLeft: "20px", backgroundColor: "#865439" }}
          variant="contained"
          onClick={handleOpenAdd}
        >
          Add a New Store
        </Button>
        <Dialog open={openAdd}>
          <DialogTitle>Add a New Store</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="none"
              id="name"
              label="Store Name"
              variant="standard"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
            />
            <Box
              noValidate
              sx={{
                display: "flex",
                flexDirection: "column",
                mt: 2,
                width: 1,
              }}
            >
              <InputLabel>Active</InputLabel>
              <Select
                value={storeIsActive}
                onChange={(e) => setStoreIsActive(e.target.value)}
              >
                <MenuItem value="false">No</MenuItem>
                <MenuItem value="true">Yes</MenuItem>
              </Select>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAdd}>Cancel</Button>
            <Button onClick={addCustomerStores}>Submit</Button>
          </DialogActions>
        </Dialog>
        <Dialog open={openEdit}>
          <DialogTitle>Edit Store</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="none"
              id="name"
              variant="standard"
              value={currentStore.storeName}
              onChange={handleChangeName}
            />
            <Box
              noValidate
              sx={{
                display: "flex",
                flexDirection: "column",
                mt: 2,
                width: 1,
              }}
            >
              <InputLabel>Active</InputLabel>
              <Select
                value={currentStore.storeIsActive}
                onChange={handleChangeActive}
              >
                <MenuItem value="false">No</MenuItem>
                <MenuItem value="true">Yes</MenuItem>
              </Select>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseEdit}>Cancel</Button>
            <Button onClick={editCustomerStores}>Edit</Button>
          </DialogActions>
        </Dialog>
        <br />
      </div>
      <div>
        <Paper
          sx={{
            width: "78%",
            overflow: "hidden",
            marginLeft: "300px",
            marginRight: "0",
            marginTop: "30px",
            marginBottom: "0",
          }}
        >
          <TableContainer sx={{ maxHeight: 500 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead sx={{ maxHeight: 200 }}>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                  <TableCell
                    id="actions"
                    label="Actions"
                    minwidth="100"
                    align="center"
                  >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {getStores
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    // {console.log(row)}
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === "boolean"
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        })}
                        {console.log(row.storeName)}
                        <TableCell
                          id="actions"
                          label="Actions"
                          minwidth="100"
                          align="center"
                        >
                          <>
                            <Button
                              onClick={() => handleOpenEdit(row)}
                              variant="contained"
                              size="small"
                              style={{backgroundColor: "#865439"}}
                            >
                              Edit
                            </Button>
                            <Button
                              style={{ marginLeft: "20px", backgroundColor: "#865439" }}
                              onClick={() => deleteCustomerStores(row.id)}
                              variant="contained"
                              size="small"
                            >
                              Delete
                            </Button>
                          </>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={getStores.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    </>
  );
}
