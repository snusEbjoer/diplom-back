import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";


@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    canActivate(context: ExecutionContext) {
        return super.canActivate(context)
    }
    handleRequest(err: any, user: any, info: any, context: ExecutionContext, status?: any) {
        if (!user || err){
            throw err || new UnauthorizedException()
        }
        return user
    }
}
