 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
 import { getFirestore, doc, getDoc, setDoc  ,updateDoc} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";

 const firebaseConfig = {
   apiKey: "AIzaSyC5Y2iQ_xLCCkqMMCyUyVVlCnWZGIx4hmE",
   authDomain: "todo-app-bf0be.firebaseapp.com",
   projectId: "todo-app-bf0be",
   storageBucket: "todo-app-bf0be.appspot.com",
   messagingSenderId: "582200562606",
   appId: "1:582200562606:web:b4b0d196cd687c3f2a6e3f",
   measurementId: "G-5D6J4FH4LG"
 };

 const app = initializeApp(firebaseConfig);
 const db = getFirestore(app);

 async function loadDatabaseData(){
    const docRef = doc(db, "allTodoData", `${localStorage.getItem("MKA-Email")}`);
    const docSnap = await getDoc(docRef);
 let unchecked=[],checked=[]
 let data={
    unchecked:[],
    checked:[]
}
 if (docSnap.exists()) {
   console.log("Document data:", docSnap.data().unchecked);
   unchecked=docSnap.data().unchecked;
   checked=docSnap.data().checked
   console.log(unchecked)
   console.log(checked)

   const listElement = document.getElementById('list');
   const checkedListElement = document.getElementById('checkedList');
listElement.innerHTML=''
checkedListElement.innerHTML=''
for (let i = 0; i < unchecked.length; i++) {
const listItem = document.createElement('li');
listItem.textContent = unchecked[i];
listItem.onclick = check;
listElement.appendChild(listItem);
}

for (let i = 0; i < checked.length; i++) {
const listItem = document.createElement('li');
listItem.textContent = checked[i];
listItem.style.textDecoration = 'line-through';

checkedListElement.appendChild(listItem);
}



 } else {
    await setDoc(doc(db, "allTodoData", `${localStorage.getItem("MKA-Email")}`), data);
    loadDatabaseData()
 }

 }
async function setData(type,value){
    let unchecked=[],checked=[]
    const docRef = doc(db, "allTodoData", `${localStorage.getItem("MKA-Email")}`);
    const docSnap = await getDoc(docRef);
    unchecked=docSnap.data().unchecked;
    checked=docSnap.data().checked
    if(type=="unchecked"){
        unchecked.push(value)
    }else if(type=="checked"){
        checked.push(value)
    }
    let data={
        unchecked:unchecked,
        checked:checked
    }
    await setDoc(doc(db, "allTodoData", `${localStorage.getItem("MKA-Email")}`), data);
    loadDatabaseData()

}
 loadDatabaseData()

 let allData = JSON.parse(localStorage.getItem('listData')) || [];
        let checkedData = JSON.parse(localStorage.getItem('checkedData')) || [];
        loadData();

        function loadData() {
            const listElement = document.getElementById('list');
            const checkedListElement = document.getElementById('checkedList');

    for (let i = 0; i < allData.length; i++) {
        const listItem = document.createElement('li');
        listItem.textContent = allData[i];
        listItem.onclick = check;
        listElement.appendChild(listItem);
    }

    for (let i = 0; i < checkedData.length; i++) {
        const listItem = document.createElement('li');
        listItem.textContent = checkedData[i];
        checkedListElement.appendChild(listItem);
    }
        }

        function addInput() {
            const inputElement = document.getElementById('input');
            const inputValue = inputElement.value.trim();

            if (inputValue === '') {
                alert("Enter Data");
            } else {
               
                setData("unchecked",inputValue)
                loadDatabaseData()

                inputElement.value = '';
            }
        }
// gbt
        async function check() {
            const listItem = this;
            // const checkedListElement = document.getElementById('checkedList');
            // checkedListElement.appendChild(listItem);

            // const itemIndex = allData.indexOf(listItem.textContent);
            setData("checked",listItem.innerHTML)
            loadDatabaseData()

            const docRef = doc(db, "allTodoData", `${localStorage.getItem("MKA-Email")}`);
            const docSnap = await getDoc(docRef);
         let unchecked=[]

           unchecked=docSnap.data().unchecked

           const index = unchecked.indexOf(listItem);
           const x = unchecked.splice(index, 1);
        const dataa = doc(db, "allTodoData", `${localStorage.getItem("MKA-Email")}`);
console.log(unchecked)
        await updateDoc(dataa, {
          unchecked:  unchecked
        });
    }

        async function doClear() {
            let checked=[]
            const dataa = doc(db, "allTodoData", `${localStorage.getItem("MKA-Email")}`);
                    await updateDoc(dataa, {
                      checked:  checked
                    });
            loadDatabaseData();
        }

        window.addInput=addInput
        window.doClear=doClear