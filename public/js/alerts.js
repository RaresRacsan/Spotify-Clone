// Retrieve URL parameters to check for any error or success messages
const urlParams = new URLSearchParams(window.location.search);
const error = urlParams.get('error'); // Get error message (if present in URL)
const success = urlParams.get('success'); // Get success message (if present in URL)

if (error) {
    alert(error);  // Show error message in alert box
}

if (success) {
    alert(success);  // Show success message in alert box
}