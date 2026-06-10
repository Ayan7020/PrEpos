import { commonErrors, jsonBody, jsonResponse, registry } from "@/presentation/http/openapi";
import { CreateuserResponse, CreateUserSchema, LoginUserResponse, LoginUserSchema } from "./schemas";

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


registry.registerPath({
    method: "post",
    path: "/auth/login",
    tags: ["Auth"],
    summary: "Signin a user",
    request: {
        body: jsonBody(LoginUserSchema),
    },
    responses: {
        200: jsonResponse(LoginUserResponse,"Login Successful"),
        ...commonErrors()
    }
});