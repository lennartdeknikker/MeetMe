let fieldsets = document.getElementsByTagName('fieldset');
let form = document.getElementById('form-profile');
let headertext = document.getElementsByTagName('h1');

let progress = 0

hideOtherFieldsets(progress);

// creates a next button.
let nextButton = document.createElement('button');
nextButton.innerHTML = "next";
nextButton.classList.add('save-button');
nextButton.addEventListener('click', function () {
    hideOtherFieldsets(progress)
});
form.parentNode.append(nextButton);

/*  This function is called everytime the next button is clicked.
    It hides the other fieldsets and makes the current one visible based on an incremental progress variable.
*/
function hideOtherFieldsets(currentFieldset) {
    for (i = 0; i < fieldsets.length; i++) {
        if (i == currentFieldset) {
            fieldsets[i].style.display = 'block';
            let currentText = fieldsets[i].childNodes[1].innerHTML;
            fieldsets[i].childNodes[1].innerHTML = ` <span class='progress-indicator'>${progress+1}/${fieldsets.length-1}:</span> ${currentText}`;
        } else {
            fieldsets[i].style.display = 'none';
        }
    }
    if (currentFieldset > fieldsets.length - 3) {
        fieldsets[fieldsets.length - 1].style.display = 'block';
        form.parentNode.removeChild(nextButton);
    }

    progress++;
}