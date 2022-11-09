import productService from "../services/productService";

const createNewProduct = async (req, res) => {
  try {
    const data = await productService.createNewProduct(req.body);
    return res.status(200).json(data);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      message: "Error from services...",
    });
  }
};

const handleDeleteProduct = async (req, res) => {
  try {
    const data = await productService.handleDeleteProduct(req.query.id);

    return res.status(200).json(data);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      message: "Error from services...",
    });
  }
};
const handleUpdateProduct = async (req, res) => {
  try {
    const data = await productService.handleUpdateProduct(req.body);
    return res.status(200).json(data);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      message: "Error from services...",
    });
  }
};
const handleGetAllProducts = async (req, res) => {
  try {
    const data = await productService.handleGetAllProducts();

    return res.status(200).json(data);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      message: "Error from services...",
    });
  }
};
const handleGetAProduct = async (req, res) => {
  try {
    const data = await productService.handleGetAProduct(req.query.id);

    return res.status(200).json(data);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      message: "Error from services...",
    });
  }
};
const handleGetAGroup = async (req, res) => {
  try {
    const data = await productService.handleGetAGroup(req.query.type);
    return res.status(200).json(data);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      message: "Error from services...",
    });
  }
};
const handleSearch = async (req, res) => {
  try {
    const data = await productService.handleSearch(req.query.q);
    return res.status(200).json(data);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      message: "Error from services...",
    });
  }
};
const handleBookingProduct = async (req, res) => {
  try {
    const data = await productService.handleBookingProduct(req.body);
    return res.status(200).json(data);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      message: "Error from services...",
    });
  }
};
const getProductBooking = async (req, res) => {
  try {
    const data = await productService.getProductBooking(req.query.id);
    return res.status(200).json(data);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      message: "Error from services...",
    });
  }
};
module.exports = {
  createNewProduct,
  handleDeleteProduct,
  handleGetAllProducts,
  handleUpdateProduct,
  handleGetAProduct,
  handleGetAGroup,
  handleSearch,
  handleBookingProduct,
  getProductBooking,
};
