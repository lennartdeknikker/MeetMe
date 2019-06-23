let fieldsets = document.getElementsByTagName('fieldset');
let form = document.getElementById('form-profile');

let progress = 0

hideOtherFieldsets(progress);

// creates a next button.
newButton = document.createElement('button');
newButton.innerHTML = "next";
newButton.classList.add('save-button')
newButton.addEventListener('click', function () {
    hideOtherFieldsets(progress)
});
form.parentNode.append(newButton);

/*  This function is called everytime the next button is clicked.
    It hides the other fieldsets and makes the current one visible based on an incremental progress variable.
*/
function hideOtherFieldsets(currentFieldset) {
    for (i = 0; i < fieldsets.length; i++) {
        if (i == currentFieldset) {
            fieldsets[i].style.display = 'block';
        } else {
            fieldsets[i].style.display = 'none';
        }
    }
    if (currentFieldset > fieldsets.length - 3) {
        fieldsets[fieldsets.length - 1].style.display = 'block';
        form.parentNode.removeChild(newButton);
    }

    progress++;
}