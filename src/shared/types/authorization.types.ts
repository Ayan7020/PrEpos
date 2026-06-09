import { PERMISSIONS, ROLES } from "../authorization";

export type Role = keyof typeof ROLES
export type Permission = keyof typeof PERMISSIONS;