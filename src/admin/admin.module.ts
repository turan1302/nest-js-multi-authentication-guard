import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminEntity } from './entity/admin.entity';
import { JwtModule } from '@nestjs/jwt';
import { AdminJwtStrategies } from './strategies/admin-jwt-strategies';

@Module({
  imports: [
    TypeOrmModule.forFeature([AdminEntity]),

    JwtModule.register({
      secret: process.env.JWT_SECRET || 'admin-secret',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AdminService, AdminJwtStrategies],
  controllers: [AdminController]
})
export class AdminModule {}
