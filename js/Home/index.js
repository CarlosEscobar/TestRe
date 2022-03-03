var currentLanguageResources = getCurrentResources();

var loginModal = document.getElementById('loginModal');
var loginSpan = document.getElementById('loginModalClose');

var registerModal = document.getElementById('registerModal');
var registerSpan = document.getElementById('registerModalClose');

loginSpan.onclick = function () {
    loginModal.style.display = "none";
}

registerSpan.onclick = function () {
    registerModal.style.display = "none";
}

function showLoginModal() {
    loginModal.style.display = "block";
}

function showRegisterModal() {
    showMask();
    $.ajax({
        type: 'GET',
        url: apiUrls.roles,
        dataType: 'json',
        data: {},
        success: function (response) {
            var rolesHtml = '';
            for (var i = 0; i < response.roles.length; i++) {
                rolesHtml += '<option value="' + response.roles[i].id + '">' + currentLanguageResources['role-name-'+response.roles[i].name] + '</option>';
            }

            $('#registerRoles').empty();
            $('#registerRoles').append(rolesHtml);

            registerModal.style.display = "block";

            hideMask();
        },
        error: function (response) {
            showMessageModal(currentLanguageResources['server-error'], currentLanguageResources['server-error-msg'] + response.responseText, 'error');
            hideMask();
        }
    });
}

function callLogin() {
    showMask();
    $.ajax({
        type: 'POST',
        url: apiUrls.login,
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({
            username: $('#loginUsername').val(),
            password: generateHash($('#loginPassword').val())
        }),
        success: function (response) {
            if (response.message != constants.apiSuccess) {
                showMessageModal(currentLanguageResources['server-error'], currentLanguageResources['server-error-msg'] + currentLanguageResources[response.message], 'error');
            }
            else {
                sessionStorage.setItem('token', response.token);
                sessionStorage.setItem('tokenBool', response.tokenBool);
                window.location.assign(serverHome + response.redirectUrl);
            }
            hideMask();
        },
        error: function (response) {
            showMessageModal(currentLanguageResources['server-error'], currentLanguageResources['server-error-msg'] + response.responseText, 'error');
            hideMask();
        }
    });
}

function callRegister() {
    var validatePass = validatePassword($('#registerPassword').val());
    if (validatePass != constants.passwordSuccess) {
        showMessageModal(currentLanguageResources['error'], currentLanguageResources[validatePass], 'error');
    } else if ($('#registerPassword').val() != $('#registerConfirmPassword').val()) {
        showMessageModal(currentLanguageResources['error'], currentLanguageResources['password-error-003'], 'error');
    } else {
        showMask();
        $.ajax({
            type: 'POST',
            url: apiUrls.register,
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({
                name: $('#registerName').val(),
                lastname: $('#registerLastname').val(),
                dateofbirthdatetime: $('#registerDateOfBirth').val() + "T0",
                roleid: $('#registerRoles').val(),
                username: $('#registerUsername').val(),
                password: generateHash($('#registerPassword').val())
            }),
            success: function (response) {
                if (response.message != constants.apiSuccess) {
                    showMessageModal(currentLanguageResources['server-error'], currentLanguageResources['server-error-msg'] + currentLanguageResources[response.message], 'error');
                }else {
                    registerModal.style.display = "none";
                    showMessageModal(currentLanguageResources['success-title'], currentLanguageResources['success-001'], 'success');

                    $('#registerName').val("");
                    $('#registerLastname').val("");
                    $('#registerDateOfBirth').val(null);
                    $('#registerUsername').val("");
                    $('#registerPassword').val("");
                    $('#registerConfirmPassword').val("");
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

$(document).ready(function () {
    initializeLanguageSettings('Home');
});