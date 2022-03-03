function generateHash(string) {
    var hash = 0;
    if (string.length == 0)
        return hash;
    for (let i = 0; i < string.length; i++) {
        var charCode = string.charCodeAt(i);
        hash = ((hash << 7) - hash) + charCode;
        hash = hash & hash;
    }
    return hash.toString();
}

function isCharacterNumber(character) {
    return character >= '0' && character <= '9';
}

function isCharacterUpperCase(character) {
    return character == character.toUpperCase() && character != character.toLowerCase();
}

function validatePassword(password) {
    var hasOneUpperCase = false;
    var hasOneNumber = false;

    for (var i = 0; i < password.length; i++) {
        if (isCharacterNumber(password[i])) {
            hasOneNumber = true;
        }

        if (isCharacterUpperCase(password[i])) {
            hasOneUpperCase = true;
        }
    }

    if (hasOneUpperCase == false) {
        return 'password-error-001';
    } else if (hasOneNumber == false) {
        return 'password-error-002';
    } else {
        return 'password-success';
    }
}