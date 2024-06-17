import { OnboardService } from './onboard.service';
export declare class OnboardController {
    private onboardService;
    constructor(onboardService: OnboardService);
    setOnboard(body: any, req: any, res: any): Promise<void>;
    checkOnboard(req: any, res: any): Promise<void>;
    deleteOnboard(req: any, res: any): Promise<any>;
}
