export class User {
    private constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly storeName: string,
        public readonly email: string,
        public readonly passwordHash: string,
        public readonly createdAt: Date,
        public isActive: boolean,
    ) { }


    static register(id: string, name: string, storeName: string, email: string, passwordHash: string): User {
        if (!email.includes("@")) throw new Error("Invalid email");
        if (!name.trim()) throw new Error("Name is required");
        return new User(id, name, storeName, email, passwordHash, new Date(), true);
    }

    static reconstitute(id: string, name: string, storeName: string, email: string, passwordHash: string, createdAt: Date, isActive: boolean): User {
        return new User(id, name, storeName, email, passwordHash, createdAt, isActive);
    }


    deactivate(): void {
        if (!this.isActive) throw new Error("User already inactive");
        this.isActive = false;
    }
}