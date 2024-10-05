import express from "express";
import { helloworld,getProducts,putProducts,addProducts,deleteProduct} from "../controller/product.controller.js";

const router = express.Router();

//endpoints
router.get("/helloworld",helloworld);
router.get("/",getProducts);
router.put("/:id",putProducts);
router.post("/", addProducts);
router.delete("/:id",deleteProduct);

export default router;
