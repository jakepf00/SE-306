// called when page is loaded
function getEquipmentTable() {    
    fetch(equipmentApiUrl).then(response => {
        return response.json();
    }).then(data => {
        // Work with JSON data here
        equipmentTable = data;
    }).catch(err => {
        // Do something for an error here
        console.log("an error ocurred in retrieving the equipment table from the database");
    });
}

var searchString = "";
var searchCriteria = "name";
function updateEquipmentList() {
    // from here, edit the webpage to display received data
    // loop through table, get each element name, add to list
    // -> will append to a string that will eventually be used in the HTML 
    var equipmentResults = document.getElementById("equipment_results");
    var newEquipmentList = "";
    var tableLocation = 0;

    if (searchCriteria == "name") {
        equipmentTable.forEach(function(item) {
            if (item.name.toLowerCase().includes(searchString.toLowerCase())) { // if search_string is contained within the equipment name
                newEquipmentList = newEquipmentList.concat
                    ("<p><a data-toggle=\"modal\" data-target=\"#equipmentModal\" onclick=\"displayEquipmentDetails(", tableLocation, ")\">", item.name, "</p></a>"
                    + "<p>&emsp;", item.location,"</p>");
                // TODO: make list be filtered by search string -> add code for if it didn't match any results
            }
            tableLocation++; // out here because all equipment needs to be numbered, even if it's not displayed
        });
    }
    else if (searchCriteria == "location") {
        equipmentTable.forEach(function(item) {
            if (item.location.toLowerCase().includes(searchString.toLowerCase())) { // if search_string is contained within the equipment name
                newEquipmentList = newEquipmentList.concat
                    ("<p><a data-toggle=\"modal\" data-target=\"#equipmentModal\" onclick=\"displayEquipmentDetails(", tableLocation, ")\">", item.name, "</p></a>"
                    + "<p>&emsp;", item.location,"</p>");
                // TODO: make list be filtered by search string -> add code for if it didn't match any results
            }
            tableLocation++; // out here because all equipment needs to be numbered, even if it's not displayed
        });
    }
    
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

    var modalFooter = document.getElementById("modal_footer");
    newEquipmentData = 
          "<button type=\"button\" class=\"btn btn-default\" onclick=\"checkOutEquipment(" + tableLocation + ")\">Check Out</button>"
        + "<button type=\"button\" class=\"btn btn-default\" onclick=\"checkInEquipment(" + tableLocation + ")\">Check In</button>"
        + "<button type=\"button\" class=\"btn btn-default\" onclick=\"reserveEquipment(" + tableLocation + ")\">Reserve</button>"
        + "<button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button>";
    modalFooter.innerHTML = newEquipmentData;
}

// called when search by name button is clicked
function searchEquipmentName() {
    searchString = document.getElementById("search_string").value;
    searchCriteria = "name";
    sortTableByName();
    updateEquipmentList();
}

// called when search by location button is clicked
function searchEquipmentLocation() {
    searchString = document.getElementById("search_string").value;
    searchCriteria = "location";
    sortTableByLocation();
    updateEquipmentList();
}

// called when sort by name button is clicked
function sortByName() {
    sortTableByName();    
    updateEquipmentList();
}
function sortTableByName() {
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
}

// called when sort by location button is clicked
function sortByLocation() {
    sortTableByLocation();
    updateEquipmentList();
}
function sortTableByLocation() {
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
}

// called when add eq to db button is clicked
function addEqToDatabase() {
    console.log("adding eq..");
}

// called when remove eq from db button is clicked
function removeEqFromDatabase() {
    console.log("removing eq..");
}

// called when check out button is clicked from modal of specific equipment
function checkOutEquipment(tableLocation) {
    console.log("checking out " + equipmentTable[tableLocation].name);
}

// called when check in button is clicked from modal of specific equipment
function checkInEquipment(tableLocation) {
    console.log("checking in " + equipmentTable[tableLocation].name);
}

// called when reserve button is clicked from modal of specific equipment
function reserveEquipment(tableLocation) {
    console.log("reserving " + equipmentTable[tableLocation].name);
}