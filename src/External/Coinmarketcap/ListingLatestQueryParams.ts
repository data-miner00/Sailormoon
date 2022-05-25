// API Reference: https://coinmarketcap.com/api/documentation/v1/#operation/getV1CryptocurrencyListingsLatest

export interface ListingLatestQueryParams {
    /*
     * Optionally offset the start (1-based index) of the paginated list of items to return.
     * integer >= 1
     * default: 1
     */
    start?: number;

    /*
     * Optionally specify the number of results to return. Use this parameter and the "start" parameter to determine your own pagination size.
     * integer [1..5000]
     * default: 100
     */
    limit?: number;

    /*
     * Optionally specify a threshold of minimum USD price to filter results by.
     * integer [ 0 .. 100000000000000000 ]
     */
    price_min?: number;

    /*
     * Optionally specify a threshold of maximum USD price to filter results by.
     * integer [ 0 .. 100000000000000000 ]
     */
    price_max?: number;

    /*
     * Optionally specify a threshold of minimum market cap to filter results by.
     * integer [ 0 .. 100000000000000000 ]
     */
    market_cap_min?: number;

    /*
     * Optionally specify a threshold of maximum market cap to filter results by.
     * integer [ 0 .. 100000000000000000 ]
     */
    market_cap_max?: number;

    /*
     * Optionally specify a threshold of minimum 24 hour USD volume to filter results by.
     * integer [ 0 .. 100000000000000000 ]
     */
    volume_24h_min?: number;

    /*
     * Optionally specify a threshold of maximum 24 hour USD volume to filter results by.
     * integer [ 0 .. 100000000000000000 ]
     */
    volume_24h_max?: number;

    /*
     * Optionally specify a threshold of minimum circulating supply to filter results by.
     * integer [ 0 .. 100000000000000000 ]
     */
    circulating_supply_min?: number;

    /*
     * Optionally specify a threshold of maximum circulating supply to filter results by.
     * integer [ 0 .. 100000000000000000 ]
     */
    circulating_supply_max?: number;

    /*
     * Optionally specify a threshold of minimum 24 hour percent change to filter results by.
     * integer >= -100
     */
    percent_change_24h_min?: number;

    /*
     * Optionally specify a threshold of maximum 24 hour percent change to filter results by.
     * integer >= -100
     */
    percent_change_24h_max?: number;

    /*
     * Optionally calculate market quotes in up to 120 currencies at once by passing a comma-separated list of cryptocurrency or fiat currency symbols. Each additional convert option beyond the first requires an additional call credit. A list of supported fiat options can be found here. Each conversion is returned in its own "quote" object.
     * string 120 currencies supported
     */
    convert?: string;

    /*
     * Optionally calculate market quotes by CoinMarketCap ID instead of symbol. This option is identical to convert outside of ID format. Ex: convert_id=1,2781 would replace convert=BTC,USD in your query. This parameter cannot be used when convert is used.
     * string 120 currencies supported
     */
    convert_id?: string;

    /*
     * What field to sort the list of cryptocurrencies by.
     * valid values "name" "symbol" "date_added" "market_cap" "market_cap_strict" "price" "circulating_supply" "total_supply" "max_supply" "num_market_pairs" "volume_24h" "percent_change_1h" "percent_change_24h" "percent_change_7d" "market_cap_by_total_supply_strict" "volume_7d" "volume_30d"
     * default "market_cap"
     */
    sort?: string;

    /*
     * The direction in which to order cryptocurrencies against the specified sort.
     * valid values "asc" "desc"
     * default "market_cap"
     */
    sort_dir?: string;

    /*
     * The type of cryptocurrency to include.
     * valid values "all" "coins" "tokens"
     * default "all"
     */
    cryptocurrency_type?: string;

    /*
     * The tag of cryptocurrency to include
     * valid values "all" "defi" "filesharing"
     * default "all"
     */
    tag: string;

    /*
     * Optionally specify a comma-separated list of supplemental data fields to return. Pass num_market_pairs,cmc_rank,date_added,tags,platform,max_supply,circulating_supply,total_supply,market_cap_by_total_supply,volume_24h_reported,volume_7d,volume_7d_reported,volume_30d,volume_30d_reported,is_market_cap_included_in_calc to include all auxiliary fields.
     * default "num_market_pairs,cmc_rank,date_added,tags,platform,max_supply,circulating_supply,total_supply"
     */
    aux: string;
}
