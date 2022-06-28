"strict use"
const todayDate = 
    new Date().toLocaleDateString(
        "en-CH", 
        { year: 'numeric', month: '2-digit', day: '2-digit'},
        )
;

const todayTime = timer();

function timer() {
    let date = new Date();
    let hh = date.getHours();
    let mm = date.getMinutes();
    let ss = date.getSeconds();
    let session = "AM";

    if (hh == 0) {
        hh = 12;
    }
    if (hh > 12) {
        hh = hh - 12;
        session = "PM";
    }

    hh = (hh < 10) ? "0" + hh : hh;
    mm = (mm < 10) ? "0" + mm : mm;
    ss = (ss < 10) ? "0" + ss : ss;

    let t_str = hh + ":" + mm + ":" + ss + " " + session;
    // document.getElementById('time_span').innerHTML = t_str;
    setTimeout(timer, 1000);

    return t_str
}

let allCards = []
let activeCards = []
let finishedCards = []

/** create base of cards */
const updateTasks = () => {
    /** all Cards */
    let taskCards = document.querySelectorAll(".task-card")
    allCards = taskCards
    console.log("All Cards:", allCards)

    /**finished cards */
    let fnCards = document.querySelectorAll(".finished")
    finishedCards = fnCards
    console.log("Finished Cards:", finishedCards)

    /** active cards */
    let acCards = document.querySelectorAll(".task-card:not(.finished)")
    activeCards = acCards
    console.log("Active Cards:", activeCards)

    let allTasksCounter = document.getElementById("all-task-counter")
    let openTasksCounter = document.getElementById("open-task-counter")
    let finishedTasksCounter = document.getElementById("finished-task-counter")

    allTasksCounter.innerText = allCards.length
    openTasksCounter.innerText = activeCards.length
    finishedTasksCounter.innerText = finishedCards.length
}


/** New Task adding Section Toggle */
let newTaskSection = document.querySelector(".new-task-img")
let newTaskCard = document.querySelector(".new-task-card")

newTaskCard.style.display = "none"

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
    newFirstInput.readOnly = "true"
    newFirstInput.disabled = "true"

    newDivElementfirstSection.appendChild(newFirstImg)
    newDivElementfirstSection.appendChild(newFirstInput)

    /** -------------------------------second section------------------------------------ */
    const newDivElementSecondSection = document.createElement("div")
    newDivElementSecondSection.classList.add("task-created")

    const newSecondH3 = document.createElement("h3")
    const newSecondSpan = document.createElement("h4")
    newSecondSpan.classList.add("task-created-date")
    newSecondSpan.innerText = todayDate + " // " + timer()
    newSecondH3.innerHTML = "created on: "

    /** perhaps to nest span in h3 different if not properly shown */
    newDivElementSecondSection.appendChild(newSecondH3)
    newDivElementSecondSection.appendChild(newSecondSpan)


    /** -----------------------------thrid section--------------------------------------- */
    const newDivElementThirdSection = document.createElement("div")
    newDivElementThirdSection.classList.add("task-buttons")

    const newThirdButtonEdit = document.createElement("button")
    newThirdButtonEdit.classList.add("task-edit-button")
    newThirdButtonEdit.innerText = "edit"

    const newThirdButtonFinish = document.createElement("button")
    newThirdButtonFinish.classList.add("task-finish-button")
    newThirdButtonFinish.innerText = "finish"
    cardFinishToggle(newThirdButtonFinish)

    newDivElementThirdSection.appendChild(newThirdButtonEdit)
    newDivElementThirdSection.appendChild(newThirdButtonFinish)

    /** ---------------------------Combinator------------------------------------ */
    newDivElement.appendChild(newDivElementfirstSection)
    newDivElement.appendChild(newDivElementSecondSection)
    newDivElement.appendChild(newDivElementThirdSection)


    displaySection.appendChild(newDivElement)

    hidePlaceholder()
    hideWhenFilteredAndClicked()
    updateTasks()
    hideAllDone()
    InputEditButton(newDivElement)

}

/** clears input for new tasks and adds task to display section */
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
    if (inputText.value !== "") {
        createNewTaskCard(inputText.value)
        inputText.value = ""
    }
})

/** filter tasks by status */
let filters = document.querySelectorAll(".filter-section-list-items")

const filterApply = () => {
    for (let filter of filters) {

        filter.addEventListener("click", () => {

            filters.forEach(function (item) {
                item.classList.remove("task-cards-filters-focused")
            })
            if (filter.classList.contains("all-tasks")) {
                hideAllDone()
                filter.classList.toggle("task-cards-filters-focused")
                for (card of allCards) {
                    const displaySection = document.querySelector(".tasks-cards-display-section")
                    let cards = document.querySelectorAll(".task-card")
                    cards.forEach(function (item) {
                        item.style.display = "none"
                    })
                    for (card of allCards) {
                        card.style.display = "flex"
                    }
                }
                
            } else

                if (filter.classList.contains("open-tasks")) {
                    
                    filter.classList.toggle("task-cards-filters-focused")
                    const displaySection = document.querySelector(".tasks-cards-display-section")
                    let cards = document.querySelectorAll(".task-card")
                    cards.forEach(function (item) {
                        item.style.display = "none"
                    })
                    for (card of activeCards) {
                        card.style.display = "flex"
                    }
                    showAllDOne()
                } else

                    if (filter.classList.contains("finished-tasks")) {
                        hideAllDone()
                        filter.classList.toggle("task-cards-filters-focused")
                        const displaySection = document.querySelector(".tasks-cards-display-section")
                        let cards = document.querySelectorAll(".task-card")
                        cards.forEach(function (item) {
                            item.style.display = "none" 
                        })
                        for (card of finishedCards) {
                            card.style.display = "flex"
                        }
                    }


        })
    }
}
filterApply()


/** Card finish toggle */
const cardFinishToggle = (button) => {

    button.addEventListener("click", () => {
        let createdOnTitle = button.parentElement.parentElement.children[1].firstChild
        let createdOnTime = button.parentElement.parentElement.children[1].lastChild
        createdOnTitle.innerText = "finished on:"
        createdOnTime.innerText = todayDate + " // " + timer()

        console.log("-----------------")
        let parent = button.parentElement.parentElement
        parent.classList.toggle("finished")
        if (parent.classList.contains("finished")) { button.innerText = "unfinish" }
        else { button.innerText = "finish" }
        updateTasks()
        showAllDOne()
    })
}



/** Card finish toggle */
const hideWhenFilteredAndClicked = () => {
    
    let finishButtons = document.querySelectorAll(".task-finish-button")
    for (const button of finishButtons) {
        button.addEventListener("click", () => {
            
            
            

            let whichFilter = document.querySelector(".task-cards-filters-focused")
            // console.log("whichfilter is on: ", whichFilter.classList[1])

            let allFilter = whichFilter.classList.contains("all-tasks")
            if (allFilter) {
                allCards.forEach(function (item) { item.style.display = "flex" }
                )
            }

            let openFilter = whichFilter.classList.contains("open-tasks")
            if (openFilter) {
                allCards.forEach(function (item) {
                    if (item.classList.contains("finished")) {
                        item.style.display = "none"
                    }
                })
            }

            let finishedFilter = whichFilter.classList.contains("finished-tasks")
            if (finishedFilter) {
                allCards.forEach(function (item) {
                    if (!item.classList.contains("finished")) {
                        item.style.display = "none"
                    }
                })
            }
        })
    }
}





/** only show placeholder when empty display section, before first input */
 const hidePlaceholder = () => {
    let placeholder = document.getElementById("display-section-placeholder")
    placeholder.style.display = "none"
 }

/** show "all done" when empty display section after all tasks finished */

const showAllDOne = () => {
    let activeFilter = document.querySelector(".task-cards-filters-focused")
    let allDone = document.getElementById("display-section-allDone")
    // console.log("active cards: ",activeCards)
    if (activeFilter.classList.contains("open-tasks") && activeCards.length === 0) {
        console.log("keine Aktive Tasks gefunden")
        allDone.style.display = "block"
    }
}
// showAllDOne()

const hideAllDone = () => {
    let allDone = document.getElementById("display-section-allDone")
    allDone.style.display = "none"
}



/** when edit button clicked, only then input is editable  */
const InputEditButton = (newElement) => {
    let editButton2 = newElement.lastChild.firstChild
    let inputField = editButton2.parentElement.parentElement.firstChild.lastChild
    let createdOnTitle = editButton2.parentElement.parentElement.children[1].firstChild
    let createdOnTime = editButton2.parentElement.parentElement.children[1].lastChild

    editButton2.addEventListener("click", () => {
        createdOnTitle.innerText = "last edited on:"
        createdOnTime.innerText = todayDate + " // " + timer()


        if (inputField.disabled) {
            // console.log("input: ", inputField)
            inputField.disabled = false
            inputField.readOnly = false
            inputField.focus()
        } else {
            inputField.disabled = true
            inputField.readOnly = true
        }
    })
    inputField.addEventListener("keypress", (event) => {
        if (event.key === "Enter" && !inputField.disabled) {
            inputField.disabled = true
            inputField.readOnly = true
        }
    })
    inputField.addEventListener("focusout", () => {
        inputField.disabled = true
        inputField.readOnly = true
    })

}







/** when no finished task, show "no-task yet"  */

/** create new branch and try implement a "delete task option" */

/** create new branch and try implement "finish-all or "unfinsish all" functions */

/** start to build a login page with a form */

/** start to build a contact page */


