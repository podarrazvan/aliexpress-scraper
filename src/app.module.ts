import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AliexpressScraperService } from './app/service/aliexpress-scraper.service';
import { CronService } from './app/service/cron.service';

@Module({
  imports: [ScheduleModule.forRoot()],
  controllers: [],
  providers: [CronService, AliexpressScraperService],
})
export class AppModule {}
