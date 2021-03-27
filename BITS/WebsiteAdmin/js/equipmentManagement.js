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

// called when add button is clicked from post equipment modal
function postEquipment() {
    var newID = getMaxEquipmentID() + 1;
    var newEquipment = {
        "eqId": newID,
        "name": document.getElementById("new_equipment_name").value,
        "location": document.getElementById("new_equipment_location").value,
        "quantity": parseInt(document.getElementById("new_equipment_quantity").value)
    }
    fetch(equipmentApiUrl, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(newEquipment)
    }).then(response => {
        console.log(response);
        getEquipmentTable(); // refresh eq table after post is complete
    }).catch(err => {
        console.log(err);
    });
}

// called when add eq to database button is clicked
function newEquipmentModal() {
    var newData = "";

    var modalTitle = document.getElementById("modal_header");
    newData = "<button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>";
    newData += "<h4 class=\"modal-title\">Add New Equipment</h4>";
    modalTitle.innerHTML = newData;

    var modalBody = document.getElementById("modal_body");
    newData = "<p>Name:</p><input type=\"text\" id=\"new_equipment_name\" size=\"40\"><br><br>";
    newData += "<p>Location:</p><input type=\"text\" id=\"new_equipment_location\" size=\"40\"><br><br>";
    newData += "<p>Quantity:</p><input type=\"text\" id=\"new_equipment_quantity\" size=\"40\"><br><br>";
    modalBody.innerHTML = newData; // don't need to ask for ID, it will be automatically inferred

    var modalFooter = document.getElementById("modal_footer");
    newData = 
          "<button type=\"button\" class=\"btn btn-default\" onclick=\"postEquipment()\" data-dismiss=\"modal\">Add</button>"
        + "<button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Cancel</button>";
    modalFooter.innerHTML = newData;
}

function getMaxEquipmentID() {
    var max = 0;
    for (i = 0; i < equipmentTable.length; i++) {
        if (equipmentTable[i].Eq_ID > max) {
            max = equipmentTable[i].Eq_ID;
        }
    }
    return max;
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
            if (item.Name.toLowerCase().includes(searchString.toLowerCase())) { // if search_string is contained within the equipment name
                newEquipmentList = newEquipmentList.concat
                    ("<p><a data-toggle=\"modal\" data-target=\"#equipmentModal\" onclick=\"displayEquipmentDetails(", tableLocation, ")\">", item.Name, "</p></a>"
                    + "<p>&emsp;", item.Location,"</p>");
                // TODO: make list be filtered by search string -> add code for if it didn't match any results
            }
            tableLocation++; // out here because all equipment needs to be numbered, even if it's not displayed
        });
    }
    else if (searchCriteria == "location") {
        equipmentTable.forEach(function(item) {
            if (item.Location.toLowerCase().includes(searchString.toLowerCase())) { // if search_string is contained within the equipment name
                newEquipmentList = newEquipmentList.concat
                    ("<p><a data-toggle=\"modal\" data-target=\"#equipmentModal\" onclick=\"displayEquipmentDetails(", tableLocation, ")\">", item.Name, "</p></a>"
                    + "<p>&emsp;", item.Location,"</p>");
                // TODO: make list be filtered by search string -> add code for if it didn't match any results
            }
            tableLocation++; // out here because all equipment needs to be numbered, even if it's not displayed
        });
    }
    
    equipmentResults.innerHTML = newEquipmentList;
}


// called when specific equipment is clicked from list
function displayEquipmentDetails(tableLocation) {
    var newData = "";

    var modalTitle = document.getElementById("modal_header");
    newData = "<button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>";
    newData += "<h4 class=\"modal-title\">View Equipment Details</h4>";
    modalTitle.innerHTML = newData;

    var equipmentModal = document.getElementById("modal_body");
    var newData = "<p>Name: " + equipmentTable[tableLocation].Name + "</p>";
    newData += "<p>Location: " + equipmentTable[tableLocation].Location + "</p>";
    newData += "<p>Quantity: " + equipmentTable[tableLocation].Quantity + "</p>";
    newData += "<p>ID: " + equipmentTable[tableLocation].Eq_ID + "</p>";
    equipmentModal.innerHTML = newData;

    var modalFooter = document.getElementById("modal_footer");
    newData = 
          "<button type=\"button\" class=\"btn btn-default\" onclick=\"checkOutEquipment(" + tableLocation + ")\">Check Out</button>"
        + "<button type=\"button\" class=\"btn btn-default\" onclick=\"checkInEquipment(" + tableLocation + ")\">Check In</button>"
        + "<button type=\"button\" class=\"btn btn-default\" onclick=\"reserveEquipment(" + tableLocation + ")\">Reserve</button>"
        + "<button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button>";
    modalFooter.innerHTML = newData;
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
            if (equipmentTable[j].Name > equipmentTable[j + 1].Name) {
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
            if (equipmentTable[j].Location > equipmentTable[j + 1].Location) {
                var temp = equipmentTable[j];
                equipmentTable[j] = equipmentTable[j + 1];
                equipmentTable[j + 1] = temp;
            }
        }
    }
}

// called when remove eq from db button is clicked
function removeEqFromDatabase() {
    console.log("removing eq..");
}

// called when check out button is clicked from modal of specific equipment
function checkOutEquipment(tableLocation) {
    console.log("checking out " + equipmentTable[tableLocation].Name);
}

// called when check in button is clicked from modal of specific equipment
function checkInEquipment(tableLocation) {
    console.log("checking in " + equipmentTable[tableLocation].Name);
}

// called when reserve button is clicked from modal of specific equipment
function reserveEquipment(tableLocation) {
    console.log("reserving " + equipmentTable[tableLocation].Name);
}