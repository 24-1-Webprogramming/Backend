import { ConfigService } from "@nestjs/config";
import { Strategy } from "passport-jwt";
declare const JwtServiceStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtServiceStrategy extends JwtServiceStrategy_base {
    private readonly configService;
    constructor(configService: ConfigService);
    validate(payload: any): Promise<{
        user_id: any;
        nickname: any;
        createAt: any;
    }>;
}
declare const JwtRefreshServiceStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtRefreshServiceStrategy extends JwtRefreshServiceStrategy_base {
    private readonly configService;
    constructor(configService: ConfigService);
    validate(payload: any): Promise<{
        user_id: any;
        nickname: any;
        createAt: any;
    }>;
}
export {};
