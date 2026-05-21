import { container } from "tsyringe";
import { registerAuthModule } from "./modules/auth";


registerAuthModule(container);