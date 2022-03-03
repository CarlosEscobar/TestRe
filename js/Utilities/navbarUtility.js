function initializeNavbarPage(total, stage) {
    for (var i = 1; i < (total + 1); i++) {
        $("#navbar_li_" + i).removeClass();
    }

    for (var i = 1; i < (total + 1); i++) {
        $("#navbar_li_" + i).addClass('nav-item');

        if (i == stage) {
            $("#navbar_li_" + i).addClass('nav-item-active');
        }
    }
}