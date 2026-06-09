import "reflect-metadata"
import { container } from "tsyringe";
import { registerAuthModule } from "@auth/di";

registerAuthModule(container);