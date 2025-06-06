import express from "express"
import authMiddleware from "../middlewares/authMiddleware";
import { changeWarehouseStatus, createWarehouse, deleteWarehouse, getWarehouseDropdown, getWarehouses, updateWarehouse } from "../controllers/warehouse.controller";

const router = express.Router();

const asyncHandler = (fn: any) => (req: any, res: any, next: any) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

router.post("/", asyncHandler(authMiddleware), asyncHandler(createWarehouse))
router.put("/:uuid", asyncHandler(authMiddleware), asyncHandler(updateWarehouse)) 
router.get("/", asyncHandler(authMiddleware), asyncHandler(getWarehouses))
router.delete("/:uuid", asyncHandler(authMiddleware), asyncHandler(deleteWarehouse))
router.put("/changeStatus/:uuid", asyncHandler(authMiddleware), asyncHandler(changeWarehouseStatus))
router.get("/getDropdownList", asyncHandler(authMiddleware), asyncHandler(getWarehouseDropdown))

export default router