/**
 *  DATA MODEL CONFIG
 *  - Imported to DataSonification to create parameter mapping utilities 
 *  - Config helps to create  aggregated series, interval options and scales that support series selection options
 */ 

// Define which props to rollup with alias' and scale config
export const dataPropMap = {
    "Solar (Rooftop) -  MW": {          alias: "solar-rooftop",         label: "Rooftop solar"      },
    "Solar (Utility) -  MW": {          alias: "solar-utility",         label: "Utl. solar"         },
    "Wind -  MW": {                     alias: "wind",                  label: "Wind"               },
    "Hydro -  MW": {                    alias: "hydro",                 label: "Hydro"              },
    "Battery (Discharging) -  MW":  {   alias: "battery",               label: "Battery"            },
    "Bioenergy (Biomass) -  MW": {      alias: "bioenergy",             label: "Bioenergy"          },
    "Coal (Brown) -  MW": {             alias: "coal-brown",            label: "Brown coal"         },
    "Coal (Black) -  MW": {             alias: "coal-black",            label: "Black coal"         },
    "Gas (Steam) -  MW": {              alias: "gas-steam",             label: "Gas steam"          },
    "Gas (CCGT) -  MW": {               alias: "gas-ccgt",              label: "Gas CCGT"           },            
    "Gas (Reciprocating) -  MW": {      alias: "gas-reciprocating",     label: "Gas recip.)"        },             
    "Gas (Waste Coal Mine) -  MW":  {   alias: "gas-fugitive",          label: "Gas (coal mine)"    },            
    "Price - AUD/MWh":  {               alias: "price-per-MWh",         label: "Price"              }
}

// Define aggregation series maps
export const dataAggregationMap = {
    renewable: {
        series:         ["solar-rooftop", "solar-utility", "wind", "hydro", "battery", "bioenergy" ],
        label:          "Renewable",
        labelCode:      "R3N3W@8L3",
        musicalScale:   `C2:major:pentatonic`,
    }, 
    solar: {
        series:         ["solar-rooftop", "solar-utility"],
        label:          "Solar",
    }, 
    fossil: {
        series:         ["coal-brown", "coal-black", "gas-steam", "gas-ccgt", "gas-reciprocating", "gas-fugitive" ],
        label:          "Fossil",
        labelCode:      "F0$$!L",
    }, 
    coal: {
        series:         ["coal-brown", "coal-black"],
        label:          "Coal",
    }, 
    gas: {
        series:         ["gas-steam", "gas-ccgt", "gas-reciprocating", "gas-fugitive" ],
        label:          "Gas",
    }, 
    totalExBattery: {
        series:         ["renewable", "fossil"], 
        label:          "Total ex. storage",
    },
    total: {
        series:         ["renewable", "fossil", "battery"], 
        label:          "Total",
    }
}

