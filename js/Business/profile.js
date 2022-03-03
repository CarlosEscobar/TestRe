var timesModal = document.getElementById('timesModal');
var timesSpan = document.getElementById("timesModalClose");

timesSpan.onclick = function () {
    timesModal.style.display = "none";
}

function showTimesModal() {
    timesModal.style.display = "block";
}

function submitTimesModal() {

    var divId = "container" + $('#timesModalDaySelect').val();
    var nextButtonCount = document.getElementById(divId).childNodes.length;

    var timeSpan = $('#timesModalDate1Hour').val() + ":" + $('#timesModalDate1Minute').val() + ":" + $('#timesModalDate1Type').val()
        + "-"
        + $('#timesModalDate2Hour').val() + ":" + $('#timesModalDate2Minute').val() + ":" + $('#timesModalDate2Type').val();

    var timesHtml = '';
    timesHtml += '<button id="' + divId + 'Button' + nextButtonCount + '" class="covenButton whiteColor timeMargin" onclick="clickDeleteTimeButton(\'' + divId + 'Button' + nextButtonCount + '\');">';
    timesHtml += timeSpan + '<span class="glyphicon glyphicon-remove"></span>';
    timesHtml += '</button>';

    $('#' + divId).append(timesHtml);

    $('#timesModalDaySelect').val("Sunday");

    $('#timesModalDate1Hour').val("1");
    $('#timesModalDate1Minute').val("00");
    $('#timesModalDate1Type').val("AM");

    $('#timesModalDate2Hour').val("1");
    $('#timesModalDate2Minute').val("00");
    $('#timesModalDate2Type').val("AM");

    timesModal.style.display = "none";
}

function clickDeleteTimeButton(buttonId) {
    var elem = document.getElementById(buttonId);
    elem.parentNode.removeChild(elem);
}

///

var currentLanguageResources = getCurrentResources();
var theUser = null;

var timeoutShortSpan = 600;

function doSaveData() {
    if ($('#inputPassword').val() != generateHash($('#inputConfirmPassword').val())) {
        showMessageModal(currentLanguageResources['error'], currentLanguageResources['password-error-003'], 'error');
    } else {
        showMask();
        $.ajax({
            type: 'PUT',
            url: apiUrls.b_user,
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({
                token: sessionStorage.getItem('token'),
                name: $('#inputName').val(),
                lastName: $('#inputLastName').val(),
                dateOfBirthDateTime: $('#inputDateOfBirth').val() + "T0",
                introduction: $('#inputIntroduction').val(),
                bankAccount: $('#inputBankAccount').val(),
                email: $('#inputEmail').val(),
                telephone: $('#inputTelephone').val(),
                isBusiness: $('#inputIsBusiness').val(),
                country: $('#inputCountry').val(),
                state: $('#inputState').val(),
                city: $('#inputCity').val(),
                addressLine: $('#inputAddressLine').val(),
                schedules: getScheduleData()
            }),
            success: function (response) {
                if (response.message != constants.apiSuccess) {
                    showMessageModal(currentLanguageResources['server-error'], currentLanguageResources['server-error-msg'] + currentLanguageResources[response.message], 'error');
                }
                else {
                    sessionStorage.setItem('tokenBool', 'false');
                    showMessageModal(currentLanguageResources['success-title'], currentLanguageResources['success-002'], 'success');
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

function clickSaveChanges() {
    showConfirmModal(currentLanguageResources['confirm-title-001'], currentLanguageResources['confirm-msg-001'], "warning", function () { doSaveData(); });
}

function getProfilePicture(pictureUrl) {

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
            document.getElementById('profilePicture').src = URL.createObjectURL(blob);
        })
        .catch(error => {
            hideMask();
            console.error(error);
        });
}

function getData() {
    showMask();
    $.ajax({
        type: 'GET',
        url: apiUrls.b_user,
        dataType: 'json',
        data: {
            token: sessionStorage.getItem('token')
        },
        success: function (response) {
            theUser = response;

            $('#inputName').val(theUser.name);
            $('#inputLastName').val(theUser.lastName);
            $('#inputDateOfBirth').val(theUser.dateOfBirth.split('T')[0]);
            $('#inputUsername').val(theUser.username);
            $('#inputPassword').val(theUser.password);
            $('#inputIntroduction').val(theUser.introduction);
            $('#inputBankAccount').val(theUser.bankAccount);
            $('#inputEmail').val(theUser.email);
            $('#inputTelephone').val(theUser.telephone);
            $('#inputIsBusiness').val(theUser.isBusiness)
            $('#inputCountry').val(theUser.country);
            $('#inputState').val(theUser.state);
            $('#inputCity').val(theUser.city);
            $('#inputAddressLine').val(theUser.addressLine);

            setScheduleData(theUser.schedules);

            getProfilePicture(theUser.profilePictureUrl);

            hideMask();
        },
        error: function (response) {
            showMessageModal(currentLanguageResources['server-error'], currentLanguageResources['server-error-msg'] + response.responseText, 'error');
            hideMask();
        }
    });
}

function clickDeleteProfile() {
    showConfirmModal(currentLanguageResources['confirm-title-002'], currentLanguageResources['confirm-msg-002'], "warning", function () { doDeleteProfile(); });
}

function doDeleteProfile() {
    showMask();
    $.ajax({
        type: 'DELETE',
        url: apiUrls.user,
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({
            token: sessionStorage.getItem('token')
        }),
        success: function (response) {
            if (response.message != constants.apiSuccess) {
                showMessageModal(currentLanguageResources['server-error'], currentLanguageResources['server-error-msg'] + currentLanguageResources[response.message], 'error');
                hideMask();
            }
            else {
                callLogout()
            }
        },
        error: function (response) {
            showMessageModal(currentLanguageResources['server-error'], currentLanguageResources['server-error-msg'] + response.responseText, 'error');
            hideMask();
        }
    });
}

function clickDeleteProfilePicture() {
    showConfirmModal(currentLanguageResources['confirm-title-003'], currentLanguageResources['confirm-msg-003'], "warning", function () { doDeleteProfilePicture(); });
}

function doDeleteProfilePicture() {
    if (theUser.profilePictureUrl == constants.noProfilePictureUrl) {
        showMessageModal(currentLanguageResources['error'], currentLanguageResources['local-error-001'], "error");
    } else {
        showMask();
        $.ajax({
            type: 'DELETE',
            url: apiUrls.ufile,
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({
                token: sessionStorage.getItem('token'),
                bucketKey: theUser.profilePictureUrl
            }),
            success: function (response) {
                if (response.message != constants.apiSuccess) {
                    showMessageModal(currentLanguageResources['server-error'], currentLanguageResources['server-error-msg'] + currentLanguageResources[response.message], 'error');
                }
                else {
                    showMessageModal(currentLanguageResources['success-title'], currentLanguageResources['success-003'], 'success');
                    theUser.profilePictureUrl = constants.noProfilePictureUrl;
                    getProfilePicture(constants.noProfilePictureUrl);
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

function clickFileInput() {
    $('#fileInput').click();
}

function changeFileInput() {
    var fileName = $('#fileInput')[0].files[0].name;
    $('#fileNameButton').text(fileName);
}

const toBinString = (bytes) => bytes.reduce((str, byte) => str + byte.toString(2).padStart(8, '0'), '');

function clickUpdateProfilePicture() {

    showMask();

    if (window.FormData == undefined) {
        hideMask();
        showMessageModal(currentLanguageResources['error'], currentLanguageResources['local-error-002'], 'error');
        return;
    }

    var input = $('#fileInput')[0];

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
                    url: apiUrls.ufile,
                    dataType: 'json',
                    contentType: 'application/json',
                    data: JSON.stringify({
                        token: sessionStorage.getItem('token'),
                        filename: file.name,
                        contentType: file.type,
                        data: toBinString(new Uint8Array(fileReader.result))
                    }),
                    success: function (response) {
                        if (response.message != constants.apiSuccess) {
                            showMessageModal(currentLanguageResources['server-error'], currentLanguageResources['server-error-msg'] + currentLanguageResources[response.message], 'error');
                        }
                        else {
                            showMessageModal(currentLanguageResources['success-title'], currentLanguageResources['success-004'], 'success');

                            var newPicUrl = theUser.id + "/" + file.name;
                            theUser.profilePictureUrl = newPicUrl;
                            getProfilePicture(newPicUrl);
                            $('#fileInput').val(null);
                            $('#fileNameButton').text(currentLanguageResources['file-no-file-chosen']);
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

function getScheduleData() {

    var result = "";

    result += getDayEnabled('#checkboxSunday');
    result += getDayEnabled('#checkboxMonday');
    result += getDayEnabled('#checkboxTuesday');
    result += getDayEnabled('#checkboxWednesday');
    result += getDayEnabled('#checkboxThursday');
    result += getDayEnabled('#checkboxFriday');
    result += getDayEnabled('#checkboxSaturday');

    result += ";" + getTimeSpansForDay('containerSunday');
    result += ";" + getTimeSpansForDay('containerMonday');
    result += ";" + getTimeSpansForDay('containerTuesday');
    result += ";" + getTimeSpansForDay('containerWednesday');
    result += ";" + getTimeSpansForDay('containerThursday');
    result += ";" + getTimeSpansForDay('containerFriday');
    result += ";" + getTimeSpansForDay('containerSaturday');

    return result;
}

function getDayEnabled(checkboxId) {
    if ($(checkboxId).is(":checked")) {
        return '1';
    } else {
        return '0';
    }
}

function getTimeSpansForDay(divId) {
    var result = "";
    for (var i = 0; i < document.getElementById(divId).childNodes.length; i++) {
        if (i == 0) {
            result += $('#' + divId + 'Button' + i).text()
        } else {
            result += "," + $('#' + divId + 'Button' + i).text()
        }
    }
    return result;
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
            timesHtml += '<button id="' + divId + 'Button' + i + '" class="covenButton whiteColor timeMargin" onclick="clickDeleteTimeButton(\'' + divId + 'Button' + i + '\');">';
            timesHtml += times[i] + '<span class="glyphicon glyphicon-remove"></span>';
            timesHtml += '</button>';
        }

        $('#' + divId).empty();
        $('#' + divId).append(timesHtml);
    }
}

function initializeDaysSelect() {
    var selectHtml = '';

    selectHtml += '<option value="Sunday">' + currentLanguageResources['sunday'] + '</option>';
    selectHtml += '<option value="Monday">' + currentLanguageResources['monday'] + '</option>';
    selectHtml += '<option value="Tuesday">' + currentLanguageResources['tuesday'] + '</option>';
    selectHtml += '<option value="Wednesday">' + currentLanguageResources['wednesday'] + '</option>';
    selectHtml += '<option value="Thursday">' + currentLanguageResources['thursday'] + '</option>';
    selectHtml += '<option value="Friday">' + currentLanguageResources['friday'] + '</option>';
    selectHtml += '<option value="Saturday">' + currentLanguageResources['saturday'] + '</option>';

    $('#timesModalDaySelect').empty();
    $('#timesModalDaySelect').append(selectHtml);
}

function initializeBusinessTypeSelect() {
    var selectHtml = '';

    selectHtml += '<option value="0">' + currentLanguageResources['business-type-person'] + '</option>';
    selectHtml += '<option value="1">' + currentLanguageResources['business-type-business'] + '</option>';

    $('#inputIsBusiness').empty();
    $('#inputIsBusiness').append(selectHtml);
}

$(document).ready(function () {
    initializeNavbarPage(3, 3);
    initializeLanguageSettings('BusinessProfile');

    initializeDaysSelect();
    initializeBusinessTypeSelect();

    setTimeout(function () {
        getData();
    }, timeoutShortSpan);

    if (sessionStorage.getItem('tokenBool') == 'true') {
        showMessageModal(currentLanguageResources['information'], currentLanguageResources['business-profile-info-msg'], 'info');
    }
});