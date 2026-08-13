import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";

export class AdminJwtStrategies extends PassportStrategy(Strategy,'admin-jwt') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET || 'admin-secret',
        });
    }

    async validate(payload: any) {
        return {
            id: payload.id,
            name: payload.name,
            email: payload.email,
        }
    }
}