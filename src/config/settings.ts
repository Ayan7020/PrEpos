
export const App_settings = {
    appName: "Pre-Pos System",

    Global_bucket_size: 60,
    Global_bucket_refill_dur_sec: 60,

    Redis: {
        maxRetriesPerRequest: null,
        exPonentialRetryDelaySec: 30,
        exPonentialRetryDelaySecMax: 3000

    },
    Auth: {
        SaltRounds: 10,
        Rate_limit_attempts: 5,
        Rate_limit_per_sec: 60,
        rate_limit_block_duration_sec: 600
    }
} as const;