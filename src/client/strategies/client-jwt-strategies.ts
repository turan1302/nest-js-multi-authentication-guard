import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";

export class ClientJwtStrategies extends PassportStrategy(Strategy,'client-jwt') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET || 'client-secret',
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