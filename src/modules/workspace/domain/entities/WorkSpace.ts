export class WorkSpace {
    private constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly email: string,
        public readonly passwordHash: string,
        public readonly createdAt: Date,
        public isActive: boolean,
    ) { }


    static register(id: string, name: string, email: string, passwordHash: string): WorkSpace {
        if (!email.includes("@")) throw new Error("Invalid email");
        if (!name.trim()) throw new Error("Name is required");
        return new WorkSpace(id, name, email, passwordHash, new Date(), true);
    }

    static reconstitute(id: string, name: string, email: string, passwordHash: string, createdAt: Date, isActive: boolean): WorkSpace {
        return new WorkSpace(id, name, email, passwordHash, createdAt, isActive);
    }


    deactivate(): void {
        if (!this.isActive) throw new Error("WorkSpace already inactive");
        this.isActive = false;
    }
}