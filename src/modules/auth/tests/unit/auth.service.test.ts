import "reflect-metadata"
import { AuthService } from "../../auth.service";
import { CreateUserDto, IAuthRepo, IAuthService } from "../../auth.type";
import * as utils from "../../auth.utils";
import { ConflictError } from "@/utils/errors";

jest.mock("@/config", () => ({
    BaseLogger: {
        child: jest.fn().mockReturnValue({
            info: jest.fn(),
            error: jest.fn(),
            warn: jest.fn(),
            debug: jest.fn(),
        }),
    },
}));

jest.mock("../../auth.utils", () => ({
    createHashing: jest.fn(),
}));

const HASHED_PASSWORD = "hashed_password_123";

const buildMockRepo = (overrides: Partial<IAuthRepo> = {}): IAuthRepo => ({
    findByEmail: jest.fn().mockResolvedValue(null),
    createUser: jest.fn().mockResolvedValue({ id: "uuid-1" }),
    ...overrides,
});

const buildDto = (overrides: Partial<CreateUserDto> = {}): CreateUserDto => ({
    name: "Test01",
    store_name: "Test-Store",
    email: "test@test.com",
    password: "plaintext_password",
    ...overrides,
});

describe("AuthService", () => {
    let service: IAuthService;
    let mockRepo: IAuthRepo;

    beforeEach(() => {
        jest.clearAllMocks();

        (utils.createHashing as jest.Mock).mockResolvedValue(HASHED_PASSWORD);

        mockRepo = buildMockRepo();
        service = new AuthService(mockRepo)
    });

    describe("CreateUser", () => {
        // ── Success Path ──────────────────────
        describe("Success cases", () => {
            it("should create a user when email does not exist", async () => {
                const dto = buildDto();
                await service.CreateUser(dto);

                expect(mockRepo.createUser).toHaveBeenCalledTimes(1);
            });

            it("should hash the password before storing", async () => {
                const dto = buildDto({ password: "plaintext_password" });
                await service.CreateUser(dto);

                expect(utils.createHashing).toHaveBeenCalledWith("plaintext_password");

                expect(mockRepo.createUser).toHaveBeenCalledWith(
                    expect.objectContaining({ password: HASHED_PASSWORD })
                )
            });

            it("should return whatever the repo returns", async () => {
                const repoResult = { id: "abc-123" };
                (mockRepo.createUser as jest.Mock).mockResolvedValue(repoResult);

                const result = await service.CreateUser(buildDto());

                expect(result).toEqual(repoResult);
            });
        });

        //  ── Conflict ────────────────────────
        describe("when email already exists", () => {
            it("should throw ConflictError", async () => {
                (mockRepo.findByEmail as jest.Mock).mockResolvedValue(buildDto());
                await expect(service.CreateUser(buildDto())).rejects.toThrow(ConflictError)
            });

            it("should NOT call createUser if email exists", async () => {
                (mockRepo.findByEmail as jest.Mock).mockResolvedValue(buildDto);
                await service.CreateUser(buildDto()).catch(() => {});

                expect(mockRepo.createUser).not.toHaveBeenCalled();
            })
        });
    })
})