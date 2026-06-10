import figlet from "figlet";
import chalk from "chalk";
import boxen from "boxen";
import { Env } from "@/config";
import { App_settings } from "@/config";

export function showBanner(port: number | string) {
    const title = figlet.textSync(App_settings.appName, {
        font: "Small",
        horizontalLayout: "fitted",
    });

    console.clear();

    console.log(chalk.cyanBright(title));

    console.log(
        boxen(
            [ 
                `Port: ${port}`,
                `Environment: ${Env.Environment}`, 
            ].join("\n"),
            {
                padding: 1,
                margin: 1,
                borderStyle: "round",
                borderColor: "green"
            }
        )
    );
}
  