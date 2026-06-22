# Code Standards & Architectural Rules

This document outlines the coding standards, patterns, and quality guidelines for the **PrEpos** codebase. Developers must adhere to these rules when refactoring or extending the project.

---

## 1. Architectural Architecture & Layer Boundaries

The codebase follows **Clean Architecture** and **Domain-Driven Design (DDD)**. Strict separation of concerns must be maintained between the layers.

### Layer Dependencies
* Dependencies must only point inwards: `Presentation -> Application -> Domain <- Infrastructure`.
* **Domain Layer** must have zero external dependencies on databases, HTTP libraries, or framework-specific utilities.

### Module Structure
Each business domain resides in its own folder under `src/modules/`. Under each module, the directory layout must strictly follow:
* `domain/`: Pure domain entities, value objects, domain errors, and repository interfaces.
* `application/`: Application use cases, query services interfaces, and DTOs.
* `infrastructure/`: Repository implementations, database queries, and external API clients.
* `http/`: Express controllers, routes, validation schemas, and route documentation.
* `di/`: Dependency injection registrations.

---

## 2. Domain Modeling Guidelines

1. **Rich Entities**:
   - Entities must encapsulate business rules and invariants.
   - Avoid public constructors. Use a private constructor and expose static factory methods (e.g., `register()`, `create()`) to ensure entities are created in a valid state.
2. **Reconstitution**:
   - Expose a `reconstitute()` static method to reconstruct entities from database states without executing validation rules that are only relevant during creation (e.g., email syntax check, hashing).
3. **Repository Interfaces**:
   - Define data repository interfaces (e.g., `IUserRepository`) in `domain/repositories/`. Do not reference Prisma or Redis models here; use domain entities.

---

## 3. Dependency Injection (DI)

We use `tsyringe` for dependency injection.

1. **Injectable Classes**:
   - All classes managed by DI (use cases, repositories, controllers, services) must be decorated with `@injectable()`.
2. **Constructor Injection**:
   - Dependencies must be injected through constructor parameters.
   - Always inject interface contracts using predefined injection tokens (e.g., `@inject(AuthTOKENS.AuthRepository)`). Do not directly inject concrete implementations.
3. **Token Registration**:
   - Tokens must be defined as symbols inside `*Tokens.ts` files.
   - Register bindings in the module's container file (e.g., `worksaceContainer.ts`) and load them at application bootstrap.

---

## 4. HTTP and Request Handling

1. **Thinline Controllers**:
   - Keep controllers light. They should only extract inputs from the request, delegate the execution to a use case, and return responses using the `ApiResponse` helper.
   - Controllers must never execute business logic or construct database queries directly.
2. **Input Validation**:
   - Every input payload must be validated using Zod schemas.
   - Use the `requestSchemaValidator(Schema)` middleware on your Express router path to reject invalid payloads early.
3. **API Responses**:
   - Consistently use the `ApiResponse` utility for sending responses:
     - Success: `ApiResponse.success(res, data, message, statusCode)`
     - Error: Handled automatically by throwing custom error classes that extend `BaseError` (e.g., `UnauthorizedError`, `ConflictError`, `BadRequestError`, `ForbiddenError`).
4. **OpenAPI (Swagger) Documentation**:
   - All route definitions must be accompanied by an OpenAPI path registration in a `*.docs.ts` file.
   - Maintain the dynamic loaders pattern: any new `*.docs.ts` file is automatically scanned and registered.

---

## 5. Coding Standards & Code Quality

### TypeScript & Typing
* **No `any`**: Do not use `any` unless absolutely necessary (such as extending express request properties). Use type assertions or unknown types instead.
* **Strict Null Checks**: Always handle `null` or `undefined` returns explicitly. Use `noUncheckedIndexedAccess` rules.
* **Interfaces over Implementations**: Depend on interfaces (`IJwtService`, `IPasswordHasher`) instead of actual classes.

### Error Handling
* Throw semantic custom errors (e.g. `ConflictError`, `ForbiddenError`) from use cases and repositories.
* Do not swallow exceptions in catch blocks without logging them using `BaseLogger`.
* The global error handler middleware (`GlobalError`) will automatically translate thrown `BaseError` instances into clean JSON responses and log unexpected 500 errors.

### Naming Conventions
* **Classes & Interfaces**: `PascalCase` (e.g., `RegisterUserUseCase`, `IUserRepository`).
* **Variables & Functions**: `camelCase` (e.g., `workspaceMember`, `validateToken`).
* **Files**: Consistent naming where suffixes indicate the role (e.g., `*.controller.ts`, `*.usecase.ts`, `*.routes.ts`, `*.test.ts`).
* **Constants & Enums**: `UPPERCASE` or `screaming_snake_case` (e.g., `SHAREDTOKENS`, `ROLES`).

---

## 6. Testing

* **Unit Tests**:
   - Place tests under the module's `tests/unit/` folder.
   - Mock all repository and external service dependencies when testing use cases.
* **Test Database**:
   - Never run integration tests against the production/development database.
   - Use the `.env.test` file and run test suites using `npm run test` or `npm run test:watch`.
