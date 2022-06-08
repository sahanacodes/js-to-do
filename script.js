
newItem = document.getElementById('addItem');

function getAndUpdate() {
    task = document.getElementById('name').value;
    desc = document.getElementById('description').value;

    if(localStorage.getItem('itemsJson')==null)
    {
        itemJsonArray = [];
        itemJsonArray.push([task, desc]);
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
    }
    else{
        itemJsonArrayStr = localStorage.getItem('itemsJson');
        itemJsonArray = JSON.parse(itemJsonArrayStr);
        itemJsonArray.push([task, desc]);
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
    }
    update();
}

function update() {
    if(localStorage.getItem('itemsJson')==null)
    {
        itemJsonArray = [];
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
    }
    else{
        itemJsonArrayStr = localStorage.getItem('itemsJson');
        itemJsonArray = JSON.parse(itemJsonArrayStr);
    }

    let tableBody = document.getElementById('tableBody');
    let str = "";

    itemJsonArray.forEach((element, index) => {
        str += `
            <tr>
            <td>${index+1}</td>
            <td>${element[0]}</td>
            <td>${element[1]}</td>
            <td><button type="submit" class="registerbtn" onclick="deleted(${index})">Delete</button></td>
            </tr>`;
    });

    tableBody.innerHTML = str;
}

newItem.addEventListener('click', getAndUpdate);
update();

function deleted(itemIndex) {
    itemJsonArrayStr = localStorage.getItem('itemsJson');
    itemJsonArray = JSON.parse(itemJsonArrayStr);
    itemJsonArray.splice(itemIndex, 1);
    localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
    update();
}

function clearStorage() {

    if(confirm("Are you sure you want to clear?"))
    {
        localStorage.clear();
        console.log("Clearing Storage");
        update();
    }   
}
