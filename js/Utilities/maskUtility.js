function showMask() {
    $("#mask").css("display", "");
}

function hideMask() {
    setTimeout(function () { $("#mask").css("display", "none"); }, 300);
    //$("#mask").css("display", "none");
}