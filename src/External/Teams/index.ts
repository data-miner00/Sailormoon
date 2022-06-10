import axios from "axios";
import endpoints from "../endpoints.json";

export async function Team(team: "seas" | "trees") {
    const url = endpoints["Teams"][team === "seas" ? "Seas" : "Trees"]["url"];

    const res = await axios.get(url);
    return res;
}
