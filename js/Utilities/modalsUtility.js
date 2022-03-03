//Message
var messageModal = document.getElementById('messageModal');
var messageSpan = document.getElementById('messageModalClose');

if (messageModal != null) {
    messageSpan.onclick = function () {
        messageModal.style.display = "none";
    }

    function showMessageModal(modalTitle, message, colorType) {
        document.getElementById('messageModalTitle').textContent = modalTitle;
        document.getElementById('messageModalLabel').textContent = message;

        $('#messageModalHeader').removeClass();
        $('#messageModalHeader').attr('class', "message-modal-header background-color-" + colorType);

        messageModal.style.display = "block";
    }
}

//Confirm
var confirmModal = document.getElementById('confirmModal');
var confirmSpan = document.getElementById('confirmModalClose');
var confirmOkButton = document.getElementById('confirmOkBtn');
var confirmCancelButton = document.getElementById('confirmCancelBtn');
var confirmCallback = null;

if (confirmModal != null) {
    confirmSpan.onclick = function () {
        confirmModal.style.display = "none";
        confirmCallback = null;
    }

    confirmOkButton.onclick = function () {
        if (confirmCallback != null) {
            confirmCallback();
        }
        confirmModal.style.display = "none";
        confirmCallback = null;
    }

    confirmCancelButton.onclick = function () {
        confirmModal.style.display = "none";
        confirmCallback = null;
    }

    function showConfirmModal(modalTitle, message, colorType, callback) {
        document.getElementById('confirmModalTitle').textContent = modalTitle;
        document.getElementById('confirmModalLabel').textContent = message;

        $('#confirmModalHeader').removeClass();
        $('#confirmModalHeader').attr('class', "message-modal-header background-color-" + colorType);

        $('#confirmOkBtn').removeClass();
        $('#confirmOkBtn').attr('class', "coven-text coven-button-" + colorType);
        $('#confirmCancelBtn').removeClass();
        $('#confirmCancelBtn').attr('class', "coven-text coven-button-" + colorType);

        confirmModal.style.display = "block";
        confirmCallback = callback;
    }
}