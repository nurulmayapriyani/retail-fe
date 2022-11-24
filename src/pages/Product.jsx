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
  const [productName, setProductName] = useState("");
  const [productSize, setProductSize] = useState("");
  const [productVolumeInCarton, setProductVolumeInCarton] = useState(0);
  const [productBarcode, setProductBarcode] = useState(0);
  const [productBuyPricePcs, setProductBuyPricePcs] = useState(0);
  const [productSellPricePcs, setProductSellPricePcs] = useState(0);
  const [productSellPriceCtn, setProductSellPriceCtn] = useState(0);
  const [productIsActive, setProductIsActive] = useState(false);
  const [getBrands, setGetBrands] = useState([]);
  const [BrandId, setBrandId] = useState(0);
  const [getCategories, setGetCategories] = useState([]);
  const [CategoryId, setCategoryId] = useState(0);
  const [updatedObj, setUpdatedObj] = useState([]);

  useEffect(() => {
    fetchProducts();
    fetchBrands();
    fetchCategories();
  }, []);

  const fetchBrands = async () => {
    try {
      const apiBrands = await axios.get(`${url}/api/brand/`);
      const data = apiBrands.data;
      setGetBrands(data);
    } catch (err) {
      console.log(err);
    }
  };

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

  const addProduct = async (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    try {
      const apiAddProduct = await axios.post(`${url}/api/product/`, {
        CategoryId,
        productName,
        productSize,
        productVolumeInCarton,
        productBarcode,
        productBuyPricePcs,
        productSellPricePcs,
        productSellPriceCtn,
        productIsActive,
      });
      handleCloseAdd();
      fetchProducts();
      fetchCategories();
    } catch (err) {
      console.log(err);
    }
  };

  const editProducts = async () => {
    console.log("edit sucks");
    try {
      await axios.patch(`${url}/api/product/${updatedObj.id}`, {
        CategoryId: updatedObj.CategoryId,
        productName: updatedObj.productName,
        productSize: updatedObj.productSize,
        productVolumeInCarton: updatedObj.productVolumeInCarton,
        productBarcode: updatedObj.productBarcode,
        productBuyPricePcs: updatedObj.productBuyPricePcs,
        productSellPricePcs: updatedObj.productSellPricePcs,
        productSellPriceCtn: updatedObj.productSellPriceCtn,
        productIsActive: updatedObj.productIsActive,
      });
      handleCloseEdit();
      fetchProducts();
      fetchCategories();
    } catch (err) {
      console.log(err);
    }
  };

  function handleCategoryId(e) {
    setUpdatedObj({
      ...updatedObj,
      CategoryId: parseInt(e.target.value),
    });
  }

  function handleProductName(e) {
    setUpdatedObj({
      ...updatedObj,
      productName: e.target.value,
    });
  }

  function handleProductSize(e) {
    setUpdatedObj({
      ...updatedObj,
      productSize: e.target.value,
    });
  }

  function handleVolumeInCtn(e) {
    setUpdatedObj({
      ...updatedObj,
      productVolumeInCarton: e.target.value,
    });
  }

  function handleBarcode(e) {
    setUpdatedObj({
      ...updatedObj,
      productBarcode: e.target.value,
    });
  }

  function handleBuyPricePcs(e) {
    setUpdatedObj({
      ...updatedObj,
      productBuyPricePcs: e.target.value,
    });
  }

  function handleSellPricePcs(e) {
    setUpdatedObj({
      ...updatedObj,
      productSellPricePcs: e.target.value,
    });
  }

  function handleSellPriceCtn(e) {
    setUpdatedObj({
      ...updatedObj,
      productSellPriceCtn: e.target.value,
    });
  }

  function handleIsActive(e) {
    setUpdatedObj({
      ...updatedObj,
      productIsActive: e.target.value,
    });
  }

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${url}/api/product/${id}`);
      fetchProducts();
      fetchCategories();
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
    console.log(row.CategoryId)
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
          You have {getProducts.length}{" "}
          {getProducts.length > 1 ? "products" : "product"} in total
        </span>
        <Button
          style={{ marginLeft: "20px", backgroundColor: "#865439" }}
          variant="contained"
          onClick={handleOpenAdd}
        >
          Add a New Product
        </Button>
        <Dialog open={openAdd}>
          <DialogTitle>Add a New Product</DialogTitle>
          <DialogContent>
            <FormControl sx={{ mt: 1, width: "23ch" }} size="small">
              <InputLabel id="demo-select-small">Category</InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                label="Category"
                onChange={(e) => setCategoryId(parseInt(e.target.value))}
              >
                {getCategories.map((getCategory) => (
                  <MenuItem key={getCategory.id} value={getCategory.id}>
                    {getCategory.categoryName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <br />
            <TextField
              sx={{ mt: 1 }}
              label="Product Name"
              variant="standard"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
            <br />
            <TextField
              sx={{ mt: 1 }}
              label="Product Size"
              variant="standard"
              value={productSize}
              onChange={(e) => setProductSize(e.target.value)}
            />
            <br />
            <TextField
              sx={{ mt: 1 }}
              label="Product Volume (Ctn)"
              variant="standard"
              value={productVolumeInCarton}
              onChange={(e) => setProductVolumeInCarton(e.target.value)}
            />
            <br />
            <TextField
              sx={{ mt: 1 }}
              label="Product Barcode"
              variant="standard"
              value={productBarcode}
              onChange={(e) => setProductBarcode(e.target.value)}
            />
            <br />
            <TextField
              sx={{ mt: 1 }}
              label="Product Buy Price (Pcs)"
              variant="standard"
              value={productBuyPricePcs}
              onChange={(e) => setProductBuyPricePcs(e.target.value)}
            />
            <br />
            <TextField
              sx={{ mt: 1 }}
              label="Product Sell Price (Pcs)"
              variant="standard"
              value={productSellPricePcs}
              onChange={(e) => setProductSellPricePcs(e.target.value)}
            />
            <br />
            <TextField
              sx={{ mt: 1 }}
              label="Product Sell Price (Ctn)"
              variant="standard"
              value={productSellPriceCtn}
              onChange={(e) => setProductSellPriceCtn(e.target.value)}
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
                value={productIsActive}
                onChange={(e) => setProductIsActive(e.target.value)}
              >
                <MenuItem value="false">No</MenuItem>
                <MenuItem value="true">Yes</MenuItem>
              </Select>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAdd}>Cancel</Button>
            <Button onClick={addProduct}>Submit</Button>
          </DialogActions>
        </Dialog>
        <Dialog open={openEdit}>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogContent>
          <FormControl sx={{ mt: 1, width: "23ch" }} size="small">
              <InputLabel id="demo-select-small">Category</InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                label="Category"
                value={updatedObj.CategoryId}
                onChange={handleCategoryId}
              >
                {getCategories.map((getCategory) => (
                  <MenuItem key={getCategory.id} value={getCategory.id}>
                    {getCategory.categoryName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <br />
            <TextField
              sx={{ mt: 1 }}
              label="Product Name"
              variant="standard"
              value={updatedObj.productName}
              onChange={handleProductName}
            />
            <br />
            <TextField
              sx={{ mt: 1 }}
              label="Product Size"
              variant="standard"
              value={updatedObj.productSize}
              onChange={handleProductSize}
            />
            <br />
            <TextField
              sx={{ mt: 1 }}
              label="Product Volume (Ctn)"
              variant="standard"
              value={updatedObj.productVolumeInCarton}
              onChange={handleVolumeInCtn}
            />
            <br />
            <TextField
              sx={{ mt: 1 }}
              label="Product Barcode"
              variant="standard"
              value={updatedObj.productBarcode}
              onChange={handleBarcode}
            />
            <br />
            <TextField
              sx={{ mt: 1 }}
              label="Product Buy Price (Pcs)"
              variant="standard"
              value={updatedObj.productBuyPricePcs}
              onChange={handleBuyPricePcs}
            />
            <br />
            <TextField
              sx={{ mt: 1 }}
              label="Product Sell Price (Pcs)"
              variant="standard"
              value={updatedObj.productSellPricePcs}
              onChange={handleSellPricePcs}
            />
            <br />
            <TextField
              sx={{ mt: 1 }}
              label="Product Sell Price (Ctn)"
              variant="standard"
              value={updatedObj.productSellPriceCtn}
              onChange={handleSellPriceCtn}
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
                value={updatedObj.productIsActive}
                onChange={handleIsActive}
              >
                <MenuItem value="false">No</MenuItem>
                <MenuItem value="true">Yes</MenuItem>
              </Select>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseEdit}>Cancel</Button>
            <Button onClick={editProducts}>Edit</Button>
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
                    id="productBuyPricePcs"
                    label="Buy Price (Pcs)"
                    maxWidth="100"
                    align="center"
                  >
                    Buy Price (Pcs)
                  </TableCell>
                  <TableCell
                    id="productSellPricePcs"
                    label="Sell Price (Pcs)"
                    maxWidth="100"
                    align="center"
                  >
                    Sell Price (Pcs)
                  </TableCell>
                  <TableCell
                    id="productSellPriceCtn"
                    label="Sell Price (Ctn)"
                    maxWidth="100"
                    align="center"
                  >
                    Sell Price (Ctn)
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
                {getProducts
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
                          {row.productName}
                        </TableCell>
                        <TableCell
                          id="productSize"
                          label="Product Size"
                          style={{ maxWidth: 50 }}
                          align="center"
                        >
                          {row.productSize}
                        </TableCell>
                        <TableCell
                          id="productVolumeInCarton"
                          label="Product Volume (Ctn)"
                          maxWidth="100"
                          align="center"
                        >
                          {row.productVolumeInCarton}
                        </TableCell>
                        <TableCell
                          id="productBarcode"
                          label="Product Barcode"
                          maxWidth="100"
                          align="center"
                        >
                          {row.productBarcode}
                        </TableCell>
                        <TableCell
                          id="productBuyPricePcs"
                          label="Buy Price (Pcs)"
                          maxWidth="100"
                          align="center"
                        >
                          {row.productBuyPricePcs.toLocaleString("id-ID")}
                        </TableCell>
                        <TableCell
                          id="productSellPricePcs"
                          label="Sell Price (Pcs)"
                          maxWidth="100"
                          align="center"
                        >
                          {row.productSellPricePcs.toLocaleString("id-ID")}
                        </TableCell>
                        <TableCell
                          id="productSellPriceCtn"
                          label="Sell Price (Ctn)"
                          maxWidth="100"
                          align="center"
                        >
                          {row.productSellPriceCtn.toLocaleString("id-ID")}
                        </TableCell>
                        <TableCell
                          id="productIsActive"
                          label="Active"
                          style={{ maxWidth: 50 }}
                          align="center"
                        >
                          {row.productIsActive === true ? "Yes" : "No"}
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
                              onClick={() => deleteProduct(row.id)}
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
