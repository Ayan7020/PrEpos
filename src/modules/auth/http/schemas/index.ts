import { registry } from "@/presentation/http/openapi";

export * from "./RegisterSchema";
export * from "./LoginUserschema";

import {
    CreateUserSchema,
    CreateuserResponse
} from "./RegisterSchema";

import {
    LoginUserSchema,
    LoginUserResponse
} from "./LoginUserschema"

registry.register("CreateUserSchema",CreateUserSchema);
registry.register("CreateuserResponse",CreateuserResponse);

registry.register("LoginUserSchema",LoginUserSchema);
registry.register("LoginUserResponse",LoginUserResponse);