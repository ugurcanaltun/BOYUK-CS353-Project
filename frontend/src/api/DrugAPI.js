export async function fetchDrugs(filter) {
    
}

export async function fetchFilterValues() {
    await sleep(1000)
    return {
        companies: [{id:3,name:"pfizer"},{id:2,name:"pfr"},{id:4,name:"tyutyıu"},{id:5,name:"sdfsdg"}],
        sideEffects: [{id:0,name:"None"},{id:1,name:"No sex"},{id:2,name:"No headache"},{id:3,name:"No iktidarsızlık"}],
        priceRange: 50,
    }
}

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}