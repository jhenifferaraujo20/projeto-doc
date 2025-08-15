import { Request, Response } from "express";
import { BrandsApplication } from "../application/brands.application";
import { CMOAuthenticatedRequest } from "../../middlewares/cmo-auth.middleware";

export class BrandsController {
  constructor(private brandsApplication: BrandsApplication) {}

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const cmoId = (req as CMOAuthenticatedRequest).cmoId;
      const brand = await this.brandsApplication.getBrandById(id, cmoId);
      return res.json(brand);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "Brand not found") {
          return res.status(404).json({ message: error.message });
        } else if (error.message === "Permission denied") {
          return res.status(403).json({ message: error.message });
        } else {
          return res.status(500).json({ message: "Internal Server Error" });
        }
      } else {
        return res.status(500).json({ message: "Internal Server Error" });
      }
    }
  }
  async update(req: Request, res: Response) {
    try {
      const cmoId = (req as CMOAuthenticatedRequest).cmoId;

      const { id, ...updateData } = req.body;

      const result = await this.brandsApplication.updateBrand(id, updateData, cmoId);

      return res.status(200).json(result);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "Brand not found") {
          return res.status(404).json({ message: error.message });
        } else if (error.message === "Permission denied") {
          return res.status(403).json({ message: error.message });
        } else {
          return res.status(500).json({ message: "Internal Server Error" });
        }
      } else {
        return res.status(500).json({ message: "Internal Server Error" });
      }
    }
  }
  async deleteBrand(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const cmoId = (req as CMOAuthenticatedRequest).cmoId;

      const result = await this.brandsApplication.deleteBrand(id, cmoId);

      return res.status(200).json(result);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "Brand not found") {
          return res.status(404).json({ message: error.message });
        } else if (error.message === "Permission denied") {
          return res.status(403).json({ message: error.message });
        } else {
          return res.status(500).json({ message: "Internal Server Error" });
        }
      } else {
        return res.status(500).json({ message: "Internal Server Error" });
      }
    }
  }
}
