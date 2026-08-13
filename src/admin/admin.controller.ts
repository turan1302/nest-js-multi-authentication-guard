import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminDto } from './dto/admin.dto';
import { AdminJwtGuard } from './guards/admin-jwt-guard/admin-jwt-guard.guard';

@Controller('admin')
export class AdminController {

    constructor(private readonly adminService: AdminService) {}

    @Post('signup')
    async signUp(@Body() adminDto: AdminDto): Promise<{ id: number, name: string, email: string }> {
        return this.adminService.signUp(adminDto);
    }

    @Post('signin')
    async signIn(@Body() adminDto: AdminDto): Promise<{ id: number, name: string, email: string }> {
        return this.adminService.signIn(adminDto);
    }

    @Get('profile')
    @UseGuards(AdminJwtGuard)
    async profile(@Req() req: any): Promise<{ id: number, name: string, email: string }> {
        return this.adminService.profile(Number(req.user.id));
    }
}
