import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CronService } from './app/service/cron.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const cron = app.get<CronService>(CronService);
  await cron.cronJobs();
}
bootstrap();
