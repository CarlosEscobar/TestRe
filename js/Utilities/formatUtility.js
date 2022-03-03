function formatTextAreaInput(rawText) {
    var result = rawText;
    result = result.replaceAll('\n', '<n>');
    result = result.replaceAll('\r', '<r>');
    return result;
}

function unformatTextAreaInput(formattedText) {
    var result = formattedText;
    result = result.replaceAll('<n>', '\n');
    result = result.replaceAll('<r>', '\r');
    return result;
}

function roundToTwoDecimalPlaces(number) {
    return +(Math.round(number + "e+2") + "e-2");
}

function formatDateForInput(date) {

    var monthStr = date.getMonth() + 1;
    if (monthStr < 10) {
        monthStr = "0" + monthStr;
    }

    var dayStr = date.getDate();
    if (dayStr < 10) {
        dayStr = "0" + dayStr;
    }

    return date.getFullYear() + "-" + monthStr + "-" + dayStr;
}