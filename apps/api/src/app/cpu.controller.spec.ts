import { Test, TestingModule } from '@nestjs/testing';

import { CpuController } from './cpu.controller';
import { CpuService } from './cpu.service';

describe('CpuController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [CpuController],
      providers: [CpuService],
    }).compile();
  });

  describe('getData', () => {
    it('should return "Welcome to api!"', () => {
      // const appController = app.get<AppController>(AppController);
      // expect(appController.getData()).toEqual({ message: 'Welcome to api!' });
    });
  });
});
