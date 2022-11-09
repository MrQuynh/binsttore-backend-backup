import express from "express";
import userController from "../controllers/userController";
import productController from "../controllers/productController";
import { authorToken } from "../middleWare/JWTAction";

const router = express.Router();

const initWebRoutes = (app) => {
  // user
  router.post("/", (req, res) => {
    return res.json({});
  });
  router.post("/sign-up-user", userController.createANewUser);
  router.post("/login-user", userController.handleLogin);
  router.get("/delete-user", authorToken, userController.handleDeleteUser);
  router.post("/update-user", userController.handleUpdateUser);
  router.get("/get-all-users", authorToken, userController.handleGetAllUsers);

  // products
  router.post("/create-product", productController.createNewProduct);
  router.post("/delete-product", productController.handleDeleteProduct);
  router.put("/update-product", productController.handleUpdateProduct);
  router.get("/get-all-products", productController.handleGetAllProducts);
  router.get("/get-a-product", productController.handleGetAProduct);
  router.get("/get-a-group", productController.handleGetAGroup);
  router.get("/search", productController.handleSearch);

  router.post("/booking-product", productController.handleBookingProduct);

  router.get(
    "/get-booking-product-cart",

    productController.getProductBooking
  );

  return app.use("/", router);
};

module.exports = initWebRoutes;
