import "reflect-metadata"
import { container } from "tsyringe";
import { registerAuthModule } from "@auth/di";
import { registerSharedServices } from "@/shared/di";
import { registerWorkspaceModule } from "@/modules/workspace/di";

registerSharedServices(container);
registerAuthModule(container);
registerWorkspaceModule(container);