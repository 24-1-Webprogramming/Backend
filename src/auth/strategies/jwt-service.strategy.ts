import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtServiceStrategy extends PassportStrategy(Strategy, 'jwt-service') {
    constructor(
        private readonly configService: ConfigService
    ) {
        super({
            secretOrKey: configService.get('SECRET_KEY'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
        });
    }

    async validate(payload: any) {
        if (payload.type !== 'access') {
            throw new UnauthorizedException('Invalid token type');
        }
        return {
            user_id: payload.user_id,
            nickname: payload.nickname,
            createAt: payload.createAt
        }
    }
}

@Injectable()
export class JwtRefreshServiceStrategy extends PassportStrategy(Strategy, 'jwt-service') {
    constructor(
        private readonly configService: ConfigService
    ) {
        super({
            secretOrKey: configService.get('SECRET_KEY'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
        });
    }

    async validate(payload: any) {
        return {
            user_id: payload.user_id,
            nickname: payload.nickname,
            createAt: payload.createAt
        }
    }
}