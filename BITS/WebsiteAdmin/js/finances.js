function listTransactions() {
    var newData = "";

    for (i = 0; i < transactionTable.length; i++) {
        newData += "<p>Transaction Number: " + transactionTable[i].Transaction_ID + "</p>"
            + "<p>Customer ID: " + transactionTable[i].Customer_ID + "</p>"
            + "<p>Card Number: " + (transactionTable[i].CardNumber == 0 ? "Cash" : transactionTable[i].CardNumber) + "</p>"
            + "<p>Transaction Amount: $" + transactionTable[i].PaymentAmount.toFixed(2) + "</p><hr>";
    }

    if (newData == "") {
        newData += "No transactions completed";
    }
    else newData = "Sort by: "
        + "<button type=\"button\" onClick=\"sortByName(1)\">Name</button>"
        + "<button type=\"button\" onClick=\"sortByEquipment(1)\">Equipment</button>"
        + "<button type=\"button\" onClick=\"sortByDateTime(1)\">Date and Time</button><br><br>"
        + newData;

    document.getElementById("transaction_results").innerHTML = newData;
}

function payCreditCard() {
    console.log("credit card");
}

function payCash() {
    console.log("cash");
}