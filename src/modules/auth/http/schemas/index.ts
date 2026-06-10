import { registry } from "@/presentation/http/openapi/swagger";

export * from "./RegisterSchema";

import {
    CreateUserSchema,
    CreateuserResponse
} from "./RegisterSchema";

registry.register("CreateUserSchema",CreateUserSchema);
registry.register("CreateuserResponse",CreateuserResponse);