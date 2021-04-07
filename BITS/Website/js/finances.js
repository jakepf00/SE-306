function listTransactions() {
    var newData = "";
    for (i = 0; i < transactionTable.length; i++) {
        newData += "<p>Transaction Number: " + transactionTable[i].Transaction_ID + "</p>"
            + "<p>Customer ID: " + transactionTable[i].Customer_ID + "</p>"
            + "<p>Card Number: " + (transactionTable[i].CardNumber == 0 ? "Cash" : transactionTable[i].CardNumber) + "</p>"
            + "<p>Transaction Amount: $" + transactionTable[i].PaymentAmount.toFixed(2) + "</p>"
            + "<button type=\"button\" onClick=\"deleteTransaction(" + transactionTable[i].Transaction_ID + ")\">Delete Transaction</button><hr>";
    }
    if (newData == "") {
        newData += "No transactions completed";
    }
    else newData = "Sort by: "
        + "<button type=\"button\" onClick=\"sortByTransactionID()\">Transaction Number</button>"
        + "<button type=\"button\" onClick=\"sortByCustomerID()\">Customer ID</button>"
        + "<button type=\"button\" onClick=\"sortByTransactionAmount()\">Transaction Amount</button><br><br>"
        + newData;

    document.getElementById("transaction_results").innerHTML = newData;
}

function payCreditCardModal() {
    var newData = "";

    var modalTitle = document.getElementById("modal_header");
    newData = "<button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>";
    newData += "<h4 class=\"modal-title\">Credit Card Payment</h4>";
    modalTitle.innerHTML = newData;

    var financesModal = document.getElementById("modal_body");
    newData = "<p>Customer ID: </p><input type=\"text\" id=\"customer_id\" size=\"30\"><br><br>";
    newData += "<p>Credit Card Number: </p><input type=\"text\" id=\"card_number\" size=\"30\"><br><br>";
    newData += "<p>Payment Amount: </p><input type=\"text\" id=\"payment_amount\" size=\"30\"><br><br>";
    financesModal.innerHTML = newData;

    var modalFooter = document.getElementById("modal_footer");
    newData = "<button type=\"button\" class=\"btn btn-default\" onclick=\"payCreditCard()\" data-dismiss=\"modal\">OK</button>"
    modalFooter.innerHTML = newData;
}
function payCreditCard() {
    var newTransaction = {
        "transactionID": generateTransactionNumber(),
        "customerID": document.getElementById("customer_id").value,
        "cardNumber": parseInt(document.getElementById("card_number").value),
        "paymentAmount": parseFloat(document.getElementById("payment_amount").value),
    }
    postTransaction(JSON.stringify(newTransaction));
    document.getElementById("transaction_results").innerHTML = "Transaction added successfully";
}

function payCashModal() {
    var newData = "";

    var modalTitle = document.getElementById("modal_header");
    newData = "<button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>";
    newData += "<h4 class=\"modal-title\">Credit Card Payment</h4>";
    modalTitle.innerHTML = newData;

    var financesModal = document.getElementById("modal_body");
    newData = "<p>Customer ID: </p><input type=\"text\" id=\"customer_id\" size=\"30\"><br><br>";
    newData += "<p>Payment Amount: </p><input type=\"text\" id=\"payment_amount\" size=\"30\"><br><br>";
    newData += "<p>Cash Given: </p><input type=\"text\" id=\"cash_given\" size=\"30\"><br><br>";
    financesModal.innerHTML = newData;

    var modalFooter = document.getElementById("modal_footer");
    newData = "<button type=\"button\" class=\"btn btn-default\" onclick=\"payCash()\" data-dismiss=\"modal\">OK</button>"
    modalFooter.innerHTML = newData;
}
function payCash() {
    var change = parseFloat(document.getElementById("cash_given").value) - parseFloat(document.getElementById("payment_amount").value);
    if (change >= 0) {
        var newTransaction = {
            "transactionID": generateTransactionNumber(),
            "customerID": document.getElementById("customer_id").value,
            "cardNumber": 0,
            "paymentAmount": parseFloat(document.getElementById("payment_amount").value),
        }
        postTransaction(JSON.stringify(newTransaction));
        document.getElementById("transaction_results").innerHTML = "Return Change: $" + change.toFixed(2);
    }
    else document.getElementById("transaction_results").innerHTML = "Not enough money given to complete transaction";
}

function generateTransactionNumber() {
    var max = 0;
    for (i = 0; i < transactionTable.length; i++) {
        if (transactionTable[i].Transaction_ID > max) {
            max = transactionTable[i].Transaction_ID;
        }
    }
    return max + 1;
}

function sortByCustomerID() {

}
function sortByTransactionAmount() {

}
function sortByTransactionID() {

}