import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class LocalServiceStrategy extends AuthGuard('local-service') {}
