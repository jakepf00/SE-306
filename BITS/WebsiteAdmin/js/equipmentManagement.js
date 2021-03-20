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

function updateWebpage(equipmentTable) {
    console.log(equipmentTable);
    // from here, edit the webpage to display received data
    // loop through table, get each element name, add to list
    // -> will append to a string that will eventually be used in the HTML 
    var equipmentResults = document.getElementById("equipment_results");
    var searchString = document.getElementById("search_string").value;
    console.log(searchString);
    var newEquipmentList = "";
    
    var tableLocation = 0;
    equipmentTable.forEach(function(item) {
        console.log(item.name);
        if (item.name.toLowerCase().includes(searchString.toLowerCase())) { // if search_string is contained within the equipment name
            newEquipmentList = newEquipmentList.concat
                ("<li><a data-toggle=\"modal\" data-target=\"#equipmentModal\" onclick=\"displayEquipmentDetails(", tableLocation, ")\">", item.name, "</li></a>");
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
    equipmentModal.innerHTML = newEquipmentData;
}

// called when search button is clicked
function displayEquipmentList() {
    console.log('Inside displayEquipmentList()');
    getEquipmentTable(); // calls updateWebpage() once the promise is fulfilled
}
