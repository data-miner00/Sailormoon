export interface QuotesLatestV2Response {
    data: {
        [id: string]: {
            id: number;
            name: string;
            symbol: string;
            slug: string;
            is_active: number;
            is_fiat: number;
            cmc_rank: number;
            num_market_pairs: number;
            circulating_supply: number;
            max_supply: number;
            last_updated: string;
            date_added: string;
            tags: Array<
                { slug: string; name: string; category: string } | string
            >;
            platform?: {
                id: number;
                name: string;
                symbol: string;
                slug: string;
                token_address: string;
            };
            self_reported_circulating_supply?: number;
            self_reported_market_cap?: number;
            quote: {
                [symbol: string]: {
                    price: number;
                    volume_24h: number;
                    volume_change_24h: number;
                    percent_change_1h: number;
                    percent_change_24h: number;
                    percent_change_7d: number;
                    percent_change_30d: number;
                    percent_change_60d: number;
                    percent_change_90d: number;
                    market_cap: number;
                    market_cap_dominance: number;
                    fully_diluted_market_cap: number;
                    last_updated: string;
                };
            };
        };
    };
    status: {
        timestamp: string;
        error_code: number;
        error_message: string;
        elapsed: number;
        credit_count: number;
    };
}
