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
                const listItem = document.createElement('li');
                listItem.textContent = inputValue;
                listItem.onclick = check;
                document.getElementById('list').appendChild(listItem);

                allData.push(inputValue);
                localStorage.setItem('listData', JSON.stringify(allData));

                inputElement.value = '';
            }
        }
// gbt
        function check() {
            const listItem = this;
            const checkedListElement = document.getElementById('checkedList');
            checkedListElement.appendChild(listItem);

            const itemIndex = allData.indexOf(listItem.textContent);
            if (itemIndex > -1) {
                allData.splice(itemIndex, 1);
                localStorage.setItem('listData', JSON.stringify(allData));

                checkedData.push(listItem.textContent);
                localStorage.setItem('checkedData', JSON.stringify(checkedData));
            }
            listItem.style.textDecoration = 'line-through';

            listItem.onclick = null;
        }

        function doClear() {
            localStorage.removeItem('checkedData');
            checkedData = []; 
            document.getElementById('checkedList').innerHTML = '';
        }