export class User {
    private constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly email: string,
        public readonly passwordHash: string,
        public readonly createdAt: Date
    ) { }


    static register(id: string, name: string, email: string, passwordHash: string): User {
        if (!email.includes("@")) throw new Error("Invalid email");
        if (!name.trim()) throw new Error("Name is required");
        return new User(id, name, email, passwordHash, new Date());
    }

    static reconstitute(id: string, name: string, email: string, passwordHash: string, createdAt: Date): User {
        return new User(id, name, email, passwordHash, createdAt);
    }

}