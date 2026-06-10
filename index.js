const checkboxes = document.querySelectorAll(".habit-checkbox");
const progressbar = document.getElementById("progressBar");
const progresstext = document.getElementById("progressText");

function updateProgress(){
    //total checkbox
    const totalhabits = checkboxes.length;
    //how many checked
    const checkedhabits = document.querySelectorAll(".habit-checkbox:checked").length;
    //  will print the numbers to your browser console just checking
    console.log("Total:", totalhabits, "Checked:", checkedhabits);
    //calculate percentage
    const percentage = (checkedhabits / totalhabits) * 100;
    //display
    progressbar.style.width = percentage + '%';
    progresstext.textContent = percentage + '% completed';
}
    checkboxes.forEach(checkBox => {
        checkBox.addEventListener("change", updateProgress);
});
