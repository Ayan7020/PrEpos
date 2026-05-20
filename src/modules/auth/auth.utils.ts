import { App_settings } from "@/config";
import bcrypt from "bcrypt";

export const createHashing = async (plain_text: string) => {
    return await bcrypt.hash(plain_text, App_settings.Auth.SaltRounds);
}

export const validateHashing = async (plain_text: string, compare_string: string) => {
    return await bcrypt.compare(plain_text, compare_string);
}