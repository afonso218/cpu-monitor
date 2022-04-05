import { CpuController } from './cpu.controller';
import { CpuService } from './cpu.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [CpuController],
  providers: [CpuService],
})
export class AppModule {}
