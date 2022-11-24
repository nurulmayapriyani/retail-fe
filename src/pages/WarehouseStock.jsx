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
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function Product() {
  const [getProducts, setGetProducts] = useState([]);
  const [getCategories, setGetCategories] = useState([]);
  const [ProductId, setProductId] = useState(0);
  const [getStocks, setGetStocks] = useState([]);
  const [warehouseStock, setWarehouseStock] = useState(0);
  const [updatedObj, setUpdatedObj] = useState([]);

  // let a = 250
  // let b = 24
  // let c = a/b
  // console.log(c)
  // let d =Math.floor(c)
  // console.log(d)
  // let e = d*b
  // console.log(a-e)
 

  useEffect(() => {
    fetchProducts();
    fetchStocks();
    fetchCategories()
  }, []);

  async function fetchCategories() {
    try {
      const apiCategories = await axios.get(`${url}/api/category/`);
      const data = apiCategories.data;
      setGetCategories(data);
      // console.log(data);
    } catch (err) {
      console.log(err);
    }
  }

  const fetchProducts = async () => {
    try {
      const apiProduct = await axios.get(`${url}/api/product/`);
      const data = apiProduct.data;
      setGetProducts(data);
      // console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  async function fetchStocks() {
    try {
      const apiStock = await axios.get(`${url}/api/stock/`);
      const data = apiStock.data;
      setGetStocks(data);
      // console.log(data);
    } catch (err) {
      console.log(err);
    }
  }

  const addStock = async (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    try {
      const apiAddStock = await axios.post(`${url}/api/stock/`, {
        warehouseStock,
        ProductId,
      });
      handleCloseAdd();
      fetchProducts();
      fetchStocks();
      setWarehouseStock(0);
    } catch (err) {
      console.log(err);
    }
  };

  const editStock = async () => {
    try {
      await axios.patch(`${url}/api/stock/${updatedObj.id}`, {
        warehouseStock: updatedObj.warehouseStock,
        ProductId: updatedObj.ProductId,
      });
      handleCloseEdit();
      fetchProducts();
      fetchStocks();
    } catch (err) {
      console.log(err);
    }
  };

  function handleProductId(e) {
    setUpdatedObj({
      ...updatedObj,
      ProductId: parseInt(e.target.value),
    });
  }

  function handleStock(e) {
    setUpdatedObj({
      ...updatedObj,
      warehouseStock: e.target.value,
    });
  }

  const deleteStock = async (id) => {
    try {
      await axios.delete(`${url}/api/stock/${id}`);
      fetchProducts();
      fetchStocks();
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
    setRowsPerPage(+event.productSize.value);
    setPage(0);
  };

  const [openEdit, setOpenEdit] = React.useState(false);
  const [openAdd, setOpenAdd] = React.useState(false);

  const handleOpenEdit = (row) => {
    setUpdatedObj(row);
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
          You have {getStocks.length}{" "}
          {getStocks.length > 1 ? "products" : "product"} in warehouse stock
        </span>
        <Button
          style={{ marginLeft: "20px", backgroundColor: "#865439" }}
          variant="contained"
          onClick={handleOpenAdd}
        >
          Add a New Stock
        </Button>
        <Dialog open={openAdd}>
          <DialogTitle>Add a New Stock</DialogTitle>
          <DialogContent>
            <FormControl sx={{ mt: 1, width: "23ch" }} size="small">
              <InputLabel id="demo-select-small">Product</InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                label="Product"
                onChange={(e) => setProductId(parseInt(e.target.value))}
              >
                {getProducts.map((getProduct) => (
                  <MenuItem key={getProduct.id} value={getProduct.id}>
                    {getProduct.productName} {getProduct.productSize}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <br />
            <TextField
              sx={{ mt: 1 }}
              label="Warehouse Stock"
              variant="standard"
              value={warehouseStock}
              onChange={(e) => setWarehouseStock(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAdd}>Cancel</Button>
            <Button onClick={addStock}>Submit</Button>
          </DialogActions>
        </Dialog>
        <Dialog open={openEdit}>
          <DialogTitle>Edit Stock</DialogTitle>
          <DialogContent>
            <FormControl sx={{ mt: 1, width: "23ch" }} size="small">
              <InputLabel id="demo-select-small">Product</InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={updatedObj.ProductId}
                label="Product"
                onChange={handleProductId}
              >
                {getProducts.map((getProduct) => (
                  <MenuItem key={getProduct.id} value={getProduct.id}>
                    {getProduct.productName} {getProduct.productSize}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <br />
            <TextField
              sx={{ mt: 1 }}
              label="Warehouse Stock"
              variant="standard"
              value={updatedObj.warehouseStock}
              onChange={handleStock}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseEdit}>Cancel</Button>
            <Button onClick={editStock}>Edit</Button>
          </DialogActions>
        </Dialog>
        <br />
      </div>
      <div>
        <Paper
          sx={{
            width: "79%",
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
                <TableRow sx={{ minHeight: 50 }}>
                  <TableCell
                    id="categoryId"
                    label="Category"
                    maxWidth="100"
                    align="center"
                  >
                    Category
                  </TableCell>
                  <TableCell
                    id="productName"
                    label="Product Name"
                    maxWidth="100"
                    align="center"
                  >
                    Product Name
                  </TableCell>
                  <TableCell
                    id="productSize"
                    label="Product Size"
                    style={{ maxWidth: 50 }}
                    align="center"
                  >
                    Size
                  </TableCell>
                  <TableCell
                    id="productVolumeInCarton"
                    label="Product Volume (Ctn)"
                    maxWidth="100"
                    align="center"
                  >
                    Volume (Ctn)
                  </TableCell>
                  <TableCell
                    id="productBarcode"
                    label="Product Barcode"
                    maxWidth="100"
                    align="center"
                  >
                    Barcode
                  </TableCell>
                  <TableCell
                    id="productIsActive"
                    label="Active"
                    style={{ maxWidth: 50 }}
                    align="center"
                  >
                    Active
                  </TableCell>
                  <TableCell
                    id="warehouseStock"
                    label="Stock"
                    style={{ maxWidth: 50 }}
                    align="center"
                  >
                    Warehouse Stock (Pcs)
                  </TableCell>
                  <TableCell
                    id="actions"
                    label="Actions"
                    maxWidth="100"
                    align="center"
                  >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {getStocks
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
                          id="categoryId"
                          label="Category"
                          maxWidth="100"
                          align="center"
                        >
                          {row.Category?.categoryName}
                        </TableCell>
                        <TableCell
                          id="productName"
                          label="Product Name"
                          maxWidth="100"
                          align="center"
                        >
                          {row.Product?.productName}
                        </TableCell>
                        <TableCell
                          id="productSize"
                          label="Product Size"
                          style={{ maxWidth: 50 }}
                          align="center"
                        >
                          {row.Product?.productSize}
                        </TableCell>
                        <TableCell
                          id="productVolumeInCarton"
                          label="Product Volume (Ctn)"
                          maxWidth="100"
                          align="center"
                        >
                          {row.Product?.productVolumeInCarton}
                        </TableCell>
                        <TableCell
                          id="productBarcode"
                          label="Product Barcode"
                          maxWidth="100"
                          align="center"
                        >
                          {row.Product?.productBarcode}
                        </TableCell>
                        <TableCell
                          id="productIsActive"
                          label="Active"
                          style={{ maxWidth: 50 }}
                          align="center"
                        >
                          {row.Product?.productIsActive === true ? "Yes" : "No"}
                        </TableCell>
                        <TableCell
                          id="warehouseStock"
                          label="Stock"
                          style={{ maxWidth: 50 }}
                          align="center"
                        >
                          {row.warehouseStock}
                        </TableCell>
                        <TableCell
                          id="actions"
                          label="Actions"
                          maxWidth="100"
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
                              onClick={() => deleteStock(row.id)}
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
            count={getProducts.length}
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
