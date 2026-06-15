import "reflect-metadata"
import { container } from "tsyringe";
import { registerAuthModule } from "@auth/di";
import { registerSharedServices } from "@/shared/di";

registerSharedServices(container);
registerAuthModule(container);