var currentLanguageResources = getCurrentResources();
var currentServiceId;
var currentRating;
var currentDateRange = 2;

var businessSectorsDictionary = [];
var serviceActionsDictionary = [];

var selectedBusinessSectorFilter = "All";
var selectedServiceActionFilter = "All";

var paginationCurrentPage = 1;
var paginationCurrentLowerLimit = 1;

var timeoutShortSpan = 1200;
var timeoutLongSpan = 1600;

var businessSectorsModal = document.getElementById('businessSectorsModal');
var businessSectorsSpan = document.getElementById('businessSectorsModalClose');

if (businessSectorsModal != null) {
    businessSectorsSpan.onclick = function () {
        closeBusinessSectorsModal();
    }

    function closeBusinessSectorsModal() {
        businessSectorsModal.style.display = "none";
    }

    function showBusinessSectorsModal() {
        businessSectorsModal.style.display = "block";
    }
}

var serviceActionsModal = document.getElementById('serviceActionsModal');
var serviceActionsSpan = document.getElementById('serviceActionsModalClose');

if (serviceActionsModal != null) {
    serviceActionsSpan.onclick = function () {
        closeServiceActionsModal();
    }

    function closeServiceActionsModal() {
        serviceActionsModal.style.display = "none";
    }

    function showServiceActionsModal() {
        serviceActionsModal.style.display = "block";
    }
}

var ratingsModal = document.getElementById('ratingsModal');
var ratingsSpan = document.getElementById('ratingsModalClose');

if (ratingsModal != null) {
    ratingsSpan.onclick = function () {
        closeRatingsModal();
    }

    function closeRatingsModal() {
        ratingsModal.style.display = "none";
    }

    function showRatingsModal(serviceId, rating, comment) {

        currentServiceId = serviceId;
        currentRating = rating;
        initializeStars();
        $('#inputComment').val(unformatTextAreaInput(comment));

        ratingsModal.style.display = "block";
    }
}

function initializeBusinessSectorsDictionary() {
    businessSectorsDictionary['All'] = currentLanguageResources['business-sector-All'];
    for (var i = 0; i < businessSectors.length; i++) {
        businessSectorsDictionary[businessSectors[i].dbValue] = currentLanguageResources['business-sector-' + businessSectors[i].dbValue];
    }
}

function initializeServiceActionsDictionary() {
    serviceActionsDictionary['All'] = currentLanguageResources['service-action-All'];
    serviceActionsDictionary['Rent-Acquisition'] = currentLanguageResources['service-action-Rent-Acquisition'];
    serviceActionsDictionary['Rent-Return'] = currentLanguageResources['service-action-Rent-Return'];
    for (var i = 0; i < serviceActions.length; i++) {
        if (serviceActions[i].dbValue == "Sell") {
            serviceActionsDictionary[serviceActions[i].dbValue] = currentLanguageResources['client-services-Sell'];
        } else {
            serviceActionsDictionary[serviceActions[i].dbValue] = currentLanguageResources['service-action-' + serviceActions[i].dbValue];
        }
    }
}

function fillBusinessSectorsModal() {
    var businessSectorsHtml = '';

    var allBusinessSectors = [...businessSectors];
    allBusinessSectors.unshift(allBusinessSectorsRecord);

    var sectorsPerRow = 3;
    var numberOfIterations = Math.floor(allBusinessSectors.length / sectorsPerRow);
    numberOfIterations = numberOfIterations + 1;
    var currentSectorsPerRow = sectorsPerRow;

    var businessSectorsPosition = 0;

    for (var i = 0; i < numberOfIterations; i++) {

        if (i == (numberOfIterations - 1)) {
            currentSectorsPerRow = allBusinessSectors.length % 3;
            if (currentSectorsPerRow == 1) {

                businessSectorsHtml += '<div class="row">';
                businessSectorsHtml += '<div class="col-md-4"></div>';

                businessSectorsHtml += '<div class="col-md-4">';
                businessSectorsHtml += '<div id="businessSectorContainer_' + allBusinessSectors[businessSectorsPosition].dbValue + '" class="businessSectorContainer" onclick="selectClickBusinessSector(\'' + allBusinessSectors[businessSectorsPosition].dbValue + '\')">';
                businessSectorsHtml += '<img src="' + allBusinessSectors[businessSectorsPosition].iconPath + '" class="businessSectorIcon" />';
                businessSectorsHtml += '<br/><br/>';
                businessSectorsHtml += '<label class="coven-text white-color">' + businessSectorsDictionary[allBusinessSectors[businessSectorsPosition].dbValue] + '</label>';
                businessSectorsHtml += '</div>';
                businessSectorsHtml += '</div>';
                businessSectorsPosition++;

                businessSectorsHtml += '<div class="col-md-4"></div>';
                businessSectorsHtml += '</div>';

            } else if (currentSectorsPerRow == 2) {

                businessSectorsHtml += '<div class="row">';
                businessSectorsHtml += '<div class="col-md-1"></div>';

                businessSectorsHtml += '<div class="col-md-4">';
                businessSectorsHtml += '<div id="businessSectorContainer_' + allBusinessSectors[businessSectorsPosition].dbValue + '" class="businessSectorContainer" onclick="selectClickBusinessSector(\'' + allBusinessSectors[businessSectorsPosition].dbValue + '\')">';
                businessSectorsHtml += '<img src="' + allBusinessSectors[businessSectorsPosition].iconPath + '" class="businessSectorIcon" />';
                businessSectorsHtml += '<br/><br/>';
                businessSectorsHtml += '<label class="coven-text white-color">' + businessSectorsDictionary[allBusinessSectors[businessSectorsPosition].dbValue] + '</label>';
                businessSectorsHtml += '</div>';
                businessSectorsHtml += '</div>';
                businessSectorsPosition++;

                businessSectorsHtml += '<div class="col-md-2"></div>';

                businessSectorsHtml += '<div class="col-md-4">';
                businessSectorsHtml += '<div id="businessSectorContainer_' + allBusinessSectors[businessSectorsPosition].dbValue + '" class="businessSectorContainer" onclick="selectClickBusinessSector(\'' + allBusinessSectors[businessSectorsPosition].dbValue + '\')">';
                businessSectorsHtml += '<img src="' + allBusinessSectors[businessSectorsPosition].iconPath + '" class="businessSectorIcon" />';
                businessSectorsHtml += '<br/><br/>';
                businessSectorsHtml += '<label class="coven-text white-color">' + businessSectorsDictionary[allBusinessSectors[businessSectorsPosition].dbValue] + '</label>';
                businessSectorsHtml += '</div>';
                businessSectorsHtml += '</div>';
                businessSectorsPosition++;

                businessSectorsHtml += '<div class="col-md-1"></div>';
                businessSectorsHtml += '</div>';

            }
        }
        else {
            businessSectorsHtml += '<div class="row">';

            businessSectorsHtml += '<div class="col-md-4">';
            businessSectorsHtml += '<div id="businessSectorContainer_' + allBusinessSectors[businessSectorsPosition].dbValue + '" class="businessSectorContainer" onclick="selectClickBusinessSector(\'' + allBusinessSectors[businessSectorsPosition].dbValue + '\')">';
            businessSectorsHtml += '<img src="' + allBusinessSectors[businessSectorsPosition].iconPath + '" class="businessSectorIcon" />';
            businessSectorsHtml += '<br/><br/>';
            businessSectorsHtml += '<label class="coven-text white-color">' + businessSectorsDictionary[allBusinessSectors[businessSectorsPosition].dbValue] + '</label>';
            businessSectorsHtml += '</div>';
            businessSectorsHtml += '</div>';
            businessSectorsPosition++;

            businessSectorsHtml += '<div class="col-md-4">';
            businessSectorsHtml += '<div id="businessSectorContainer_' + allBusinessSectors[businessSectorsPosition].dbValue + '" class="businessSectorContainer" onclick="selectClickBusinessSector(\'' + allBusinessSectors[businessSectorsPosition].dbValue + '\')">';
            businessSectorsHtml += '<img src="' + allBusinessSectors[businessSectorsPosition].iconPath + '" class="businessSectorIcon" />';
            businessSectorsHtml += '<br/><br/>';
            businessSectorsHtml += '<label class="coven-text white-color">' + businessSectorsDictionary[allBusinessSectors[businessSectorsPosition].dbValue] + '</label>';
            businessSectorsHtml += '</div>';
            businessSectorsHtml += '</div>';
            businessSectorsPosition++;

            businessSectorsHtml += '<div class="col-md-4">';
            businessSectorsHtml += '<div id="businessSectorContainer_' + allBusinessSectors[businessSectorsPosition].dbValue + '" class="businessSectorContainer" onclick="selectClickBusinessSector(\'' + allBusinessSectors[businessSectorsPosition].dbValue + '\')">';
            businessSectorsHtml += '<img src="' + allBusinessSectors[businessSectorsPosition].iconPath + '" class="businessSectorIcon" />';
            businessSectorsHtml += '<br/><br/>';
            businessSectorsHtml += '<label class="coven-text white-color">' + businessSectorsDictionary[allBusinessSectors[businessSectorsPosition].dbValue] + '</label>';
            businessSectorsHtml += '</div>';
            businessSectorsHtml += '</div>';
            businessSectorsPosition++;

            businessSectorsHtml += '</div>';
        }
    }

    $('#businessSectorsModalContainer').empty();
    $('#businessSectorsModalContainer').append(businessSectorsHtml);
}

function fillServiceActionsModal() {
    var serviceActionsHtml = '';

    var theServiceActions = [...serviceActions];
    theServiceActions = theServiceActions.filter(sa => sa.dbValue != "Rent");
    theServiceActions.splice(1, 0, rentReturnRecord);
    theServiceActions.splice(1, 0, rentAcquisitionRecord);
    theServiceActions.unshift(allServiceActionsRecord);

    var sectorsPerRow = 3;
    var numberOfIterations = Math.floor(theServiceActions.length / sectorsPerRow);
    numberOfIterations = numberOfIterations + 1;
    var currentSectorsPerRow = sectorsPerRow;

    var serviceActionsPosition = 0;

    for (var i = 0; i < numberOfIterations; i++) {

        if (i == (numberOfIterations - 1)) {
            currentSectorsPerRow = theServiceActions.length % 3;
            if (currentSectorsPerRow == 1) {

                serviceActionsHtml += '<div class="row">';
                serviceActionsHtml += '<div class="col-md-4"></div>';

                serviceActionsHtml += '<div class="col-md-4">';
                serviceActionsHtml += '<div id="serviceActionContainer_' + theServiceActions[serviceActionsPosition].dbValue + '" class="businessSectorContainer" onclick="selectClickServiceAction(\'' + theServiceActions[serviceActionsPosition].dbValue + '\')">';
                serviceActionsHtml += '<br/><br/><br/>';
                serviceActionsHtml += '<img src="' + theServiceActions[serviceActionsPosition].iconPath + '" class="serviceActionIcon" />';
                serviceActionsHtml += '<br/><br/><br/>';
                serviceActionsHtml += '<label class="coven-text white-color">' + serviceActionsDictionary[theServiceActions[serviceActionsPosition].dbValue] + '</label>';
                serviceActionsHtml += '</div>';
                serviceActionsHtml += '</div>';
                serviceActionsPosition++;

                serviceActionsHtml += '<div class="col-md-4"></div>';
                serviceActionsHtml += '</div>';

            } else if (currentSectorsPerRow == 2) {

                serviceActionsHtml += '<div class="row">';
                serviceActionsHtml += '<div class="col-md-1"></div>';

                serviceActionsHtml += '<div class="col-md-4">';
                serviceActionsHtml += '<div id="serviceActionContainer_' + theServiceActions[serviceActionsPosition].dbValue + '" class="businessSectorContainer" onclick="selectClickServiceAction(\'' + theServiceActions[serviceActionsPosition].dbValue + '\')">';
                serviceActionsHtml += '<br/><br/><br/>';
                serviceActionsHtml += '<img src="' + theServiceActions[serviceActionsPosition].iconPath + '" class="serviceActionIcon" />';
                serviceActionsHtml += '<br/><br/><br/>';
                serviceActionsHtml += '<label class="coven-text white-color">' + serviceActionsDictionary[theServiceActions[serviceActionsPosition].dbValue] + '</label>';
                serviceActionsHtml += '</div>';
                serviceActionsHtml += '</div>';
                serviceActionsPosition++;

                serviceActionsHtml += '<div class="col-md-2"></div>';

                serviceActionsHtml += '<div class="col-md-4">';
                serviceActionsHtml += '<div id="serviceActionContainer_' + theServiceActions[serviceActionsPosition].dbValue + '" class="businessSectorContainer" onclick="selectClickServiceAction(\'' + theServiceActions[serviceActionsPosition].dbValue + '\')">';
                serviceActionsHtml += '<br/><br/><br/>';
                serviceActionsHtml += '<img src="' + theServiceActions[serviceActionsPosition].iconPath + '" class="serviceActionIcon" />';
                serviceActionsHtml += '<br/><br/><br/>';
                serviceActionsHtml += '<label class="coven-text white-color">' + serviceActionsDictionary[theServiceActions[serviceActionsPosition].dbValue] + '</label>';
                serviceActionsHtml += '</div>';
                serviceActionsHtml += '</div>';
                serviceActionsPosition++;

                serviceActionsHtml += '<div class="col-md-1"></div>';
                serviceActionsHtml += '</div>';

            }
        }
        else {
            serviceActionsHtml += '<div class="row">';

            serviceActionsHtml += '<div class="col-md-4">';
            serviceActionsHtml += '<div id="serviceActionContainer_' + theServiceActions[serviceActionsPosition].dbValue + '" class="businessSectorContainer" onclick="selectClickServiceAction(\'' + theServiceActions[serviceActionsPosition].dbValue + '\')">';
            serviceActionsHtml += '<br/><br/><br/>';
            serviceActionsHtml += '<img src="' + theServiceActions[serviceActionsPosition].iconPath + '" class="serviceActionIcon" />';
            serviceActionsHtml += '<br/><br/><br/>';
            serviceActionsHtml += '<label class="coven-text white-color">' + serviceActionsDictionary[theServiceActions[serviceActionsPosition].dbValue] + '</label>';
            serviceActionsHtml += '</div>';
            serviceActionsHtml += '</div>';
            serviceActionsPosition++;

            serviceActionsHtml += '<div class="col-md-4">';
            serviceActionsHtml += '<div id="serviceActionContainer_' + theServiceActions[serviceActionsPosition].dbValue + '" class="businessSectorContainer" onclick="selectClickServiceAction(\'' + theServiceActions[serviceActionsPosition].dbValue + '\')">';
            serviceActionsHtml += '<br/><br/><br/>';
            serviceActionsHtml += '<img src="' + theServiceActions[serviceActionsPosition].iconPath + '" class="serviceActionIcon" />';
            serviceActionsHtml += '<br/><br/><br/>';
            serviceActionsHtml += '<label class="coven-text white-color">' + serviceActionsDictionary[theServiceActions[serviceActionsPosition].dbValue] + '</label>';
            serviceActionsHtml += '</div>';
            serviceActionsHtml += '</div>';
            serviceActionsPosition++;

            serviceActionsHtml += '<div class="col-md-4">';
            serviceActionsHtml += '<div id="serviceActionContainer_' + theServiceActions[serviceActionsPosition].dbValue + '" class="businessSectorContainer" onclick="selectClickServiceAction(\'' + theServiceActions[serviceActionsPosition].dbValue + '\')">';
            serviceActionsHtml += '<br/><br/><br/>';
            serviceActionsHtml += '<img src="' + theServiceActions[serviceActionsPosition].iconPath + '" class="serviceActionIcon" />';
            serviceActionsHtml += '<br/><br/><br/>';
            serviceActionsHtml += '<label class="coven-text white-color">' + serviceActionsDictionary[theServiceActions[serviceActionsPosition].dbValue] + '</label>';
            serviceActionsHtml += '</div>';
            serviceActionsHtml += '</div>';
            serviceActionsPosition++;

            serviceActionsHtml += '</div>';
        }
    }

    $('#serviceActionsModalContainer').empty();
    $('#serviceActionsModalContainer').append(serviceActionsHtml);
}

function selectClickBusinessSector(businessSector) {
    $('#businessSectorContainer_' + selectedBusinessSectorFilter).removeClass();
    $('#businessSectorContainer_' + selectedBusinessSectorFilter).attr('class', 'businessSectorContainer');

    selectedBusinessSectorFilter = businessSector;

    $('#businessSectorContainer_' + selectedBusinessSectorFilter).removeClass();
    $('#businessSectorContainer_' + selectedBusinessSectorFilter).attr('class', 'selectedBusinessSectorContainer');

    closeBusinessSectorsModal();
    paginationCurrentLowerLimit = 1;
    paginationCurrentPage = 1;
    getAllServices(paginationCurrentPage);
}

function selectClickServiceAction(serviceAction) {
    $('#serviceActionContainer_' + selectedServiceActionFilter).removeClass();
    $('#serviceActionContainer_' + selectedServiceActionFilter).attr('class', 'businessSectorContainer');

    selectedServiceActionFilter = serviceAction;

    $('#serviceActionContainer_' + selectedServiceActionFilter).removeClass();
    $('#serviceActionContainer_' + selectedServiceActionFilter).attr('class', 'selectedBusinessSectorContainer');

    closeServiceActionsModal();
    paginationCurrentLowerLimit = 1;
    paginationCurrentPage = 1;
    getAllServices(paginationCurrentPage);
}

function setDateButtonsFormat(dateSelection) {

    const dateIds = ['other', 'year', 'month', 'week', 'today'];

    for (const dateId of dateIds) {
        $('#client-purchases-' + dateId + '-button').removeClass('covenButtonNoHover').addClass('whiteCovenButton');
    }

    $('#client-purchases-' + dateSelection + '-button').removeClass('whiteCovenButton').addClass('covenButtonNoHover');
}

function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

function setDateRangeToday() {

    currentDateRange = 1;
    var today = new Date();
    var startDate = today;
    var endDate = today;

    setDateButtonsFormat('today');
    $('#clientPurchasesStartDateInput').unbind("change");
    $('#clientPurchasesEndDateInput').unbind("change");
    $('#clientPurchasesStartDateInput').val(formatDateForInput(startDate));
    $('#clientPurchasesEndDateInput').val(formatDateForInput(endDate));
    $('#clientPurchasesStartDateInput').prop("disabled", true);
    $('#clientPurchasesEndDateInput').prop("disabled", true);
    paginationCurrentLowerLimit = 1;
    paginationCurrentPage = 1;
    getAllServices(paginationCurrentPage);
}

function setDateRangeWeek() {

    currentDateRange = 2;
    var today = new Date();
    var day = today.getDay();
    var startDate = addDays(today,-1 * day);
    var endDate = addDays(today,6 - day);

    setDateButtonsFormat('week');
    $('#clientPurchasesStartDateInput').unbind("change");
    $('#clientPurchasesEndDateInput').unbind("change");
    $('#clientPurchasesStartDateInput').val(formatDateForInput(startDate));
    $('#clientPurchasesEndDateInput').val(formatDateForInput(endDate));
    $('#clientPurchasesStartDateInput').prop("disabled", true);
    $('#clientPurchasesEndDateInput').prop("disabled", true);
    paginationCurrentLowerLimit = 1;
    paginationCurrentPage = 1;
    getAllServices(paginationCurrentPage);
}

function setDateRangeMonth() {

    currentDateRange = 3;
    var today = new Date();
    var daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate()
    var startDate = new Date(today.getFullYear(), today.getMonth(), 1);
    var endDate = new Date(today.getFullYear(), today.getMonth(), daysInMonth);

    setDateButtonsFormat('month');
    $('#clientPurchasesStartDateInput').unbind("change");
    $('#clientPurchasesEndDateInput').unbind("change");
    $('#clientPurchasesStartDateInput').val(formatDateForInput(startDate));
    $('#clientPurchasesEndDateInput').val(formatDateForInput(endDate));
    $('#clientPurchasesStartDateInput').prop("disabled", true);
    $('#clientPurchasesEndDateInput').prop("disabled", true);
    paginationCurrentLowerLimit = 1;
    paginationCurrentPage = 1;
    getAllServices(paginationCurrentPage);
}

function setDateRangeYear() {

    currentDateRange = 4;
    var today = new Date();
    var startDate = new Date(today.getFullYear(), 0, 1);
    var endDate = new Date(today.getFullYear(), 11, 31);

    setDateButtonsFormat('year');
    $('#clientPurchasesStartDateInput').unbind("change");
    $('#clientPurchasesEndDateInput').unbind("change");
    $('#clientPurchasesStartDateInput').val(formatDateForInput(startDate));
    $('#clientPurchasesEndDateInput').val(formatDateForInput(endDate));
    $('#clientPurchasesStartDateInput').prop("disabled", true);
    $('#clientPurchasesEndDateInput').prop("disabled", true);
    paginationCurrentLowerLimit = 1;
    paginationCurrentPage = 1;
    getAllServices(paginationCurrentPage);
}

function setDateRangeOther() {

    currentDateRange = 5;
    var today = new Date();
    var startDate = today;
    var endDate = today;

    setDateButtonsFormat('other');
    $('#clientPurchasesStartDateInput').unbind("change");
    $('#clientPurchasesEndDateInput').unbind("change");
    $('#clientPurchasesStartDateInput').val(formatDateForInput(startDate));
    $('#clientPurchasesEndDateInput').val(formatDateForInput(endDate));
    $('#clientPurchasesStartDateInput').prop("disabled", false);
    $('#clientPurchasesEndDateInput').prop("disabled", false);

    $('#clientPurchasesStartDateInput').bind("change", function () {
        paginationCurrentLowerLimit = 1;
        paginationCurrentPage = 1;
        getAllServices(paginationCurrentPage);
    });
    $('#clientPurchasesEndDateInput').bind("change", function () {
        paginationCurrentLowerLimit = 1;
        paginationCurrentPage = 1;
        getAllServices(paginationCurrentPage);
    });

    paginationCurrentLowerLimit = 1;
    paginationCurrentPage = 1;
    getAllServices(paginationCurrentPage);
}

function getData() {
    switch (currentDateRange){
        case 1:
            setDateRangeToday();
            break;
        case 2:
            setDateRangeWeek();
            break;
        case 3:
            setDateRangeMonth();
            break;
        case 4:
            setDateRangeYear();
            break;
        case 5:
            setDateRangeOther();
            break;
    }
}

function getAllServices(pageNumber) {
    showMask();
    paginationCurrentPage = pageNumber;
    $.ajax({
        type: 'POST',
        url: apiUrls.services,
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({
            token: sessionStorage.getItem('token'),
            isBusiness: false,
            itemsPerPage: $('#itemsPerPageSelect').val(),
            pageNumber: pageNumber,
            businessSectorFilter: selectedBusinessSectorFilter,
            serviceActionFilter: selectedServiceActionFilter,
            startDate: $('#clientPurchasesStartDateInput').val(),
            endDate: $('#clientPurchasesEndDateInput').val()
        }),
        success: function (response) {

            $('#client-purchases-title').text(currentLanguageResources['client-purchases-title-' + selectedServiceActionFilter]);
            $('#totalServicesLabel').text(currentLanguageResources['total'] + ': ' + response.totalRecords);

            var businessIds = [];
            var imageUrls = [];

            var servicesHtml = '';
            servicesHtml += '<div class="row">';
            servicesHtml += '<div class="col-md-1"></div>';
            servicesHtml += '<div class="col-md-1 centered-text covenTableDivItem covenTableHeader coven-text white-color covenTableFirstCell">' + currentLanguageResources['client-purchases-table-type'] + '</div>';
            servicesHtml += '<div class="col-md-1 centered-text covenTableDivItem covenTableHeader coven-text white-color">' + currentLanguageResources['client-purchases-table-product'] + '</div>';
            servicesHtml += '<div class="col-md-1 centered-text covenTableDivItem covenTableHeader coven-text white-color">' + currentLanguageResources['client-purchases-table-total'] + '</div>';
            servicesHtml += '<div class="col-md-2 centered-text covenTableDivItem covenTableHeader coven-text white-color">' + currentLanguageResources['client-purchases-table-rating'] + '</div>';
            servicesHtml += '<div class="col-md-2 centered-text covenTableDivItem covenTableHeader coven-text white-color">' + currentLanguageResources['client-purchases-table-business'] + '</div>';
            servicesHtml += '<div class="col-md-1 covenTableDivItem covenTableHeader coven-text white-color">' + currentLanguageResources['client-purchases-table-delivery-' + selectedServiceActionFilter] + '</div>';
            servicesHtml += '<div class="col-md-2 covenTableDivItem covenTableHeader coven-text white-color covenTableLastCell">' + currentLanguageResources['client-purchases-table-address'] + '</div>';
            servicesHtml += '<div class="col-md-1"></div>';
            servicesHtml += '</div>';

            if (response.services.length == 0) {
                servicesHtml += '<div class="row rowHeight">';
                servicesHtml += '<div class="col-md-1"></div>';
                servicesHtml += '<div class="col-md-10 covenTableDivItem covenTableEvenRow covenTableFirstCell covenTableLastCell"></div>';
                servicesHtml += '<div class="col-md-1"></div>';
                servicesHtml += '</div>';
            } else {

                var currentRowClass = "";
                for (var i = 0; i < response.services.length; i++) {

                    if (i % 2 == 0) {
                        currentRowClass = " covenTableEvenRow";
                    } else {
                        currentRowClass = " covenTableOddRow";
                    }

                    currentRowClass += " covenTableDivItem coven-text";

                    servicesHtml += '<div class="row">';
                    servicesHtml += '<div class="col-md-1"></div>';

                    if (response.services[i].serviceAction == "Sell") {
                        servicesHtml += '<div class="col-md-1' + currentRowClass + ' covenTableFirstCell">' + '<br/><br/>' + currentLanguageResources['client-services-Sell'] + '</div>';
                    } else {
                        servicesHtml += '<div class="col-md-1' + currentRowClass + ' covenTableFirstCell">' + '<br/><br/>' + currentLanguageResources['service-action-' + response.services[i].serviceAction] + '</div>';
                    }

                    servicesHtml += '<div class="col-md-1' + currentRowClass + '">';
                    servicesHtml += '<button class="covenButtonNoHover no-border-radius display-block margin-sales-product" disabled="disabled">';
                    servicesHtml += '<img id="productImageContainer' + i + '" class="serviceDefinitionIcon" />';
                    imageUrls['productImageContainer' + i] = response.services[i].servicePhotoUrl;
                    servicesHtml += '<br/>';
                    servicesHtml += '<label class="coven-text white-color">' + response.services[i].serviceName + '</label>';
                    servicesHtml += '</button>';
                    servicesHtml += '</div>';

                    servicesHtml += '<div class="col-md-1 centered-text number-padding' + currentRowClass + '">' + roundToTwoDecimalPlaces(response.services[i].total) + '</div>';

                    servicesHtml += '<div class="col-md-2' + currentRowClass + '">';
                    servicesHtml += '<button class="covenButton ratingButton no-border-radius coven-text white-color" onclick="showRatingsModal(\'' + response.services[i].id + '\',' + response.services[i].rating + ',\'' + formatTextAreaInput(response.services[i].comment) + '\')">';
                    servicesHtml += '<span class="glyphicon glyphicon-star"></span>';
                    servicesHtml += currentLanguageResources['client-purchases-table-rating'];
                    servicesHtml += '</button>';
                    servicesHtml += '</div>';

                    servicesHtml += '<div class="col-md-2' + currentRowClass + '"><button id="businessContainer' + i + '" class="covenButtonNoHover coven-text no-border-radius display-block user-padding" disabled="disabled"></button></div>';
                    businessIds['businessContainer' + i] = response.services[i].businessId;

                    if (selectedServiceActionFilter == "Rent-Return") {
                        var returnDateTime = response.services[i].return.split('T');
                        servicesHtml += '<div class="col-md-1' + currentRowClass + '">';
                        servicesHtml += '<br/>' + currentLanguageResources['client-purchases-table-delivery-Rent-Return'];
                        servicesHtml += '<br/>' + returnDateTime[0] + '<br/>' + returnDateTime[1];
                        servicesHtml += '</div>';
                    } else {
                        var acquisitionDateTime = response.services[i].acquisition.split('T');
                        servicesHtml += '<div class="col-md-1' + currentRowClass + '">';
                        if (response.services[i].serviceAction == "Rent") {
                            servicesHtml += '<br/>' + currentLanguageResources['client-purchases-table-delivery-Rent-Acquisition'];
                        } else {
                            servicesHtml += '<br/>' + currentLanguageResources['client-purchases-table-delivery-' + response.services[i].serviceAction];
                        }
                        servicesHtml += '<br/>' + acquisitionDateTime[0] + '<br/>' + acquisitionDateTime[1];
                        servicesHtml += '</div>';
                    }

                    if (response.services[i].serviceAction == "Videocall") {
                        servicesHtml += '<div class="col-md-2' + currentRowClass + ' covenTableLastCell">';
                        servicesHtml += '<button class="covenButton videocallButton no-border-radius coven-text white-color">';
                        servicesHtml += '<span class="glyphicon glyphicon-facetime-video"></span>';
                        servicesHtml += currentLanguageResources['attend-videocall'];
                        servicesHtml += '</button>';
                        servicesHtml += '</div>';
                    } else if (selectedServiceActionFilter == "Rent-Return") {
                        servicesHtml += '<div class="col-md-2' + currentRowClass + ' covenTableLastCell">'
                            + '<br/>' + response.services[i].returnAddressLine
                            + '<br/>' + response.services[i].returnState + ', ' + response.services[i].returnCity
                            + '<br/>' + response.services[i].returnCountry
                            + '</div>';
                    } else {
                        servicesHtml += '<div class="col-md-2' + currentRowClass + ' covenTableLastCell">'
                            + '<br/>' + response.services[i].acquisitionAddressLine
                            + '<br/>' + response.services[i].acquisitionState + ', ' + response.services[i].acquisitionCity
                            + '<br/>' + response.services[i].acquisitionCountry
                            + '</div>';
                    }

                    servicesHtml += '<div class="col-md-1"></div>';
                    servicesHtml += '</div>';
                }
            }

            servicesHtml += '<div class="row">';
            servicesHtml += '<div class="col-md-1"></div>';
            servicesHtml += '<div class="col-md-2 covenTableDivItem covenTableHeader covenTableLastRow coven-text white-color"></div>';
            servicesHtml += '<div class="col-md-1 covenTableDivItem covenTableHeader covenTableLastRow coven-text white-color centered-text">$' + roundToTwoDecimalPlaces(response.sumTotal) + '</div>';
            servicesHtml += '<div class="col-md-7 covenTableDivItem covenTableHeader covenTableLastRow coven-text white-color covenTableLastCell"></div>';
            servicesHtml += '<div class="col-md-1"></div>';
            servicesHtml += '</div>';

            $('#servicesTableContainer').empty();
            $('#servicesTableContainer').append(servicesHtml);

            renderPagination(response.currentPage, response.totalPages);

            setTimeout(function () {
                for (var i = 0; i < response.services.length; i++) {
                    getBusinessData(businessIds['businessContainer' + i], 'businessContainer' + i);
                    getServiceImage(imageUrls['productImageContainer' + i], 'productImageContainer' + i);
                }
            }, timeoutShortSpan);

            hideMask();
        },
        error: function (response) {
            showMessageModal(currentLanguageResources['server-error'], currentLanguageResources['server-error-msg'] + response.responseText, 'error');
            hideMask();
        }
    });
}

function paginationClickFirstArrow() {
    paginationCurrentLowerLimit = 1;
    paginationCurrentPage = 1;
    getAllServices(paginationCurrentPage);
}

function paginationClickLeftArrow(currentPage, totalPages) {
    if (currentPage == paginationCurrentLowerLimit + 4) {
        paginationCurrentLowerLimit--;
        paginationCurrentPage = currentPage - 1;
        getAllServices(paginationCurrentPage);
    } else {
        paginationCurrentLowerLimit--;
        renderPagination(currentPage, totalPages);
    }
}

function paginationClickRightArrow(currentPage, totalPages) {
    if (currentPage == paginationCurrentLowerLimit) {
        paginationCurrentLowerLimit++;
        paginationCurrentPage = currentPage + 1;
        getAllServices(paginationCurrentPage);
    } else {
        paginationCurrentLowerLimit++;
        renderPagination(currentPage, totalPages);
    }
}

function paginationClickLastArrow(totalPages) {
    paginationCurrentLowerLimit = totalPages - 4;
    paginationCurrentPage = totalPages;
    getAllServices(paginationCurrentPage);
}

function renderPagination(currentPage, totalPages) {

    var pageMsg = currentLanguageResources['page'] + " " + currentPage + " " + currentLanguageResources['of'] + " " + totalPages;

    if (totalPages == 0) {
        pageMsg = currentLanguageResources['page'] + " " + currentPage + " " + currentLanguageResources['of'] + " " + currentPage;
    }
    $('#pageNumberButton').html(pageMsg);

    var pagesHtml = '';

    if (totalPages < 6) {
        for (var i = 1; i < totalPages + 1; i++) {
            if (i == currentPage) {
                pagesHtml += '<button type="button" class="covenButtonNoHover coven-text coven-pagination-item" disabled="disabled">' + i + '</button>';
            } else {
                pagesHtml += '<button type="button" class="whiteCovenButton coven-text coven-pagination-item" onclick="getAllServices(' + i + ');">' + i + '</button>';
            }
        }
    } else {

        if (currentPage == 1) {
            pagesHtml += '<button type="button" class="covenButtonNoHover coven-text coven-pagination-item" disabled="disabled">';
        } else {
            pagesHtml += '<button type="button" class="covenButton coven-text coven-pagination-item" onclick="paginationClickFirstArrow();">';
        }
        pagesHtml += '<span class="glyphicon glyphicon-fast-backward coven-search-icon"></span>';
        pagesHtml += '</button>';

        if (paginationCurrentLowerLimit == 1) {
            pagesHtml += '<button type="button" class="covenButtonNoHover coven-text coven-pagination-item pagination-right-margin" disabled="disabled">';
        } else {
            pagesHtml += '<button type="button" class="covenButton coven-text coven-pagination-item pagination-right-margin" onclick="paginationClickLeftArrow(' + currentPage + ',' + totalPages + ');">';
        }
        pagesHtml += '<span class="glyphicon glyphicon-backward coven-search-icon"></span>';
        pagesHtml += '</button>';

        if (paginationCurrentLowerLimit > 1) {
            pagesHtml += '<button type="button" class="covenButtonNoHover coven-text coven-pagination-item" disabled="disabled">...</button>';
        }

        for (var i = paginationCurrentLowerLimit; i < paginationCurrentLowerLimit + 5; i++) {
            if (i == currentPage) {
                pagesHtml += '<button type="button" class="covenButtonNoHover coven-text coven-pagination-item" disabled="disabled">' + i + '</button>';
            } else {
                pagesHtml += '<button type="button" class="whiteCovenButton coven-text coven-pagination-item" onclick="getAllServices(' + i + ');">' + i + '</button>';
            }
        }

        if (paginationCurrentLowerLimit < (totalPages - 4)) {
            pagesHtml += '<button type="button" class="covenButtonNoHover coven-text coven-pagination-item" disabled="disabled">...</button>';
        }

        if (paginationCurrentLowerLimit == (totalPages - 4)) {
            pagesHtml += '<button type="button" class="covenButtonNoHover coven-text coven-pagination-item pagination-left-margin" disabled="disabled">';
        } else {
            pagesHtml += '<button type="button" class="covenButton coven-text coven-pagination-item pagination-left-margin" onclick="paginationClickRightArrow(' + currentPage + ',' + totalPages + ');">';
        }
        pagesHtml += '<span class="glyphicon glyphicon-forward coven-search-icon"></span>';
        pagesHtml += '</button>';

        if (currentPage == totalPages) {
            pagesHtml += '<button type="button" class="covenButtonNoHover coven-text coven-pagination-item" disabled="disabled">';
        } else {
            pagesHtml += '<button type="button" class="covenButton coven-text coven-pagination-item" onclick="paginationClickLastArrow(' + totalPages + ');">';
        }
        pagesHtml += '<span class="glyphicon glyphicon-fast-forward coven-search-icon"></span>';
        pagesHtml += '</button>';

    }

    $('#paginationButtons').empty();
    $('#paginationButtons').append(pagesHtml);
}

function onItemsPerPageChange() {
    paginationCurrentPage = 1;
    paginationCurrentLowerLimit = 1;
    getAllServices(paginationCurrentPage);
}

function getBusinessData(businessId, businessContainer) {
    showMask();
    $.ajax({
        type: 'GET',
        url: apiUrls.c_user,
        dataType: 'json',
        data: {
            userId: businessId
        },
        success: function (response) {

            var fullName = response.name + " " + response.lastName;
            $('#' + businessContainer).html('<label>' + fullName + '</label><br/><span class="glyphicon glyphicon-phone coven-glyphicon"></span>' + response.telephone);

            hideMask();
        },
        error: function (response) {
            showMessageModal(currentLanguageResources['server-error'], currentLanguageResources['server-error-msg'] + response.responseText, 'error');
            hideMask();
        }
    });
}

function getServiceImage(pictureUrl, pictureObjectIdentifier) {

    showMask();
    var fileName = pictureUrl;
    if (pictureUrl.includes('/')) {
        fileName = pictureUrl.split('/')[1]
    }

    fetch(apiUrls.file + "?fileName=" + fileName + "&bucketKey=" + pictureUrl,
        {
            method: 'GET'
        })
        .then((response) => {
            if (response.status != 200) {
                hideMask();
                let errorMessage = currentLanguageResources['server-error-msg'] + response.responseText;
                throw new Error(errorMessage);
            } else {
                return response.blob();
            }
        })
        .then((blob) => {
            document.getElementById(pictureObjectIdentifier).src = URL.createObjectURL(blob);
            hideMask();
        })
        .catch(error => {
            hideMask();
            console.error(error);
        });
}

function renderStars(rating) {
    for (var i = 1; i <= (2 * rating); i++) {
        if (i % 2 == 1) {
            $('#star' + i).removeClass().addClass('middleStar leftStar');
        } else {
            $('#star' + i).removeClass().addClass('middleStar rightStar');
        }
    }
    for (var i = (2 * rating) + 1; i <= 10; i++) {
        if (i % 2 == 1) {
            $('#star' + i).removeClass().addClass('middleStar greyLeftStar');
        } else {
            $('#star' + i).removeClass().addClass('middleStar greyRightStar');
        }
    }
}

function mouseOverRenderStars(rating) {
    for (var i = 1; i <= (2 * rating); i++) {
        if (i % 2 == 1) {
            $('#star' + i).removeClass().addClass('middleStar dimLeftStar');
        } else {
            $('#star' + i).removeClass().addClass('middleStar dimRightStar');
        }
    }
    for (var i = (2 * rating) + 1; i <= 10; i++) {
        if (i % 2 == 1) {
            $('#star' + i).removeClass().addClass('middleStar greyLeftStar');
        } else {
            $('#star' + i).removeClass().addClass('middleStar greyRightStar');
        }
    }
}

function initializeStars() {

    renderStars(currentRating);

    $('#star1').mouseenter(function () { mouseOverRenderStars(0.5); });
    $('#star1').click(function () { currentRating = 0.5; });
    $('#star1').mouseleave(function () { renderStars(currentRating); });

    $('#star2').mouseenter(function () { mouseOverRenderStars(1.0); });
    $('#star2').click(function () { currentRating = 1.0; });
    $('#star2').mouseleave(function () { renderStars(currentRating); });

    $('#star3').mouseenter(function () { mouseOverRenderStars(1.5); });
    $('#star3').click(function () { currentRating = 1.5; });
    $('#star3').mouseleave(function () { renderStars(currentRating); });

    $('#star4').mouseenter(function () { mouseOverRenderStars(2.0); });
    $('#star4').click(function () { currentRating = 2.0; });
    $('#star4').mouseleave(function () { renderStars(currentRating); });

    $('#star5').mouseenter(function () { mouseOverRenderStars(2.5); });
    $('#star5').click(function () { currentRating = 2.5; });
    $('#star5').mouseleave(function () { renderStars(currentRating); });

    $('#star6').mouseenter(function () { mouseOverRenderStars(3.0); });
    $('#star6').click(function () { currentRating = 3.0; });
    $('#star6').mouseleave(function () { renderStars(currentRating); });

    $('#star7').mouseenter(function () { mouseOverRenderStars(3.5); });
    $('#star7').click(function () { currentRating = 3.5; });
    $('#star7').mouseleave(function () { renderStars(currentRating); });

    $('#star8').mouseenter(function () { mouseOverRenderStars(4.0); });
    $('#star8').click(function () { currentRating = 4.0; });
    $('#star8').mouseleave(function () { renderStars(currentRating); });

    $('#star9').mouseenter(function () { mouseOverRenderStars(4.5); });
    $('#star9').click(function () { currentRating = 4.5; });
    $('#star9').mouseleave(function () { renderStars(currentRating); });

    $('#star10').mouseenter(function () { mouseOverRenderStars(5.0); });
    $('#star10').click(function () { currentRating = 5.0; });
    $('#star10').mouseleave(function () { renderStars(currentRating); });
    
}

function submitRatingModal() {
    showMask();
    $.ajax({
        type: 'POST',
        url: apiUrls.rating,
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({
            serviceId: currentServiceId,
            rating: currentRating,
            comment: $('#inputComment').val()
        }),
        success: function (response) {
            if (response.message != constants.apiSuccess) {
                showMessageModal(currentLanguageResources['server-error'], currentLanguageResources['server-error-msg'] + currentLanguageResources[response.message], 'error');
            }
            else {
                closeRatingsModal();
                showMessageModal(currentLanguageResources['success-title'], currentLanguageResources['success-013'], 'success');

                setTimeout(function () { getData(); }, timeoutLongSpan);
            }
            hideMask();
        },
        error: function (response) {
            showMessageModal(currentLanguageResources['server-error'], currentLanguageResources['server-error-msg'] + response.responseText, 'error');
            hideMask();
        }
    });
}

$(document).ready(function () {
    if (sessionStorage.getItem('tokenBool') == 'true') {
        window.location.assign(serverUrls.clientProfile);
    } else {

        initializeNavbarPage(3, 2);
        initializeLanguageSettings('ClientPurchases');

        initializeBusinessSectorsDictionary();
        initializeServiceActionsDictionary();

        fillBusinessSectorsModal();
        fillServiceActionsModal();

        setTimeout(function () {

            $('#businessSectorContainer_All').removeClass();
            $('#businessSectorContainer_All').attr('class', 'selectedBusinessSectorContainer');
            $('#serviceActionContainer_All').removeClass();
            $('#serviceActionContainer_All').attr('class', 'selectedBusinessSectorContainer');

            getData();
        }, 1000);

    }
});