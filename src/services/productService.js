import db from "../models/index";

import { createJWT, verifyToken } from "../middleWare/JWTAction";
import { sendSimpleEmail } from "./emailService";

const createNewProduct = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.name || !data.image || !data.group) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        const product = await db.Products.create({
          name: data.name,
          image: data.image,
          priceUp: data.priceUp,
          priceDown: data.priceDown,
          group: data.group,

          brain: data.brain,
          sale: data.sale,
          color: data.color,
          rom: data.rom,
          ram: data.ram,
          screen: data.screen,
          card: data.card,
        });
        resolve({ errCode: 0, message: "ok", data: product });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const handleUpdateProduct = (data) => {
  return new Promise(async (resolve, reject) => {
    // console.log(data);
    // console.log("------");
    try {
      if (!data.id) {
        resolve({ errCode: 2, message: "Missing required parameters" });
      }
      let product = await db.Products.findOne({
        where: { id: data.id },
      });
      // console.log(product);
      // return;
      if (product) {
        product.name = data.name;
        product.brain = data.brain;
        product.priceUp = data.priceUp;
        product.priceDown = data.priceDown;
        product.ram = data.ram;
        product.rom = data.rom;
        product.screen = data.screen;
        product.sale = data.sale;
        product.card = data.card;
        product.group = data.group;
        product.image = data.image;
        product.color = data.color;

        const productUpdate = await product.save;
        resolve({
          errCode: 0,
          message: "Update product succeeded",
          data: product,
        });
      } else {
        resolve({
          errCode: 1,
          message: "Product not found",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
const handleDeleteProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({ errCode: 1, message: "Missing parameter" });
      } else {
        const product = await db.Products.findOne({ where: { id } });
        if (!product) {
          resolve({ errCode: 2, message: "Product doesn't exist!" });
        } else {
          await db.Products.destroy({ where: { id } });
          resolve({
            errCode: 0,
            message: "This product has already been deleted",
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};
const handleGetAllProducts = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await db.Products.findAll();
      resolve({
        errCode: 0,
        message: "ok",
        data: data,
      });
    } catch (e) {
      reject(e);
    }
  });
};
const handleGetAProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({ errCode: 2, message: "Missing required parameters" });
      } else {
        const data = await db.Products.findOne({ where: { id: id } });
        resolve({
          errCode: 0,
          message: "ok",
          data: data,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
const handleGetAGroup = (type) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!type) {
        const data = await db.Products.findAll();
        resolve({
          errCode: 0,
          message: "ok",
          data: data,
        });
      } else {
        const data = await db.Products.findAll({ where: { group: type } });
        resolve({
          errCode: 0,
          message: "ok",
          data: data || [],
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
const handleSearch = (q) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await db.Products.findAll();
      let list = [];
      if (data) {
        data.map((item) => {
          if (item.name.toLowerCase().includes(q)) {
            list.push(item);
          }
        });
      }
      resolve({
        errCode: 0,
        message: "ok",
        data: list || [],
      });
    } catch (e) {
      reject(e);
    }
  });
};
const handleBookingProduct = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.name ||
        !data.email ||
        !data.phone ||
        !data.address ||
        !data.listProducts ||
        !data.status
      ) {
        resolve({
          errCode: 2,
          message: "Missing parameter",
        });
      } else {
        let booking = await db.Bookings.create({
          name: data.name,
          email: data.email,
          phone: data.phone,
          status: data.phone,
          address: data.address,
          listProducts: data.listProducts,
        });
        await sendSimpleEmail({
          name: booking.name,
          phone: booking.phone,
          address: booking.address,
          receiverEmail: booking.email,
          redirectLink: `${process.env.URL_REACT}/`,
        });
        resolve({
          errCode: 0,
          message: "ok",
          data: booking,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
const getProductBooking = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 2,
          message: "Missing parameter",
        });
      } else {
        let user = await db.Users.findOne({
          where: { id: id },
        });
        if (!user) {
          resolve({
            errCode: 3,
            message: "User not exist",
          });
        } else {
          let userBooking = await db.Bookings.findOne({
            where: { email: user.email },
          });
          resolve({
            errCode: 0,
            message: "ok",
            data: userBooking.listProducts,
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createNewProduct,
  handleGetAllProducts,
  handleUpdateProduct,
  handleDeleteProduct,
  handleGetAProduct,
  handleGetAGroup,
  handleSearch,
  handleBookingProduct,
  getProductBooking,
};
