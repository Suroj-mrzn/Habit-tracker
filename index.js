const progressbar = document.getElementById("progressBar");
const progresstext = document.getElementById("progressText");
const habitList = document.getElementById("habitList");

// 1. SAVE FUNCTION: Grabs current habits from UI and saves them to localStorage
function saveHabits() {
    const habits = [];
    const habitItems = document.querySelectorAll(".habit-item");
    
    habitItems.forEach(item => {
        const textNode = item.querySelector(".habit-text");
        const checkNode = item.querySelector(".habit-checkbox");
        
        if (textNode && checkNode) {
            habits.push({ 
                text: textNode.textContent.trim(), 
                completed: checkNode.checked 
            });
        }
    });
    
    localStorage.setItem("dailyHabits", JSON.stringify(habits));
}

// 2. LOAD FUNCTION: Reads from localStorage and builds the HTML on page load
function loadHabits() {
    const savedHabits = localStorage.getItem("dailyHabits");
    
    if (!savedHabits) {
        updateProgress();
        return;
    }
    
    const habitsArray = JSON.parse(savedHabits);
    habitList.innerHTML = "";
    
    habitsArray.forEach(habit => {
        const newLabel = document.createElement("label");
        newLabel.className = "habit-item";
        
        // We add the little x button here: <span class="delete-btn">&times;</span>
        newLabel.innerHTML = `
            <input type="checkbox" class="habit-checkbox" ${habit.completed ? 'checked' : ''}>
            <span class="habit-text">${habit.text}</span>
            <span class="delete-btn">&times;</span>
        `;
        
        // Watch for checkbox checks
        newLabel.querySelector(".habit-checkbox").addEventListener("change", () => {
            updateProgress();
            saveHabits();
        });

        // Watch for delete clicks
        newLabel.querySelector(".delete-btn").addEventListener("click", (e) => {
            e.preventDefault(); 
            newLabel.remove();  
            updateProgress();   
            saveHabits();       
        });
        
        habitList.appendChild(newLabel);
    });
    
    updateProgress();
}

function updateProgress() {
    const currentCheckboxes = document.querySelectorAll(".habit-checkbox");
    const totalhabits = currentCheckboxes.length;
    const checkedhabits = document.querySelectorAll(".habit-checkbox:checked").length;
    
    let percentage = 0;
    if (totalhabits > 0) {
        percentage = Math.round((checkedhabits / totalhabits) * 100);
    }
    
    progressbar.style.width = percentage + '%';
    progresstext.textContent = percentage + '% completed';
}

function toggleInputMode() {
    document.getElementById("addHabitBtn").style.display = "none";
    const inputGroup = document.getElementById("inputGroup");
    inputGroup.style.display = "flex"; 
    document.getElementById("newHabitInput").focus();
}

// Creating a new habit row and appending it dynamically
function createNewHabit() {
    const inputField = document.getElementById("newHabitInput");
    const textValue = inputField.value.trim();

    if (textValue === "") return;

    const newLabel = document.createElement("label");
    newLabel.className = "habit-item";
    
    newLabel.innerHTML = `
        <input type="checkbox" class="habit-checkbox">
        <span class="habit-text">${textValue}</span>
        <span class="delete-btn">&times;</span>
    `;

    newLabel.querySelector(".habit-checkbox").addEventListener("change", () => {
        updateProgress();
        saveHabits();
    });

    newLabel.querySelector(".delete-btn").addEventListener("click", (e) => {
        e.preventDefault(); 
        newLabel.remove();
        updateProgress();
        saveHabits();
    });

    habitList.appendChild(newLabel);

    inputField.value = "";
    document.getElementById("inputGroup").style.display = "none";
    document.getElementById("addHabitBtn").style.display = "flex";

    updateProgress();
    saveHabits();
}

document.addEventListener("DOMContentLoaded", () => {
    loadHabits();

    document.getElementById("newHabitInput").addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            createNewHabit();
        }
    });
});