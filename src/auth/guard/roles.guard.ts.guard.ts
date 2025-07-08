import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(private readonly refletor: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean {

    const requiredRoles = this.refletor.getAllAndOverride(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) return true;

    const user = context.switchToHttp().getRequest().user;

    return Array.isArray(requiredRoles)
      ? requiredRoles.includes(user.rol)
      : requiredRoles === user.rol;
  }
}
