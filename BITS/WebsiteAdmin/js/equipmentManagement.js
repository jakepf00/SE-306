function getEquipmentTable() {    
    fetch(equipmentApiUrl).then(response => {
        return response.json();
    }).then(data => {
        // Work with JSON data here
        updateWebpage(data);
        equipmentTable = data;
    }).catch(err => {
        // Do something for an error here
        console.log("an error ocurred in retrieving the equipment table from the database");
    });
}

var searchString;
function updateWebpage(equipmentTable) {
    // from here, edit the webpage to display received data
    // loop through table, get each element name, add to list
    // -> will append to a string that will eventually be used in the HTML 
    var equipmentResults = document.getElementById("equipment_results");
    var newEquipmentList = "";
    
    var tableLocation = 0;
    equipmentTable.forEach(function(item) {
        if (item.name.toLowerCase().includes(searchString.toLowerCase())) { // if search_string is contained within the equipment name
            newEquipmentList = newEquipmentList.concat
                ("<p><a data-toggle=\"modal\" data-target=\"#equipmentModal\" onclick=\"displayEquipmentDetails(", tableLocation, ")\">", item.name, "</p></a>"
                + "<p>&emsp;", item.location,"</p>");
            // TODO: make list be filtered by search string -> add code for if it didn't match any results
        }
        tableLocation++; // out here because all equipment needs to be numbered, even if it's not displayed
    });
    
    equipmentResults.innerHTML = newEquipmentList;
}


// called when specific equipment is clicked from list
function displayEquipmentDetails(tableLocation) {
    var equipmentModal = document.getElementById("modal_body");
    var newEquipmentData = "<p>Name: " + equipmentTable[tableLocation].name + "</p>";
    newEquipmentData += "<p>Location: " + equipmentTable[tableLocation].location + "</p>";
    newEquipmentData += "<p>Quantity: " + equipmentTable[tableLocation].quantity + "</p>";
    newEquipmentData += "<p>ID: " + equipmentTable[tableLocation].eqId + "</p>";
    equipmentModal.innerHTML = newEquipmentData;
}

// called when search button is clicked
function displayEquipmentList() {
    searchString = document.getElementById("search_string").value;
    getEquipmentTable(); // calls updateWebpage() once the promise is fulfilled
}

// called when sort by name button is clicked
function sortByName() {
    // sort equipmentTable, call update webpage
    // TODO: using bubble sort, could probably improve this
    for (i = 0; i < equipmentTable.length; i++) {
        for (j = 0; j < equipmentTable.length - i - 1; j++) {
            if (equipmentTable[j].name > equipmentTable[j + 1].name) {
                var temp = equipmentTable[j];
                equipmentTable[j] = equipmentTable[j + 1];
                equipmentTable[j + 1] = temp;
            }
        }
    }
    updateWebpage(equipmentTable);
}

// called when sort by location button is clicked
function sortByLocation() {
    // sort equipmentTable, call update webpage
    // TODO: using bubble sort, could probably improve this
    for (i = 0; i < equipmentTable.length; i++) {
        for (j = 0; j < equipmentTable.length - i - 1; j++) {
            if (equipmentTable[j].location > equipmentTable[j + 1].location) {
                var temp = equipmentTable[j];
                equipmentTable[j] = equipmentTable[j + 1];
                equipmentTable[j + 1] = temp;
            }
        }
    }
    updateWebpage(equipmentTable);
}