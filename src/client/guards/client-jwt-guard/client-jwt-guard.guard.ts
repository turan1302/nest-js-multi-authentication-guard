import { AuthGuard } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ClientJwtGuard extends AuthGuard('client-jwt') {}