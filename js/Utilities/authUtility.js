function callLogout() {
    showMask();
    var langSetting = sessionStorage.getItem('lang');
    sessionStorage.clear();
    sessionStorage.setItem('lang', langSetting);
    window.location.assign(serverHome);
    hideMask();
}