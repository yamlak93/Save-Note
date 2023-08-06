import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://savenote-38533-default-rtdb.firebaseio.com/"
}
const app = initializeApp(appSettings)
const database = getDatabase(app)
const notesInDB = ref(database, "Notes")
const textInput = document.getElementById("text-input").value
const saveBtn = document.getElementById("save-btn")
const deleteBtn = document.getElementById("delete-btn")
const messageEl = document.getElementById("message-el")
const linkEl = document.getElementById("link-el")

let notecounter = 1
const notesArray = []

deleteBtn.addEventListener("click", function(){
    const textInput = document.getElementById("text-input")
    textInput.value = " "
    
       
})

saveBtn.addEventListener("click", function(){
    const textInput = document.getElementById("text-input").value.trim()
    if(textInput !== '')
    {
        
       
        let notesContent = `<h1>Note${notecounter}</h1>`
        notesContent += `<p>${textInput}</p>`
      
        messageEl.innerHTML = `Note saved.`

        linkEl.textContent=""
       
        push(notesInDB, textInput)
       
        notecounter++

        
    }else{
        alert("Oops! It seems you forgot to add any notes. Please enter your notes first.");
    }
    
})
function  notearray(){
    notesArray.length = 0
    onValue(notesInDB, function(snapshot){
        
        if(snapshot.exists()){
            let snap = snapshot.val()
            let notesArrayInDB = Object.entries(snap)
    
            for(let i = 0; i < notesArrayInDB.length; i++){
                let currentNote = notesArrayInDB[i]
                let currentNoteID = currentNote[0]
                let currentNoteValue = currentNote[1]
                notesArray.push(currentNoteValue)
                appendNotesEl(currentNote)
                
            }
           
        }else{
            messageEl.innerHTML = "No notes here... Yet"
        }
    })
}

notearray()
function appendNotesEl(note){
    let noteID = note[0]
    let noteValue = note[1]
    
    let newNoteEl = document.createElement("li")
    newNoteEl.textContent = noteValue

    newNoteEl.addEventListener("click", function(){
        let exactLocationOfNoteInDB = ref(database, `Notes/${noteID}`)
        linkEl.textContent=""
        remove(exactLocationOfNoteInDB).then(()=>{
            linkEl.removeChild(newNoteEl)
        }).catch((error)=>{
            console.error("Error removing note: ", error)
        })
    })
    linkEl.appendChild(newNoteEl)
   
}