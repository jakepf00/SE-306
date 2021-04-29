function initializeTables() {
    getReservationsTable();
    getEquipmentTable();
}

function listTournaments() {
    var newData = "";
    for (i = 0; i < reservationsTable.length; i++) {
        if (reservationsTable[i].EventType == 1) {
            newData += "<p>Name: " + reservationsTable[i].Name + "</p>"
                + "<p>Location: " + reservationsTable[i].Location + "</p>"
                + "<p>Event Type: Tournament</p>"
                + "<p>Date/Time: " + reservationsTable[i].DateTime + "</p>"
                + "<p>Equipment: " + getEqName(reservationsTable[i].Equipment) + "</p>"
                + "<button type=\"button\" onClick=\"deleteReservation(" + reservationsTable[i].ID + ")\">Cancel Reservation</button>"
                + "<button type=\"button\" data-toggle=\"modal\" data-target=\"#reservation_modal\" onClick=\"editReservationModal(" + i + ")\">Edit Reservation</button>"
                + "<hr>";
        }
    }
    if (newData == "") {
        newData += "No tournaments available";
    }
    else newData = "Sort by: "
        + "<button type=\"button\" onClick=\"sortByName(1)\">Name</button>"
        + "<button type=\"button\" onClick=\"sortByEquipment(1)\">Equipment</button>"
        + "<button type=\"button\" onClick=\"sortByDateTime(1)\">Date and Time</button><br><br>" + newData;

    document.getElementById("reservation_results").innerHTML = newData;
}
function listReservations() {
    var newData = "";
    for (i = 0; i < reservationsTable.length; i++) {
        if (reservationsTable[i].EventType == 2) {
            newData += "<p>Name: " + reservationsTable[i].Name + "</p>"
                + "<p>Location: " + reservationsTable[i].Location + "</p>"
                + "<p>Event Type: Personal Reservation</p>"
                + "<p>Date/Time: " + reservationsTable[i].DateTime + "</p>"
                + "<p>Equipment: " + getEqName(reservationsTable[i].Equipment) + "</p>"
                + "<button type=\"button\" onClick=\"deleteReservation(" + reservationsTable[i].ID + ")\">Cancel Reservation</button>"
                + "<button type=\"button\" data-toggle=\"modal\" data-target=\"#reservation_modal\" onClick=\"editReservationModal(" + i + ")\">Edit Reservation</button>"
                + "<hr>";
        }
    }

    if (newData == "") {
        newData += "No reservations available";
    }
else newData = "Sort by: "
        + "<button type=\"button\" onClick=\"sortByName(2)\">Name</button>"
        + "<button type=\"button\" onClick=\"sortByEquipment(2)\">Equipment</button>"
        + "<button type=\"button\" onClick=\"sortByDateTime(2)\">Date and Time</button><br><br>" + newData;

    document.getElementById("reservation_results").innerHTML = newData;
}
function listOther() {
    var newData = "";
    for (i = 0; i < reservationsTable.length; i++) {
        if (reservationsTable[i].EventType == 3) {
            newData += "<p>Name: " + reservationsTable[i].Name + "</p>"
                + "<p>Location: " + reservationsTable[i].Location + "</p>"
                + "<p>Event Type: Other Reservation</p>"
                + "<p>Date/Time: " + reservationsTable[i].DateTime + "</p>"
                + "<p>Equipment: " + getEqName(reservationsTable[i].Equipment) + "</p>"
                + "<button type=\"button\" onClick=\"deleteReservation(" + reservationsTable[i].ID + ")\">Cancel Reservation</button>"
                + "<button type=\"button\" data-toggle=\"modal\" data-target=\"#reservation_modal\" onClick=\"editReservationModal(" + i + ")\">Edit Reservation</button>"
                + "<hr>";
        }
    }
    if (newData == "") {
        newData += "No other events available";
    }
    else newData = "Sort by: "
        + "<button type=\"button\" onClick=\"sortByName(3)\">Name</button>"
        + "<button type=\"button\" onClick=\"sortByEquipment(3)\">Equipment</button>"
        + "<button type=\"button\" onClick=\"sortByDateTime(3)\">Date and Time</button><br><br>" + newData;

    document.getElementById("reservation_results").innerHTML = newData;
}

function displaySchedule() {
    var newData = "";
    sortByDateTime(4);
    for (i = 0; i < reservationsTable.length; i++) {
        newData += "<p>" + reservationsTable[i].DateTime + " - " + reservationsTable[i].Name + "</p>";
    }
    if (newData == "") {
        newData += "No events available";
    }
    document.getElementById("reservation_results").innerHTML = newData;
}


function newReservationModal() {
    var newData = "";

    var modalTitle = document.getElementById("modal_header");
    newData = "<button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>";
    newData += "<h4 class=\"modal-title\">Create New Reservation</h4>";
    modalTitle.innerHTML = newData;

    var modalBody = document.getElementById("modal_body");
    newData = "<p>Name:</p><input type=\"text\" id=\"new_reservation_name\" size=\"40\"><br><br>";
    newData += "<p>Location:</p><input type=\"text\" id=\"new_reservation_location\" size=\"40\"><br><br>";
    newData += "<p>Event Type:</p><select id=\"new_reservation_event_type\"><option value=\"1\">Tournament</option><option value=\"2\">Personal Reservation</option><option value=\"3\">Other Event</option></select><br><br>";
    newData += "<p>Date and Time:</p><input type=\"text\" id=\"new_reservation_date_time\" size=\"40\"><br><br>";
    newData += "<p>Equipment:</p>" + generateEqSelector(0);
    modalBody.innerHTML = newData; // don't need to ask for ID, it will be automatically generated

    var modalFooter = document.getElementById("modal_footer");
    newData = 
          "<button type=\"button\" class=\"btn btn-default\" onclick=\"submitNewReservation()\" data-dismiss=\"modal\">Add</button>"
        + "<button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Cancel</button>";
    modalFooter.innerHTML = newData;
}
function submitNewReservation() {
    var newReservation = {
        "ID": generateReservationID(),
        "name": document.getElementById("new_reservation_name").value,
        "location": document.getElementById("new_reservation_location").value,
        "eventType": parseInt(document.getElementById("new_reservation_event_type").value),
        "dateTime": document.getElementById("new_reservation_date_time").value,
        "equipment": parseInt(document.getElementById("new_reservation_equipment").value),
    }
    postReservation(JSON.stringify(newReservation));
}
function generateReservationID() {
    var max = 0;
    for (i = 0; i < reservationsTable.length; i++) {
        if (reservationsTable[i].ID > max) {
            max = reservationsTable[i].ID;
        }
    }
    return max + 1;
}
function generateEqSelector(selected) {
    sortEqTable();
    equipmentSelector = "";

    if (selected == 0) equipmentSelector += "<select id=\"new_reservation_equipment\"><option value=\"0\" selected>No Equipment</option>";
    else equipmentSelector += "<select id=\"new_reservation_equipment\"><option value=\"0\">No Equipment</option>";

    for (i = 0; i < equipmentTable.length; i++) {
        if (equipmentTable[i].Eq_ID != 0) {
            if (selected == equipmentTable[i].Eq_ID)
                equipmentSelector += "<option value=\"" + equipmentTable[i].Eq_ID + "\" selected>" + equipmentTable[i].Name + "</option>";
            else equipmentSelector += "<option value=\"" + equipmentTable[i].Eq_ID + "\">" + equipmentTable[i].Name + "</option>";
        }
    }

    equipmentSelector += "</select><br><br>";
    return equipmentSelector;
}

function editReservationModal(tableLocation) {
    var newData = "";

    var modalTitle = document.getElementById("modal_header");
    newData = "<button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>";
    newData += "<h4 class=\"modal-title\">Edit Reservation</h4>";
    modalTitle.innerHTML = newData;

    var modalBody = document.getElementById("modal_body");
    newData = "<p>Name:</p><input type=\"text\" id=\"edit_reservation_name\" size=\"40\" value=\"" + reservationsTable[tableLocation].Name + "\"><br><br>";
    newData += "<p>Location:</p><input type=\"text\" id=\"edit_reservation_location\" size=\"40\" value=\"" + reservationsTable[tableLocation].Location + "\"><br><br>";
    switch (reservationsTable[tableLocation].EventType) {
        case 1:
            newData += "<p>Event Type:</p><select id=\"edit_reservation_event_type\"><option value=\"1\">Tournament</option><option value=\"2\">Personal Reservation</option><option value=\"3\">Other Event</option></select><br><br>";
            break;
        case 2:
            newData += "<p>Event Type:</p><select id=\"edit_reservation_event_type\"><option value=\"1\">Tournament</option><option value=\"2\" selected>Personal Reservation</option><option value=\"3\">Other Event</option></select><br><br>";
            break;
        case 3:
            newData += "<p>Event Type:</p><select id=\"edit_reservation_event_type\"><option value=\"1\">Tournament</option><option value=\"2\">Personal Reservation</option><option value=\"3\" selected>Other Event</option></select><br><br>";
            break;
    }
    newData += "<p>Date and Time:</p><input type=\"text\" id=\"edit_reservation_date_time\" size=\"40\" value=\"" + reservationsTable[tableLocation].DateTime + "\"><br><br>";
    newData += "<p>Equipment:</p>" + generateEqSelector(reservationsTable[tableLocation].Equipment);
    modalBody.innerHTML = newData;

    var modalFooter = document.getElementById("modal_footer");
    newData = 
          "<button type=\"button\" class=\"btn btn-default\" onclick=\"editReservation(" + tableLocation + ")\" data-dismiss=\"modal\">Save Changes</button>"
        + "<button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Cancel</button>";
    modalFooter.innerHTML = newData;
}

function editReservation(tableLocation) {
    var editReservation = {
        "ID": reservationsTable[tableLocation].ID,
        "name": document.getElementById("edit_reservation_name").value,
        "location": document.getElementById("edit_reservation_location").value,
        "eventType": parseInt(document.getElementById("edit_reservation_event_type").value),
        "dateTime": document.getElementById("edit_reservation_date_time").value,
        "equipment": parseInt(document.getElementById("edit_reservation_equipment").value),
    }
    putReservation(JSON.stringify(editReservation));
    document.getElementById("reservation_results").innerHTML = "Reservation updated successfully";
}

function checkAvailabilityModal() {
    var newData = "";

    var modalTitle = document.getElementById("modal_header");
    newData = "<button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>";
    newData += "<h4 class=\"modal-title\">Check Space Availability</h4>";
    modalTitle.innerHTML = newData;

    var modalBody = document.getElementById("modal_body");
    newData = "<p>Enter space to check</p><input type=\"text\" id=\"space_to_check\" size=\"40\"><br><br>";
    modalBody.innerHTML = newData;

    var modalFooter = document.getElementById("modal_footer");
    newData = 
          "<button type=\"button\" class=\"btn btn-default\" onclick=\"checkAvailability()\" data-dismiss=\"modal\">Check</button>"
        + "<button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Cancel</button>";
    modalFooter.innerHTML = newData;
}

function checkAvailability() {
    var space = document.getElementById("space_to_check").value;
    var newData = ""
    for (i = 0; i < reservationsTable.length; i++) {
        if (reservationsTable[i].Location.toLowerCase() == space.toLowerCase()) {
            newData += "<p>" + reservationsTable[i].DateTime + " - " + reservationsTable[i].Name + "</p>";
        }
    }
    if (newData == "") {
        newData = "<p>Space not in use</p>";
    }
    else newData = "<p>Space in use:</p>" + newData;
    document.getElementById("reservation_results").innerHTML = newData;
}

function sortByName(eventType) {
    for (i = 0; i < reservationsTable.length; i++) {
        for (j = 0; j < reservationsTable.length - i - 1; j++) {
            if (reservationsTable[j].Name > reservationsTable[j + 1].Name) {
                var temp = reservationsTable[j];
                reservationsTable[j] = reservationsTable[j + 1];
                reservationsTable[j + 1] = temp;
            }
        }
    }
    switch (eventType) {
        case 1: listTournaments(); break;
        case 2: listReservations(); break;
        case 3: listOther(); break;
    }
}
function sortByEquipment(eventType) {
    for (i = 0; i < reservationsTable.length; i++) {
        for (j = 0; j < reservationsTable.length - i - 1; j++) {
            if (reservationsTable[j].Equipment > reservationsTable[j + 1].Equipment) {
                var temp = reservationsTable[j];
                reservationsTable[j] = reservationsTable[j + 1];
                reservationsTable[j + 1] = temp;
            }
        }
    }
    switch (eventType) {
        case 1: listTournaments(); break;
        case 2: listReservations(); break;
        case 3: listOther(); break;
    }
}
function sortByDateTime(eventType) {
    for (i = 0; i < reservationsTable.length; i++) {
        for (j = 0; j < reservationsTable.length - i - 1; j++) {
            if (reservationsTable[j].DateTime > reservationsTable[j + 1].DateTime) {
                var temp = reservationsTable[j];
                reservationsTable[j] = reservationsTable[j + 1];
                reservationsTable[j + 1] = temp;
            }
        }
    }
    switch (eventType) {
        case 1: listTournaments(); break;
        case 2: listReservations(); break;
        case 3: listOther(); break;
    }
}

function getEqName(id) {
    for (j = 0; j < equipmentTable.length; j++) {
        if (id == equipmentTable[j].Eq_ID) return equipmentTable[j].Name;
    }
    return "No Equipment";
}

function sortEqTable() {
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