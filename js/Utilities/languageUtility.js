var languages = [
    {
        value: 'es-hn',
        label: 'Español'
    },
    {
        value: 'en-us',
        label: 'English'
    },
    {
        value: 'fr-fr',
        label: 'Français'
    },
    {
        value: 'pt-pt',
        label: 'Português'
    },
    {
        value: 'ge-ge',
        label: 'Deutsch'
    },
    {
        value: 'it-it',
        label: 'Italiano'
    }
]

function getCurrentResources() {
    switch (sessionStorage.getItem('lang')) {
        case "es-hn":
            return spanishResources;
        case "en-us":
            return englishResources;
        case "fr-fr":
            return frenchResources;
        case "pt-pt":
            return portugueseResources;
        case "ge-ge":
            return germanResources;
        case "it-it":
            return italianResources;
        default:
            return spanishResources;
    }
}

var currentResources = [];

function initializeLanguageSettings(currentPage) {
    if (sessionStorage.getItem('lang') == null) {
        sessionStorage.setItem('lang', 'es-hn');
    }
    
    var currentLanguage = sessionStorage.getItem('lang');

    switch (currentLanguage) {
        case "es-hn":
            currentResources = spanishResources;
            break;
        case "en-us":
            currentResources = englishResources;
            break;
        case "fr-fr":
            currentResources = frenchResources;
            break;
        case "pt-pt":
            currentResources = portugueseResources;
            break;
        case "ge-ge":
            currentResources = germanResources;
            break;
        case "it-it":
            currentResources = italianResources;
            break;
        default:
            currentResources = spanishResources;
            break;
    }

    var otherLanguages = languages.filter(lang => lang.value != currentLanguage);

    var languagesHtml = '';
    
    languagesHtml += '<span class="flag-size flag-icon flag-icon-' + currentLanguage + '"></span>';

    languagesHtml += '<div class="div-tooltip">';
    for (var i = 0; i < otherLanguages.length; i++) {
        if (i == 0) {
            languagesHtml += '<div class="flagContainer display-flex" onclick="onclickLanguageSelect(\'' + otherLanguages[i].value + '\');">';
            languagesHtml += '<span class="flag-size flag-margin flag-icon flag-icon-' + otherLanguages[i].value + '"></span>';
            languagesHtml += '<label class="coven-text">' + otherLanguages[i].label + '</label>';
            languagesHtml += '</div>';
        } else {
            languagesHtml += '<div class="flagContainer display-flex flagContianerBorder" onclick="onclickLanguageSelect(\'' + otherLanguages[i].value + '\');">';
            languagesHtml += '<span class="flag-size flag-margin flag-icon flag-icon-' + otherLanguages[i].value + '"></span>';
            languagesHtml += '<label class="coven-text">' + otherLanguages[i].label + '</label>';
            languagesHtml += '</div>';
        }
    }
    languagesHtml += '</div>';

    $('#navbar-lang-item').empty();
    $('#navbar-lang-item').append(languagesHtml)

    switch (currentPage) {
        case 'Home':
            initializeHomePage();
            break;
        case 'BusinessServices':
            initializeBusinessServicesPage();
            break;
        case 'BusinessSales':
            initializeBusinessSalesPage();
            break;
        case 'BusinessProfile':
            initializeBusinessProfilePage();
            break;
        case 'ClientServices':
            initializeClientServicesPage();
            break;
        case 'ClientPurchases':
            initializeClientPurchasesPage();
            break;
        case 'ClientProfile':
            initializeClientProfilePage();
            break;
    }
}

function onclickLanguageSelect(newLanguage) {
    showMask();
    sessionStorage.setItem('lang', newLanguage);
    window.location.reload();
    hideMask();
}

/*********************
 *  Initializations  *
 *********************/

function initializeHomePage() {
    // Page
    $('#home-navbar-register').text(currentResources['home-navbar-register']);
    $('#home-navbar-login').text(currentResources['home-navbar-login']);
    $('#home-rights-reserved-label').text(currentResources['home-rights-reserved-label']);
    $('#home-subtitle').text(currentResources['home-subtitle']);
    $('#home-info-business').text(currentResources['home-info-business']);
    $('#home-info-client').text(currentResources['home-info-client']);
    $('#home-services-title').text(currentResources['home-services-title']);
    $('#home-services-info').text(currentResources['home-services-info']);
    $('#home-services-list-rent-sell').text(currentResources['home-services-list-rent-sell']);
    $('#home-services-list-videocall').text(currentResources['home-services-list-videocall']);
    $('#home-services-list-meeting').text(currentResources['home-services-list-meeting']);
    $('#home-business-sectors-title').text(currentResources['home-business-sectors-title']);
    $('#home-business-sectors-info').text(currentResources['home-business-sectors-info']);
    $('#home-business-sectors-list-real-estate').text(currentResources['home-business-sectors-list-real-estate']);
    $('#home-business-sectors-list-hardware').text(currentResources['home-business-sectors-list-hardware']);
    $('#home-business-sectors-list-finance').text(currentResources['home-business-sectors-list-finance']);
    $('#home-business-sectors-list-medicine').text(currentResources['home-business-sectors-list-medicine']);
    $('#home-business-sectors-list-psychology').text(currentResources['home-business-sectors-list-psychology']);
    $('#home-business-sectors-list-technology').text(currentResources['home-business-sectors-list-technology']);
    $('#home-business-sectors-list-tourism').text(currentResources['home-business-sectors-list-tourism']);
    // Login Modal
    $('#login-modal-title').text(currentResources['login-modal-title']);
    $('#login-modal-username').text(currentResources['login-modal-username']);
    $('#login-modal-password').text(currentResources['login-modal-password']);
    $('#login-modal-button').html('<span class="glyphicon glyphicon-share coven-glyphicon"></span>' + currentResources['login-modal-button']);
    // Register Modal
    $('#register-modal-title').text(currentResources['register-modal-title']);
    $('#register-modal-name').text(currentResources['register-modal-name']);
    $('#register-modal-lastname').text(currentResources['register-modal-lastname']);
    $('#register-modal-dateofbirth').text(currentResources['register-modal-dateofbirth']);
    $('#register-modal-role').text(currentResources['register-modal-role']);
    $('#register-modal-username').text(currentResources['register-modal-username']);
    $('#register-modal-password').text(currentResources['register-modal-password']);
    $('#register-modal-confirm-password').text(currentResources['register-modal-confirm-password']);
    $('#register-modal-button').html('<span class="glyphicon glyphicon-tags coven-glyphicon"></span>' + currentResources['register-modal-button']);
}

function initializeBusinessServicesPage() {
    // Navbar
    $('#business-navbar-services').text(currentResources['business-navbar-services']);
    $('#business-navbar-sales').text(currentResources['business-navbar-sales']);
    $('#business-navbar-profile').text(currentResources['business-navbar-profile']);
    $('#business-navbar-logout').text(currentResources['business-navbar-logout']);
    $('#business-rights-reserved-label').text(currentResources['business-rights-reserved-label']);
    $('#confirmOkBtn').html('<span class="glyphicon glyphicon-ok-sign coven-glyphicon"></span>' + currentResources['confirm-yes']);
    $('#confirmCancelBtn').html('<span class="glyphicon glyphicon-remove-sign coven-glyphicon"></span>' + currentResources['confirm-cancel']);
    // Page
    $('#business-services-title').text(currentResources['business-services-title']);
    $('#business-add-service-button').html('<span class="glyphicon glyphicon-plus coven-glyphicon"></span>' + currentResources['business-add-service-button']);
    $('#business-filter-sector-button').html('<span class="glyphicon glyphicon-th coven-glyphicon"></span>' + currentResources['business-filter-sector-button']);
    $('#business-filter-action-button').html('<span class="glyphicon glyphicon-th coven-glyphicon"></span>' + currentResources['business-filter-action-button']);
    $('#business-perpage-button').text(currentResources['business-perpage-button']);
    // Business Sectors Modal
    $('#business-sectors-modal-title').text(currentResources['business-sectors-modal-title']);
    // Service Actions Modal
    $('#business-actions-modal-title').text(currentResources['business-actions-modal-title']);
    // Add Service Modal
    $('#business-services-modal-step1').text(currentResources['business-services-modal-step1']);
    $('#business-services-modal-step2-back').html('<span class="glyphicon glyphicon-arrow-left coven-glyphicon"></span>' + currentResources['back']);
    $('#business-services-modal-step2').text(currentResources['business-services-modal-step2']);
    $('#business-services-modal-step3-back').html('<span class="glyphicon glyphicon-arrow-left coven-glyphicon"></span>' + currentResources['back']);
    $('#business-services-modal-step3').text(currentResources['business-services-modal-step3']);
    $('#business-services-modal-sector').text(currentResources['business-services-modal-sector']);
    $('#business-services-modal-action').text(currentResources['business-services-modal-action']);
    $('#business-services-modal-name').text(currentResources['business-services-modal-name']);
    $('#business-services-modal-description').text(currentResources['business-services-modal-description']);
    $('#business-services-modal-msg').text(currentResources['business-services-modal-msg']);
    $('#business-services-modal-button').html('<span class="glyphicon glyphicon-compressed coven-glyphicon"></span>' + currentResources['business-services-modal-button']);
    // Sell Modal
    $('#business-sell-modal-title').text(currentResources['business-sell-modal-title']);
    $('#business-sell-modal-sector').text(currentResources['business-sell-modal-sector']);
    $('#business-sell-modal-action').text(currentResources['business-sell-modal-action']);
    $('#inputSellServiceAction').val(currentResources['service-action-Sell']);
    $('#business-sell-modal-name').text(currentResources['business-sell-modal-name']);
    $('#business-sell-modal-description').text(currentResources['business-sell-modal-description']);
    $('#sellChooseFileButton').text(currentResources['file-choose-file']);
    $('#sellFileNameButton').text(currentResources['file-no-file-chosen']);
    $('#business-sell-modal-change-picture').html('<span class="glyphicon glyphicon-picture coven-glyphicon"></span>' + currentResources['business-sell-modal-change-picture']);
    $('#business-sell-modal-delete-picture').html('<span class="glyphicon glyphicon-remove coven-glyphicon"></span>' + currentResources['business-sell-modal-delete-picture']);
    $('#business-sell-modal-price').text(currentResources['business-sell-modal-price']);
    $('#business-sell-modal-delivery-price').text(currentResources['business-sell-modal-delivery-price']);
    $('#business-sell-modal-stock').text(currentResources['business-sell-modal-stock']);
    $('#business-sell-modal-stock-msg').text(currentResources['business-sell-modal-stock-msg']);
    $('#business-sell-modal-delivery-type').text(currentResources['business-sell-modal-delivery-type']);
    $('#business-sell-modal-delivery-type-select').text(currentResources['delivery-type-select']);
    $('#business-sell-modal-delivery-type-delivery-address').text(currentResources['delivery-type-delivery-address']);
    $('#business-sell-modal-delivery-type-description').text(currentResources['delivery-type-description']);
    $('#business-sell-modal-delivery-type-business').text(currentResources['delivery-type-business']);
    $('#business-sell-modal-delivery-type-business-msg').text(currentResources['delivery-type-business-msg']);
    $('#business-sell-modal-delivery-type-client').text(currentResources['delivery-type-client']);
    $('#business-sell-modal-delivery-type-client-msg').text(currentResources['delivery-type-client-msg']);
    $('#business-sell-modal-delivery-type-both').text(currentResources['delivery-type-both']);
    $('#business-sell-modal-delivery-type-both-msg').text(currentResources['delivery-type-both-msg']);
    $('#business-sell-modal-msg').text(currentResources['business-sell-modal-msg']);
    $('#business-sell-modal-save-button').html('<span class="glyphicon glyphicon-floppy-disk coven-glyphicon"></span>' + currentResources['business-sell-modal-save-button']);
    // Rent Modal
    $('#business-rent-modal-title').text(currentResources['business-rent-modal-title']);
    $('#business-rent-modal-sector').text(currentResources['business-rent-modal-sector']);
    $('#business-rent-modal-action').text(currentResources['business-rent-modal-action']);
    $('#inputRentServiceAction').val(currentResources['service-action-Rent']);
    $('#business-rent-modal-name').text(currentResources['business-rent-modal-name']);
    $('#business-rent-modal-description').text(currentResources['business-rent-modal-description']);
    $('#rentChooseFileButton').text(currentResources['file-choose-file']);
    $('#rentFileNameButton').text(currentResources['file-no-file-chosen']);
    $('#business-rent-modal-change-picture').html('<span class="glyphicon glyphicon-picture coven-glyphicon"></span>' + currentResources['business-rent-modal-change-picture']);
    $('#business-rent-modal-delete-picture').html('<span class="glyphicon glyphicon-remove coven-glyphicon"></span>' + currentResources['business-rent-modal-delete-picture']);
    $('#business-rent-modal-price-per-hour').text(currentResources['business-rent-modal-price-per-hour']);
    $('#business-rent-modal-delivery-price').text(currentResources['business-rent-modal-delivery-price']);
    $('#business-rent-modal-deposit').text(currentResources['business-rent-modal-deposit']);
    $('#business-rent-modal-deposit-msg').text(currentResources['business-rent-modal-deposit-msg']);
    $('#business-rent-modal-acquisicion').text(currentResources['business-rent-modal-acquisicion']);
    $('#business-rent-modal-acquisicion-select').text(currentResources['delivery-type-select']);
    $('#business-rent-modal-acquisicion-delivery-address').text(currentResources['delivery-type-delivery-address']);
    $('#business-rent-modal-acquisicion-description').text(currentResources['delivery-type-description']);
    $('#business-rent-modal-acquisicion-business').text(currentResources['delivery-type-business']);
    $('#business-rent-modal-acquisicion-business-msg').text(currentResources['delivery-type-business-msg']);
    $('#business-rent-modal-acquisicion-client').text(currentResources['delivery-type-client']);
    $('#business-rent-modal-acquisicion-client-msg').text(currentResources['delivery-type-client-msg']);
    $('#business-rent-modal-acquisicion-both').text(currentResources['delivery-type-both']);
    $('#business-rent-modal-acquisicion-both-msg').text(currentResources['delivery-type-both-msg']);
    $('#business-rent-modal-return').text(currentResources['business-rent-modal-return']);
    $('#business-rent-modal-return-select').text(currentResources['delivery-type-select']);
    $('#business-rent-modal-return-delivery-address').text(currentResources['delivery-type-return-address']);
    $('#business-rent-modal-return-description').text(currentResources['delivery-type-description']);
    $('#business-rent-modal-return-business').text(currentResources['delivery-type-business']);
    $('#business-rent-modal-return-business-msg').text(currentResources['delivery-type-business-return-msg']);
    $('#business-rent-modal-return-client').text(currentResources['delivery-type-client']);
    $('#business-rent-modal-return-client-msg').text(currentResources['delivery-type-client-return-msg']);
    $('#business-rent-modal-return-both').text(currentResources['delivery-type-both']);
    $('#business-rent-modal-return-both-msg').text(currentResources['delivery-type-both-return-msg']);
    $('#business-rent-modal-msg').text(currentResources['business-rent-modal-msg']);
    $('#business-rent-modal-terms').text(currentResources['business-rent-modal-terms']);
    $('#business-rent-modal-terms-msg').text(currentResources['business-rent-modal-terms-msg']);
    $('#business-rent-modal-save-button').html('<span class="glyphicon glyphicon-floppy-disk coven-glyphicon"></span>' + currentResources['business-rent-modal-save-button']);
    // Meeting Modal
    $('#business-meeting-modal-title').text(currentResources['business-meeting-modal-title']);
    $('#business-meeting-modal-sector').text(currentResources['business-meeting-modal-sector']);
    $('#business-meeting-modal-action').text(currentResources['business-meeting-modal-action']);
    $('#inputMeetingServiceAction').val(currentResources['service-action-Meeting']);
    $('#business-meeting-modal-name').text(currentResources['business-meeting-modal-name']);
    $('#business-meeting-modal-description').text(currentResources['business-meeting-modal-description']);
    $('#business-meeting-modal-price').text(currentResources['business-meeting-modal-price']);
    $('#business-meeting-modal-delivery-price').text(currentResources['business-meeting-modal-delivery-price']);
    $('#business-meeting-modal-duration').text(currentResources['business-meeting-modal-duration']);
    $('#business-meeting-modal-delivery-type').text(currentResources['business-meeting-modal-delivery-type']);
    $('#business-meeting-modal-delivery-type-select').text(currentResources['delivery-type-select']);
    $('#business-meeting-modal-delivery-type-delivery-address').text(currentResources['delivery-type-meeting-address']);
    $('#business-meeting-modal-delivery-type-description').text(currentResources['delivery-type-description']);
    $('#business-meeting-modal-delivery-type-business').text(currentResources['delivery-type-business']);
    $('#business-meeting-modal-delivery-type-business-msg').text(currentResources['delivery-type-business-meeting-msg']);
    $('#business-meeting-modal-delivery-type-client').text(currentResources['delivery-type-client']);
    $('#business-meeting-modal-delivery-type-client-msg').text(currentResources['delivery-type-client-meeting-msg']);
    $('#business-meeting-modal-delivery-type-both').text(currentResources['delivery-type-both']);
    $('#business-meeting-modal-delivery-type-both-msg').text(currentResources['delivery-type-both-meeting-msg']);
    $('#business-meeting-modal-msg').text(currentResources['business-meeting-modal-msg']);
    $('#business-meeting-modal-save-button').html('<span class="glyphicon glyphicon-floppy-disk coven-glyphicon"></span>' + currentResources['business-meeting-modal-save-button']);
    // Videocall Modal
    $('#business-videocall-modal-title').text(currentResources['business-videocall-modal-title']);
    $('#business-videocall-modal-sector').text(currentResources['business-videocall-modal-sector']);
    $('#business-videocall-modal-action').text(currentResources['business-videocall-modal-action']);
    $('#inputVideocallServiceAction').val(currentResources['service-action-Videocall']);
    $('#business-videocall-modal-name').text(currentResources['business-videocall-modal-name']);
    $('#business-videocall-modal-description').text(currentResources['business-videocall-modal-description']);
    $('#business-videocall-modal-price').text(currentResources['business-videocall-modal-price']);
    $('#business-videocall-modal-duration').text(currentResources['business-videocall-modal-duration']);
    $('#business-videocall-modal-save-button').html('<span class="glyphicon glyphicon-floppy-disk coven-glyphicon"></span>' + currentResources['business-videocall-modal-save-button']);
}

function initializeBusinessSalesPage() {
    // Navbar
    $('#business-navbar-services').text(currentResources['business-navbar-services']);
    $('#business-navbar-sales').text(currentResources['business-navbar-sales']);
    $('#business-navbar-profile').text(currentResources['business-navbar-profile']);
    $('#business-navbar-logout').text(currentResources['business-navbar-logout']);
    $('#business-rights-reserved-label').text(currentResources['business-rights-reserved-label']);
    $('#confirmOkBtn').html('<span class="glyphicon glyphicon-ok-sign coven-glyphicon"></span>' + currentResources['confirm-yes']);
    $('#confirmCancelBtn').html('<span class="glyphicon glyphicon-remove-sign coven-glyphicon"></span>' + currentResources['confirm-cancel']);
    // Page
    $('#business-sales-title').text(currentResources['business-sales-title']);
    $('#business-sales-other-button').text(currentResources['business-sales-other-button']);
    $('#business-sales-year-button').text(currentResources['business-sales-year-button']);
    $('#business-sales-month-button').text(currentResources['business-sales-month-button']);
    $('#business-sales-week-button').text(currentResources['business-sales-week-button']);
    $('#business-sales-today-button').text(currentResources['business-sales-today-button']);
    $('#business-sales-start-date').text(currentResources['business-sales-start-date']);
    $('#business-sales-end-date').text(currentResources['business-sales-end-date']);
    $('#business-sales-filter-sector-button').html('<span class="glyphicon glyphicon-th coven-glyphicon"></span>' + currentResources['business-sales-filter-sector-button']);
    $('#business-sales-filter-action-button').html('<span class="glyphicon glyphicon-th coven-glyphicon"></span>' + currentResources['business-sales-filter-action-button']);
    $('#business-perpage-button').text(currentResources['business-perpage-button']);
    // Business Sectors Modal
    $('#business-sectors-modal-title').text(currentResources['business-sectors-modal-title']);
    // Service Actions Modal
    $('#business-actions-modal-title').text(currentResources['business-actions-modal-title']);
    // Ratings Modal
    $('#business-sales-rating-modal-title').text(currentResources['business-sales-rating-modal-title']);
}

function initializeBusinessProfilePage() {
    // Navbar
    $('#business-navbar-services').text(currentResources['business-navbar-services']);
    $('#business-navbar-sales').text(currentResources['business-navbar-sales']);
    $('#business-navbar-profile').text(currentResources['business-navbar-profile']);
    $('#business-navbar-logout').text(currentResources['business-navbar-logout']);
    $('#business-rights-reserved-label').text(currentResources['business-rights-reserved-label']);
    $('#confirmOkBtn').html('<span class="glyphicon glyphicon-ok-sign coven-glyphicon"></span>' + currentResources['confirm-yes']);
    $('#confirmCancelBtn').html('<span class="glyphicon glyphicon-remove-sign coven-glyphicon"></span>' + currentResources['confirm-cancel']);
    // Page
    $('#business-profile-title').text(currentResources['business-profile-title']);
    $('#chooseFileButton').text(currentResources['file-choose-file']);
    $('#fileNameButton').text(currentResources['file-no-file-chosen']);
    $('#business-profile-change-picture').html('<span class="glyphicon glyphicon-user coven-glyphicon"></span>' + currentResources['business-profile-change-picture']);
    $('#business-profile-delete-picture').html('<span class="glyphicon glyphicon-remove coven-glyphicon"></span>' + currentResources['business-profile-delete-picture']);
    $('#business-profile-delete-profile').html('<span class="glyphicon glyphicon-remove coven-glyphicon"></span>' + currentResources['business-profile-delete-profile']);
    $('#business-profile-name').text(currentResources['business-profile-name']);
    $('#business-profile-lastname').text(currentResources['business-profile-lastname']);
    $('#business-profile-dateofbirth').text(currentResources['business-profile-dateofbirth']);
    $('#business-profile-username').text(currentResources['business-profile-username']);
    $('#business-profile-password').text(currentResources['business-profile-password']);
    $('#business-profile-confirm-password').text(currentResources['business-profile-confirm-password']);
    $('#business-profile-introduction').text(currentResources['business-profile-introduction']);
    $('#business-profile-email').text(currentResources['business-profile-email']);
    $('#business-profile-telephone').text(currentResources['business-profile-telephone']);
    $('#business-profile-isBusiness').text(currentResources['business-profile-isBusiness']);
    $('#business-profile-bank-account').text(currentResources['business-profile-bank-account']);
    $('#business-profile-address').text(currentResources['business-profile-address']);
    $('#business-profile-country').text(currentResources['business-profile-country']);
    $('#business-profile-state').text(currentResources['business-profile-state']);
    $('#business-profile-city').text(currentResources['business-profile-city']);
    $('#business-profile-address-line').text(currentResources['business-profile-address-line']);
    $('#business-profile-schedules').text(currentResources['business-profile-schedules']);
    $('#business-profile-add-schedule').html('<span class="glyphicon glyphicon-calendar coven-glyphicon"></span>' + currentResources['business-profile-add-schedule']);
    $('#business-profile-label-sunday').text(currentResources['sunday']);
    $('#business-profile-label-monday').text(currentResources['monday']);
    $('#business-profile-label-tuesday').text(currentResources['tuesday']);
    $('#business-profile-label-wednesday').text(currentResources['wednesday']);
    $('#business-profile-label-thursday').text(currentResources['thursday']);
    $('#business-profile-label-friday').text(currentResources['friday']);
    $('#business-profile-label-saturday').text(currentResources['saturday']);
    $('#business-profile-info-1').text(currentResources['business-profile-info-1']);
    $('#business-profile-info-2').text(currentResources['business-profile-info-2']);
    $('#business-profile-info-3').text(currentResources['business-profile-info-3']);
    $('#business-profile-save-button').html('<span class="glyphicon glyphicon-floppy-disk coven-glyphicon"></span>' + currentResources['business-profile-save-button']);
    // Times Modal
    $('#times-modal-title').text(currentResources['business-profile-add-schedule']);
    $('#times-modal-day').text(currentResources['business-profile-schedules-modal-day']);
    $('#times-modal-hours').text(currentResources['business-profile-schedules-modal-hours']);
    $('#times-modal-add-hours').html(currentResources['business-profile-schedules-modal-add-schedule']);
}

function initializeClientServicesPage() {
    // Navbar
    $('#client-navbar-services').text(currentResources['client-navbar-services']);
    $('#client-navbar-purchases').text(currentResources['client-navbar-purchases']);
    $('#client-navbar-profile').text(currentResources['client-navbar-profile']);
    $('#client-navbar-logout').text(currentResources['client-navbar-logout']);
    $('#client-rights-reserved-label').text(currentResources['client-rights-reserved-label']);
    $('#confirmOkBtn').html('<span class="glyphicon glyphicon-ok-sign coven-glyphicon"></span>' + currentResources['confirm-yes']);
    $('#confirmCancelBtn').html('<span class="glyphicon glyphicon-remove-sign coven-glyphicon"></span>' + currentResources['confirm-cancel']);
    // Page
    $('#client-services-title').text(currentResources['client-services-title']);
    $('#client-services-step1').text(currentResources['client-services-step1']);
    $('#client-services-tab2-back').html('<span class="glyphicon glyphicon-arrow-left coven-glyphicon"></span>' + currentResources['back']);
    $('#client-services-step2').text(currentResources['client-services-step2']);
    $('#client-filter-sector-button').html('<span class="glyphicon glyphicon-th coven-glyphicon"></span>' + currentResources['client-filter-sector-button']);
    $('#client-filter-action-button').html('<span class="glyphicon glyphicon-th coven-glyphicon"></span>' + currentResources['client-filter-action-button']);
    $('#client-perpage-button').text(currentResources['client-perpage-button']);
    // Business Sectors Modal
    $('#client-sectors-modal-title').text(currentResources['client-sectors-modal-title']);
    // Service Actions Modal
    $('#client-actions-modal-title').text(currentResources['client-actions-modal-title']);
    // User Modal
    $('#client-user-modal-title').text(currentResources['client-user-modal-title']);
    $('#business-profile-schedules').text(currentResources['business-profile-schedules']);
    $('#business-profile-label-sunday').text(currentResources['sunday']);
    $('#business-profile-label-monday').text(currentResources['monday']);
    $('#business-profile-label-tuesday').text(currentResources['tuesday']);
    $('#business-profile-label-wednesday').text(currentResources['wednesday']);
    $('#business-profile-label-thursday').text(currentResources['thursday']);
    $('#business-profile-label-friday').text(currentResources['friday']);
    $('#business-profile-label-saturday').text(currentResources['saturday']);
    // Terms Modal
    $('#terms-modal-title').html(currentLanguageResources['business-rent-modal-terms']);
    $('#terms-modal-button').html(currentLanguageResources['accept-terms']);
    // Ratings Modal
    $('#business-sales-rating-modal-title').text(currentResources['business-sales-rating-modal-title']);
    $('#buyModalRatingButton').html('<span class="glyphicon glyphicon-star"></span>' + currentLanguageResources['business-sales-rating-modal-title']);
    // Buy Modal
    $('#client-buy-modal-name').text(currentResources['client-buy-modal-name']);
    $('#client-buy-modal-description').text(currentResources['client-buy-modal-description']);
    $('#client-buy-modal-delivery-price').text(currentResources['client-buy-modal-delivery-price']);
    $('#client-buy-modal-deposit').text(currentResources['client-buy-modal-deposit']);
    $('#client-buy-modal-deposit-msg').text(currentResources['client-buy-modal-deposit-msg']);
    $('#client-buy-modal-duration').text(currentResources['client-buy-modal-duration']);
    $('#client-buy-modal-quantity').text(currentResources['client-buy-modal-quantity']);
    $('#client-buy-modal-acquisition-date').text(currentResources['client-buy-modal-acquisition-date']);
    $('#client-buy-modal-acquisition-time').text(currentResources['client-buy-modal-acquisition-time']);
    $('#client-buy-modal-acquisition-delivery-type').text(currentResources['client-buy-modal-acquisition-delivery-type']);
    $('#client-buy-modal-acquisition-country').text(currentResources['client-buy-modal-acquisition-country']);
    $('#client-buy-modal-acquisition-state').text(currentResources['client-buy-modal-acquisition-state']);
    $('#client-buy-modal-acquisition-city').text(currentResources['client-buy-modal-acquisition-city']);
    $('#client-buy-modal-acquisition-address').text(currentResources['client-buy-modal-acquisition-address']);
    $('#client-buy-modal-return').text(currentResources['client-buy-modal-return']);
    $('#client-buy-modal-return-date').text(currentResources['client-buy-modal-return-date']);
    $('#client-buy-modal-return-time').text(currentResources['client-buy-modal-return-time']);
    $('#client-buy-modal-return-delivery-type').text(currentResources['client-buy-modal-return-delivery-type']);
    $('#client-buy-modal-return-country').text(currentResources['client-buy-modal-return-country']);
    $('#client-buy-modal-return-state').text(currentResources['client-buy-modal-return-state']);
    $('#client-buy-modal-return-city').text(currentResources['client-buy-modal-return-city']);
    $('#client-buy-modal-return-address').text(currentResources['client-buy-modal-return-address']);
    $('#client-buy-modal-rent-hours').text(currentResources['client-buy-modal-rent-hours']);
    $('#client-buy-modal-bill').text(currentResources['client-buy-modal-bill']);
    $('#client-buy-modal-subtotal').text(currentResources['client-buy-modal-subtotal']);
    $('#client-buy-modal-delivery-fee').text(currentResources['client-buy-modal-delivery-fee']);
    $('#client-buy-modal-videocall-fee').text(currentResources['client-buy-modal-videocall-fee']);
    $('#client-buy-modal-coven-fee').text(currentResources['client-buy-modal-coven-fee']);
    $('#client-buy-modal-total').text(currentResources['client-buy-modal-total']);
    $('#client-buy-modal-card').text(currentResources['client-buy-modal-card']);
    $('#client-buy-modal-expiration-card').text(currentResources['client-buy-modal-expiration-card']);
    $('#client-buy-modal-pay-msg').text(currentResources['client-buy-modal-pay-msg']);
    $('#client-buy-modal-terms-msg').text(currentResources['client-buy-modal-terms-msg']);
    $('#client-buy-modal-pay-button').html('<span class="glyphicon glyphicon-arrow-left coven-glyphicon"></span>' + currentResources['back']);
}

function initializeClientPurchasesPage() {
    // Navbar
    $('#client-navbar-services').text(currentResources['client-navbar-services']);
    $('#client-navbar-purchases').text(currentResources['client-navbar-purchases']);
    $('#client-navbar-profile').text(currentResources['client-navbar-profile']);
    $('#client-navbar-logout').text(currentResources['client-navbar-logout']);
    $('#client-rights-reserved-label').text(currentResources['client-rights-reserved-label']);
    $('#confirmOkBtn').html('<span class="glyphicon glyphicon-ok-sign coven-glyphicon"></span>' + currentResources['confirm-yes']);
    $('#confirmCancelBtn').html('<span class="glyphicon glyphicon-remove-sign coven-glyphicon"></span>' + currentResources['confirm-cancel']);
    // Page
    $('#client-purchases-title').text(currentResources['client-purchases-title']);
    $('#client-purchases-other-button').text(currentResources['client-purchases-other-button']);
    $('#client-purchases-year-button').text(currentResources['client-purchases-year-button']);
    $('#client-purchases-month-button').text(currentResources['client-purchases-month-button']);
    $('#client-purchases-week-button').text(currentResources['client-purchases-week-button']);
    $('#client-purchases-today-button').text(currentResources['client-purchases-today-button']);
    $('#client-purchases-start-date').text(currentResources['client-purchases-start-date']);
    $('#client-purchases-end-date').text(currentResources['client-purchases-end-date']);
    $('#client-purchases-filter-sector-button').html('<span class="glyphicon glyphicon-th coven-glyphicon"></span>' + currentResources['client-purchases-filter-sector-button']);
    $('#client-purchases-filter-action-button').html('<span class="glyphicon glyphicon-th coven-glyphicon"></span>' + currentResources['client-purchases-filter-action-button']);
    $('#client-perpage-button').text(currentResources['client-perpage-button']);
    // Business Sectors Modal
    $('#business-sectors-modal-title').text(currentResources['business-sectors-modal-title']);
    // Service Actions Modal
    $('#service-actions-modal-title').text(currentResources['business-actions-modal-title']);
    // Rating Modal
    $('#client-purchases-rating-modal-title').text(currentResources['client-purchases-rating-modal-title']);
    $('#client-purchases-rating-modal-rating').text(currentResources['client-purchases-rating-modal-rating']);
    $('#client-purchases-rating-modal-comment').text(currentResources['client-purchases-rating-modal-comment']);
    $('#client-purchases-rating-modal-button').html('<span class="glyphicon glyphicon-floppy-disk coven-glyphicon"></span>' + currentResources['client-purchases-rating-modal-button']);
}

function initializeClientProfilePage() {
    // Navbar
    $('#client-navbar-services').text(currentResources['client-navbar-services']);
    $('#client-navbar-purchases').text(currentResources['client-navbar-purchases']);
    $('#client-navbar-profile').text(currentResources['client-navbar-profile']);
    $('#client-navbar-logout').text(currentResources['client-navbar-logout']);
    $('#client-rights-reserved-label').text(currentResources['client-rights-reserved-label']);
    $('#confirmOkBtn').html('<span class="glyphicon glyphicon-ok-sign coven-glyphicon"></span>' + currentResources['confirm-yes']);
    $('#confirmCancelBtn').html('<span class="glyphicon glyphicon-remove-sign coven-glyphicon"></span>' + currentResources['confirm-cancel']);
    // Page
    $('#client-profile-title').text(currentResources['client-profile-title']);
    $('#chooseFileButton').text(currentResources['file-choose-file']);
    $('#fileNameButton').text(currentResources['file-no-file-chosen']);
    $('#client-profile-change-picture').html('<span class="glyphicon glyphicon-user coven-glyphicon"></span>' + currentResources['client-profile-change-picture']);
    $('#client-profile-delete-picture').html('<span class="glyphicon glyphicon-remove coven-glyphicon"></span>' + currentResources['client-profile-delete-picture']);
    $('#client-profile-delete-profile').html('<span class="glyphicon glyphicon-remove coven-glyphicon"></span>' + currentResources['client-profile-delete-profile']);
    $('#client-profile-name').text(currentResources['client-profile-name']);
    $('#client-profile-lastname').text(currentResources['client-profile-lastname']);
    $('#client-profile-dateofbirth').text(currentResources['client-profile-dateofbirth']);
    $('#client-profile-username').text(currentResources['client-profile-username']);
    $('#client-profile-password').text(currentResources['client-profile-password']);
    $('#client-profile-confirm-password').text(currentResources['client-profile-confirm-password']);
    $('#client-profile-email').text(currentResources['client-profile-email']);
    $('#client-profile-telephone').text(currentResources['client-profile-telephone']);
    $('#client-profile-address').text(currentResources['client-profile-address']);
    $('#client-profile-country').text(currentResources['client-profile-country']);
    $('#client-profile-state').text(currentResources['client-profile-state']);
    $('#client-profile-city').text(currentResources['client-profile-city']);
    $('#client-profile-address-line').text(currentResources['client-profile-address-line']);
    $('#client-profile-info-1').text(currentResources['client-profile-info-1']);
    $('#client-profile-info-2').text(currentResources['client-profile-info-2']);
    $('#client-profile-info-3').text(currentResources['client-profile-info-3']);
    $('#client-profile-save-button').html('<span class="glyphicon glyphicon-floppy-disk coven-glyphicon"></span>' + currentResources['client-profile-save-button']);
}