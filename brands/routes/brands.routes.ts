import { Router } from "express";
import { BrandsController } from "../controllers/brands.controller";
import { getBrandByIdValidator, updateBrandBodyValidator } from "../validators/brands.validators";
import { httpErrorHandlerJoiValidator } from "../../utils/functions/httpErrorHandlerJoiValidator";
import { cmoAuthMiddleware } from "../../middlewares/cmo-auth.middleware";
import { BrandsApplication } from "../application/brands.application";
import { BrandsRepository } from "../repositories/brands.repository";
import { FirestoreFactory } from "../../Factory/firestore.factorie";

const brandsRouter = Router();

const firestoreFactory = new FirestoreFactory();
const brandsRepository = new BrandsRepository(firestoreFactory);
const brandsApplication = new BrandsApplication(brandsRepository);
const brandsController = new BrandsController(brandsApplication);

brandsRouter.use(cmoAuthMiddleware);

brandsRouter.get(
  "/getById/:id",
  async (req, res, next): Promise<void> => {
    const { error } = getBrandByIdValidator.validate(req.params);
    if (error) {
      const { status, msg, data } = httpErrorHandlerJoiValidator(error);
      res.status(status).json({ msg, data });
      return;
    }
    next();
  },
  (req, res) => brandsController.getById(req, res),
);

brandsRouter.put(
  "/update",
  async (req, res, next): Promise<void> => {
    const { error } = updateBrandBodyValidator.validate(req.body);
    if (error) {
      const { status, msg, data } = httpErrorHandlerJoiValidator(error);
      res.status(status).json({ msg, data });
      return;
    }
    next();
  },
  (req, res) => brandsController.update(req, res),
);

brandsRouter.delete(
    "/delete/:id", 
    async (req, res, next): Promise<void> => {
        const { error } = getBrandByIdValidator.validate(req.params);

        if (error) {
            const { status, msg, data } = httpErrorHandlerJoiValidator(error);
            res.status(status).json({ msg, data });
            return;
        }
        next();
    },
    (req, res) => brandsController.deleteBrand(req, res)
);

export default brandsRouter;
