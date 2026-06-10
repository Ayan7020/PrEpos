// import "reflect-metadata"
// import { MockPrisma } from "@/utils/tests";
// import { CreateUserDto, IAuthRepo } from "../../auth.type";
// import { AuthPrismaRepository } from "../../auth.repository";
// import { prisma } from "@/lib/prisma";

// jest.mock("@/lib/prisma", () => ({
//     prisma: {
//         $transaction: jest.fn(),
//     },
// }))

// const buildDto = (overrides: Partial<CreateUserDto> = {}): CreateUserDto => ({
//     name: "Test01",
//     store_name: "Test-Store",
//     email: "test@test.com",
//     password: "plaintext_password",
//     ...overrides,
// });

// describe('createUser', () => {
//     let repo: IAuthRepo;
    
//     beforeEach(() => {
//         repo = new AuthPrismaRepository()
//     })

//     it('should create a user and outbox entry, returning the new user id', async () => {
//         const mock_user_id = 'testing-user-id';

//         const dto = buildDto();

//         const mockTx = {
//             user: {
//                 create: jest.fn().mockResolvedValue({ id: mock_user_id }),
//             },
//             user_OutBox: {
//                 create: jest.fn().mockResolvedValue({}),
//             },
//         };

//         (prisma.$transaction as jest.Mock).mockImplementation(
//             async (cb) => cb(mockTx)
//         );

//         const result = await repo.createUser(dto);

//         expect(result).toEqual({ id: mock_user_id });
        
//         expect(mockTx.user.create).toHaveBeenCalledWith({
//             data: {
//                 name: dto.name,
//                 store_name: dto.store_name,
//                 email: dto.email,
//                 password_hash: dto.password,
//             },
//         });

//         expect(mockTx.user_OutBox.create).toHaveBeenCalledWith({
//             data: {
//                 user_id: mock_user_id,
//                 status: "Pending"
//             }
//         });
//     });

//     it('should propagate error  if user_OutBox.create fails', async () => {
//         const mock_user_id = 'testing_user_id_1';

//         const dto = buildDto();

//         const mockTx = {
//             user: {
//                 create: jest.fn().mockResolvedValue({ id: mock_user_id }),
//             },
//             user_OutBox: {
//                 create: jest.fn().mockRejectedValue(new Error("OutBox creation failed")),
//             },
//         };

//         (prisma.$transaction as jest.Mock).mockImplementation(
//             (ct) => ct(mockTx)
//         );


//         await expect(repo.createUser(dto)).rejects.toThrow(Error("OutBox creation failed"));
//     })
// });