import { BUSSINESSTYPE } from "@/generated/prisma/enums";
import { PERMISSIONS, ROLES } from "../authorization";

export type Role = keyof typeof ROLES
export type Permissions = keyof typeof PERMISSIONS;
export type businessType = BUSSINESSTYPE