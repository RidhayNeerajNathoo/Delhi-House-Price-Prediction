function getBathValue() {
    var uiBathrooms = document.getElementsByName("uiBathrooms");
    for (var i = 0; i < uiBathrooms.length; i++) {
        if (uiBathrooms[i].checked) {
            return parseInt(uiBathrooms[i].value);
        }
    }
    return -1; // Invalid Value
}

function getBHKValue() {
    var uiBHK = document.getElementsByName("uiBHK");
    for (var i = 0; i < uiBHK.length; i++) {
        if (uiBHK[i].checked) {
            return parseInt(uiBHK[i].value);
        }
    }
    return -1; // Invalid Value
}

function getFurnishingValue() {
    var uiFurnishing = document.getElementsByName("uiFurnishing");
    for (var i = 0; i < uiFurnishing.length; i++) {
        if (uiFurnishing[i].checked) {
            return parseInt(uiFurnishing[i].value);
        }
    }
    return -1; // Invalid Value
}

function getStatusValue() {
    var uiStatus = document.getElementsByName("uiStatus");
    for (var i = 0; i < uiStatus.length; i++) {
        if (uiStatus[i].checked) {
            return parseInt(uiStatus[i].value);
        }
    }
    return -1; // Invalid Value
}

function getTransactionValue() {
    var uiTransaction = document.getElementsByName("uiTransaction");
    for (var i = 0; i < uiTransaction.length; i++) {
        if (uiTransaction[i].checked) {
            return parseInt(uiTransaction[i].value);
        }
    }
    return -1; // Invalid Value
}

function getTypeValue() {
    var uiType = document.getElementsByName("uiType");
    for (var i = 0; i < uiType.length; i++) {
        if (uiType[i].checked) {
            return parseInt(uiType[i].value);
        }
    }
    return -1; // Invalid Value
}

function onClickedEstimatePrice() {
    console.log("Estimate price button clicked");
    var sqft = document.getElementById("uiSqft").value;
    var bhk = getBHKValue();
    var bathrooms = getBathValue();
    var location = document.getElementById("uiLocations").value;
    var furnishing = getFurnishingValue();
    var parking = document.getElementById("uiParking").value;
    var status = getStatusValue();
    var transaction = getTransactionValue();
    var type = getTypeValue();
    var estPrice = document.getElementById("uiEstimatedPrice");

    var url = "http://127.0.0.1:5003/predict_home_price";

    $.post(url, {
        Area: parseFloat(sqft),
        BHK: bhk,
        Bathroom: bathrooms,
        Location: location,
        Furnishing: furnishing,
        Parking: parseInt(parking),
        Status: status,
        Transaction: transaction,
        Type: type
    }, function(data, status) {
        console.log(data.estimated_price);
        estPrice.innerHTML = "<h2>" + data.estimated_price.toString() + " Lakh</h2>";
        console.log(status);
    });
}

function onPageLoad() {
    console.log("document loaded");

    var locationUrl = "http://127.0.0.1:5003/get_location_names";
    $.get(locationUrl, function(data, status) {
        console.log("got response for get_location_names request");
        if (data) {
            var locations = data.locations;
            var uiLocations = document.getElementById("uiLocations");
            $('#uiLocations').empty();
            for (var i = 0; i < locations.length; i++) {
                var opt = new Option(locations[i]);
                uiLocations.appendChild(opt);
            }
        }
    });
}

window.onload = onPageLoad;
