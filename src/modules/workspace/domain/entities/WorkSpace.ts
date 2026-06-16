import { WorkspaceMember } from "./WorkspaceMember";

export class WorkSpace {
    private constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly description: string,
        public readonly businessType: string,
        public readonly location: string,

        public readonly createdAt: Date,
        public readonly updatedAt: Date,

        public readonly owner_id: string,

        public members: WorkspaceMember[]
    ) { }
 
    static register(
        id: string,
        name: string,
        description: string,
        businessType: string,
        location: string, 
        owner_id: string
    ): WorkSpace {
        return new WorkSpace(id,name,description,businessType,location,new Date(),new Date(),owner_id,[]);
    }

    static reconstitute(
        id: string,
        name: string,
        description: string,
        businessType: string,
        location: string,
        createdAt: Date,
        updatedAt: Date,
        owner_id: string,
        members: WorkspaceMember[]
    ): WorkSpace {
        return new WorkSpace(id,name,description,businessType,location,createdAt,updatedAt,owner_id,members);
    }


    
}