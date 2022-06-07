export class QuotesLatestV2QueryParams {
    /*
     * One or more comma-seperated cryptocurrency CoinMarketCap IDs.
     * E.g. '1,2'
     */
    id?: string;

    /*
     * Alternatively pass a comma-seperated list of cryptocurrency slugs.
     * E.g. 'bitcoin,ethereum'
     */
    slug?: string;

    /*
     * Alternatively pass one or more comma-seperated cryptocurrency symbols.
     * E.g. 'BTC,ETH'
     * At least one 'id', 'slug' or 'symbol' is required to fulfill the request.
     */
    symbol?: string;

    /*
     * Optionally calculate market quotes in up to 120 currencies at once by
     * passing a comma-seperated list of cryptocurrency or fiat currency.
     *
     * Each conversion is returned in its own 'quote' object.
     *
     */
    convert?: string;

    /*
     * Optionally calculate market quotes by CoinMarketCap ID instead of symbol.
     * This option is identical to 'convert' outside of ID format.
     * E.g. '1,2'
     */
    convert_id?: string;

    /*
     * Optionally specify a comma-seperated list of supplemental data fields to return.
     * Pass 'num_market_pairs,cmc_rank,date_added,tags,platform,max_supply,circulating_supply,total_supply,market_cap_by_total_supply,volume_24h_reported,volume_7d,volume_7d_reported,volume_30d,volume_30d_reported,is_active,is_fiat'
     * to include all auxiliary fields.
     *
     * default: "num_market_pairs,cmc_rank,date_added,tags,platform,max_supply,circulating_supply,total_supply,is_active,is_fiat"
     */
    aux?: string;

    /*
     * Pass 'true'  to relax request validation rules. When requesting records on multiple cryptocurrencies an error is returned if no match is found for 1 or more requested cryptocurrencies. If set to true, invalid lookups will
     * be skipped allowing valid cryptocurrencies to still be returned.
     *
     * default: false
     */
    skip_invalid?: boolean;
}
