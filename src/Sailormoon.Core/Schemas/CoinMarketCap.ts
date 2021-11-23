export class ResponseStatus {
    public readonly timestamp: string;
    public readonly error_code: number;
    public readonly error_message?: string;
    public readonly elapsed: number;
    public readonly credit_count: number;
    public readonly notice?: any;
    public readonly total_count: number;
}

export class QuoteInUSD {
    public readonly price: number;
    public readonly volume_24h: number;
    public readonly volume_change_24h: number;
    public readonly percent_change_1h: number;
    public readonly percent_change_24h: number;
    public readonly percent_change_7d: number;
    public readonly percent_change_30d: number;
    public readonly percent_change_60d: number;
    public readonly percent_change_90d: number;
    public readonly market_cap: number;
    public readonly market_cap_dominance: number;
    public readonly fully_diluted_market_cap: number;
    public readonly last_updated: string;
}

export class _Quote {
    public readonly USD: QuoteInUSD;
}

export class Quote {
    public readonly id: number;
    public readonly name: string;
    public readonly symbol: string;
    public readonly slug: string;
    public readonly num_market_pairs: number;
    public readonly date_added: string;
    public readonly tags: Array<string>;
    public readonly max_supply: number;
    public readonly circulating_supply: number;
    public readonly total_supply: number;
    public readonly platform?: any;
    public readonly cmc_rank: number;
    public readonly last_updated: string;
    public readonly quote: _Quote;
}

// v1/cryptocurrency/listings/latest
export class LatestListing {
    public readonly status: ResponseStatus;
    public readonly data: Array<Quote>;
}

// v1/cryptocurrency/quotes/latest
export class LatestQuote {
    public readonly status: ResponseStatus;
    public readonly data: Object;
}
