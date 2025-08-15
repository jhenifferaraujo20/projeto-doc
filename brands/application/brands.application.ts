import { IBrandsRepository } from '../interfaces/brands.repository.interfaces';
import { BrandResponseDTO, BrandEntity } from '../interfaces/brands.interfaces';

export class BrandsApplication {
  constructor(private brandsRepository: IBrandsRepository) {}

  async getBrandById(
    brandId: string,
    cmoId: string,
  ): Promise<BrandResponseDTO> {
    const brand = await this.brandsRepository.getBrandById(brandId);
    if (!brand || !brand.id) {
      throw new Error('Brand not found');
    }
    if (brand.cmoId !== cmoId) {
      throw new Error('Permission denied');
    }
    return brand as BrandResponseDTO;
  }

  async updateBrand(
    brandId: string,
    updateData: Partial<BrandEntity>,
    cmoId: string,
  ): Promise<{ id: string; updatedFields: Partial<BrandEntity> }> {
    const existingBrand = await this.brandsRepository.getBrandById(brandId);

    if (!existingBrand || !existingBrand.id) {
      throw new Error('Brand not found');
    }

    if (existingBrand.cmoId !== cmoId) {
      throw new Error('Permission denied');
    }
    await this.brandsRepository.updateBrand(brandId, updateData);

    return {
      id: brandId,
      updatedFields: updateData,
    };
  }

  async deleteBrand(
    id: string,
    cmoId: string,
  ): Promise<{ id: string; nome: string }> {
    try {
      const existingBrand = await this.brandsRepository.getBrandById(id);
      if (!existingBrand) {
        throw new Error('BRAND_NOT_FOUND');
      }

      if (existingBrand.cmoId !== cmoId) {
        throw new Error('UNAUTHORIZED_CMO');
      }

      await this.brandsRepository.delete(id);

      return { id, nome: existingBrand.nome };
    } catch (error) {
      console.error('Error in BrandsApplication.deleteBrand:', error);
      throw error;
    }
  }
}
