import { PartialType } from '@nestjs/mapped-types';
import { CreatePlantedCropDto } from './create-planted_crop.dto';

export class UpdatePlantedCropDto extends PartialType(CreatePlantedCropDto) {}
