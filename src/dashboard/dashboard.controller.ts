import { Controller, Get } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Dashboard')
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('total-farms')
  @ApiOperation({ summary: 'Get the total number of farms' })
  async getTotalFarms() {
    return await this.dashboardService.getTotalFarms();
  }

  @Get('total-hectares')
  @ApiOperation({ summary: 'Get the total hectares of all farms' })
  async getTotalHectares() {
    return await this.dashboardService.getTotalHectares();
  }

  @Get('farms-by-state')
  @ApiOperation({ summary: 'Get farms grouped by state' })
  async getFarmsByState() {
    return await this.dashboardService.getFarmsByState();
  }

  @Get('crops-by-type')
  @ApiOperation({ summary: 'Get the crops grouped by type' })
  async getCropsByType() {
    return await this.dashboardService.getCropsByType();
  }

  @Get('land-use')
  @ApiOperation({ summary: 'Get land use distribution' })
  async getLandUse() {
    return await this.dashboardService.getLandUse();
  }
}
