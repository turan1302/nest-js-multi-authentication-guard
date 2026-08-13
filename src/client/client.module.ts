import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { ClientEntity } from './entity/client.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ClientJwtStrategies } from './strategies/client-jwt-strategies';

@Module({
  imports: [
    TypeOrmModule.forFeature([ClientEntity]),

    JwtModule.register({
      secret: process.env.JWT_SECRET || 'client-secret',
      signOptions: { expiresIn: '1h' },
    }),
  ],  
  providers: [ClientService, ClientJwtStrategies],
  controllers: [ClientController]
})
export class ClientModule {}
