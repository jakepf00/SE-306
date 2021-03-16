// called when search button is clicked
function displaySKU() {
    findItemInSystem("jake      ").then(updateWebpage, updateWebpageFail);
}

function removeItemFromInventory() {

}

function scanSKU() {
    // get SKU from textbox or external scanner
    return "1";
}

async function findItemInSystem(SKU) {
    // access the database, search for item, return database location
    // also save database response in a global variable
    // returns -1 if the item is not contained in the database

    var itemLocation

    fetch(apiUrl).then(response => {
        return response.json();
    }).then(data => {
        concessionsTable = data;
        
        for(tableLocation = 0; tableLocation < data.length; tableLocation++) {
            if (data[tableLocation].aoeu == SKU) {
                itemLocation = tableLocation;
            }
        }
    
    }).catch(err => {
        console.log("An error ocurred in retrieving the concessions table from the database");
        itemLocation -1;
    });

    while(typeof itemLocation === "undefined") {
        await new Promise(resolve => setTimeout(resolve, 100));
    }
    return itemLocation;
}

function removeItemFromSystem(SKU) {
    // use given SKU to remove item from database
}

function updateWebpage(itemLocation) {
    console.log(itemLocation)
}

function updateWebpageFail() {
    // called when the promise fails and itemLocation isn't found
}