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
import InputLabel from "@mui/material/InputLabel";
import { useState } from "react";
import { useEffect } from "react";
import Stack from "@mui/material/Stack";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function Target() {
  const [getGroups, setGetGroups] = useState([]);
  // const [getStores, setGetStores] = useState([]);
  const [getTargets, setGetTargets] = useState([]);
  const [targetYear, setTargetYear] = useState(dayjs());
  const [target, setTarget] = useState(0);
  // const [totalStoreOfGroup, setTotalStoreOfGroup] = useState(0);
  const [CustomerGroupId, setCustomerGroupId] = useState(0);
  const [updatedObj, setUpdatedObj] = useState([]);

  // const test = parseInt(dayjs().format('YYYY'))
  // console.log(typeof(test))
  // console.log(test)

  // console.log(targetYear);
  // console.log(targetYear)
  // // console.log(typeof target);

  // console.log(group)

  useEffect(() => {
    getTargetGroups();
    getCustomerGroups();
  }, []);

  async function getCustomerGroups() {
    try {
      const apiGroups = await axios.get(`${url}/api/customergroup/`);
      const data = apiGroups.data;
      setGetGroups(data);
      // console.log(data);
    } catch (err) {
      console.log(err);
    }
  }

  // const getCustomerStores = async () => {
  //   try {
  //     const apiStores = await axios.get(`${url}/api/customerstore/`);
  //     const data = apiStores.data;
  //     setGetStores(data);
  //     console.log(data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const getTargetGroups = async () => {
    try {
      const apiTarget = await axios.get(`${url}/api/target/`);
      const data = apiTarget.data;
      setGetTargets(data);
      // console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const addTargetGroups = async (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    try {
      const apiAddTargets = await axios.post(`${url}/api/target/`, {
        CustomerGroupId,
        targetYear,
        target,
        // totalStoreOfGroup,
      });
      handleCloseAdd();
      getTargetGroups();
      getCustomerGroups();
      // getCustomerStores();
      setTargetYear(dayjs());
    } catch (err) {
      console.log(err);
    }
  };

  // console.log(getStores.storeName.includes(getGroups.groupName))
  // const totalStore = () => {
  // if (getStores.storeName.includes(getGroups.groupName)
  //   // {
  //   //   getStores.CustomerGroupId === getGroups.id
  //   // })
  // }

  // console.log(updatedObj);

  const editTargetGroups = async () => {
    console.log("edit sucks");
    try {
      await axios.patch(`${url}/api/target/${updatedObj.id}`, {
        CustomerGroupId: updatedObj.CustomerGroupId,
        targetYear: updatedObj.targetYear,
        target: updatedObj.target,
        // totalStoreOfGroup: updatedObj.totalStoreOfGroup,
      });
      handleCloseEdit();
      getTargetGroups();
      getCustomerGroups();
    } catch (err) {
      console.log(err);
    }
  };

  function handleChangeGroupId(e) {
    setUpdatedObj({
      ...updatedObj,
      CustomerGroupId: parseInt(e.target.value),
    });
  }

  function handleChangeYear(e) {
    setUpdatedObj({
      ...updatedObj,
      targetYear: e.toISOString().substr(0, 4),
    });
  }

  function handleChangeTarget(e) {
    setUpdatedObj({
      ...updatedObj,
      target: e.target.value,
    });
  }

  const deleteTargetGroups = async (id) => {
    try {
      await axios.delete(`${url}/api/target/${id}`);
      getTargetGroups();
      getCustomerGroups();
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

  const handleOpenEdit = (row) => {
    setOpenEdit(true);
    setUpdatedObj(row);
    // console.log(row);
    let updatedTargetYear = row.targetYear
    console.log(updatedTargetYear) // 2021
    let yearToDate = new Date(row.targetYear, 0, 365);
    console.log(yearToDate); // Fri Dec 31 2021 00:00:00 GMT+0700 (Western Indonesia Time)
    let convert = yearToDate.toLocaleDateString();
    console.log(convert) // 12/31/2021
    if (typeof updatedTargetYear === "number" ){return updatedTargetYear === convert}
    console.log(updatedTargetYear) // not printed
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
          You have {getTargets.length}{" "}
          {getTargets.length > 1 ? "targets" : "target"} in total
        </span>
        <Button
          style={{ marginLeft: "20px", backgroundColor: "#865439" }}
          variant="contained"
          onClick={handleOpenAdd}
        >
          Add a New Target
        </Button>
        <Dialog open={openAdd}>
          <DialogTitle>Add a New Target</DialogTitle>
          <DialogContent>
            <FormControl sx={{ mt: 1, width: "23ch" }} size="small">
              <InputLabel id="demo-select-small">Group Name</InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                label="Group Name"
                onChange={(e) => setCustomerGroupId(parseInt(e.target.value))}
              >
                {getGroups.map((getGroup) => (
                  <MenuItem key={getGroup.id} value={getGroup.id}>
                    {getGroup.groupName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Stack sx={{ mt: 2, width: "23ch" }}>
                <DatePicker
                  views={["year"]}
                  label="Target Year"
                  dateFormats={"year"}
                  toolbarFormat="YYYY"
                  value={targetYear}
                  onChange={(newYear) =>
                    setTargetYear(newYear.toISOString().substr(0, 4))
                  }
                  renderInput={(params) => <TextField {...params} />}
                />
              </Stack>
            </LocalizationProvider>
            <TextField
              sx={{ mt: 1 }}
              label="Target (Rp)"
              variant="standard"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAdd}>Cancel</Button>
            <Button onClick={addTargetGroups}>Submit</Button>
          </DialogActions>
        </Dialog>
        <Dialog open={openEdit}>
          <DialogTitle>Edit Target</DialogTitle>
          <DialogContent>
            <FormControl sx={{ mt: 1, width: "23ch" }} size="small">
              <InputLabel id="demo-select-small">Group Name</InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                label="Group Name"
                value={updatedObj.CustomerGroupId}
                onChange={handleChangeGroupId}
              >
                {getGroups.map((getGroup) => (
                  <MenuItem key={getGroup.id} value={getGroup.id}>
                    {getGroup.groupName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Stack sx={{ mt: 2, width: "23ch" }}>
                <DatePicker
                  views={["year"]}
                  label="Target Year"
                  dateFormats={"year"}
                  toolbarFormat="YYYY"
                  value={updatedObj.targetYear}
                  onChange={handleChangeYear}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Stack>
            </LocalizationProvider>
            <TextField
              sx={{ mt: 1 }}
              label="Target (Rp)"
              variant="standard"
              value={updatedObj.target}
              onChange={handleChangeTarget}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseEdit}>Cancel</Button>
            <Button onClick={editTargetGroups}>Edit</Button>
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
                  <TableCell
                    id="groupName"
                    label="Group Name"
                    minwidth="100"
                    align="center"
                  >
                    Group Name
                  </TableCell>
                  <TableCell
                    id="targetYear"
                    label="Target Year"
                    minWidth="100"
                    align="center"
                  >
                    Target Year
                  </TableCell>
                  <TableCell
                    id="target"
                    label="Target (Rp)"
                    minWidth="100"
                    align="center"
                  >
                    Target (Rp)
                  </TableCell>
                  <TableCell
                    id="totalStore"
                    label="Total Store of Group"
                    minWidth="100"
                    align="center"
                  >
                    Total Store of Group
                  </TableCell>
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
                {getTargets
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
                        <TableCell
                          id="groupName"
                          label="Group Name"
                          minwidth="100"
                          align="center"
                        >
                          {row.Customer_Group?.groupName}
                        </TableCell>
                        <TableCell
                          id="targetYear"
                          label="Target Year"
                          minWidth="100"
                          align="center"
                        >
                          {row.targetYear}
                        </TableCell>
                        <TableCell
                          id="target"
                          label="Target (Rp)"
                          minWidth="100"
                          align="center"
                        >
                          {row.target.toLocaleString("id-ID")}
                        </TableCell>
                        <TableCell
                          id="totalStore"
                          label="Total Store of Group"
                          minWidth="100"
                          align="center"
                        >
                          {/* {row.totalStoreOfgroup} */}
                        </TableCell>
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
                              style={{ backgroundColor: "#865439" }}
                            >
                              Edit
                            </Button>
                            <Button
                              style={{
                                marginLeft: "20px",
                                backgroundColor: "#865439",
                              }}
                              onClick={() => deleteTargetGroups(row.id)}
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
            count={getTargets.length}
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
