var currentLanguageResources = getCurrentResources();

var businessSectorsDictionary = [];
var serviceActionsDictionary = [];

var selectedBusinessSectorFilter = "All";
var selectedServiceActionFilter = "All";

var paginationCurrentPage = 1;
var paginationCurrentLowerLimit = 1;

var allServiceDefinitions;
var currentPreService;

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

var userModal = document.getElementById('userModal');
var userSpan = document.getElementById('userModalClose');

if (userModal != null) {
    userSpan.onclick = function () {
        closeUserModal();
    }

    function closeUserModal() {
        userModal.style.display = "none";
    }

    function showUserModal(userId) {
        showMask();
        $.ajax({
            type: 'GET',
            url: apiUrls.c_user,
            dataType: 'json',
            data: {
                userId: userId
            },
            success: function (response) {
                
                $('#userModalName').text(response.name + " " + response.lastName);
                $('#userModalName2').text(response.name + " " + response.lastName);
                $('#userModalIntroduction').text(response.introduction);
                $('#userModalEmail').html('<span class="glyphicon glyphicon-envelope coven-glyphicon"></span>' + response.email);
                $('#userModalTelephone').html('<span class="glyphicon glyphicon-phone coven-glyphicon"></span>' + response.telephone);
                $('#userModalCountry').text(response.country);
                $('#userModalState').text(response.state);
                $('#userModalCity').text(response.city);
                $('#userModalAddress').text(response.addressLine);

                if (response.isBusiness == 1) {
                    $('#userModalAccountType').text(currentLanguageResources['business-type-business']);
                } else {
                    $('#userModalAccountType').text(currentLanguageResources['business-type-person']);
                }

                setScheduleData(response.schedules);

                downloadImage(response.profilePictureUrl,'userModalImage');

                userModal.style.display = "block";

                hideMask();
            },
            error: function (response) {
                showMessageModal(currentLanguageResources['server-error'], currentLanguageResources['server-error-msg'] + response.responseText, 'error');
                hideMask();
            }
        });
    }
}

function setScheduleData(scheduleData) {
    var scheduleArray = scheduleData.split(';');

    var daysEnabled = scheduleArray[0];

    setDayEnabled('#checkboxSunday', daysEnabled[0]);
    setDayEnabled('#checkboxMonday', daysEnabled[1]);
    setDayEnabled('#checkboxTuesday', daysEnabled[2]);
    setDayEnabled('#checkboxWednesday', daysEnabled[3]);
    setDayEnabled('#checkboxThursday', daysEnabled[4]);
    setDayEnabled('#checkboxFriday', daysEnabled[5]);
    setDayEnabled('#checkboxSaturday', daysEnabled[6]);

    setTimesForDay('containerSunday', scheduleArray[1]);
    setTimesForDay('containerMonday', scheduleArray[2]);
    setTimesForDay('containerTuesday', scheduleArray[3]);
    setTimesForDay('containerWednesday', scheduleArray[4]);
    setTimesForDay('containerThursday', scheduleArray[5]);
    setTimesForDay('containerFriday', scheduleArray[6]);
    setTimesForDay('containerSaturday', scheduleArray[7]);
}

function setDayEnabled(checkboxId, dayData) {
    if (dayData == '0') {
        $(checkboxId).prop("checked", false);
    } else {
        $(checkboxId).prop("checked", true);
    }
}

function setTimesForDay(divId, timesData) {
    if (timesData != "") {
        var times = timesData.split(',');

        var timesHtml = '';
        for (var i = 0; i < times.length; i++) {
            timesHtml += '<button class="covenButton whiteColor timeMargin">' + times[i] + '</button>';
        }

        $('#' + divId).empty();
        $('#' + divId).append(timesHtml);
    }
}

var termsModal = document.getElementById('termsModal');
var termsSpan = document.getElementById('termsModalClose');

if (termsModal != null) {

    termsSpan.onclick = function () {
        closeTermsModal();
    }

    function closeTermsModal() {
        termsModal.style.display = "none";
    }

    function submitTermsModal() {
        $('#client-buy-modal-pay-button').prop("disabled", false);
        $('#client-buy-modal-pay-button').removeClass('greyCovenButtonNoHover').addClass('covenButton');
        closeTermsModal();
    }

    function showTermsModal() {
        termsModal.style.display = "block";
    }
}

function generateStarsHtml(rating) {
    var starsHtml = '';

    starsHtml += '<div class="starContainer display-flex">';
    for (var i = 1; i <= (2 * rating); i++) {
        if (i % 2 == 1) {
            starsHtml += '<img class="smallStar leftStar"/>';
        } else {
            starsHtml += '<img class="smallStar rightStar"/>';
        }
    }
    for (var i = (2 * rating) + 1; i <= 10; i++) {
        if (i % 2 == 1) {
            starsHtml += '<img class="smallStar greyLeftStar"/>';
        } else {
            starsHtml += '<img class="smallStar greyRightStar"/>';
        }
    }
    starsHtml += '</div>';

    return starsHtml;
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

    function showRatingsModal(serviceDefinitionId, serviceName) {

        showMask();
        $.ajax({
            type: 'GET',
            url: apiUrls.ratings,
            dataType: 'json',
            data: {
                serviceDefinitionId: serviceDefinitionId
            },
            success: function (response) {

                $('#ratingModalProduct').text(currentLanguageResources['business-sales-rating-modal-product'] + ': ' + serviceName);

                $('#ratingModalRating').empty();
                $('#ratingModalRating').append('<label class="coven-text">' + currentLanguageResources['business-sales-rating-modal-rating'] + ':</label>');
                if (response.ratingSum == 0) {
                    $('#ratingModalRating').append(generateStarsHtml(0));
                } else {
                    $('#ratingModalRating').append(generateStarsHtml(roundToTwoDecimalPlaces(response.ratingSum / response.ratingCount)));
                }

                var ratingsHtml = '';

                if (response.ratings.length == 0) {

                    ratingsHtml += '<div class="row">';
                    ratingsHtml += '<div class="col-md-1"></div>';
                    ratingsHtml += '<div class="col-md-10">';
                    ratingsHtml += '<br/>';
                    ratingsHtml += '<div class="home-container">';
                    ratingsHtml += '<br/>';

                    ratingsHtml += '<div class="row">';
                    ratingsHtml += '<div class="col-md-1"></div>';
                    ratingsHtml += '<div class="col-md-10">';
                    ratingsHtml += '<label class="coven-text">' + currentLanguageResources['business-sales-rating-modal-no-rating'] + '</label>';
                    ratingsHtml += '</div>';
                    ratingsHtml += '<div class="col-md-1"></div>';
                    ratingsHtml += '</div>';

                    ratingsHtml += '<br/>';
                    ratingsHtml += '</div>';
                    ratingsHtml += '<br/>';
                    ratingsHtml += '</div>';
                    ratingsHtml += '<div class="col-md-1"></div>';
                    ratingsHtml += '</div>';
                    ratingsHtml += '<br/>';

                } else {

                    for (var i = 0; i < response.ratings.length; i++) {
                        ratingsHtml += '<div class="row">';
                        ratingsHtml += '<div class="col-md-1"></div>';
                        ratingsHtml += '<div class="col-md-10">';
                        ratingsHtml += '<br/>';
                        ratingsHtml += '<div class="home-container">';
                        ratingsHtml += '<br/>';

                        ratingsHtml += '<div class="row">';
                        ratingsHtml += '<div class="col-md-1"></div>';
                        ratingsHtml += '<div class="col-md-5 left-align">';
                        ratingsHtml += '<label class="coven-text">' + currentLanguageResources['business-sales-rating-modal-user'] + ": " + response.ratings[i].user + '</label>';
                        ratingsHtml += '</div>';
                        ratingsHtml += '<div class="col-md-5 right-align display-flex">';
                        ratingsHtml += '<label class="coven-text">' + currentLanguageResources['business-sales-rating-modal-rating'] + ":" + '</label>';
                        ratingsHtml += generateStarsHtml(response.ratings[i].value);
                        ratingsHtml += '</div>';
                        ratingsHtml += '<div class="col-md-1"></div>';
                        ratingsHtml += '</div>';

                        ratingsHtml += '<br/>';

                        ratingsHtml += '<div class="row">';
                        ratingsHtml += '<div class="col-md-1"></div>';
                        ratingsHtml += '<div class="col-md-10">';
                        ratingsHtml += '<textarea class="coven-text terms-text-box" disabled="disabled">' + response.ratings[i].comment + '</textarea>';
                        ratingsHtml += '</div>';
                        ratingsHtml += '<div class="col-md-1"></div>';
                        ratingsHtml += '</div>';

                        ratingsHtml += '<br/>';

                        ratingsHtml += '<div class="row">';
                        ratingsHtml += '<div class="col-md-1"></div>';
                        ratingsHtml += '<div class="col-md-10 right-align">';
                        ratingsHtml += '<label class="coven-text">' + currentLanguageResources['business-sales-rating-modal-date'] + ": " + response.ratings[i].date.split('T')[0] + '</label>';
                        ratingsHtml += '</div>';
                        ratingsHtml += '<div class="col-md-1"></div>';
                        ratingsHtml += '</div>';

                        ratingsHtml += '<br/>';
                        ratingsHtml += '</div>';
                        ratingsHtml += '<br/>';
                        ratingsHtml += '</div>';
                        ratingsHtml += '<div class="col-md-1"></div>';
                        ratingsHtml += '</div>';
                        ratingsHtml += '<br/>';
                    }

                }

                $('#allRatingsContainer').empty();
                $('#allRatingsContainer').append(ratingsHtml);

                ratingsModal.style.display = "block";
                hideMask();
            },
            error: function (response) {
                showMessageModal(currentLanguageResources['server-error'], currentLanguageResources['server-error-msg'] + response.responseText, 'error');
                hideMask();
            }
        });
    }
}

var buyModal = document.getElementById('buyModal');
var buySpan = document.getElementById('buyModalClose');

if (buyModal != null) {
    buySpan.onclick = function () {
        closeBuyModal();
    }

    function closeBuyModal() {
        buyModal.style.display = "none";
    }

    function calculateAndSetTotals() {
        var subtotal = $('#buyModalInputQuantity').val() * currentPreService.price;
        if (currentPreService.serviceAction == "Rent") {
            var acquisitionDate = new Date($('#buyModalInputAcquisitionDate').val() + 'T' + $('#buyModalInputAcquisitionTime').val())
            var returnDate = new Date($('#buyModalInputReturnDate').val() + 'T' + $('#buyModalInputReturnTime').val())
            var rentHours = roundToTwoDecimalPlaces( Math.abs(acquisitionDate.getTime() - returnDate.getTime()) / 3600000);
            $('#buyModalInputRentHours').val(rentHours);
            subtotal = roundToTwoDecimalPlaces(rentHours * currentPreService.price);
        }
        $('#buyModalSubtotalValue').text(subtotal);

        var deliveryFee = (($('#buyModalSelectAcquisitionDeliveryType').val() == '2' ||
            $('#buyModalSelectAcquisitionDeliveryType').val() == '3' ||
            $('#buyModalSelectReturnDeliveryType').val() == '2' ||
            $('#buyModalSelectReturnDeliveryType').val() == '3') ? currentPreService.deliveryPrice : 0);
        $('#buyModalDeliveryFeeValue').text(deliveryFee);

        var videocallPrice = (currentPreService.serviceAction == 'Videocall') ? constants.videocallCostPerMinute * currentPreService.duration : 0;
        $('#buyModalDeliveryVideocallValue').text(videocallPrice);

        var total = roundToTwoDecimalPlaces(subtotal + deliveryFee + videocallPrice + constants.covenFee);
        $('#buyModalDeliveryTotalValue').text("$ " + total);
    }

    function onRentRangeChange() {
        if (currentPreService.serviceAction == "Rent") {
            calculateAndSetTotals();
        }
    }

    function showBuyModal(serviceDefinitionId, businessId) {
        showMask();
        $.ajax({
            type: 'GET',
            url: apiUrls.preservice,
            dataType: 'json',
            data: {
                token: sessionStorage.getItem('token'),
                businessId: businessId,
                serviceDefinitionId: serviceDefinitionId,
            },
            success: function (response) {

                currentPreService = response;

                // Ratings Button
                $('#buyModalRatingButton').click(function () {
                    showRatingsModal(response.serviceDefinitionId, response.serviceName);
                });

                // Info And Prices
                $('#buyModalName').text(response.serviceName);
                $('#buyModalInputName').val(response.serviceName);
                $('#buyModalInputDescription').val(response.serviceDescription);
                $('#buyModalInputPrice').val(response.price);
                $('#buyModalInputDeliveryPrice').val(response.deliveryPrice);
                $('#buyModalInputDuration').val(response.duration);

                $('#buyModalDepositValue').text('$ ' + response.deposit);

                if (response.deposit > 0) {
                    $('#depositContainer').css('display', '');
                    $('#depositMsgContainer').css('display', '');
                } else {
                    $('#depositContainer').css('display', 'none');
                    $('#depositMsgContainer').css('display', 'none');
                }

                if (response.serviceAction == 'Rent') {
                    $('#termsMsgContainer').css('display', '');
                    $('#client-buy-modal-terms-button').css('display', '');
                    $('#client-buy-modal-pay-button').prop("disabled", true);

                    $('#client-buy-modal-terms-button').html(currentLanguageResources['business-rent-modal-terms']);
                    $('#client-buy-modal-pay-button').removeClass('covenButton').addClass('greyCovenButtonNoHover');

                    $('#client-buy-modal-terms-button').on("click", function () {
                        $('#terms-modal-msg').val(response.terms);
                        showTermsModal();
                    });
                } else {
                    $('#termsMsgContainer').css('display', 'none');
                    $('#client-buy-modal-terms-button').css('display', 'none');
                    $('#client-buy-modal-pay-button').prop("disabled", false);

                    $('#client-buy-modal-pay-button').removeClass('greyCovenButtonNoHover').addClass('covenButton');
                }

                switch (response.serviceAction) {
                    case 'Sell':
                        $('#client-buy-modal-title').text(currentLanguageResources['client-services-buy'] + ' ' + response.serviceName);
                        $('#client-buy-modal-price').text(currentLanguageResources['client-buy-modal-price-sell']);
                        $('#buyModalDeliveryPriceContainer').css('display', '');
                        $('#buyModalDurationContainer').css('display', 'none');
                        $('#buyModalQuantityContainer').css('display', '');
                        $('#rentHoursContainer').css('display', 'none');
                        $('#buyModalDeliveryPriceRow').css('display', '');
                        $('#buyModalVideocallRow').css('display', 'none');
                        $('#buyModalInputQuantity').val(1);
                        $('#buyModalInputQuantity').prop("disabled", false);
                        $('#client-buy-modal-pay-button').html('<span class="glyphicon glyphicon-credit-card coven-glyphicon"></span>' + currentLanguageResources['client-services-buy']);
                        break;
                    case 'Rent':
                        $('#client-buy-modal-title').text(currentLanguageResources['client-services-rent'] + ' ' + response.serviceName);
                        $('#client-buy-modal-price').text(currentLanguageResources['client-buy-modal-price-rent']);
                        $('#buyModalDeliveryPriceContainer').css('display', '');
                        $('#buyModalDurationContainer').css('display', 'none');
                        $('#buyModalQuantityContainer').css('display', 'none');
                        $('#rentHoursContainer').css('display', '');
                        $('#buyModalDeliveryPriceRow').css('display', '');
                        $('#buyModalVideocallRow').css('display', 'none');
                        $('#buyModalInputQuantity').val(1);
                        $('#buyModalInputQuantity').prop("disabled", true);
                        $('#client-buy-modal-pay-button').html('<span class="glyphicon glyphicon-credit-card coven-glyphicon"></span>' + currentLanguageResources['client-services-rent']);
                        break;
                    case 'Meeting':
                        $('#client-buy-modal-title').text(currentLanguageResources['client-services-schedule-meeting']);
                        $('#client-buy-modal-price').text(currentLanguageResources['client-buy-modal-price-meeting']);
                        $('#buyModalInputPrice').val(response.price);
                        $('#buyModalDeliveryPriceContainer').css('display', '');
                        $('#buyModalDurationContainer').css('display', '');
                        $('#buyModalQuantityContainer').css('display', 'none');
                        $('#rentHoursContainer').css('display', 'none');
                        $('#buyModalDeliveryPriceRow').css('display', '');
                        $('#buyModalVideocallRow').css('display', 'none');
                        $('#buyModalInputQuantity').val(1);
                        $('#buyModalInputQuantity').prop("disabled", true);
                        $('#client-buy-modal-pay-button').html('<span class="glyphicon glyphicon-credit-card coven-glyphicon"></span>' + currentLanguageResources['client-services-meeting']);
                        break;
                    case 'Videocall':
                        $('#client-buy-modal-title').text(currentLanguageResources['client-services-schedule-videocall']);
                        $('#client-buy-modal-price').text(currentLanguageResources['client-buy-modal-price-videocall']);
                        $('#buyModalDeliveryPriceContainer').css('display', 'none');
                        $('#buyModalDurationContainer').css('display', '');
                        $('#buyModalQuantityContainer').css('display', 'none');
                        $('#rentHoursContainer').css('display', 'none');
                        $('#buyModalDeliveryPriceRow').css('display', 'none');
                        $('#buyModalVideocallRow').css('display', '');
                        $('#buyModalInputQuantity').val(1);
                        $('#buyModalInputQuantity').prop("disabled", true);
                        $('#client-buy-modal-pay-button').html('<span class="glyphicon glyphicon-credit-card coven-glyphicon"></span>' + currentLanguageResources['client-services-meeting']);
                        break;
                }

                if (response.deliveryPrice == 0) {
                    $('#buyModalDeliveryPriceContainer').css('display', 'none');
                    $('#buyModalDeliveryPriceRow').css('display', 'none');
                    if (response.serviceAction == 'Videocall') {
                        $('#buyModalCovenRow').removeClass('covenTableEvenRow').addClass('covenTableOddRow');
                    } else {
                        $('#buyModalCovenRow').removeClass('covenTableOddRow').addClass('covenTableEvenRow');
                    }
                } else {
                    $('#buyModalDeliveryPriceContainer').css('display', '');
                    $('#buyModalDeliveryPriceRow').css('display', '');
                    $('#buyModalCovenRow').removeClass('covenTableEvenRow').addClass('covenTableOddRow');
                }

                // Acquisition
                $('#client-buy-modal-acquisition').text(currentLanguageResources['client-buy-modal-acquisition-' + response.serviceAction]);
                $('#buyModalInputAcquisitionDate').val(formatDateForInput(new Date()));
                $('#buyModalInputAcquisitionTime').val('00:00:00');
                $('#buyModalInputAcquisitionDate').unbind("change");
                $('#buyModalInputAcquisitionTime').unbind("change");
                $('#buyModalInputAcquisitionDate').bind("change", onRentRangeChange);
                $('#buyModalInputAcquisitionTime').bind("change", onRentRangeChange);

                if (response.serviceAction == 'Videocall') {
                    $('#buyModalAcquisitionAddressContainer').css('display', 'none');
                    $('#buyModalSelectAcquisitionCountry').val('');
                    $('#buyModalInputAcquisitionState').val('');
                    $('#buyModalInputAcquisitionCity').val('');
                    $('#buyModalInputAcquisitionAddress').val('');
                } else {
                    $('#buyModalAcquisitionAddressContainer').css('display', '');

                    if (response.deliveryTypeAcquisition == constants.deliveryTypeBusiness) {

                        var acquisitionDeliveryTypeHtml = '<option>' + currentLanguageResources['delivery-type-business'] + '</option>';
                        $('#buyModalSelectAcquisitionDeliveryType').unbind("change");
                        $('#buyModalSelectAcquisitionDeliveryType').empty();
                        $('#buyModalSelectAcquisitionDeliveryType').append(acquisitionDeliveryTypeHtml);
                        $('#buyModalSelectAcquisitionDeliveryType').prop("disabled", true);

                        $('#buyModalSelectAcquisitionCountry').val(response.businessCountry);
                        $('#buyModalSelectAcquisitionCountry').prop("disabled", true);
                        $('#buyModalInputAcquisitionState').val(response.businessState);
                        $('#buyModalInputAcquisitionState').prop("disabled", true);
                        $('#buyModalInputAcquisitionCity').val(response.businessCity);
                        $('#buyModalInputAcquisitionCity').prop("disabled", true);
                        $('#buyModalInputAcquisitionAddress').val(response.businessAddressLine);
                        $('#buyModalInputAcquisitionAddress').prop("disabled", true);

                        $('#client-buy-modal-acquisition-msg').text(currentLanguageResources['client-buy-modal-delivery-business-msg-' + response.serviceAction]);
                    } else {

                        var acquisitionDeliveryTypeHtml = '';

                        if (response.deliveryTypeAcquisition == constants.deliveryTypeBoth) {
                            acquisitionDeliveryTypeHtml += '<option value="1">' + currentLanguageResources['delivery-type-business'] + '</option>';
                        }

                        acquisitionDeliveryTypeHtml += '<option value="2">' + currentLanguageResources['delivery-type-client'] + '</option>';
                        acquisitionDeliveryTypeHtml += '<option value="3">' + currentLanguageResources['delivery-type-other'] + '</option>';

                        if (response.deliveryTypeAcquisition == constants.deliveryTypeBoth) {
                            $('#buyModalSelectAcquisitionCountry').val(response.businessCountry);
                            $('#buyModalSelectAcquisitionCountry').prop("disabled", true);
                            $('#buyModalInputAcquisitionState').val(response.businessState);
                            $('#buyModalInputAcquisitionState').prop("disabled", true);
                            $('#buyModalInputAcquisitionCity').val(response.businessCity);
                            $('#buyModalInputAcquisitionCity').prop("disabled", true);
                            $('#buyModalInputAcquisitionAddress').val(response.businessAddressLine);
                            $('#buyModalInputAcquisitionAddress').prop("disabled", true);
                        } else {
                            $('#buyModalSelectAcquisitionCountry').val(response.clientCountry);
                            $('#buyModalSelectAcquisitionCountry').prop("disabled", true);
                            $('#buyModalInputAcquisitionState').val(response.clientCountry);
                            $('#buyModalInputAcquisitionState').prop("disabled", true);
                            $('#buyModalInputAcquisitionCity').val(response.clientCity);
                            $('#buyModalInputAcquisitionCity').prop("disabled", true);
                            $('#buyModalInputAcquisitionAddress').val(response.clientAddressLine);
                            $('#buyModalInputAcquisitionAddress').prop("disabled", true);
                        }


                        $('#buyModalSelectAcquisitionDeliveryType').empty();
                        $('#buyModalSelectAcquisitionDeliveryType').append(acquisitionDeliveryTypeHtml);
                        $('#buyModalSelectAcquisitionDeliveryType').prop("disabled", false);
                        $('#buyModalSelectAcquisitionDeliveryType').bind("change", function () {

                            switch ($('#buyModalSelectAcquisitionDeliveryType').val()) {
                                case '1':
                                    $('#buyModalSelectAcquisitionCountry').val(currentPreService.businessCountry);
                                    $('#buyModalSelectAcquisitionCountry').prop("disabled", true);
                                    $('#buyModalInputAcquisitionState').val(currentPreService.businessState);
                                    $('#buyModalInputAcquisitionState').prop("disabled", true);
                                    $('#buyModalInputAcquisitionCity').val(currentPreService.businessCity);
                                    $('#buyModalInputAcquisitionCity').prop("disabled", true);
                                    $('#buyModalInputAcquisitionAddress').val(currentPreService.businessAddressLine);
                                    $('#buyModalInputAcquisitionAddress').prop("disabled", true);
                                    break;
                                case '2':
                                    $('#buyModalSelectAcquisitionCountry').val(currentPreService.clientCountry);
                                    $('#buyModalSelectAcquisitionCountry').prop("disabled", true);
                                    $('#buyModalInputAcquisitionState').val(currentPreService.clientState);
                                    $('#buyModalInputAcquisitionState').prop("disabled", true);
                                    $('#buyModalInputAcquisitionCity').val(currentPreService.clientCity);
                                    $('#buyModalInputAcquisitionCity').prop("disabled", true);
                                    $('#buyModalInputAcquisitionAddress').val(currentPreService.clientAddressLine);
                                    $('#buyModalInputAcquisitionAddress').prop("disabled", true);
                                    break;
                                case '3':
                                    $('#buyModalSelectAcquisitionCountry').val('');
                                    $('#buyModalSelectAcquisitionCountry').prop("disabled", false);
                                    $('#buyModalInputAcquisitionState').val('');
                                    $('#buyModalInputAcquisitionState').prop("disabled", false);
                                    $('#buyModalInputAcquisitionCity').val('');
                                    $('#buyModalInputAcquisitionCity').prop("disabled", false);
                                    $('#buyModalInputAcquisitionAddress').val('');
                                    $('#buyModalInputAcquisitionAddress').prop("disabled", false);
                                    break;
                            }

                            calculateAndSetTotals();

                        });

                        if (response.deliveryTypeAcquisition == constants.deliveryTypeClient) {
                            $('#client-buy-modal-acquisition-msg').text(currentLanguageResources['client-buy-modal-delivery-client-msg-' + response.serviceAction]);
                        } else {
                            $('#client-buy-modal-acquisition-msg').text(currentLanguageResources['client-buy-modal-delivery-both-msg-' + response.serviceAction]);
                        }

                    }
                }

                // Return 
                $('#buyModalInputReturnDate').val(formatDateForInput(new Date()));
                $('#buyModalInputReturnTime').val('00:00:00');
                $('#buyModalInputReturnDate').unbind("change");
                $('#buyModalInputReturnTime').unbind("change");
                $('#buyModalInputReturnDate').bind("change", onRentRangeChange);
                $('#buyModalInputReturnTime').bind("change", onRentRangeChange);

                if (response.serviceAction != "Rent") {
                    $('#buyModalReturnContainer').css('display', 'none');
                    $('#buyModalInputReturnDate').unbind("change");
                    $('#buyModalInputReturnTime').unbind("change");
                    $('#buyModalInputReturnDate').val(new Date());
                    $('#buyModalInputReturnTime').val('00:00:00');
                    $('#buyModalSelectReturnCountry').val('');
                    $('#buyModalInputReturnState').val('');
                    $('#buyModalInputReturnCity').val('');
                    $('#buyModalInputReturnAddress').val('');
                } else {

                    $('#buyModalReturnContainer').css('display', '');

                    if (response.deliveryTypeReturn == constants.deliveryTypeBusiness) {

                        var returnDeliveryTypeHtml = '<option>' + currentLanguageResources['delivery-type-business'] + '</option>';
                        $('#buyModalSelectReturnDeliveryType').unbind("change");
                        $('#buyModalSelectReturnDeliveryType').empty();
                        $('#buyModalSelectReturnDeliveryType').append(returnDeliveryTypeHtml);
                        $('#buyModalSelectReturnDeliveryType').prop("disabled", true);

                        $('#buyModalSelectReturnCountry').val(response.businessCountry);
                        $('#buyModalSelectReturnCountry').prop("disabled", true);
                        $('#buyModalInputReturnState').val(response.businessState);
                        $('#buyModalInputReturnState').prop("disabled", true);
                        $('#buyModalInputReturnCity').val(response.businessCity);
                        $('#buyModalInputReturnCity').prop("disabled", true);
                        $('#buyModalInputReturnAddress').val(response.businessAddressLine);
                        $('#buyModalInputReturnAddress').prop("disabled", true);

                        $('#client-buy-modal-return-msg').text(currentLanguageResources['client-buy-modal-return-business-msg']);
                    } else {

                        var returnDeliveryTypeHtml = '';

                        if (response.deliveryTypeReturn == constants.deliveryTypeBoth) {
                            returnDeliveryTypeHtml += '<option value="1">' + currentLanguageResources['delivery-type-business'] + '</option>';
                        }

                        returnDeliveryTypeHtml += '<option value="2">' + currentLanguageResources['delivery-type-client'] + '</option>';
                        returnDeliveryTypeHtml += '<option value="3">' + currentLanguageResources['delivery-type-other'] + '</option>';

                        if (response.deliveryTypeReturn == constants.deliveryTypeBoth) {
                            $('#buyModalSelectReturnCountry').val(response.businessCountry);
                            $('#buyModalSelectReturnCountry').prop("disabled", true);
                            $('#buyModalInputReturnState').val(response.businessState);
                            $('#buyModalInputReturnState').prop("disabled", true);
                            $('#buyModalInputReturnCity').val(response.businessCity);
                            $('#buyModalInputReturnCity').prop("disabled", true);
                            $('#buyModalInputReturnAddress').val(response.businessAddressLine);
                            $('#buyModalInputReturnAddress').prop("disabled", true);
                        } else {
                            $('#buyModalSelectReturnCountry').val(response.clientCountry);
                            $('#buyModalSelectReturnCountry').prop("disabled", true);
                            $('#buyModalInputReturnState').val(response.clientCountry);
                            $('#buyModalInputReturnState').prop("disabled", true);
                            $('#buyModalInputReturnCity').val(response.clientCity);
                            $('#buyModalInputReturnCity').prop("disabled", true);
                            $('#buyModalInputReturnAddress').val(response.clientAddressLine);
                            $('#buyModalInputReturnAddress').prop("disabled", true);
                        }


                        $('#buyModalSelectReturnDeliveryType').empty();
                        $('#buyModalSelectReturnDeliveryType').append(returnDeliveryTypeHtml);
                        $('#buyModalSelectReturnDeliveryType').prop("disabled", false);
                        $('#buyModalSelectReturnDeliveryType').bind("change", function () {

                            switch ($('#buyModalSelectReturnDeliveryType').val()) {
                                case '1':
                                    $('#buyModalSelectReturnCountry').val(currentPreService.businessCountry);
                                    $('#buyModalSelectReturnCountry').prop("disabled", true);
                                    $('#buyModalInputReturnState').val(currentPreService.businessState);
                                    $('#buyModalInputReturnState').prop("disabled", true);
                                    $('#buyModalInputReturnCity').val(currentPreService.businessCity);
                                    $('#buyModalInputReturnCity').prop("disabled", true);
                                    $('#buyModalInputReturnAddress').val(currentPreService.businessAddressLine);
                                    $('#buyModalInputReturnAddress').prop("disabled", true);
                                    break;
                                case '2':
                                    $('#buyModalSelectReturnCountry').val(currentPreService.clientCountry);
                                    $('#buyModalSelectReturnCountry').prop("disabled", true);
                                    $('#buyModalInputReturnState').val(currentPreService.clientState);
                                    $('#buyModalInputReturnState').prop("disabled", true);
                                    $('#buyModalInputReturnCity').val(currentPreService.clientCity);
                                    $('#buyModalInputReturnCity').prop("disabled", true);
                                    $('#buyModalInputReturnAddress').val(currentPreService.clientAddressLine);
                                    $('#buyModalInputReturnAddress').prop("disabled", true);
                                    break;
                                case '3':
                                    $('#buyModalSelectReturnCountry').val('');
                                    $('#buyModalSelectReturnCountry').prop("disabled", false);
                                    $('#buyModalInputReturnState').val('');
                                    $('#buyModalInputReturnState').prop("disabled", false);
                                    $('#buyModalInputReturnCity').val('');
                                    $('#buyModalInputReturnCity').prop("disabled", false);
                                    $('#buyModalInputReturnAddress').val('');
                                    $('#buyModalInputReturnAddress').prop("disabled", false);
                                    break;
                            }

                            calculateAndSetTotals();

                        });

                        if (response.deliveryTypeReturn == constants.deliveryTypeClient) {
                            $('#client-buy-modal-return-msg').text(currentLanguageResources['client-buy-modal-return-client-msg']);
                        } else {
                            $('#client-buy-modal-return-msg').text(currentLanguageResources['client-buy-modal-return-both-msg']);
                        }

                    }
                }

                // Payment
                $('#buyModalInputQuantity').unbind("change");
                $('#buyModalInputQuantity').bind("change", function () {
                    calculateAndSetTotals();
                });

                calculateAndSetTotals();

                $('#buyModalDeliveryCovenValue').text(constants.covenFee);

                var currentYear = new Date().getFullYear();
                var yearsHtml;
                for (var i = 0; i < 10; i++) {
                    yearsHtml += '<option value="' + (currentYear + i) + '">' + (currentYear + i) + '</option>';
                }
                $('#buyModalSelectExpirationYear').empty();
                $('#buyModalSelectExpirationYear').append(yearsHtml);

                //Show modal and get image
                buyModal.style.display = "block";
                hideMask();
                downloadImage(response.servicePhotoUrl, 'buyModalImage');
            },
            error: function (response) {
                showMessageModal(currentLanguageResources['server-error'], currentLanguageResources['server-error-msg'] + response.responseText, 'error');
                hideMask();
            }
        });
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

function fillServiceActions() {
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
                serviceActionsHtml += '<div id="startServiceActionContainer_' + allServiceActions[serviceActionsPosition].dbValue + '" class="businessSectorContainer centered-text" onclick="clickServiceAction(\'' + allServiceActions[serviceActionsPosition].dbValue + '\')">';
                serviceActionsHtml += '<br/><br/><br/>';
                serviceActionsHtml += '<img src="' + allServiceActions[serviceActionsPosition].iconPath + '" class="serviceActionIcon" />';
                serviceActionsHtml += '<br/><br/><br/>';
                serviceActionsHtml += '<label class="coven-text white-color">' + serviceActionsDictionary[allServiceActions[serviceActionsPosition].dbValue] + '</label>';
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
                serviceActionsHtml += '<div id="startServiceActionContainer_' + allServiceActions[serviceActionsPosition].dbValue + '" class="businessSectorContainer centered-text" onclick="clickServiceAction(\'' + allServiceActions[serviceActionsPosition].dbValue + '\')">';
                serviceActionsHtml += '<br/><br/><br/>';
                serviceActionsHtml += '<img src="' + allServiceActions[serviceActionsPosition].iconPath + '" class="serviceActionIcon" />';
                serviceActionsHtml += '<br/><br/><br/>';
                serviceActionsHtml += '<label class="coven-text white-color">' + serviceActionsDictionary[allServiceActions[serviceActionsPosition].dbValue] + '</label>';
                serviceActionsHtml += '<br/><br/>';
                serviceActionsHtml += '</div>';
                serviceActionsHtml += '</div>';
                serviceActionsPosition++;

                serviceActionsHtml += '<div class="col-md-2"></div>';

                serviceActionsHtml += '<div class="col-md-4">';
                serviceActionsHtml += '<div id="startServiceActionContainer_' + allServiceActions[serviceActionsPosition].dbValue + '" class="businessSectorContainer centered-text" onclick="clickServiceAction(\'' + allServiceActions[serviceActionsPosition].dbValue + '\')">';
                serviceActionsHtml += '<br/><br/><br/>';
                serviceActionsHtml += '<img src="' + allServiceActions[serviceActionsPosition].iconPath + '" class="serviceActionIcon" />';
                serviceActionsHtml += '<br/><br/><br/>';
                serviceActionsHtml += '<label class="coven-text white-color">' + serviceActionsDictionary[allServiceActions[serviceActionsPosition].dbValue] + '</label>';
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
            serviceActionsHtml += '<div id="startServiceActionContainer_' + allServiceActions[serviceActionsPosition].dbValue + '" class="businessSectorContainer centered-text" onclick="clickServiceAction(\'' + allServiceActions[serviceActionsPosition].dbValue + '\')">';
            serviceActionsHtml += '<br/><br/><br/>';
            serviceActionsHtml += '<img src="' + allServiceActions[serviceActionsPosition].iconPath + '" class="serviceActionIcon" />';
            serviceActionsHtml += '<br/><br/><br/>';
            serviceActionsHtml += '<label class="coven-text white-color">' + serviceActionsDictionary[allServiceActions[serviceActionsPosition].dbValue] + '</label>';
            serviceActionsHtml += '<br/><br/>';
            serviceActionsHtml += '</div>';
            serviceActionsHtml += '</div>';
            serviceActionsPosition++;

            serviceActionsHtml += '<div class="col-md-4">';
            serviceActionsHtml += '<div id="startServiceActionContainer_' + allServiceActions[serviceActionsPosition].dbValue + '" class="businessSectorContainer centered-text" onclick="clickServiceAction(\'' + allServiceActions[serviceActionsPosition].dbValue + '\')">';
            serviceActionsHtml += '<br/><br/><br/>';
            serviceActionsHtml += '<img src="' + allServiceActions[serviceActionsPosition].iconPath + '" class="serviceActionIcon" />';
            serviceActionsHtml += '<br/><br/><br/>';
            serviceActionsHtml += '<label class="coven-text white-color">' + serviceActionsDictionary[allServiceActions[serviceActionsPosition].dbValue] + '</label>';
            serviceActionsHtml += '<br/><br/>';
            serviceActionsHtml += '</div>';
            serviceActionsHtml += '</div>';
            serviceActionsPosition++;

            serviceActionsHtml += '<div class="col-md-4">';
            serviceActionsHtml += '<div id="startServiceActionContainer_' + allServiceActions[serviceActionsPosition].dbValue + '" class="businessSectorContainer centered-text" onclick="clickServiceAction(\'' + allServiceActions[serviceActionsPosition].dbValue + '\')">';
            serviceActionsHtml += '<br/><br/><br/>';
            serviceActionsHtml += '<img src="' + allServiceActions[serviceActionsPosition].iconPath + '" class="serviceActionIcon" />';
            serviceActionsHtml += '<br/><br/><br/>';
            serviceActionsHtml += '<label class="coven-text white-color">' + serviceActionsDictionary[allServiceActions[serviceActionsPosition].dbValue] + '</label>';
            serviceActionsHtml += '<br/><br/>';
            serviceActionsHtml += '</div>';
            serviceActionsHtml += '</div>';
            serviceActionsPosition++;

            serviceActionsHtml += '</div>';
        }
    }

    $('#serviceActionsContainer').empty();
    $('#serviceActionsContainer').append(serviceActionsHtml);

    $('#startServiceActionContainer_' + selectedServiceActionFilter).removeClass();
    $('#startServiceActionContainer_' + selectedServiceActionFilter).attr('class', 'selectedBusinessSectorContainer centered-text');
}

function clickServiceAction(serviceActionValue) {

    $('#startServiceActionContainer_' + selectedServiceActionFilter).removeClass();
    $('#startServiceActionContainer_' + selectedServiceActionFilter).attr('class', 'businessSectorContainer centered-text');

    selectedServiceActionFilter = serviceActionValue;

    $('#startServiceActionContainer_' + selectedServiceActionFilter).removeClass();
    $('#startServiceActionContainer_' + selectedServiceActionFilter).attr('class', 'selectedBusinessSectorContainer centered-text');
}

function searchAndGoToTab3() {

    $('#businessSectorContainer_' + selectedBusinessSectorFilter).removeClass();
    $('#businessSectorContainer_' + selectedBusinessSectorFilter).attr('class', 'selectedBusinessSectorContainer');
    $('#serviceActionContainer_' + selectedServiceActionFilter).removeClass();
    $('#serviceActionContainer_' + selectedServiceActionFilter).attr('class', 'selectedBusinessSectorContainer');

    $('#tab1').css('display', 'none');
    $('#tab3_1').css('display', '');
    $('#tab3_2').css('display', '');
    $('#tab3_3').css('display', '');

    $('#searchName').val($('#startSearchName').val());

    getAllServiceDefinitions(paginationCurrentPage);
}

function getAllServiceDefinitions(pageNumber) {
    showMask();
    paginationCurrentPage = pageNumber;
    $.ajax({
        type: 'POST',
        url: apiUrls.c_servicedefs,
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({
            itemsPerPage: $('#itemsPerPageSelect').val(),
            pageNumber: pageNumber,
            businessSectorFilter: selectedBusinessSectorFilter,
            serviceActionFilter: selectedServiceActionFilter,
            nameFilter: $('#searchName').val()
        }),
        success: function (response) {

            allServiceDefinitions = response.serviceDefinitions;

            renderServiceDefinitions();

            $('#totalServicesLabel').text(currentLanguageResources['total'] + ': ' + response.totalRecords);
            renderPagination(response.currentPage, response.totalPages);

            hideMask();
        },
        error: function (response) {
            showMessageModal(currentLanguageResources['server-error'], currentLanguageResources['server-error-msg'] + response.responseText, 'error');
            hideMask();
        }
    });
}

function paginationClickFirstArrow(totalPages) {
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
            pagesHtml += '<button type="button" class="covenButton coven-text coven-pagination-item" onclick="paginationClickFirstArrow(' + totalPages + ');">';
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
        resultHtml += '<label class="coven-text white-color centered-text">' + roundToTwoDecimalPlaces(serviceDefinition.ratingSum / serviceDefinition.ratingCount)+'</label>'
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
                if (serviceDefinition.sell_Stock == 1) {
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
            resultHtml += '<button type="button" class="covenButton coven-text" onclick="showUserModal(\'' + serviceDefinition.userId + '\');">';
            resultHtml += '<span class="glyphicon glyphicon-user coven-glyphicon"></span> ' + currentLanguageResources['client-services-view-seller'];
            resultHtml += '</button>';
            resultHtml += '</div>';
            resultHtml += '<div class="col-md-1"></div>';
            resultHtml += '<div class="col-md-4">';
            resultHtml += '<button type="button" class="covenButton coven-text" onclick="showBuyModal(\'' + serviceDefinition.id + '\',\'' + serviceDefinition.userId + '\');">';
            resultHtml += '<span class="glyphicon glyphicon-shopping-cart coven-glyphicon"></span> ' + currentLanguageResources['client-services-buy'];
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
            resultHtml += '<button type="button" class="covenButton coven-text" onclick="showUserModal(\'' + serviceDefinition.userId + '\');">';
            resultHtml += '<span class="glyphicon glyphicon-user coven-glyphicon"></span> ' + currentLanguageResources['client-services-view-seller'];
            resultHtml += '</button>';
            resultHtml += '</div>';
            resultHtml += '<div class="col-md-1"></div>';
            resultHtml += '<div class="col-md-4">';
            resultHtml += '<button type="button" class="covenButton coven-text" onclick="showBuyModal(\'' + serviceDefinition.id + '\',\'' + serviceDefinition.userId + '\');">';
            resultHtml += '<span class="glyphicon glyphicon-shopping-cart coven-glyphicon"></span> ' + currentLanguageResources['client-services-rent'];
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
            resultHtml += '<button type="button" class="covenButton coven-text" onclick="showUserModal(\'' + serviceDefinition.userId + '\');">';
            resultHtml += '<span class="glyphicon glyphicon-user coven-glyphicon"></span> ' + currentLanguageResources['client-services-view-seller'];
            resultHtml += '</button>';
            resultHtml += '</div>';
            resultHtml += '<div class="col-md-1"></div>';
            resultHtml += '<div class="col-md-4">';
            resultHtml += '<button type="button" class="covenButton coven-text" onclick="showBuyModal(\'' + serviceDefinition.id + '\',\'' + serviceDefinition.userId + '\');">';
            resultHtml += '<span class="glyphicon glyphicon-shopping-cart coven-glyphicon"></span> ' + currentLanguageResources['client-services-meeting'];
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
            resultHtml += '<button type="button" class="covenButton coven-text" onclick="showUserModal(\'' + serviceDefinition.userId + '\');">';
            resultHtml += '<span class="glyphicon glyphicon-user coven-glyphicon"></span> ' + currentLanguageResources['client-services-view-seller'];
            resultHtml += '</button>';
            resultHtml += '</div>';
            resultHtml += '<div class="col-md-1"></div>';
            resultHtml += '<div class="col-md-4">';
            resultHtml += '<button type="button" class="covenButton coven-text" onclick="showBuyModal(\'' + serviceDefinition.id + '\',\'' + serviceDefinition.userId + '\');">';
            resultHtml += '<span class="glyphicon glyphicon-shopping-cart coven-glyphicon"></span> ' + currentLanguageResources['client-services-meeting'];
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
        serviceDefinitionsHtml += '<label class="coven-text">' + currentLanguageResources['client-no-services-msg'] + '</label>';
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
            downloadImage(imagesUrls['service' + i + '_image'], 'service' + i + '_image')
        }
    }, timeoutShortSpan);

}

function downloadImage(pictureUrl, pictureObjectIdentifier) {

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

function clickPayButton() {
    if (currentPreService.serviceAction == "Sell") {
        showConfirmModal(currentLanguageResources['confirm-title-007'], currentLanguageResources['confirm-msg-007'], "warning", function () { submitBuyModal(); });
    } else if (currentPreService.serviceAction == "Rent") {
        showConfirmModal(currentLanguageResources['confirm-title-008'], currentLanguageResources['confirm-msg-008'], "warning", function () { submitBuyModal(); });
    } else {
        showConfirmModal(currentLanguageResources['confirm-title-009'], currentLanguageResources['confirm-msg-009'], "warning", function () { submitBuyModal(); });
    }
}

function submitBuyModal() {
    showMask();

    var acquisitionDate = new Date($('#buyModalInputAcquisitionDate').val() + 'T' + $('#buyModalInputAcquisitionTime').val())
    var returnDate = new Date($('#buyModalInputReturnDate').val() + 'T' + $('#buyModalInputReturnTime').val())

    var subtotal = $('#buyModalInputQuantity').val() * currentPreService.price;
    if (currentPreService.serviceAction == "Rent") {
        var rentHours = roundToTwoDecimalPlaces(Math.abs(acquisitionDate.getTime() - returnDate.getTime()) / 3600000);
        subtotal = roundToTwoDecimalPlaces(rentHours * currentPreService.price);
    }
    
    var deliveryFee = (($('#buyModalSelectAcquisitionDeliveryType').val() == '2' ||
        $('#buyModalSelectAcquisitionDeliveryType').val() == '3' ||
        $('#buyModalSelectReturnDeliveryType').val() == '2' ||
        $('#buyModalSelectReturnDeliveryType').val() == '3') ? currentPreService.deliveryPrice : 0);

    var videocallPrice = (currentPreService.serviceAction == 'Videocall') ? constants.videocallCostPerMinute * currentPreService.duration : 0;

    var total = roundToTwoDecimalPlaces(subtotal + deliveryFee + videocallPrice + constants.covenFee);

    $.ajax({
        type: 'POST',
        url: apiUrls.buyservice,
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({
            serviceDefinitionId: currentPreService.serviceDefinitionId,
            businessId: currentPreService.businessId,
            clientId: currentPreService.clientId,
            businessSector: currentPreService.businessSector,
            serviceAction: currentPreService.serviceAction,
            serviceName: currentPreService.serviceName,
            servicePhotoUrl: currentPreService.servicePhotoUrl,
            price: currentPreService.price,
            deliveryPrice: currentPreService.deliveryPrice,
            deposit: currentPreService.deposit,
            quantity: $('#buyModalInputQuantity').val(),
            duration: currentPreService.duration,
            acquisitionDateTime: $('#buyModalInputAcquisitionDate').val() + 'T' + $('#buyModalInputAcquisitionTime').val(),
            acquisitionCountry: $('#buyModalSelectAcquisitionCountry').val(),
            acquisitionState: $('#buyModalInputAcquisitionState').val(),
            acquisitionCity: $('#buyModalInputAcquisitionCity').val(),
            acquisitionAddressLine: $('#buyModalInputAcquisitionAddress').val(),
            returnDateTime: $('#buyModalInputReturnDate').val() + 'T' + $('#buyModalInputReturnTime').val(),
            returnCountry: $('#buyModalSelectReturnCountry').val(),
            returnState: $('#buyModalInputReturnState').val(),
            returnCity: $('#buyModalInputReturnCity').val(),
            returnAddressLine: $('#buyModalInputReturnAddress').val(),
            subtotal: subtotal,
            deliveryFee: deliveryFee,
            videocallFee: videocallPrice,
            total: total,
            cardNumber: $('#buyModalInputCard').val(),
            expirancyMonth: $('#buyModalSelectExpirationMonth').val(),
            expirancyYear: $('#buyModalSelectExpirationYear').val(),
            cVV: $('#buyModalInputCvv').val()
        }),
        success: function (response) {
            if (response.message != constants.apiSuccess) {
                showMessageModal(currentLanguageResources['server-error'], currentLanguageResources['server-error-msg'] + currentLanguageResources[response.message], 'error');
            }
            else {

                closeBuyModal();

                if (currentPreService.serviceAction == "Sell") {
                    showMessageModal(currentLanguageResources['success-title'], currentLanguageResources['success-010'], 'success');
                } else if (currentPreService.serviceAction == "Rent") {
                    showMessageModal(currentLanguageResources['success-title'], currentLanguageResources['success-011'], 'success');
                } else {
                    showMessageModal(currentLanguageResources['success-title'], currentLanguageResources['success-012'], 'success');
                }

                setTimeout(function () {
                    getAllServiceDefinitions(paginationCurrentPage);
                }, timeoutLongSpan);
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

        initializeNavbarPage(3, 1);
        initializeLanguageSettings('ClientServices');

        initializeBusinessSectorsDictionary();
        initializeServiceActionsDictionary();

        fillBusinessSectorsModal();
        fillServiceActionsModal();

        fillServiceActions();
    }
});