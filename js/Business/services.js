var currentLanguageResources = getCurrentResources();

var businessSectorsDictionary = [];
var serviceActionsDictionary = [];

var selectedBusinessSectorFilter = "All";
var selectedServiceActionFilter = "All";

var selectedBusinessSector;
var selectedServiceAction;

var paginationCurrentPage = 1;
var paginationCurrentLowerLimit = 1;

var allServiceDefinitions;
var selectedServiceDefinitionId;
var selectedServiceImageUrl;

var oldDeliveryPrice = 0;
var oldStockValue = 0;

var timeoutLongSpan = 1500;
var timeoutShortSpan = 1200;

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

var servicesModal = document.getElementById('servicesModal');
var servicesSpan = document.getElementById('servicesModalClose');

if (servicesModal != null) {
    servicesSpan.onclick = function () {
        servicesModal.style.display = "none";
        goToTab1();
    }

    function showServicesModal(modalTitle) {
        document.getElementById('servicesModalTitle').textContent = modalTitle;
        servicesModal.style.display = "block";
    }
}

var sellModal = document.getElementById('sellModal');
var sellSpan = document.getElementById('sellModalClose');

if (sellModal != null) {
    sellSpan.onclick = function () {
        sellModal.style.display = "none";
    }

    function showSellModal(serviceDefinitionId, businessSector, name, description, price, deliveryPrice, stock, deliveryType, serviceImageUrl) {

        selectedServiceDefinitionId = serviceDefinitionId;

        $('#inputSellBusinessSector').val(businessSector);
        $('#inputSellName').val(name);
        $('#inputSellDescription').val(unformatTextAreaInput(description));
        $('#inputSellPrice').val(price);
        $('#inputSellDeliveryPrice').val(deliveryPrice);

        if (stock == -1) {
            $('#inputSellStock').val(-1);
            $('#inputSellStock').prop("disabled", true);
            $('#inputSellStockCheckbox').prop("checked", true);
        } else {
            $('#inputSellStock').val(stock);
            $('#inputSellStock').prop("disabled", false);
            $('#inputSellStockCheckbox').prop("checked", false);
        }

        oldDeliveryPrice = deliveryPrice;
        switch (deliveryType) {
            case constants.deliveryTypeBusiness:
                $('#sellModalDeliveryPriceContainer').css('display', 'none');
                $('#inputSellDeliveryTypeCheckbox1').prop('checked', true);
                $('#inputSellDeliveryTypeCheckbox2').prop('checked', false);
                $('#inputSellDeliveryTypeCheckbox3').prop('checked', false);
                break;
            case constants.deliveryTypeClient:
                $('#sellModalDeliveryPriceContainer').css('display', '');
                $('#inputSellDeliveryTypeCheckbox1').prop('checked', false);
                $('#inputSellDeliveryTypeCheckbox2').prop('checked', true);
                $('#inputSellDeliveryTypeCheckbox3').prop('checked', false);
                break;
            case constants.deliveryTypeBoth:
                $('#sellModalDeliveryPriceContainer').css('display', '');
                $('#inputSellDeliveryTypeCheckbox1').prop('checked', false);
                $('#inputSellDeliveryTypeCheckbox2').prop('checked', false);
                $('#inputSellDeliveryTypeCheckbox3').prop('checked', true);
                break;
        }

        selectedServiceImageUrl = serviceImageUrl;
        getServiceImage(serviceImageUrl, 'inputSellServiceImage');

        sellModal.style.display = "block";
    }
}

var rentModal = document.getElementById('rentModal');
var rentSpan = document.getElementById('rentModalClose');

if (rentModal != null) {
    rentSpan.onclick = function () {
        rentModal.style.display = "none";
    }

    function showRentModal(serviceDefinitionId, businessSector, name, description, pricePerHour, deliveryPrice, deposit, acquisicionDeliveryType, returnDeliveryType, terms, serviceImageUrl) {

        selectedServiceDefinitionId = serviceDefinitionId;

        $('#inputRentBusinessSector').val(businessSector);
        $('#inputRentName').val(name);
        $('#inputRentDescription').val(unformatTextAreaInput(description));
        $('#inputRentPricePerHour').val(pricePerHour);
        $('#inputRentDeliveryPrice').val(deliveryPrice);
        $('#inputRentDeposit').val(deposit);
        $('#inputRentTerms').val(unformatTextAreaInput(terms));

        oldDeliveryPrice = deliveryPrice;

        if (acquisicionDeliveryType == constants.deliveryTypeBusiness && returnDeliveryType == constants.deliveryTypeBusiness) {
            $('#rentModalDeliveryPriceContainer').css('display', 'none');
        } else {
            $('#rentModalDeliveryPriceContainer').css('display', '');
        }

        switch (acquisicionDeliveryType) {
            case constants.deliveryTypeBusiness:
                $('#inputRentAcquisicionDeliveryTypeCheckbox1').prop('checked', true);
                $('#inputRentAcquisicionDeliveryTypeCheckbox2').prop('checked', false);
                $('#inputRentAcquisicionDeliveryTypeCheckbox3').prop('checked', false);
                break;
            case constants.deliveryTypeClient:
                $('#inputRentAcquisicionDeliveryTypeCheckbox1').prop('checked', false);
                $('#inputRentAcquisicionDeliveryTypeCheckbox2').prop('checked', true);
                $('#inputRentAcquisicionDeliveryTypeCheckbox3').prop('checked', false);
                break;
            case constants.deliveryTypeBoth:
                $('#inputRentAcquisicionDeliveryTypeCheckbox1').prop('checked', false);
                $('#inputRentAcquisicionDeliveryTypeCheckbox2').prop('checked', false);
                $('#inputRentAcquisicionDeliveryTypeCheckbox3').prop('checked', true);
                break;
        }

        switch (returnDeliveryType) {
            case constants.deliveryTypeBusiness:
                $('#inputRentReturnDeliveryTypeCheckbox1').prop('checked', true);
                $('#inputRentReturnDeliveryTypeCheckbox2').prop('checked', false);
                $('#inputRentReturnDeliveryTypeCheckbox3').prop('checked', false);
                break;
            case constants.deliveryTypeClient:
                $('#inputRentReturnDeliveryTypeCheckbox1').prop('checked', false);
                $('#inputRentReturnDeliveryTypeCheckbox2').prop('checked', true);
                $('#inputRentReturnDeliveryTypeCheckbox3').prop('checked', false);
                break;
            case constants.deliveryTypeBoth:
                $('#inputRentReturnDeliveryTypeCheckbox1').prop('checked', false);
                $('#inputRentReturnDeliveryTypeCheckbox2').prop('checked', false);
                $('#inputRentReturnDeliveryTypeCheckbox3').prop('checked', true);
                break;
        }

        selectedServiceImageUrl = serviceImageUrl;
        getServiceImage(serviceImageUrl, 'inputRentServiceImage');

        rentModal.style.display = "block";
    }
}

var meetingModal = document.getElementById('meetingModal');
var meetingSpan = document.getElementById('meetingModalClose');

if (meetingModal != null) {
    meetingSpan.onclick = function () {
        meetingModal.style.display = "none";
    }

    function showMeetingModal(serviceDefinitionId, businessSector, name, description, price, deliveryPrice, duration, deliveryType) {

        selectedServiceDefinitionId = serviceDefinitionId;

        $('#inputMeetingBusinessSector').val(businessSector);
        $('#inputMeetingName').val(name);
        $('#inputMeetingDescription').val(unformatTextAreaInput(description));
        $('#inputMeetingPrice').val(price);
        $('#inputMeetingDeliveryPrice').val(deliveryPrice);
        $('#inputMeetingDuration').val(duration);

        oldDeliveryPrice = deliveryPrice;
        switch (deliveryType) {
            case constants.deliveryTypeBusiness:
                $('#meetingModalDeliveryPriceContainer').css('display', 'none');
                $('#inputMeetingDeliveryTypeCheckbox1').prop('checked', true);
                $('#inputMeetingDeliveryTypeCheckbox2').prop('checked', false);
                $('#inputMeetingDeliveryTypeCheckbox3').prop('checked', false);
                break;
            case constants.deliveryTypeClient:
                $('#meetingModalDeliveryPriceContainer').css('display', '');
                $('#inputMeetingDeliveryTypeCheckbox1').prop('checked', false);
                $('#inputMeetingDeliveryTypeCheckbox2').prop('checked', true);
                $('#inputMeetingDeliveryTypeCheckbox3').prop('checked', false);
                break;
            case constants.deliveryTypeBoth:
                $('#meetingModalDeliveryPriceContainer').css('display', '');
                $('#inputMeetingDeliveryTypeCheckbox1').prop('checked', false);
                $('#inputMeetingDeliveryTypeCheckbox2').prop('checked', false);
                $('#inputMeetingDeliveryTypeCheckbox3').prop('checked', true);
                break;
        }

        meetingModal.style.display = "block";
    }
}

var videocallModal = document.getElementById('videocallModal');
var videocallSpan = document.getElementById('videocallModalClose');

if (videocallModal != null) {
    videocallSpan.onclick = function () {
        videocallModal.style.display = "none";
    }

    function showVideocallModal(serviceDefinitionId, businessSector, name, description, price, duration) {

        selectedServiceDefinitionId = serviceDefinitionId;

        $('#inputVideocallBusinessSector').val(businessSector);
        $('#inputVideocallName').val(name);
        $('#inputVideocallDescription').val(unformatTextAreaInput(description));
        $('#inputVideocallPrice').val(price);
        $('#inputVideocallDuration').val(duration);

        videocallModal.style.display = "block";
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
    for (var i = 0; i < serviceActions.length; i++) {
        serviceActionsDictionary[serviceActions[i].dbValue] = currentLanguageResources['service-action-' + serviceActions[i].dbValue];
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

    var allServiceActions = [...serviceActions];
    allServiceActions.unshift(allServiceActionsRecord);

    var sectorsPerRow = 3;
    var numberOfIterations = Math.floor(allServiceActions.length / sectorsPerRow);
    numberOfIterations = numberOfIterations + 1;
    var currentSectorsPerRow = sectorsPerRow;

    var serviceActionsPosition = 0;

    for (var i = 0; i < numberOfIterations; i++) {

        if (i == (numberOfIterations - 1)) {
            currentSectorsPerRow = allServiceActions.length % 3;
            if (currentSectorsPerRow == 1) {

                serviceActionsHtml += '<div class="row">';
                serviceActionsHtml += '<div class="col-md-4"></div>';

                serviceActionsHtml += '<div class="col-md-4">';
                serviceActionsHtml += '<div id="serviceActionContainer_' + allServiceActions[serviceActionsPosition].dbValue + '" class="businessSectorContainer" onclick="selectClickServiceAction(\'' + allServiceActions[serviceActionsPosition].dbValue + '\')">';
                serviceActionsHtml += '<br/><br/><br/>';
                serviceActionsHtml += '<img src="' + allServiceActions[serviceActionsPosition].iconPath + '" class="serviceActionIcon" />';
                serviceActionsHtml += '<br/><br/><br/>';
                serviceActionsHtml += '<label class="coven-text white-color">' + serviceActionsDictionary[allServiceActions[serviceActionsPosition].dbValue] + '</label>';
                serviceActionsHtml += '</div>';
                serviceActionsHtml += '</div>';
                serviceActionsPosition++;

                serviceActionsHtml += '<div class="col-md-4"></div>';
                serviceActionsHtml += '</div>';

            } else if (currentSectorsPerRow == 2) {

                serviceActionsHtml += '<div class="row">';
                serviceActionsHtml += '<div class="col-md-1"></div>';

                serviceActionsHtml += '<div class="col-md-4">';
                serviceActionsHtml += '<div id="serviceActionContainer_' + allServiceActions[serviceActionsPosition].dbValue + '" class="businessSectorContainer" onclick="selectClickServiceAction(\'' + allServiceActions[serviceActionsPosition].dbValue + '\')">';
                serviceActionsHtml += '<br/><br/><br/>';
                serviceActionsHtml += '<img src="' + allServiceActions[serviceActionsPosition].iconPath + '" class="serviceActionIcon" />';
                serviceActionsHtml += '<br/><br/><br/>';
                serviceActionsHtml += '<label class="coven-text white-color">' + serviceActionsDictionary[allServiceActions[serviceActionsPosition].dbValue] + '</label>';
                serviceActionsHtml += '</div>';
                serviceActionsHtml += '</div>';
                serviceActionsPosition++;

                serviceActionsHtml += '<div class="col-md-2"></div>';

                serviceActionsHtml += '<div class="col-md-4">';
                serviceActionsHtml += '<div id="serviceActionContainer_' + allServiceActions[serviceActionsPosition].dbValue + '" class="businessSectorContainer" onclick="selectClickServiceAction(\'' + allServiceActions[serviceActionsPosition].dbValue + '\')">';
                serviceActionsHtml += '<br/><br/><br/>';
                serviceActionsHtml += '<img src="' + allServiceActions[serviceActionsPosition].iconPath + '" class="serviceActionIcon" />';
                serviceActionsHtml += '<br/><br/><br/>';
                serviceActionsHtml += '<label class="coven-text white-color">' + serviceActionsDictionary[allServiceActions[serviceActionsPosition].dbValue] + '</label>';
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
            serviceActionsHtml += '<div id="serviceActionContainer_' + allServiceActions[serviceActionsPosition].dbValue + '" class="businessSectorContainer" onclick="selectClickServiceAction(\'' + allServiceActions[serviceActionsPosition].dbValue + '\')">';
            serviceActionsHtml += '<br/><br/><br/>';
            serviceActionsHtml += '<img src="' + allServiceActions[serviceActionsPosition].iconPath + '" class="serviceActionIcon" />';
            serviceActionsHtml += '<br/><br/><br/>';
            serviceActionsHtml += '<label class="coven-text white-color">' + serviceActionsDictionary[allServiceActions[serviceActionsPosition].dbValue] + '</label>';
            serviceActionsHtml += '</div>';
            serviceActionsHtml += '</div>';
            serviceActionsPosition++;

            serviceActionsHtml += '<div class="col-md-4">';
            serviceActionsHtml += '<div id="serviceActionContainer_' + allServiceActions[serviceActionsPosition].dbValue + '" class="businessSectorContainer" onclick="selectClickServiceAction(\'' + allServiceActions[serviceActionsPosition].dbValue + '\')">';
            serviceActionsHtml += '<br/><br/><br/>';
            serviceActionsHtml += '<img src="' + allServiceActions[serviceActionsPosition].iconPath + '" class="serviceActionIcon" />';
            serviceActionsHtml += '<br/><br/><br/>';
            serviceActionsHtml += '<label class="coven-text white-color">' + serviceActionsDictionary[allServiceActions[serviceActionsPosition].dbValue] + '</label>';
            serviceActionsHtml += '</div>';
            serviceActionsHtml += '</div>';
            serviceActionsPosition++;

            serviceActionsHtml += '<div class="col-md-4">';
            serviceActionsHtml += '<div id="serviceActionContainer_' + allServiceActions[serviceActionsPosition].dbValue + '" class="businessSectorContainer" onclick="selectClickServiceAction(\'' + allServiceActions[serviceActionsPosition].dbValue + '\')">';
            serviceActionsHtml += '<br/><br/><br/>';
            serviceActionsHtml += '<img src="' + allServiceActions[serviceActionsPosition].iconPath + '" class="serviceActionIcon" />';
            serviceActionsHtml += '<br/><br/><br/>';
            serviceActionsHtml += '<label class="coven-text white-color">' + serviceActionsDictionary[allServiceActions[serviceActionsPosition].dbValue] + '</label>';
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
    getAllServiceDefinitions(paginationCurrentPage);
}

function selectClickServiceAction(serviceAction) {
    $('#serviceActionContainer_' + selectedServiceActionFilter).removeClass();
    $('#serviceActionContainer_' + selectedServiceActionFilter).attr('class', 'businessSectorContainer');

    selectedServiceActionFilter = serviceAction;

    $('#serviceActionContainer_' + selectedServiceActionFilter).removeClass();
    $('#serviceActionContainer_' + selectedServiceActionFilter).attr('class', 'selectedBusinessSectorContainer');

    closeServiceActionsModal();
    getAllServiceDefinitions(paginationCurrentPage);
}

function fillBusinessSectors() {
    var businessSectorsHtml = '';

    var sectorsPerRow = 3;
    var numberOfIterations = Math.floor(businessSectors.length / sectorsPerRow);
    numberOfIterations = numberOfIterations + 1;
    var currentSectorsPerRow = sectorsPerRow;

    var businessSectorsPosition = 0;

    for (var i = 0; i < numberOfIterations; i++) {

        if (i == (numberOfIterations - 1)) {
            currentSectorsPerRow = businessSectors.length % 3;
            if (currentSectorsPerRow == 1) {

                businessSectorsHtml += '<div class="row">';
                businessSectorsHtml += '<div class="col-md-4"></div>';

                businessSectorsHtml += '<div class="col-md-4">';
                businessSectorsHtml += '<div class="businessSectorContainer" onclick="clickBusinessSector(\'' + businessSectorsDictionary[businessSectors[businessSectorsPosition].dbValue] + '\',\'' + businessSectors[businessSectorsPosition].dbValue + '\')">';
                businessSectorsHtml += '<img src="' + businessSectors[businessSectorsPosition].iconPath + '" class="businessSectorIcon" />';
                businessSectorsHtml += '<br/><br/>';
                businessSectorsHtml += '<label class="coven-text white-color">' + businessSectorsDictionary[businessSectors[businessSectorsPosition].dbValue] + '</label>';
                businessSectorsHtml += '</div>';
                businessSectorsHtml += '</div>';
                businessSectorsPosition++;

                businessSectorsHtml += '<div class="col-md-4"></div>';
                businessSectorsHtml += '</div>';

            } else if (currentSectorsPerRow == 2) {

                businessSectorsHtml += '<div class="row">';
                businessSectorsHtml += '<div class="col-md-1"></div>';

                businessSectorsHtml += '<div class="col-md-4">';
                businessSectorsHtml += '<div class="businessSectorContainer" onclick="clickBusinessSector(\'' + businessSectorsDictionary[businessSectors[businessSectorsPosition].dbValue] + '\',\'' + businessSectors[businessSectorsPosition].dbValue + '\')">';
                businessSectorsHtml += '<img src="' + businessSectors[businessSectorsPosition].iconPath + '" class="businessSectorIcon" />';
                businessSectorsHtml += '<br/><br/>';
                businessSectorsHtml += '<label class="coven-text white-color">' + businessSectorsDictionary[businessSectors[businessSectorsPosition].dbValue] + '</label>';
                businessSectorsHtml += '</div>';
                businessSectorsHtml += '</div>';
                businessSectorsPosition++;

                businessSectorsHtml += '<div class="col-md-2"></div>';

                businessSectorsHtml += '<div class="col-md-4">';
                businessSectorsHtml += '<div class="businessSectorContainer" onclick="clickBusinessSector(\'' + businessSectorsDictionary[businessSectors[businessSectorsPosition].dbValue] + '\',\'' + businessSectors[businessSectorsPosition].dbValue + '\')">';
                businessSectorsHtml += '<img src="' + businessSectors[businessSectorsPosition].iconPath + '" class="businessSectorIcon" />';
                businessSectorsHtml += '<br/><br/>';
                businessSectorsHtml += '<label class="coven-text white-color">' + businessSectorsDictionary[businessSectors[businessSectorsPosition].dbValue] + '</label>';
                businessSectorsHtml += '</div>';
                businessSectorsHtml += '</div>';
                businessSectorsPosition++;

                businessSectorsHtml += '<div class="col-md-1"></div>';
                businessSectorsHtml += '</div>';

            }
        }
        else
        {
            businessSectorsHtml += '<div class="row">';

            businessSectorsHtml += '<div class="col-md-4">';
            businessSectorsHtml += '<div class="businessSectorContainer" onclick="clickBusinessSector(\'' + businessSectorsDictionary[businessSectors[businessSectorsPosition].dbValue] + '\',\'' + businessSectors[businessSectorsPosition].dbValue + '\')">';
            businessSectorsHtml += '<img src="' + businessSectors[businessSectorsPosition].iconPath + '" class="businessSectorIcon" />';
            businessSectorsHtml += '<br/><br/>';
            businessSectorsHtml += '<label class="coven-text white-color">' + businessSectorsDictionary[businessSectors[businessSectorsPosition].dbValue] + '</label>';
            businessSectorsHtml += '</div>';
            businessSectorsHtml += '</div>';
            businessSectorsPosition++;

            businessSectorsHtml += '<div class="col-md-4">';
            businessSectorsHtml += '<div class="businessSectorContainer" onclick="clickBusinessSector(\'' + businessSectorsDictionary[businessSectors[businessSectorsPosition].dbValue] + '\',\'' + businessSectors[businessSectorsPosition].dbValue + '\')">';
            businessSectorsHtml += '<img src="' + businessSectors[businessSectorsPosition].iconPath + '" class="businessSectorIcon" />';
            businessSectorsHtml += '<br/><br/>';
            businessSectorsHtml += '<label class="coven-text white-color">' + businessSectorsDictionary[businessSectors[businessSectorsPosition].dbValue] + '</label>';
            businessSectorsHtml += '</div>';
            businessSectorsHtml += '</div>';
            businessSectorsPosition++;

            businessSectorsHtml += '<div class="col-md-4">';
            businessSectorsHtml += '<div class="businessSectorContainer" onclick="clickBusinessSector(\'' + businessSectorsDictionary[businessSectors[businessSectorsPosition].dbValue] + '\',\'' + businessSectors[businessSectorsPosition].dbValue + '\')">';
            businessSectorsHtml += '<img src="' + businessSectors[businessSectorsPosition].iconPath + '" class="businessSectorIcon" />';
            businessSectorsHtml += '<br/><br/>';
            businessSectorsHtml += '<label class="coven-text white-color">' + businessSectorsDictionary[businessSectors[businessSectorsPosition].dbValue] + '</label>';
            businessSectorsHtml += '</div>';
            businessSectorsHtml += '</div>';
            businessSectorsPosition++;

            businessSectorsHtml += '</div>';
        }
    }

    $('#businessSectorsContainer').empty();
    $('#businessSectorsContainer').append(businessSectorsHtml);
}

function fillServiceActions() {
    var serviceActionsHtml = '';

    var sectorsPerRow = 3;
    var numberOfIterations = Math.floor(serviceActions.length / sectorsPerRow);
    numberOfIterations = numberOfIterations + 1;
    var currentSectorsPerRow = sectorsPerRow;

    var serviceActionsPosition = 0;

    for (var i = 0; i < numberOfIterations; i++) {

        if (i == (numberOfIterations - 1)) {
            currentSectorsPerRow = serviceActions.length % 3;
            if (currentSectorsPerRow == 1) {

                serviceActionsHtml += '<div class="row">';
                serviceActionsHtml += '<div class="col-md-4"></div>';
                
                serviceActionsHtml += '<div class="col-md-4">';
                serviceActionsHtml += '<div class="businessSectorContainer" onclick="clickServiceAction(\'' + serviceActionsDictionary[serviceActions[serviceActionsPosition].dbValue] + '\',\'' + serviceActions[serviceActionsPosition].dbValue + '\')">';
                serviceActionsHtml += '<br/><br/><br/>';
                serviceActionsHtml += '<img src="' + serviceActions[serviceActionsPosition].iconPath + '" class="serviceActionIcon" />';
                serviceActionsHtml += '<br/><br/><br/>';
                serviceActionsHtml += '<label class="coven-text white-color">' + serviceActionsDictionary[serviceActions[serviceActionsPosition].dbValue] + '</label>';
                serviceActionsHtml += '<br/><br/>';
                serviceActionsHtml += '</div>';
                serviceActionsHtml += '</div>';
                serviceActionsPosition++;

                serviceActionsHtml += '<div class="col-md-4"></div>';
                serviceActionsHtml += '</div>';

            } else if (currentSectorsPerRow == 2) {

                serviceActionsHtml += '<div class="row">';
                serviceActionsHtml += '<div class="col-md-1"></div>';

                serviceActionsHtml += '<div class="col-md-4">';
                serviceActionsHtml += '<div class="businessSectorContainer" onclick="clickServiceAction(\'' + serviceActionsDictionary[serviceActions[serviceActionsPosition].dbValue] + '\',\'' + serviceActions[serviceActionsPosition].dbValue + '\')">';
                serviceActionsHtml += '<br/><br/><br/>';
                serviceActionsHtml += '<img src="' + serviceActions[serviceActionsPosition].iconPath + '" class="serviceActionIcon" />';
                serviceActionsHtml += '<br/><br/><br/>';
                serviceActionsHtml += '<label class="coven-text white-color">' + serviceActionsDictionary[serviceActions[serviceActionsPosition].dbValue] + '</label>';
                serviceActionsHtml += '<br/><br/>';
                serviceActionsHtml += '</div>';
                serviceActionsHtml += '</div>';
                serviceActionsPosition++;

                serviceActionsHtml += '<div class="col-md-2"></div>';

                serviceActionsHtml += '<div class="col-md-4">';
                serviceActionsHtml += '<div class="businessSectorContainer" onclick="clickServiceAction(\'' + serviceActionsDictionary[serviceActions[serviceActionsPosition].dbValue] + '\',\'' + serviceActions[serviceActionsPosition].dbValue + '\')">';
                serviceActionsHtml += '<br/><br/><br/>';
                serviceActionsHtml += '<img src="' + serviceActions[serviceActionsPosition].iconPath + '" class="serviceActionIcon" />';
                serviceActionsHtml += '<br/><br/><br/>';
                serviceActionsHtml += '<label class="coven-text white-color">' + serviceActionsDictionary[serviceActions[serviceActionsPosition].dbValue] + '</label>';
                serviceActionsHtml += '<br/><br/>';
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
            serviceActionsHtml += '<div class="businessSectorContainer" onclick="clickServiceAction(\'' + serviceActionsDictionary[serviceActions[serviceActionsPosition].dbValue] + '\',\'' + serviceActions[serviceActionsPosition].dbValue + '\')">';
            serviceActionsHtml += '<br/><br/><br/>';
            serviceActionsHtml += '<img src="' + serviceActions[serviceActionsPosition].iconPath + '" class="serviceActionIcon" />';
            serviceActionsHtml += '<br/><br/><br/>';
            serviceActionsHtml += '<label class="coven-text white-color">' + serviceActionsDictionary[serviceActions[serviceActionsPosition].dbValue] + '</label>';
            serviceActionsHtml += '<br/><br/>';
            serviceActionsHtml += '</div>';
            serviceActionsHtml += '</div>';
            serviceActionsPosition++;

            serviceActionsHtml += '<div class="col-md-4">';
            serviceActionsHtml += '<div class="businessSectorContainer" onclick="clickServiceAction(\'' + serviceActionsDictionary[serviceActions[serviceActionsPosition].dbValue] + '\',\'' + serviceActions[serviceActionsPosition].dbValue + '\')">';
            serviceActionsHtml += '<br/><br/><br/>';
            serviceActionsHtml += '<img src="' + serviceActions[serviceActionsPosition].iconPath + '" class="serviceActionIcon" />';
            serviceActionsHtml += '<br/><br/><br/>';
            serviceActionsHtml += '<label class="coven-text white-color">' + serviceActionsDictionary[serviceActions[serviceActionsPosition].dbValue] + '</label>';
            serviceActionsHtml += '<br/><br/>';
            serviceActionsHtml += '</div>';
            serviceActionsHtml += '</div>';
            serviceActionsPosition++;

            serviceActionsHtml += '<div class="col-md-4">';
            serviceActionsHtml += '<div class="businessSectorContainer" onclick="clickServiceAction(\'' + serviceActionsDictionary[serviceActions[serviceActionsPosition].dbValue] + '\',\'' + serviceActions[serviceActionsPosition].dbValue + '\')">';
            serviceActionsHtml += '<br/><br/><br/>';
            serviceActionsHtml += '<img src="' + serviceActions[serviceActionsPosition].iconPath + '" class="serviceActionIcon" />';
            serviceActionsHtml += '<br/><br/><br/>';
            serviceActionsHtml += '<label class="coven-text white-color">' + serviceActionsDictionary[serviceActions[serviceActionsPosition].dbValue] + '</label>';
            serviceActionsHtml += '<br/><br/>';
            serviceActionsHtml += '</div>';
            serviceActionsHtml += '</div>';
            serviceActionsPosition++;

            serviceActionsHtml += '</div>';
        }
    }

    $('#serviceActionsContainer').empty();
    $('#serviceActionsContainer').append(serviceActionsHtml);
}

function clickBusinessSector(businessSectorLabel, businessSectorValue) {
    selectedBusinessSector = businessSectorValue;
    $('#inputBusinessSector').val(businessSectorLabel);
    goToTab2();
}

function clickServiceAction(serviceActionLabel, serviceActionValue) {
    selectedServiceAction = serviceActionValue;
    $('#inputServiceAction').val(serviceActionLabel);
    goToTab3();
}

function clickAddService() {
    showServicesModal(currentLanguageResources['business-add-service-button']);
}

function goToTab1() {
    $('#servicesModalTab1').css('display', '');
    $('#servicesModalTab2').css('display', 'none');
    $('#servicesModalTab3').css('display', 'none');
}

function goToTab2() {
    $('#servicesModalTab1').css('display', 'none');
    $('#servicesModalTab2').css('display', '');
    $('#servicesModalTab3').css('display', 'none');
}

function goToTab3() {
    $('#servicesModalTab1').css('display', 'none');
    $('#servicesModalTab2').css('display', 'none');
    $('#servicesModalTab3').css('display', '');
}

function submitCreateService() {

    showMask();
    $.ajax({
        type: 'POST',
        url: apiUrls.servicedef,
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({
            token: sessionStorage.getItem('token'),
            businessSector: selectedBusinessSector,
            serviceAction: selectedServiceAction,
            name: $('#inputName').val(),
            description: $('#inputDescription').val()
        }),
        success: function (response) {
            if (response.message != constants.apiSuccess) {
                showMessageModal(currentLanguageResources['server-error'], currentLanguageResources['server-error-msg'] + currentLanguageResources[response.message], 'error');
            }
            else {
                showMessageModal(currentLanguageResources['success-title'], currentLanguageResources['success-007'], 'success');

                servicesModal.style.display = "none";
                $('#inputName').val("");
                $('#inputDescription').val("");
                goToTab1();

                setTimeout(function () { getAllServiceDefinitions(paginationCurrentPage); }, timeoutLongSpan);
            }
            hideMask();
        },
        error: function (response) {
            showMessageModal(currentLanguageResources['server-error'], currentLanguageResources['server-error-msg'] + response.responseText, 'error');
            hideMask();
        }
    });
}

function getAllServiceDefinitions(pageNumber) {
    showMask();
    paginationCurrentPage = pageNumber;
    $.ajax({
        type: 'POST',
        url: apiUrls.b_servicedefs,
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({
            token: sessionStorage.getItem('token'),
            itemsPerPage: $('#itemsPerPageSelect').val(),
            pageNumber: pageNumber,
            businessSectorFilter: selectedBusinessSectorFilter,
            serviceActionFilter: selectedServiceActionFilter,
            nameFilter: $('#searchName').val()
        }),
        success: function (response) {

            if (response.totalPages > 0 && response.currentPage > response.totalPages) {
                paginationCurrentLowerLimit = 1;
                getAllServiceDefinitions(1);
            } else {
                allServiceDefinitions = response.serviceDefinitions;

                renderServiceDefinitions();

                $('#totalServicesLabel').text(currentLanguageResources['total'] + ': ' + response.totalRecords);
                renderPagination(response.currentPage, response.totalPages);
            }

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
    getAllServiceDefinitions(paginationCurrentPage);
}

function paginationClickLeftArrow(currentPage, totalPages) {
    if (currentPage == paginationCurrentLowerLimit + 4) {
        paginationCurrentLowerLimit--;
        paginationCurrentPage = currentPage - 1;
        getAllServiceDefinitions(paginationCurrentPage);
    } else {
        paginationCurrentLowerLimit--;
        renderPagination(currentPage, totalPages);
    }
}

function paginationClickRightArrow(currentPage, totalPages) {
    if (currentPage == paginationCurrentLowerLimit) {
        paginationCurrentLowerLimit++;
        paginationCurrentPage = currentPage + 1;
        getAllServiceDefinitions(paginationCurrentPage);
    } else {
        paginationCurrentLowerLimit++;
        renderPagination(currentPage, totalPages);
    }
}

function paginationClickLastArrow(totalPages) {
    paginationCurrentLowerLimit = totalPages - 4;
    paginationCurrentPage = totalPages;
    getAllServiceDefinitions(paginationCurrentPage);
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
                pagesHtml += '<button type="button" class="whiteCovenButton coven-text coven-pagination-item" onclick="getAllServiceDefinitions(' + i + ');">' + i + '</button>';
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
                pagesHtml += '<button type="button" class="whiteCovenButton coven-text coven-pagination-item" onclick="getAllServiceDefinitions(' + i + ');">' + i + '</button>';
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
    getAllServiceDefinitions(paginationCurrentPage);
}

function clickSearchIcon() {
    getAllServiceDefinitions(paginationCurrentPage);
}

function renderServiceDefinitionObject(serviceDefinition, index) {
    var resultHtml = '';

    resultHtml += '<div class="col-md-1 left-col">';
    resultHtml += '<div class="left-service-definition">';
    resultHtml += '<br/>';
    resultHtml += '<img id="service' + index + '_image" class="serviceDefinitionIcon" />';
    resultHtml += '<br/><br/><br/>';
    resultHtml += '<label class="coven-text white-color centered-text">' + serviceDefinition.name + '</label>';
    if (serviceDefinition.ratingSum > 0) {
        resultHtml += '<br/>';
        resultHtml += '<div class="display-flex">';
        resultHtml += '<span class="glyphicon glyphicon-star coven-text white-color"></span>';
        resultHtml += '<label class="coven-text white-color centered-text">' + roundToTwoDecimalPlaces(serviceDefinition.ratingSum / serviceDefinition.ratingCount) + '</label>'
        resultHtml += '</div>';
    }
    resultHtml += '</div>';
    resultHtml += '</div>';
    resultHtml += '<div class="col-md-3 right-col">';
    resultHtml += '<div class="right-service-definition">';

    switch (serviceDefinition.serviceAction) {
        case 'Sell':

            resultHtml += '<br/>';
            resultHtml += '<label class="coven-text">' + currentLanguageResources['sell'] + ': ' + serviceDefinition.name + '</label>';
            resultHtml += '<br/>';
            resultHtml += '<label class="coven-text">' + currentLanguageResources['business-sell-modal-description'] + ': ' + serviceDefinition.description + '</label>';
            resultHtml += '<br/>';
            resultHtml += '<br/>';
            resultHtml += '<label class="coven-text">' + currentLanguageResources['business-sell-modal-price'] + ': ' + serviceDefinition.sell_Price + '</label>';

            if (serviceDefinition.sell_DeliveryType == constants.deliveryTypeBusiness) {
                resultHtml += '<br/>';
            } else {
                resultHtml += '<br/>';
                resultHtml += '<label class="coven-text">' + currentLanguageResources['business-sell-modal-delivery-price'] + ': ' + serviceDefinition.sell_DeliveryPrice + '</label>';
                resultHtml += '<br/>';
            }

            if (serviceDefinition.sell_Stock != -1) {
                if (serviceDefinition.sell_Stock == 0) {
                    resultHtml += '<label class="coven-text stock-red">' + currentLanguageResources['stock-msg-0'] + '</label>';
                }else if (serviceDefinition.sell_Stock == 1) {
                    resultHtml += '<label class="coven-text stock-red">' + currentLanguageResources['stock-msg-1'] + '</label>';
                } else if (serviceDefinition.sell_Stock < 11) {
                    resultHtml += '<label class="coven-text stock-yellow">' + currentLanguageResources['stock-msg-2'] + ': ' + serviceDefinition.sell_Stock + '</label>';
                } else {
                    resultHtml += '<label class="coven-text stock-green">' + currentLanguageResources['stock-msg-2'] + '</label>';
                }
            }

            if (serviceDefinition.sell_DeliveryType == constants.deliveryTypeBusiness) {
                resultHtml += '<br/>';
            }
            resultHtml += '<br/><br/>';

            resultHtml += '<div class="row">';
            resultHtml += '<div class="col-md-5">';
            resultHtml += '<button type="button" class="covenButton coven-text" onclick="showSellModal(\'' + serviceDefinition.id + '\',\'' + businessSectorsDictionary[serviceDefinition.businessSector] + '\',\'' + serviceDefinition.name + '\',\'' + formatTextAreaInput(serviceDefinition.description) + '\',\'' + serviceDefinition.sell_Price + '\',\'' + serviceDefinition.sell_DeliveryPrice + '\',\'' + serviceDefinition.sell_Stock + '\',\'' + serviceDefinition.sell_DeliveryType + '\',\'' + serviceDefinition.imageUrl + '\');">';
            resultHtml += '<span class="glyphicon glyphicon-cog coven-glyphicon"></span> ' + currentLanguageResources['configure'];
            resultHtml += '</button>';
            resultHtml += '</div>';
            resultHtml += '<div class="col-md-1"></div>';
            resultHtml += '<div class="col-md-4">';
            resultHtml += '<button type="button" class="covenButton coven-text" onclick="clickDeleteServiceDefinition(\'' + serviceDefinition.id + '\',\'' + serviceDefinition.name + '\');">';
            resultHtml += '<span class="glyphicon glyphicon-trash coven-glyphicon"></span> ' + currentLanguageResources['delete'];
            resultHtml += '</button>';
            resultHtml += '</div>';
            resultHtml += '<div class="col-md-2"></div>';
            resultHtml += '</div>';

            break;
        case 'Rent':

            resultHtml += '<br/>';
            resultHtml += '<label class="coven-text">' + currentLanguageResources['rent'] + ': ' + serviceDefinition.name + '</label>';
            resultHtml += '<br/>';
            resultHtml += '<label class="coven-text">' + currentLanguageResources['business-rent-modal-description'] + ': ' + serviceDefinition.description + '</label>';
            resultHtml += '<br/>';
            resultHtml += '<br/>';
            resultHtml += '<label class="coven-text">' + currentLanguageResources['business-rent-modal-price-per-hour'] + ': ' + serviceDefinition.rent_PricePerHour + '</label>';

            if (serviceDefinition.rent_AcquisicionDeliveryType == constants.deliveryTypeBusiness && serviceDefinition.rent_ReturnDeliveryType == constants.deliveryTypeBusiness) {
                resultHtml += '<br/>';
                resultHtml += '<label class="coven-text">' + currentLanguageResources['business-rent-modal-deposit'] + ': ' + serviceDefinition.rent_Deposit + '</label>';
                resultHtml += '<br/>';
            } else {
                resultHtml += '<label class="coven-text">' + currentLanguageResources['business-rent-modal-delivery-price'] + ': ' + serviceDefinition.rent_DeliveryPrice + '</label>';
                resultHtml += '<br/>';
                resultHtml += '<label class="coven-text">' + currentLanguageResources['business-rent-modal-deposit'] + ': ' + serviceDefinition.rent_Deposit + '</label>';
            }

            resultHtml += '<br/><br/>';

            resultHtml += '<div class="row">';
            resultHtml += '<div class="col-md-5">';
            resultHtml += '<button type="button" class="covenButton coven-text" onclick="showRentModal(\'' + serviceDefinition.id + '\',\'' + businessSectorsDictionary[serviceDefinition.businessSector] + '\',\'' + serviceDefinition.name + '\',\'' + formatTextAreaInput(serviceDefinition.description) + '\',\'' + serviceDefinition.rent_PricePerHour + '\',\'' + serviceDefinition.rent_DeliveryPrice + '\',\'' + serviceDefinition.rent_Deposit + '\',\'' + serviceDefinition.rent_AcquisicionDeliveryType + '\',\'' + serviceDefinition.rent_ReturnDeliveryType + '\',\'' + formatTextAreaInput(serviceDefinition.rent_Terms) + '\',\'' + serviceDefinition.imageUrl + '\');">';
            resultHtml += '<span class="glyphicon glyphicon-cog coven-glyphicon"></span> ' + currentLanguageResources['configure'];
            resultHtml += '</button>';
            resultHtml += '</div>';
            resultHtml += '<div class="col-md-1"></div>';
            resultHtml += '<div class="col-md-4">';
            resultHtml += '<button type="button" class="covenButton coven-text" onclick="clickDeleteServiceDefinition(\'' + serviceDefinition.id + '\',\'' + serviceDefinition.name + '\');">';
            resultHtml += '<span class="glyphicon glyphicon-trash coven-glyphicon"></span> ' + currentLanguageResources['delete'];
            resultHtml += '</button>';
            resultHtml += '</div>';
            resultHtml += '<div class="col-md-2"></div>';
            resultHtml += '</div>';

            break;
        case 'Meeting':

            resultHtml += '<br/>';
            resultHtml += '<label class="coven-text">' + currentLanguageResources['service-action-Meeting'] + ': ' + serviceDefinition.name + '</label>';
            resultHtml += '<br/>';
            resultHtml += '<label class="coven-text">' + currentLanguageResources['business-meeting-modal-description'] + ': ' + serviceDefinition.description + '</label>';
            resultHtml += '<br/>';
            resultHtml += '<br/>';
            resultHtml += '<label class="coven-text">' + currentLanguageResources['business-meeting-modal-price'] + ': ' + serviceDefinition.meeting_Price + '</label>';
            
            if (serviceDefinition.meeting_DeliveryType == constants.deliveryTypeBusiness) {
                resultHtml += '<br/>';
            } else {
                resultHtml += '<br/>';
                resultHtml += '<label class="coven-text">' + currentLanguageResources['business-meeting-modal-delivery-price'] + ': ' + serviceDefinition.meeting_DeliveryPrice + '</label>';
                resultHtml += '<br/>';
            }

            resultHtml += '<label class="coven-text">' + currentLanguageResources['business-meeting-modal-duration'] + ': ' + serviceDefinition.meeting_Duration + '</label>';

            if (serviceDefinition.meeting_DeliveryType == constants.deliveryTypeBusiness) {
                resultHtml += '<br/>';
            }

            resultHtml += '<br/><br/>';

            resultHtml += '<div class="row">';
            resultHtml += '<div class="col-md-5">';
            resultHtml += '<button type="button" class="covenButton coven-text" onclick="showMeetingModal(\'' + serviceDefinition.id + '\',\'' + businessSectorsDictionary[serviceDefinition.businessSector] + '\',\'' + serviceDefinition.name + '\',\'' + formatTextAreaInput(serviceDefinition.description) + '\',\'' + serviceDefinition.meeting_Price + '\',\'' + serviceDefinition.meeting_DeliveryPrice + '\',\'' + serviceDefinition.meeting_Duration + '\',\'' + serviceDefinition.meeting_DeliveryType + '\');">';
            resultHtml += '<span class="glyphicon glyphicon-cog coven-glyphicon"></span> ' + currentLanguageResources['configure'];
            resultHtml += '</button>';
            resultHtml += '</div>';
            resultHtml += '<div class="col-md-1"></div>';
            resultHtml += '<div class="col-md-4">';
            resultHtml += '<button type="button" class="covenButton coven-text" onclick="clickDeleteServiceDefinition(\'' + serviceDefinition.id + '\',\'' + serviceDefinition.name + '\');">';
            resultHtml += '<span class="glyphicon glyphicon-trash coven-glyphicon"></span> ' + currentLanguageResources['delete'];
            resultHtml += '</button>';
            resultHtml += '</div>';
            resultHtml += '<div class="col-md-2"></div>';
            resultHtml += '</div>';

            break;
        case 'Videocall':

            resultHtml += '<br/>';
            resultHtml += '<label class="coven-text">' + currentLanguageResources['service-action-Videocall'] + ': ' + serviceDefinition.name + '</label>';
            resultHtml += '<br/>';
            resultHtml += '<label class="coven-text">' + currentLanguageResources['business-videocall-modal-description'] + ': ' + serviceDefinition.description + '</label>';
            resultHtml += '<br/>';
            resultHtml += '<br/>';
            resultHtml += '<label class="coven-text">' + currentLanguageResources['business-videocall-modal-price'] + ': ' + serviceDefinition.videocall_Price + '</label>';
            resultHtml += '<br/>';
            resultHtml += '<label class="coven-text">' + currentLanguageResources['business-videocall-modal-duration'] + ': ' + serviceDefinition.videocall_Duration + '</label>';

            resultHtml += '<br/><br/><br/>';

            resultHtml += '<div class="row">';
            resultHtml += '<div class="col-md-5">';
            resultHtml += '<button type="button" class="covenButton coven-text" onclick="showVideocallModal(\'' + serviceDefinition.id + '\',\'' + businessSectorsDictionary[serviceDefinition.businessSector] + '\',\'' + serviceDefinition.name + '\',\'' + formatTextAreaInput(serviceDefinition.description) + '\',\'' + serviceDefinition.videocall_Price + '\',\'' + serviceDefinition.videocall_Duration + '\');">';
            resultHtml += '<span class="glyphicon glyphicon-cog coven-glyphicon"></span> ' + currentLanguageResources['configure'];
            resultHtml += '</button>';
            resultHtml += '</div>';
            resultHtml += '<div class="col-md-1"></div>';
            resultHtml += '<div class="col-md-4">';
            resultHtml += '<button type="button" class="covenButton coven-text" onclick="clickDeleteServiceDefinition(\'' + serviceDefinition.id + '\',\'' + serviceDefinition.name + '\');">';
            resultHtml += '<span class="glyphicon glyphicon-trash coven-glyphicon"></span> ' + currentLanguageResources['delete'];
            resultHtml += '</button>';
            resultHtml += '</div>';
            resultHtml += '<div class="col-md-2"></div>';
            resultHtml += '</div>';

            break;
    }


    resultHtml += '</div>';
    resultHtml += '</div>';

    return resultHtml;
}

function renderServiceDefinitions() {

    var imagesUrls = [];
    var serviceDefinitionsHtml = '';

    var sectorsPerRow = 3;
    var numberOfIterations = Math.floor(allServiceDefinitions.length / sectorsPerRow);
    numberOfIterations = numberOfIterations + 1;
    var currentSectorsPerRow = sectorsPerRow;

    var serviceDefinitionsPosition = 0;

    if (allServiceDefinitions.length == 0) {

        serviceDefinitionsHtml += '<br/>';
        serviceDefinitionsHtml += '<div class="row">';
        serviceDefinitionsHtml += '<div class="col-md-1"></div>';
        serviceDefinitionsHtml += '<div class="col-md-10">';
        serviceDefinitionsHtml += '<label class="coven-text">' + currentLanguageResources['business-no-services-msg'] + '</label>'; 
        serviceDefinitionsHtml += '</div>';
        serviceDefinitionsHtml += '<div class="col-md-1"></div>';
        serviceDefinitionsHtml += '</div>';
        serviceDefinitionsHtml += '<br/>';

    } else {

        for (var i = 0; i < numberOfIterations; i++) {

            if (i == (numberOfIterations - 1)) {
                currentSectorsPerRow = allServiceDefinitions.length % 3;
                if (currentSectorsPerRow == 1) {

                    serviceDefinitionsHtml += '<div class="row">';
                    serviceDefinitionsHtml += '<div class="col-md-4"></div>';

                    serviceDefinitionsHtml += renderServiceDefinitionObject(allServiceDefinitions[serviceDefinitionsPosition], serviceDefinitionsPosition);
                    imagesUrls['service' + serviceDefinitionsPosition + '_image'] = allServiceDefinitions[serviceDefinitionsPosition].imageUrl;
                    serviceDefinitionsPosition++;

                    serviceDefinitionsHtml += '<div class="col-md-4"></div>';
                    serviceDefinitionsHtml += '</div>';

                } else if (currentSectorsPerRow == 2) {

                    serviceDefinitionsHtml += '<div class="row">';
                    serviceDefinitionsHtml += '<div class="col-md-1"></div>';

                    serviceDefinitionsHtml += renderServiceDefinitionObject(allServiceDefinitions[serviceDefinitionsPosition], serviceDefinitionsPosition);
                    imagesUrls['service' + serviceDefinitionsPosition + '_image'] = allServiceDefinitions[serviceDefinitionsPosition].imageUrl;
                    serviceDefinitionsPosition++;

                    serviceDefinitionsHtml += '<div class="col-md-2"></div>';

                    serviceDefinitionsHtml += renderServiceDefinitionObject(allServiceDefinitions[serviceDefinitionsPosition], serviceDefinitionsPosition);
                    imagesUrls['service' + serviceDefinitionsPosition + '_image'] = allServiceDefinitions[serviceDefinitionsPosition].imageUrl;
                    serviceDefinitionsPosition++;

                    serviceDefinitionsHtml += '<div class="col-md-1"></div>';
                    serviceDefinitionsHtml += '</div>';
                }
            }
            else {
                serviceDefinitionsHtml += '<div class="row">';

                serviceDefinitionsHtml += renderServiceDefinitionObject(allServiceDefinitions[serviceDefinitionsPosition], serviceDefinitionsPosition);
                imagesUrls['service' + serviceDefinitionsPosition + '_image'] = allServiceDefinitions[serviceDefinitionsPosition].imageUrl;
                serviceDefinitionsPosition++;

                serviceDefinitionsHtml += renderServiceDefinitionObject(allServiceDefinitions[serviceDefinitionsPosition], serviceDefinitionsPosition);
                imagesUrls['service' + serviceDefinitionsPosition + '_image'] = allServiceDefinitions[serviceDefinitionsPosition].imageUrl;
                serviceDefinitionsPosition++;

                serviceDefinitionsHtml += renderServiceDefinitionObject(allServiceDefinitions[serviceDefinitionsPosition], serviceDefinitionsPosition);
                imagesUrls['service' + serviceDefinitionsPosition + '_image'] = allServiceDefinitions[serviceDefinitionsPosition].imageUrl;
                serviceDefinitionsPosition++;

                serviceDefinitionsHtml += '</div>';
            }
        }
    }

    $('#allSectorsContainer').empty();
    $('#allSectorsContainer').append(serviceDefinitionsHtml);

    
    setTimeout(function () {
        for (var i = 0; i < serviceDefinitionsPosition; i++) {
            getServiceImage(imagesUrls['service' + i + '_image'], 'service' + i + '_image')
        }
    }, timeoutShortSpan);

}

function deleteServiceDefinition(serviceDefinitionId) {
    showMask();
    $.ajax({
        type: 'DELETE',
        url: apiUrls.servicedef,
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({
            serviceDefinitionId: serviceDefinitionId,
        }),
        success: function (response) {
            if (response.message != constants.apiSuccess) {
                showMessageModal(currentLanguageResources['server-error'], currentLanguageResources['server-error-msg'] + currentLanguageResources[response.message], 'error');
            }
            else
            {
                showMessageModal(currentLanguageResources['success-title'], currentLanguageResources['success-008'], 'success');

                setTimeout(function () { getAllServiceDefinitions(paginationCurrentPage); }, timeoutLongSpan);

            }
            hideMask();
        },
        error: function (response) {
            showMessageModal(currentLanguageResources['server-error'], currentLanguageResources['server-error-msg'] + response.responseText, 'error');
            hideMask();
        }
    });
}

function clickDeleteServiceDefinition(serviceDefinitionId, serviceDefinitionName) {
    showConfirmModal(currentLanguageResources['confirm-title-005'], currentLanguageResources['confirm-msg-005'] + serviceDefinitionName + "?", "warning", function () { deleteServiceDefinition(serviceDefinitionId); });
}

function submitSellModal() {
    showMask();

    var deliveryType = constants.deliveryTypeBoth;
    if ($('#inputSellDeliveryTypeCheckbox1').prop('checked')) {
        deliveryType = constants.deliveryTypeBusiness;
    } else if ($('#inputSellDeliveryTypeCheckbox2').prop('checked')) {
        deliveryType = constants.deliveryTypeClient;
    } else if ($('#inputSellDeliveryTypeCheckbox3').prop('checked')) {
        deliveryType = constants.deliveryTypeBoth;
    }

    $.ajax({
        type: 'PUT',
        url: apiUrls.servicedef_sell,
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({
            serviceDefinitionId: selectedServiceDefinitionId,
            name: $('#inputSellName').val(),
            description: $('#inputSellDescription').val(),
            price: $('#inputSellPrice').val(),
            deliveryPrice: $('#inputSellDeliveryPrice').val(),
            stock: $('#inputSellStock').val(),
            deliveryType: deliveryType
        }),
        success: function (response) {
            if (response.message != constants.apiSuccess) {
                showMessageModal(currentLanguageResources['server-error'], currentLanguageResources['server-error-msg'] + currentLanguageResources[response.message], 'error');
            }
            else {
                showMessageModal(currentLanguageResources['success-title'], currentLanguageResources['success-009'], 'success');

                sellModal.style.display = "none";

                setTimeout(function () { getAllServiceDefinitions(paginationCurrentPage); }, timeoutShortSpan);
            }
            hideMask();
        },
        error: function (response) {
            showMessageModal(currentLanguageResources['server-error'], currentLanguageResources['server-error-msg'] + response.responseText, 'error');
            hideMask();
        }
    });
}

function submitRentModal() {
    showMask();

    var acquisicionDeliveryType = constants.deliveryTypeBoth;
    if ($('#inputRentAcquisicionDeliveryTypeCheckbox1').prop('checked')) {
        acquisicionDeliveryType = constants.deliveryTypeBusiness;
    } else if ($('#inputRentAcquisicionDeliveryTypeCheckbox2').prop('checked')) {
        acquisicionDeliveryType = constants.deliveryTypeClient;
    } else if ($('#inputRentAcquisicionDeliveryTypeCheckbox3').prop('checked')) {
        acquisicionDeliveryType = constants.deliveryTypeBoth;
    }

    var returnDeliveryType = constants.deliveryTypeBoth;
    if ($('#inputRentReturnDeliveryTypeCheckbox1').prop('checked')) {
        returnDeliveryType = constants.deliveryTypeBusiness;
    } else if ($('#inputRentReturnDeliveryTypeCheckbox2').prop('checked')) {
        returnDeliveryType = constants.deliveryTypeClient;
    } else if ($('#inputRentReturnDeliveryTypeCheckbox3').prop('checked')) {
        returnDeliveryType = constants.deliveryTypeBoth;
    }

    $.ajax({
        type: 'PUT',
        url: apiUrls.servicedef_rent,
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({
            serviceDefinitionId: selectedServiceDefinitionId,
            name: $('#inputRentName').val(),
            description: $('#inputRentDescription').val(),
            pricePerHour: $('#inputRentPricePerHour').val(),
            deliveryPrice: $('#inputRentDeliveryPrice').val(),
            deposit: $('#inputRentDeposit').val(),
            acquisicionDeliveryType: acquisicionDeliveryType,
            returnDeliveryType: returnDeliveryType,
            terms: $('#inputRentTerms').val()
        }),
        success: function (response) {
            if (response.message != constants.apiSuccess) {
                showMessageModal(currentLanguageResources['server-error'], currentLanguageResources['server-error-msg'] + currentLanguageResources[response.message], 'error');
            }
            else {
                showMessageModal(currentLanguageResources['success-title'], currentLanguageResources['success-009'], 'success');

                rentModal.style.display = "none";

                setTimeout(function () { getAllServiceDefinitions(paginationCurrentPage); }, timeoutShortSpan);
            }
            hideMask();
        },
        error: function (response) {
            showMessageModal(currentLanguageResources['server-error'], currentLanguageResources['server-error-msg'] + response.responseText, 'error');
            hideMask();
        }
    });
}

function submitMeetingModal() {

    showMask();

    var deliveryType = constants.deliveryTypeBoth;
    if ($('#inputMeetingDeliveryTypeCheckbox1').prop('checked')) {
        deliveryType = constants.deliveryTypeBusiness;
    } else if ($('#inputMeetingDeliveryTypeCheckbox2').prop('checked')) {
        deliveryType = constants.deliveryTypeClient;
    } else if ($('#inputMeetingDeliveryTypeCheckbox3').prop('checked')) {
        deliveryType = constants.deliveryTypeBoth;
    }

    $.ajax({
        type: 'PUT',
        url: apiUrls.servicedef_meeting,
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({
            serviceDefinitionId: selectedServiceDefinitionId,
            name: $('#inputMeetingName').val(),
            description: $('#inputMeetingDescription').val(),
            price: $('#inputMeetingPrice').val(),
            deliveryPrice: $('#inputMeetingDeliveryPrice').val(),
            duration: $('#inputMeetingDuration').val(),
            deliveryType: deliveryType
        }),
        success: function (response) {
            if (response.message != constants.apiSuccess) {
                showMessageModal(currentLanguageResources['server-error'], currentLanguageResources['server-error-msg'] + currentLanguageResources[response.message], 'error');
            }
            else {
                showMessageModal(currentLanguageResources['success-title'], currentLanguageResources['success-009'], 'success');

                meetingModal.style.display = "none";

                setTimeout(function () { getAllServiceDefinitions(paginationCurrentPage); }, timeoutShortSpan);
            }
            hideMask();
        },
        error: function (response) {
            showMessageModal(currentLanguageResources['server-error'], currentLanguageResources['server-error-msg'] + response.responseText, 'error');
            hideMask();
        }
    });

}

function submitVideocallModal() {

    showMask();
    $.ajax({
        type: 'PUT',
        url: apiUrls.servicedef_videocall,
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({
            serviceDefinitionId: selectedServiceDefinitionId,
            name: $('#inputVideocallName').val(),
            description: $('#inputVideocallDescription').val(),
            price: $('#inputVideocallPrice').val(),
            duration: $('#inputVideocallDuration').val()
        }),
        success: function (response) {
            if (response.message != constants.apiSuccess) {
                showMessageModal(currentLanguageResources['server-error'], currentLanguageResources['server-error-msg'] + currentLanguageResources[response.message], 'error');
            }
            else {
                showMessageModal(currentLanguageResources['success-title'], currentLanguageResources['success-009'], 'success');

                videocallModal.style.display = "none";
                
                setTimeout(function () { getAllServiceDefinitions(paginationCurrentPage); }, timeoutShortSpan);
            }
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

function clickDeleteServiceImage(isSell) {
    showConfirmModal(currentLanguageResources['confirm-title-004'], currentLanguageResources['confirm-msg-004'], "warning", function () { doDeleteServiceImage(isSell); });
}

function doDeleteServiceImage(isSell) {
    if (selectedServiceImageUrl == constants.noImageUrl) {
        showMessageModal(currentLanguageResources['error'], currentLanguageResources['local-error-007'], "error");
    } else {
        showMask();
        $.ajax({
            type: 'DELETE',
            url: apiUrls.sfile,
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({
                serviceDefinitionId: selectedServiceDefinitionId,
                bucketKey: selectedServiceImageUrl,
            }),
            success: function (response) {
                if (response.message != constants.apiSuccess) {
                    showMessageModal(currentLanguageResources['server-error'], currentLanguageResources['server-error-msg'] + currentLanguageResources[response.message], 'error');
                }
                else {
                    showMessageModal(currentLanguageResources['success-title'], currentLanguageResources['success-006'], 'success');

                    selectedServiceImageUrl = constants.noImageUrl;

                    if (isSell) {
                        getServiceImage(selectedServiceImageUrl, 'inputSellServiceImage');
                    } else {
                        getServiceImage(selectedServiceImageUrl, 'inputRentServiceImage');
                    }

                    setTimeout(function () { getAllServiceDefinitions(paginationCurrentPage); }, timeoutShortSpan);
                }
                hideMask();
            },
            error: function (response) {
                showMessageModal(currentLanguageResources['server-error'], currentLanguageResources['server-error-msg'] + response.responseText, 'error');
                hideMask();
            }
        });
    }
}

function clickSellFileInput() {
    $('#inputSellFileInput').click();
}

function changeSellFileInput() {
    var fileName = $('#inputSellFileInput')[0].files[0].name;
    $('#sellFileNameButton').text(fileName);
}

function clickRentFileInput() {
    $('#inputRentFileInput').click();
}

function changeRentFileInput() {
    var fileName = $('#inputRentFileInput')[0].files[0].name;
    $('#rentFileNameButton').text(fileName);
}

const toBinString = (bytes) => bytes.reduce((str, byte) => str + byte.toString(2).padStart(8, '0'), '');

function clickUpdateServiceImage(isSell) {

    showMask();

    if (window.FormData == undefined) {
        hideMask();
        showMessageModal(currentLanguageResources['error'], currentLanguageResources['local-error-002'], 'error');
        return;
    }

    var input;
    if (isSell) {
        input = $('#inputSellFileInput')[0];
    } else {
        input = $('#inputRentFileInput')[0];
    }

    if (input.files.length == 0) {
        hideMask();
        showMessageModal(currentLanguageResources['error'], currentLanguageResources['local-error-003'], 'error');
        return;
    }

    if (input.files.length > 1) {
        hideMask();
        showMessageModal(currentLanguageResources['error'], currentLanguageResources['local-error-004'], 'error');
        return;
    }

    if (input.files && input.files[0]) {

        file = input.files[0];
        if (file.size > 10000000) {
            hideMask();
            showMessageModal(currentLanguageResources['error'], currentLanguageResources['local-error-005'], 'error');
            return;
        }

        var fileReader = new FileReader();

        if (fileReader) {

            fileReader.onload = function () {

                $.ajax({
                    type: 'POST',
                    url: apiUrls.sfile,
                    dataType: 'json',
                    contentType: 'application/json',
                    data: JSON.stringify({
                        serviceDefinitionId: selectedServiceDefinitionId,
                        filename: file.name,
                        contentType: file.type,
                        data: toBinString(new Uint8Array(fileReader.result))
                    }),
                    success: function (response) {
                        if (response.message != constants.apiSuccess) {
                            showMessageModal(currentLanguageResources['server-error'], currentLanguageResources['server-error-msg'] + currentLanguageResources[response.message], 'error');
                        }
                        else {
                            showMessageModal(currentLanguageResources['success-title'], currentLanguageResources['success-005'], 'success');

                            selectedServiceImageUrl = selectedServiceDefinitionId + "/" + file.name;
                            
                            if (isSell) {
                                $('#inputSellFileInput').val(null);
                                $('#sellFileNameButton').text(currentLanguageResources['file-no-file-chosen']);
                                getServiceImage(selectedServiceImageUrl, 'inputSellServiceImage');
                            } else {
                                $('#inputRentFileInput').val(null);
                                $('#rentFileNameButton').text(currentLanguageResources['file-no-file-chosen']);
                                getServiceImage(selectedServiceImageUrl, 'inputRentServiceImage');
                            }

                            setTimeout(function () { getAllServiceDefinitions(paginationCurrentPage); }, timeoutShortSpan);
                        }
                        hideMask();
                    },
                    error: function (response) {
                        showMessageModal(currentLanguageResources['server-error'], currentLanguageResources['server-error-msg'] + response.responseText, 'error');
                        hideMask();
                    }
                });

            };

            fileReader.readAsArrayBuffer(file);

        } else {
            hideMask();
            showMessageModal(currentLanguageResources['error'], currentLanguageResources['local-error-006'], 'error');
            return;
        }

    } else {
        hideMask();
        showMessageModal(currentLanguageResources['error'], currentLanguageResources['local-error-002'], 'error');
        return;
    }

}

function sellStockChange() {
    if ($('#inputSellStockCheckbox').prop('checked')) {
        oldStockValue = $('#inputSellStock').val();
        $('#inputSellStock').val(-1);
        $('#inputSellStock').prop("disabled", true);
    } else {
        $('#inputSellStock').val(oldStockValue);
        $('#inputSellStock').prop("disabled", false);
    }
}

function sellDeliveryTypeChange1() {
    if ($('#inputSellDeliveryTypeCheckbox1').prop('checked')) {
        oldDeliveryPrice = $('#inputSellDeliveryPrice').val();
        $('#inputSellDeliveryPrice').val(0);
        $('#sellModalDeliveryPriceContainer').css('display', 'none');

        $('#inputSellDeliveryTypeCheckbox2').prop('checked', false);
        $('#inputSellDeliveryTypeCheckbox3').prop('checked', false);
    }
}

function sellDeliveryTypeChange2() {
    if ($('#inputSellDeliveryTypeCheckbox2').prop('checked')) {
        $('#inputSellDeliveryPrice').val(oldDeliveryPrice);
        $('#sellModalDeliveryPriceContainer').css('display', '');

        $('#inputSellDeliveryTypeCheckbox1').prop('checked', false);
        $('#inputSellDeliveryTypeCheckbox3').prop('checked', false);
    }
}

function sellDeliveryTypeChange3() {
    if ($('#inputSellDeliveryTypeCheckbox3').prop('checked')) {
        $('#inputSellDeliveryPrice').val(oldDeliveryPrice);
        $('#sellModalDeliveryPriceContainer').css('display', '');

        $('#inputSellDeliveryTypeCheckbox1').prop('checked', false);
        $('#inputSellDeliveryTypeCheckbox2').prop('checked', false);
    }
}

function rentAcquisicionDeliveryTypeChange1() {
    if ($('#inputRentAcquisicionDeliveryTypeCheckbox1').prop('checked')) {
        $('#inputRentAcquisicionDeliveryTypeCheckbox2').prop('checked', false);
        $('#inputRentAcquisicionDeliveryTypeCheckbox3').prop('checked', false);

        if ($('#inputRentReturnDeliveryTypeCheckbox1').prop('checked')) {
            oldDeliveryPrice = $('#inputRentDeliveryPrice').val();
            $('#inputRentDeliveryPrice').val(0);
            $('#rentModalDeliveryPriceContainer').css('display', 'none');
        }
    }
}

function rentAcquisicionDeliveryTypeChange2() {
    if ($('#inputRentAcquisicionDeliveryTypeCheckbox2').prop('checked')) {
        $('#inputRentDeliveryPrice').val(oldDeliveryPrice);
        $('#rentModalDeliveryPriceContainer').css('display', '');

        $('#inputRentAcquisicionDeliveryTypeCheckbox1').prop('checked', false);
        $('#inputRentAcquisicionDeliveryTypeCheckbox3').prop('checked', false);
    }
}

function rentAcquisicionDeliveryTypeChange3() {
    if ($('#inputRentAcquisicionDeliveryTypeCheckbox3').prop('checked')) {
        $('#inputRentDeliveryPrice').val(oldDeliveryPrice);
        $('#rentModalDeliveryPriceContainer').css('display', '');

        $('#inputRentAcquisicionDeliveryTypeCheckbox1').prop('checked', false);
        $('#inputRentAcquisicionDeliveryTypeCheckbox2').prop('checked', false);
    }
}

function rentReturnDeliveryTypeChange1() {
    if ($('#inputRentReturnDeliveryTypeCheckbox1').prop('checked')) {
        $('#inputRentReturnDeliveryTypeCheckbox2').prop('checked', false);
        $('#inputRentReturnDeliveryTypeCheckbox3').prop('checked', false);

        if ($('#inputRentAcquisicionDeliveryTypeCheckbox1').prop('checked')) {
            oldDeliveryPrice = $('#inputRentDeliveryPrice').val();
            $('#inputRentDeliveryPrice').val(0);
            $('#rentModalDeliveryPriceContainer').css('display', 'none');
        }
    }
}

function rentReturnDeliveryTypeChange2() {
    if ($('#inputRentReturnDeliveryTypeCheckbox2').prop('checked')) {
        $('#inputRentDeliveryPrice').val(oldDeliveryPrice);
        $('#rentModalDeliveryPriceContainer').css('display', '');

        $('#inputRentReturnDeliveryTypeCheckbox1').prop('checked', false);
        $('#inputRentReturnDeliveryTypeCheckbox3').prop('checked', false);
    }
}

function rentReturnDeliveryTypeChange3() {
    if ($('#inputRentReturnDeliveryTypeCheckbox3').prop('checked')) {
        $('#inputRentDeliveryPrice').val(oldDeliveryPrice);
        $('#rentModalDeliveryPriceContainer').css('display', '');

        $('#inputRentReturnDeliveryTypeCheckbox1').prop('checked', false);
        $('#inputRentReturnDeliveryTypeCheckbox2').prop('checked', false);
    }
}

function meetingDeliveryTypeChange1() {
    if ($('#inputMeetingDeliveryTypeCheckbox1').prop('checked')) {
        oldDeliveryPrice = $('#inputMeetingDeliveryPrice').val();
        $('#inputMeetingDeliveryPrice').val(0);
        $('#meetingModalDeliveryPriceContainer').css('display', 'none');

        $('#inputMeetingDeliveryTypeCheckbox2').prop('checked', false);
        $('#inputMeetingDeliveryTypeCheckbox3').prop('checked', false);
    }
}

function meetingDeliveryTypeChange2() {
    if ($('#inputMeetingDeliveryTypeCheckbox2').prop('checked')) {
        $('#inputMeetingDeliveryPrice').val(oldDeliveryPrice);
        $('#meetingModalDeliveryPriceContainer').css('display', '');

        $('#inputMeetingDeliveryTypeCheckbox1').prop('checked', false);
        $('#inputMeetingDeliveryTypeCheckbox3').prop('checked', false);
    }
}

function meetingDeliveryTypeChange3() {
    if ($('#inputMeetingDeliveryTypeCheckbox3').prop('checked')) {
        $('#inputMeetingDeliveryPrice').val(oldDeliveryPrice);
        $('#meetingModalDeliveryPriceContainer').css('display', '');

        $('#inputMeetingDeliveryTypeCheckbox1').prop('checked', false);
        $('#inputMeetingDeliveryTypeCheckbox2').prop('checked', false);
    }
}

$(document).ready(function () {
    if (sessionStorage.getItem('tokenBool') == 'true') {
        window.location.assign(serverUrls.businessProfile);
    } else {

        initializeNavbarPage(3, 1);
        initializeLanguageSettings('BusinessServices');

        initializeBusinessSectorsDictionary();
        initializeServiceActionsDictionary();

        fillBusinessSectorsModal();
        fillServiceActionsModal();

        fillBusinessSectors();
        fillServiceActions();

        setTimeout(function () {

            $('#businessSectorContainer_All').removeClass();
            $('#businessSectorContainer_All').attr('class', 'selectedBusinessSectorContainer');
            $('#serviceActionContainer_All').removeClass();
            $('#serviceActionContainer_All').attr('class', 'selectedBusinessSectorContainer');

            getAllServiceDefinitions(paginationCurrentPage);
        }, 1000);

    }
});