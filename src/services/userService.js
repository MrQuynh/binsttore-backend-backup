import db from "../models/index";
import bcrypt from "bcryptjs";
import { createJWT, verifyToken } from "../middleWare/JWTAction";

const salt = bcrypt.genSaltSync(10);
const hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};
const checkUserEmail = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.Users.findOne({ where: { email: email } });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

const createANewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.email ||
        !data.password ||
        !data.nickName ||
        !data.phoneNumber ||
        !data.image
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        const check = await checkUserEmail(data.email);
        if (check === true) {
          resolve({
            errCode: 1,
            message: "Your email is already in used, Plz try an other email!",
          });
        } else {
          const hashPasswordFromBcrypt = await hashUserPassword(data.password);
          const user = await db.Users.create({
            email: data.email,
            password: hashPasswordFromBcrypt,
            nickName: data.nickName,
            image: data.image,
            role: "R1",
            phoneNumber: data.phoneNumber,
          });
          const token = createJWT(user.id);
          delete user.password;
          delete user.role;
          resolve({
            errCode: 0,
            data: user,
            token: token,
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};
const handleLogin = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      if (!data.email || !data.password) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        const isExist = await checkUserEmail(data.email);
        if (isExist) {
          const user = await db.Users.findOne({
            where: { email: data.email },
          });
          if (user) {
            const check = await bcrypt.compareSync(
              data.password,
              user.password
            );
            if (check) {
              userData.errCode = 0;
              userData.errMessage = "Ok";
              const token = createJWT(user.id);
              delete user.password;
              userData.data = user;
              userData.token = token;
            } else {
              userData.errCode = 3;
              userData.errMessage = "Wrong password!";
            }
          } else {
            userData.errCode = 2;
            userData.errMessage = `User not found! Plz try again!`;
          }
        } else {
          userData.errCode = 1;
          userData.errMessage = `Your's email isn't exist. Plz try other email!`;
        }
        resolve(userData);
      }
    } catch (e) {
      reject(e);
    }
  });
};
const handleUpdateUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      // if (
      //   !data.id ||
      //   !data.nickName ||
      //   !data.address ||
      //   !data.phoneNumber ||
      //   !data.image
      // ) {
      //   resolve({ errCode: 2, message: "Missing required parameters" });
      // }
      let user = await db.Users.findOne({
        where: { id: data.id },
      });
      // console.log(user);
      // return;
      if (user) {
        user.nickName = data.nickName;
        user.address = data.address;
        user.phoneNumber = data.phoneNumber;
        user.image = data.image;

        await user.save();

        resolve({
          errCode: 0,
          message: "Update user succeeded",
          data: user,
        });
      } else {
        resolve({
          errCode: 1,
          message: "User not found",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
const handleDeleteUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({ errCode: 1, message: "Missing parameter" });
      } else {
        const user = await db.Users.findOne({ where: { id } });
        if (!user) {
          resolve({ errCode: 2, message: "User doesn't exist!" });
        } else {
          await db.Users.destroy({ where: { id } });
          resolve({
            errCode: 0,
            message: "This user has already been deleted",
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};
const handleGetAllUsers = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const userLogin = await db.Users.findOne({ where: { id } });
      if (!userLogin) {
        resolve({ errCode: 403, errMessage: "access denied" });
      } else {
        const data = await db.Users.findAll({
          attributes: {
            exclude: ["password"],
          },
        });
        resolve({
          errCode: 0,
          message: "ok",
          data,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  createANewUser,
  handleLogin,
  handleGetAllUsers,
  handleUpdateUser,
  handleDeleteUser,
};
