var equipmentTable;

function getEquipmentTable() {    
    var apiUrl = 'https://localhost:44335/api/Table1';
    fetch(apiUrl).then(response => {
        return response.json();
    }).then(data => {
        // Work with JSON data here
        equipmentTable = data;
    }).catch(err => {
        // Do something for an error here
    });
}

function updateWebpage() {
    if (equipmentTable) { // wait until the getEquipmentTable function has completed before updating webpage with recieved data
        console.log(equipmentTable);
        // from here, edit the webpage to display received data
        // loop through table, get each element name, add to list
    }
    else {
        setTimeout(updateWebpage, 100); // wait 100ms then try again
    }
}

function displayEquipment() {
    console.log('Inside displayEquipment()');
    getEquipmentTable();
    updateWebpage();
}
