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
            secretOrKey: "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",
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
        });
    }

    async validate(payload: any) {
        console.log(payload);
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