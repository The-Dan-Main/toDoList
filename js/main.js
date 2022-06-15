"strict use"
const todayDate = new Date().toLocaleDateString("ge-CH", {year: 'numeric', month: '2-digit', day: '2-digit'})
const allCards = []
const activeCards = []
const finishedCards = []

/** create base of cards */
let taskCards = document.querySelectorAll(".task-card")

// console.log(allCards)
allCards.push(taskCards)
// console.log(allCards)


allCards.forEach(function(currentValue) {
    console.log("currentValue", currentValue)
    for (let i in currentValue) {
        console.log("i:",currentValue[i])
        if (currentValue[i].classList.contains("finished")) {
            console.log("finished task found")
            finishedCards.push(currentValue[i])
            console.log("finishedCards:", finishedCards)
    }
    }
})

// for (let i of allCards) {
//     console.log("taskCard: ", i)
//     console.log("Classname", i.className)
    // if (i.className === "finished") {
    //     console.log("finished task found")
    //     finishedCards.push(taskCard)
    // }
// }


console.log("Finished Card:",finishedCards)




/** New Task adding */
let newTaskSection = document.querySelector(".new-task-img")
let newTaskCard = document.querySelector(".new-task-card")

newTaskSection.addEventListener("click", () => {
    toggleNewTaskSection()
})

const toggleNewTaskSection = () => {
   console.log("bild wurde geklickt")
   console.log(newTaskCard.style.display.value)
   if (newTaskCard.style.display === "none") {
    newTaskCard.style.display = "flex"
   } else {
    newTaskCard.style.display = "none"
   }
    

}




















for (let taskCard of taskCards) {
    // console.log(taskCard)
    taskCard.addEventListener("click", () => {
        console.log("Card wurde geklickt")
    })
}




// console.log(newTaskSection)




















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