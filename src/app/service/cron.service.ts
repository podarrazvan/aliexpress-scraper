// Nest
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { AliexpressScraperService } from './aliexpress-scraper.service';

@Injectable()
export class CronService {
  private readonly logger = new Logger(CronService.name);

  constructor(private aliexpressScraperService: AliexpressScraperService) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  async cronJobs(): Promise<void> {
    this.logger.log('Cron service started');

    this.aliexpressScraperService.scan();
  }
}
