import axios from "axios";
import { ListingLatestQueryParams } from "./ListingLatestQueryParams";
import endpoints from "../endpoints.json";
import { ListingLatestResponse } from "./ListingLatestResponse";
import qs, { ParsedUrlQueryInput } from "querystring";
import { QuotesLatestV2QueryParams } from "./QuotesLatestV2QueryParams";
import { QuotesLatestV2Response } from "./QuotesLatestV2Response";
import { $ } from "../../Core/Environment";

const { baseUrl, category } = endpoints.Coinmarketcap;
const { cryptocurrency } = category;

async function GetAsync<TParam, TResponse>(
    headers: object,
    query: TParam,
    baseUrl: string,
    endpoint: typeof cryptocurrency[0]
) {
    const queryString = qs.stringify(query as any);
    const url = new URL(`${endpoint.relativeUrl}?${queryString}`, baseUrl);

    const response = await axios.get<TResponse>(url.href, { headers });
    return response;
}

export function GetListingLatestAsync(query: ListingLatestQueryParams) {
    const endpoint = cryptocurrency[0];
    const headers = {
        [$("X-CMC_PRO_API_KEY")]: process.env[$("X-CMC_PRO_API_KEY")],
        Accept: "application/json",
        "Accept-Encoding": "deflate, gzip",
    };
    return GetAsync<ListingLatestQueryParams, ListingLatestResponse>(
        headers,
        query,
        baseUrl,
        endpoint
    );
}

export function GetQuotesLatestV2Async(query: QuotesLatestV2QueryParams) {
    const endpoint = cryptocurrency[2];
    const headers = {
        [$("X-CMC_PRO_API_KEY")]: process.env[$("X-CMC_PRO_API_KEY")],
        Accept: "application/json",
        "Accept-Encoding": "deflate, gzip",
    };
    return GetAsync<QuotesLatestV2QueryParams, QuotesLatestV2Response>(
        headers,
        query,
        baseUrl,
        endpoint
    );
}
