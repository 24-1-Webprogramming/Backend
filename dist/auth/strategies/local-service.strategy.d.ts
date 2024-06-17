import { AuthService } from "../auth.service";
import { Strategy } from "passport-local";
declare const LocalServiceStrategy_base: new (...args: any[]) => Strategy;
export declare class LocalServiceStrategy extends LocalServiceStrategy_base {
    private authService;
    constructor(authService: AuthService);
    validate(user_id: string, password: string): Promise<any>;
}
export {};
