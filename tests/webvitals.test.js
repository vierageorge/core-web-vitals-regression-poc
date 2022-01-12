const {getWebCoreVitals} = require("../src/coreWebVitalsRequest");
const {MAX_LCP, MAX_CLS} = require("../data/expectedValues.json");


test("Core Web Vitals data for page should be according to benchmark", async () => {
    let url = "https://web.dev/vitals";
    const {lighthouseResult} = await getWebCoreVitals(url, {strategy: "mobile"});

    const obtainedLCP = lighthouseResult["audits"]["largest-contentful-paint"]["numericValue"];
    const obtainedCLS = lighthouseResult["audits"]["cumulative-layout-shift"]["numericValue"];
    console.log(`Obtained Lab Data for Core Web Vitals: LCP ${obtainedLCP} ms, CLS ${obtainedCLS}`);

    expect(obtainedCLS).toBeLessThan(MAX_CLS);
    expect(obtainedLCP).toBeLessThan(MAX_LCP);

});