import { IBrandsRepository } from "../interfaces/brands.repository.interfaces";
import { BrandEntity } from "../interfaces/brands.interfaces";
import { FirestoreFactory } from "../../Factory/firestore.factorie";

export class BrandsRepository implements IBrandsRepository {
  constructor(private firestoreFactory: FirestoreFactory) {}

  async getBrandById(brandId: string): Promise<BrandEntity | null> {
    const brandDoc = await this.firestoreFactory.db.collection("brands").doc(brandId).get();
    if (!brandDoc.exists) {
      return null;
    }
    return { id: brandDoc.id, ...brandDoc.data() } as BrandEntity;
  }
  async updateBrand(id: string, updateData: Partial<BrandEntity>): Promise<void> {
    const firestore = this.firestoreFactory.db;
    await firestore.collection("brands").doc(id).update(updateData);
  }
  async delete(id: string): Promise<void> {
    try {
      const firestore = this.firestoreFactory.db;
      await firestore.collection("brands").doc(id).delete();
    } catch (error) {
      console.error('Error deleting brand:', error);
      throw new Error('Erro ao deletar marca');
    }
  }
}
