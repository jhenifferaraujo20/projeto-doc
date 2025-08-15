export interface BrandEntity {
  id: string;
  nome: string;
  orcamentGeral: number;
  orçamentoCampaign: number;
  cmoId: string;
  acessIdList: string[];
  socialMediaIds: string[];
  insightsMarcasIDs: string[];
  campanhaList: string[];
}

export interface BrandResponseDTO {
  id: string;
  nome: string;
  orcamentGeral: number;
  orçamentoCampaign: number;
  cmoId: string;
  acessIdList: string[];
  socialMediaIds: string[];
  insightsMarcasIDs: string[];
  campanhaList: string[];
}