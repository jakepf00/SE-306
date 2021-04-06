var concessionsApiUrl = 'http://127.0.0.1:5000/concessions';
var customerInfoApiUrl = 'http://127.0.0.1:5000/customerinfo';
var employeeInfoApiUrl = 'http://127.0.0.1:5000/employeeinfo';
var equipmentApiUrl = 'http://127.0.0.1:5000/equipment';
var reservationsApiUrl = 'http://127.0.0.1:5000/reservations';
var transactionsApiUrl = 'http://127.0.0.1:5000/transactions';

var equipmentTable;
var concessionsTable;
var reservationsTable;
var transactionTable;

// API access functions
//////////////////////////////////////////////////////// Reservations
function getReservationsTable() {    
    fetch(reservationsApiUrl).then(response => {
        return response.json();
    }).then(data => {
        reservationsTable = data;
    }).catch(err => {
        console.log(err);
    });
}

function postReservation(newReservation) {
    fetch(reservationsApiUrl, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: newReservation
    }).then(response => {
        getReservationsTable();
        document.getElementById("reservation_results").innerHTML = "<p>Reservation made successfully</p>";
    }).catch(err => {
        console.log(err);
    });
}

function deleteReservation(ID) {
    var newUrl = reservationsApiUrl + "/" + ID;
    fetch(newUrl, {
        method: 'DELETE',
    }).then(response => {
        getReservationsTable();
        document.getElementById("reservation_results").innerHTML = "<p>Reservation cancelled successfully</p>";
    }).catch(err => {
        console.log(err);
    });
}

function putReservation(updatedReservation) {
    fetch(reservationsApiUrl, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
        },
        body: updatedReservation
    }).then(response => {
        getReservationsTable();
    }).catch(err => {
        console.log(err);
    });
}

//////////////////////////////////////////////////////// Concessions
function getConcessionsTable() {
    fetch(concessionsApiUrl).then(response => {
        return response.json();
    }).then(data => {
        concessionsTable = data;
    }).catch(err => {
        console.log(err);
    });
}

function postConcession(newConcession) {
    fetch(concessionsApiUrl, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: newConcession
    }).then(response => {
        getConcessionsTable();
        document.getElementById("concessions_results").innerHTML = "<p>Item created successfully</p>";
    }).catch(err => {
        console.log(err);
    });
}

function deleteConcessionsItem(SKU) {
    var newUrl = concessionsApiUrl + "/" + SKU;
    fetch(newUrl, {
        method: 'DELETE',
    }).then(response => {
        getConcessionsTable();
        document.getElementById("concessions_results").innerHTML = "Item was successfully removed from database"
    }).catch(err => {
        console.log(err);
    });
}

function putConcession(updatedConcession) {
    fetch(concessionsApiUrl, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
        },
        body: updatedConcession
    }).then(response => {
        getConcessionsTable();
    }).catch(err => {
        console.log(err);
    });
}

//////////////////////////////////////////////////////// Equipment
function getEquipmentTable() {    
    fetch(equipmentApiUrl).then(response => {
        return response.json();
    }).then(data => {
        equipmentTable = data;
    }).catch(err => {
        console.log(err);
    });
}

function postEquipment(newEquipment) {
    fetch(equipmentApiUrl, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: newEquipment
    }).then(response => {
        getEquipmentTable();
        document.getElementById("equipment_results").innerHTML = "Equipment added successfully";
    }).catch(err => {
        console.log(err);
    });
}

function deleteEquipment(eqId) {
    var newUrl = equipmentApiUrl + "/" + eqId;
    fetch(newUrl, {
        method: 'DELETE',
    }).then(response => {
        getEquipmentTable();
        document.getElementById("equipment_results").innerHTML = "Equipment removed successfully";
    }).catch(err => {
        console.log(err);
    });
}

function putEquipment(updatedEquipment) {
    fetch(equipmentApiUrl, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
        },
        body: updatedEquipment
    }).then(response => {
        getEquipmentTable();
    }).catch(err => {
        console.log(err);
    });
}

//////////////////////////////////////////////////////// Money
function getTransactionTable() {    
    fetch(transactionsApiUrl).then(response => {
        return response.json();
    }).then(data => {
        transactionTable = data;
    }).catch(err => {
        console.log(err);
    });
}

function postTransaction(newTransaction) {
    fetch(transactionsApiUrl, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: newTransaction
    }).then(response => {
        getTransactionTable();
    }).catch(err => {
        console.log(err);
    });
}

function deleteTransaction(transactionID) {
    var newUrl = transactionsApiUrl + "/" + transactionID;
    fetch(newUrl, {
        method: 'DELETE',
    }).then(response => {
        getTransactionTable();
        document.getElementById("transaction_results").innerHTML = "Transaction removed successfully";
    }).catch(err => {
        console.log(err);
    });
}