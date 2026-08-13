import { Controller, Post, Get, Query, Body, UseGuards, Req } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientDto } from './dto/client.dto';
import { ClientJwtGuard } from './guards/client-jwt-guard/client-jwt-guard.guard';

@Controller('client')
export class ClientController {
    constructor(private readonly clientService: ClientService) {}

    @Post('signup')
    async signUp(@Body() clientDto: ClientDto): Promise<{ id: number, name: string, email: string }> {
        return this.clientService.signUp(clientDto);
    }

    @Post('signin')
    async signIn(@Body() clientDto: ClientDto): Promise<{ id: number, name: string, email: string, access_token: string }> {
        return this.clientService.signIn(clientDto);
    }

    @Get('profile')
    @UseGuards(ClientJwtGuard)
    async profile(@Req() req: any): Promise<{ id: number, name: string, email: string }> {
        return this.clientService.profile(Number(req.user.id));
    }
}
