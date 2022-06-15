"strict use"
const todayDate = new Date().toLocaleDateString("ge-CH", {year: 'numeric', month: '2-digit', day: '2-digit'})
let allCards = []
let activeCards = []
let finishedCards = []

/** create base of cards */


const updateTasks = () => {
    /** all Cards */
    let taskCards = document.querySelectorAll(".task-card")
    allCards = taskCards
    console.log("All Cards:",allCards.length)

    /**finished cards */
    let fnCards = document.querySelectorAll(".finished")
    finishedCards = fnCards
    console.log("Finished Cards:",finishedCards.length)

    /** active cards */
    let acCards = document.querySelectorAll(".task-card:not(.finished)")
    activeCards = acCards
    console.log("Active Cards:",activeCards.length)

    let allTasksCounter = document.getElementById("all-task-counter")
    let openTasksCounter = document.getElementById("open-task-counter")
    let finishedTasksCounter = document.getElementById("finished-task-counter")

    allTasksCounter.innerText = allCards.length
    openTasksCounter.innerText = activeCards.length
    finishedTasksCounter.innerText = finishedCards.length
}
updateTasks()





/** New Task adding Section Toggle */
let newTaskSection = document.querySelector(".new-task-img")
let newTaskCard = document.querySelector(".new-task-card")

newTaskSection.addEventListener("click", () => {
    toggleNewTaskSection()
})

const toggleNewTaskSection = () => {
//    console.log("bild wurde geklickt")
   if (newTaskCard.style.display === "none") {
    newTaskCard.style.display = "flex"
   } else {
    newTaskCard.style.display = "none"
   }
    

}




/** Card finish toggle */
const cardFinishToggle = () => {
    let finishButtons = document.querySelectorAll(".task-finish-button")
    for (const button of finishButtons) {
        button.addEventListener("click", () => {
            console.log("finish button is clicked")
            let parent = button.parentElement.parentElement
           parent.classList.toggle("finished")
            if (parent.classList.contains("finished")) {button.innerText = "unfinish"}
            else {button.innerText = "finish"}
            updateTasks()
        })
    }
}
cardFinishToggle()





/** build new card */
const createNewTaskCard = (title) => {
    const displaySection = document.querySelector(".tasks-cards-display-section")
    const newDivElement = document.createElement("div")
    newDivElement.classList.add("task-card", "flex-container")
/** ------------------------------first section-------------------------------------- */
        const newDivElementfirstSection = document.createElement("div")
        newDivElementfirstSection.classList.add("flex-container", "task-card-title-section")

            const newFirstImg = document.createElement("img")
            newFirstImg.classList.add("task-card-arrow")
            newFirstImg.srcset = "./img/arrow2.png"

            const newFirstInput = document.createElement("input")
            newFirstInput.classList.add("task-title")
            newFirstInput.value = title

            newDivElementfirstSection.appendChild(newFirstImg)
            newDivElementfirstSection.appendChild(newFirstInput)

/** -------------------------------second section------------------------------------ */
        const newDivElementSecondSection = document.createElement("div")
        newDivElementSecondSection.classList.add("task-created")

            const newSecondH3 = document.createElement("h3")
            const newSecondSpan = document.createElement("span")
            newSecondSpan.classList.add("task-created-date")
            newSecondSpan.innerText = todayDate
            newSecondH3.innerHTML = "created on: "

            /** perhaps to nest span in h3 different if not properly shown */
            newDivElementSecondSection.appendChild(newSecondH3)
            newSecondH3.appendChild(newSecondSpan)


/** -----------------------------thrid section--------------------------------------- */
        const newDivElementThirdSection = document.createElement("div")
        newDivElementThirdSection.classList.add("task-buttons")

            const newThirdButtonEdit = document.createElement("button")
            newThirdButtonEdit.classList.add("task-edit-button")
            newThirdButtonEdit.innerText = "edit"

            const newThirdButtonFinish = document.createElement("button")
            newThirdButtonFinish.classList.add("task-finish-button")
            newThirdButtonFinish.innerText = "finish"

            newDivElementThirdSection.appendChild(newThirdButtonEdit)
            newDivElementThirdSection.appendChild(newThirdButtonFinish)

/** ---------------------------Combinator------------------------------------ */
        newDivElement.appendChild(newDivElementfirstSection)
        newDivElement.appendChild(newDivElementSecondSection)
        newDivElement.appendChild(newDivElementThirdSection)

        displaySection.appendChild(newDivElement)

        cardFinishToggle()
        updateTasks()
}

const addNowInput = document.getElementById("new-task-input")
addNowInput.addEventListener("keypress", (event) => {
    let inputText = document.getElementById("new-task-input")
    if (event.key === "Enter" && addNowInput.value !== "") {
        createNewTaskCard(inputText.value)
        inputText.value = ""
    }
})

const addNowButton = document.getElementById("new-task-button")
addNowButton.addEventListener("click", () => {
    let inputText = document.getElementById("new-task-input")
    if (inputText !== "") {
        createNewTaskCard(inputText.value)
        inputText.value = ""
    }
})

























// const testCases = [
//     new Date().toLocaleDateString(), // 8/19/2020
//     new Date().toLocaleString(undefined, {year: 'numeric', month: '2-digit', day: '2-digit', weekday:"long", hour: '2-digit', hour12: false, minute:'2-digit', second:'2-digit'}),
//     new Date().toLocaleDateString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit'}), // 08/19/2020 (month and day with two digits)
//     new Date().toLocaleDateString('en-ZA'), // 2020/08/19 (year/month/day) notice the different locale
//     new Date().toLocaleDateString('en-CA'), // 2020-08-19 (year-month-day) notice the different locale
//     new Date().toLocaleString("en-US", {timeZone: "America/New_York"}), // 8/19/2020, 9:29:51 AM. (date and time in a specific timezone)
//     new Date().toLocaleString("en-US", {hour: '2-digit', hour12: false, timeZone: "America/New_York"}),  // 09 (just the hour)
//   ]
  
//   for (const testData of testCases) {
//     console.log(testData)
//   }