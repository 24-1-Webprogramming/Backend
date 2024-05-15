import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { AuthService } from "../auth.service";
import { Strategy } from "passport-local";

@Injectable()
export class LocalServiceStrategy extends PassportStrategy(Strategy, 'local-service') {
    constructor(private authService: AuthService) {
        super({
            usernameField: 'user_id',
            passwordField: 'password',
        });
    }

    async validate(user_id: string, password: string): Promise<any> {
        const user = await this.authService.validateServiceUser(user_id, password);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
