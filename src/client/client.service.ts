import { BadRequestException, HttpException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { ClientEntity } from './entity/client.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientDto } from './dto/client.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ClientService {
    constructor(
        @InjectRepository(ClientEntity)
        private readonly clientRepository: Repository<ClientEntity>,
        private readonly jwtService: JwtService,
    ) {}
    
    // admin kayıt işlemi
    async signUp(clientDto: ClientDto): Promise<{ id: number, name: string, email: string }> {
        try {

            const existingClient = await this.clientRepository.findOne({ where: { email: clientDto.email } });
            if (existingClient) {
                throw new BadRequestException('Email already exists');
            }

            const hashedPassword = await bcrypt.hash(clientDto.password, 10);
            clientDto.password = hashedPassword;

            const client = this.clientRepository.create(clientDto);
            const savedClient = await this.clientRepository.save(client);

            return {
                id : Number(savedClient.id),
                name : savedClient.name,
                email : savedClient.email,
            };
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException('Failed to sign up');
        }
    }

    // admin giriş işlemi
    async signIn(clientDto: ClientDto): Promise<{ id: number, name: string, email: string, access_token: string }> {
        try {
            const client = await this.clientRepository.findOne({ where: { email: clientDto.email } });
            if (!client) {
                throw new BadRequestException('Email not found');
            }

            const isPasswordValid = await bcrypt.compare(clientDto.password, client.password);
            if (!isPasswordValid) {
                throw new BadRequestException('Password is incorrect');
            }

            const token = this.jwtService.sign({ id: client.id, name: client.name, email: client.email });
        
            return {
                id : Number(client.id),
                name : client.name,
                email : client.email,
                access_token : token,
            };
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }

            throw new InternalServerErrorException('Failed to sign in');
        }
    }

    async profile(clientId: number): Promise<{ id: number, name: string, email: string }> {
        try {
            const client = await this.clientRepository.findOne({ where: { id: String(clientId) } });
            if (!client) {
                throw new BadRequestException('Client not found');
            }
            return {
                id : Number(client.id),
                name : client.name,
                email : client.email,
            };
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException('Failed to get profile');
        }
    }
}
