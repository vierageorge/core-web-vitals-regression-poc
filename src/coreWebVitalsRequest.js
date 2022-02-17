const axios = require("axios");

require("dotenv").config();

const setUpQuery = function(testUrl, params) {
    const api = process.env.CORE_WEB_VITALS_API_URL;
    const apiKey = process.env.GOOGLE_API_KEY;
    let query = `${api}?url=${encodeURIComponent(testUrl)}`;
    for (const [key, value] of Object.entries(params)) {
        query += `&${key}=${value}`;
    }
    if (!apiKey) return query;
    return query += `&key=${apiKey}`;
};


module.exports = {

    getWebCoreVitals: async (url, params) => {
        let resp = {};
        const queryUrl = setUpQuery(url, params);
        try {
            resp = await axios.get(queryUrl);
        } catch (err) {
            console.error("Got an error while retrieving the response from Google API");
            console.error(err.response);
        }
        return resp.data;
    }
};