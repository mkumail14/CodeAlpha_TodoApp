 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
 import { getFirestore, doc, getDoc, setDoc  ,updateDoc} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";

 const firebaseConfig1 = {
    apiKey: "AIzaSyDdPmw7EHBU-AwoDQ1szeW7WtHANaF30Q0",
    authDomain: "xo-game-c2506.firebaseapp.com",
    projectId: "xo-game-c2506",
    storageBucket: "xo-game-c2506.appspot.com",
    messagingSenderId: "1003496744924",
    appId: "1:1003496744924:web:34f59f5e9df9d261831119",
    measurementId: "G-701HCZH6H9"
  };

 const app1 = initializeApp(firebaseConfig1,"app1");
 const db = getFirestore(app1);
 document.getElementById('loader').style.width='0%'

 async function loadDatabaseData(){
    loadLoader()
    const docRef = doc(db, "allTodoData", `${localStorage.getItem("MKA-Email")}`);
    const docSnap = await getDoc(docRef);
 let unchecked=[],checked=[]
 let data={
    unchecked:[],
    checked:[]
}
 if (docSnap.exists()) {
   unchecked=docSnap.data().unchecked;
   checked=docSnap.data().checked
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
                inputElement.value = '';
                setData("unchecked",inputValue)
                loadDatabaseData()
            }
        }

        async function check() {
            const listItem = this;

            setData("checked",listItem.innerHTML)
            loadDatabaseData()
            const docRef = doc(db, "allTodoData", `${localStorage.getItem("MKA-Email")}`);
            const docSnap = await getDoc(docRef);
         let unchecked=[]
           unchecked=docSnap.data().unchecked
           const index = unchecked.indexOf(listItem.innerText);
           const x = unchecked.splice(index, 1);
        const dataa = doc(db, "allTodoData", `${localStorage.getItem("MKA-Email")}`);
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

        function loadLoader(){
            let i=0
            setInterval(function(){
                if(i==0){
                    document.getElementById('loader').style.width='30%'
                }else if(i==1){
                    document.getElementById('loader').style.width='60%'
                }else if(i==2){
                    document.getElementById('loader').style.width='100%'
                }else{
                    document.getElementById('loader').style.width='0%'
                }
                i++
            },1000)
        }

        window.addInput=addInput
        window.doClear=doClear