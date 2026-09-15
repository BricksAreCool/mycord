/*
 * Vencord, a Discord client mod
 * Copyright (c) 2026 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { Logger } from "@utils/Logger";
import definePlugin from "@utils/types";

const logger = new Logger("efart-services");

async function CheckStatus() {
    try {
        const status = await fetch("http://localhost:8080/plugin", {
            method: "GET",
        });

        if (status.status === 200) {
            return;
        }
    } catch (err) {
        logger.error(err);
        return;
    }

    return true;
}

async function ConnectServer() {}

export default definePlugin({
    name: "efart-services",
    description:
        "services to efart. to connect to your own selfbot and no one shell have your info other then you!",
    authors: [],

    patches: [
        {
            find: "render(){",
            replacement: [
                {
                    match: /\(render\(\){return \i\(\i\)}/,
                    replace: "$1return true;}",
                },
            ],
        },
    ],

    start: async () => {
        const status = await CheckStatus();

        if (!status) {
            return;
        }
    },
});
