import { Decimal } from '@prisma/client/runtime/library';

export interface TotalFarmsResponse {
  totalFarms: number;
}

export interface TotalHectaresResponse {
  totalHectares: number | Decimal;
}

export interface FarmsByStateResponse {
  state: string;
  farmCount: number;
}

export interface CropsByTypeResponse {
  crop: string;
  plantedCount: number;
}

export interface LandUseResponse {
  arableArea: number | Decimal;
  vegetationArea: number | Decimal;
}
