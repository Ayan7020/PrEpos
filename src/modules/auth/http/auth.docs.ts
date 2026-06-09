import { commonErrors, jsonBody, jsonResponse, registry } from "@/shared/swagger";
import { CreateuserResponse, CreateUserSchema } from "./schemas";

registry.registerPath({
    method: "post",
    path: "/auth/signup",
    tags: ["Auth"],
    summary: "Register a new user",
    request: {
        body: jsonBody(CreateUserSchema),
    },
    responses: {
        200: jsonResponse(CreateuserResponse,"User registered"),
        ...commonErrors()
    }
});