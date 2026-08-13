import { BadRequestException, HttpException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminEntity } from './entity/admin.entity';
import { AdminDto } from './dto/admin.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Req } from '@nestjs/common';

@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(AdminEntity)
        private readonly adminRepository: Repository<AdminEntity>,
        private readonly jwtService: JwtService,
    ) {}
    
    // admin kayıt işlemi
    async signUp(adminDto: AdminDto): Promise<{ id: number, name: string, email: string }> {
        try {

            const existingAdmin = await this.adminRepository.findOne({ where: { email: adminDto.email } });
            if (existingAdmin) {
                throw new BadRequestException('Email already exists');
            }

            const hashedPassword = await bcrypt.hash(adminDto.password, 10);
            adminDto.password = hashedPassword;

            const admin = this.adminRepository.create(adminDto);
            const savedAdmin = await this.adminRepository.save(admin);

            return {
                id : Number(savedAdmin.id),
                name : savedAdmin.name,
                email : savedAdmin.email,
            };
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException('Failed to sign up');
        }
    }

    // admin giriş işlemi
    async signIn(adminDto: AdminDto): Promise<{ id: number, name: string, email: string, access_token: string }> {
        try {
            const admin = await this.adminRepository.findOne({ where: { email: adminDto.email } });
            if (!admin) {
                throw new BadRequestException('Email not found');
            }

            const isPasswordValid = await bcrypt.compare(adminDto.password, admin.password);
            if (!isPasswordValid) {
                throw new BadRequestException('Password is incorrect');
            }

            const token = this.jwtService.sign({ id: admin.id, name: admin.name, email: admin.email });
        
            return {
                id : Number(admin.id),
                name : admin.name,
                email : admin.email,
                access_token : token,
            };
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }

            throw new InternalServerErrorException('Failed to sign in');
        }
    }

    async profile(adminId: number): Promise<{ id: number, name: string, email: string }> {
        try {
            const admin = await this.adminRepository.findOne({ where: { id: String(adminId) } });
            if (!admin) {
                throw new BadRequestException('Admin not found');
            }
            return {
                id : Number(admin.id),
                name : admin.name,
                email : admin.email,
            };
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException('Failed to get profile');
        }
    }
}
