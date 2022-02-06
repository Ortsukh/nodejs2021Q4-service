import { JwtService } from '@nestjs/jwt';
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
// import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    try {
        const authorizationHeader = request.headers.authorization;
        if(!authorizationHeader) throw new UnauthorizedException({message: "Unauthorized"})
    
        const authMethod = authorizationHeader.split(' ')[0];
        if(authMethod !== 'Bearer') throw new UnauthorizedException({message: "Unauthorized"})
    
        const token = authorizationHeader.split(' ')[1];
        if(!token) throw new UnauthorizedException({message: "Unauthorized"})
    
        const user = this.jwtService.verify(token);
        
        return true;
    } catch (err) {
        throw new UnauthorizedException({message: "Unauthorized"})
    }
  }
}