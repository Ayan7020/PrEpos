import path from "path";
import fs from "fs";
import { BaseLogger, Env } from "@/config";
import { pathToFileURL } from "url";

function findDocFiles(dir: string, ext: string): string[] {
    const results: string[] = [];

    if (!fs.existsSync(dir)) return results;

    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            results.push(...findDocFiles(fullPath, ext));
        } else if (entry.isFile() && entry.name.endsWith(ext)) {
            results.push(fullPath);
        }
    }
    return results;
}

export async function loadAllDocs(): Promise<void> {
    const modulesDir = path.join(__dirname, "../../modules");

    const ext = Env.isProd ? ".docs.js" : ".docs.ts";

    const docFiles = findDocFiles(modulesDir, ext);

    if (docFiles.length === 0) {
        BaseLogger.warn("[Swagger] No .docs files found under modules");
        return;
    }

    for (const file of docFiles) {
        await import(pathToFileURL(file).href);  
    }

    BaseLogger.info(`[Swagger] Loaded ${docFiles.length} doc files`);
}