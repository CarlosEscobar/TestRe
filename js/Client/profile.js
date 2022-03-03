var currentLanguageResources = getCurrentResources();
var theUser = null;

function doSaveData() {
    if ($('#inputPassword').val() != generateHash($('#inputConfirmPassword').val())) {
        showMessageModal(currentLanguageResources['error'], currentLanguageResources['password-error-003'], 'error');
    } else {
        showMask();
        $.ajax({
            type: 'PUT',
            url: apiUrls.c_user,
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({
                token: sessionStorage.getItem('token'),
                name: $('#inputName').val(),
                lastName: $('#inputLastName').val(),
                dateOfBirthDateTime: $('#inputDateOfBirth').val() + "T0",
                email: $('#inputEmail').val(),
                telephone: $('#inputTelephone').val(),
                country: $('#inputCountry').val(),
                state: $('#inputState').val(),
                city: $('#inputCity').val(),
                addressLine: $('#inputAddressLine').val()
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
            $('#inputEmail').val(theUser.email);
            $('#inputTelephone').val(theUser.telephone);
            $('#inputCountry').val(theUser.country);
            $('#inputState').val(theUser.state);
            $('#inputCity').val(theUser.city);
            $('#inputAddressLine').val(theUser.addressLine);

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
    showConfirmModal(currentLanguageResources['confirm-title-006'], currentLanguageResources['confirm-msg-006'], "warning", function () { doDeleteProfile(); });
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

$(document).ready(function () {
    initializeNavbarPage(3, 3);
    initializeLanguageSettings('ClientProfile');

    getData();

    if (sessionStorage.getItem('tokenBool') == 'true') {
        showMessageModal(currentLanguageResources['information'], currentLanguageResources['client-profile-info-msg'], 'info');
    }
});