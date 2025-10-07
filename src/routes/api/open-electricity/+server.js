
// import { env } from '$env/dynamic/private';
// import { OpenElectricityClient } from "openelectricity"; // adjust import path

// // Init Open Electricity client
// const apiKey = env.OPEN_ELECTRICITY_API_KEY;
// const client = new OpenElectricityClient({apiKey });




// export async function GET({url}) {

//     // Get and format date range 
//     const fromStr = url.searchParams.get("dateStart"),
//         toStr = url.searchParams.get("dateEnd"); 

//     const {dateStart, dateEnd} = getDateRange(fromStr, toStr)

//     // Package table data and stringify
//     const dataTables = {
//         generation:     await getGenerationData(),
//         market:         await getMarketData()
//     }

//     const data = JSON.stringify(dataTables)

//     return new Response(data, { status: 200 });
// }


// ////////////////
// ///  HELPERS ///
// ////////////////

// // Get energy data for the NEM'
// async function getGenerationData(dateStart, dateEnd){
//     const { response, datatable } = await client.getNetworkData("NEM", ["power"], {
//         interval: "1h",
//         dateStart,
//         dateEnd,
//         // primaryGrouping: "network_region",
//         secondaryGrouping: ["fueltech", "fueltech_group"]
//     })

//     return datatable.rows
// };

// // Get market data for the NEM'
// async function getMarketData(dateStart, dateEnd){
//     // Get market data for the NEM
//     const { response, datatable } = await client.getMarket("NEM", ["price"], {
//         interval: "1h",
//         dateStart,
//         dateEnd
//     })

//     return datatable.rows
// }

// // Get formatted range from strings of to and from dates
// function getDateRange(fromStr, toStr) {
//     const [fromDay, fromMonth, fromYear] = fromStr.split("-").map(Number);
//     const [toDay, toMonth, toYear] = toStr.split("-").map(Number);

//     // Start of first day
//     const fromDate = new Date(fromYear, fromMonth - 1, fromDay, 0, 0, 0);
//     // Start of the day AFTER the last day
//     const toDate = new Date(toYear, toMonth - 1, toDay + 1, 0, 0, 0);

//     const dateStart = fromDate.toISOString().slice(0, 19);
//     const dateEnd   = toDate.toISOString().slice(0, 19);

//     return { dateStart, dateEnd };
// }

// // Parse