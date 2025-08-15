import { BrandEntity } from "./brands.interfaces";

export interface IBrandsRepository {
  getBrandById(brandId: string): Promise<BrandEntity | null>;
  updateBrand(brandId: string, data: Partial<BrandEntity>): Promise<void>;
  delete(id: string): Promise<void>;
}
