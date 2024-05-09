import { Strategy } from "passport-jwt";
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    constructor();
    validate(payload: any): Promise<{
        userId: any;
        userName: any;
        seq: any;
        role: any;
    }>;
}
export {};
