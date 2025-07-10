import { applyDecorators, SetMetadata, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { Role } from "../../enums/rol.enum";
import { AuthGuard } from "../guard/auth.guard";
import { RolesGuard } from "../guard/roles.guard.ts.guard";
import { Roles, ROLES_KEY } from "./roles.decorator";

export function Auth(role: Role) {
  return applyDecorators(
    Roles(role),
    UseGuards(AuthGuard, RolesGuard),
    ApiBearerAuth(),
  );
}