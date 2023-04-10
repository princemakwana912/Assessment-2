// starting the table

let table = document.querySelector('#table');
let thead = table.createTHead();
let tHrow = thead.insertRow();
let tBody = table.createTBody();
let Theading = [{ id: '#' }, { name: 'NAME' }, { description: 'DESCRIPTION' }, { status: 'STATUS' }, { rate: 'RATE' }, { balance: 'BALANCE' }, { deposit: 'DEPOSIT' }, { action: "ACTION" }];

// making heading for the table
Theading.forEach(element => {
    for (const key in element) {
        let theadcell = tHrow.insertCell();
        theadcell.appendChild(document.createTextNode(Object.values(element)[0]));
    }
});


async function getData() {
    let response;
    try {
        response = await fetch('http://localhost:3000/data');
        const data = await response.json();
        createTableBody(data);
        console.log(data);
    } catch (error) {
        console.error(error);
    }
    // console.log(response);

    function createTableBody(responses) {
        table.removeChild(table.getElementsByTagName('tbody')[0]);
        tBody = table.createTBody();
        responses.forEach((value) => {
           let tbody = table.createTBody();
            let id = value.id;
            const tr = tbody.insertRow();
            Theading.forEach((element) => {
                const td = tr.insertCell();
                if (element.action !== "ACTION") {
                    const key = Object.keys(element)[0];
                    td.appendChild(document.createTextNode(value[key]));
                }
                else {
                    let editBtn = document.createElement("button");
                    editBtn.innerText = "Edit";//keep icon of edit here remove text
                    td.appendChild(editBtn);
                    editBtn.setAttribute("class", "editBtn");
                    editBtn.addEventListener("click", () => editData(id))

                    let deleteBtn = document.createElement("button");
                    deleteBtn.innerText = "Delete";//keep icon of delete here remove text
                    td.appendChild(deleteBtn);
                    deleteBtn.setAttribute("class", "deleteBtn");
                    deleteBtn.addEventListener("click", () => deleteData(id))
                }
            })
        });
    };

};



async function editData(id) {

    try {
        
        fetchValue = await fetch(`http://localhost:3000/data/${id}`);
        const response = await fetchValue.json();
        document.querySelector("#name").value = response.name;
        document.querySelector("#description").value = response.description;
        document.querySelector("#status").value = response.status;
        document.querySelector("#rate").value = response.rate;
        document.querySelector("#balance").value = response.balance;
        document.querySelector("#deposit").value = response.deposit;

    } catch (error) {
        console.error(error);
    }

    let update = document.querySelector("#submit")
    update.innerHTML = "Update";



    update.addEventListener("click", () => {
        const fname = document.querySelector("#name").value;
        const descriptions = document.querySelector("#description").value;
        const statuses = document.querySelector("#status").value;
        const rates = document.querySelector("#rate").value;
        const balances = document.querySelector("#balance").value;
        const deposits = document.querySelector("#deposit").value;
        console.log(fname);
        fetch(`http://localhost:3000/data/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: fname,
                description: descriptions,
                status: statuses,
                rate: rates,
                balance: balances,
                deposit: deposits
            }),
        });
    });
};



// function for deleting data
function deleteData(id) {
    fetch(`http://localhost:3000/data/${id}`, {
        method: 'DELETE'
    })
}


function addData() {
    let fname = document.querySelector("#name").value;
    let descriptions = document.querySelector("#description").value;
    let statuses = document.querySelector("#status").value;
    let rates = document.querySelector("#rate").value;
    let balances = document.querySelector("#balance").value;
    let deposits = document.querySelector("#deposit").value;
    fetch('http://localhost:3000/data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: fname,
            description: descriptions,
            status: statuses,
            rate: rates,
            balance: balances,
            deposit: deposits
        })
    })
};





// validation starts here

const input = document.querySelectorAll("input");
input.forEach((element) => {
    element.addEventListener("input", () => {
        let id = element.getAttribute("id");
        // console.log(id);
        const namess = document.getElementById("name");
        const descriptions = document.getElementById("description");
        const statuses = document.getElementById("status");
        const rates = document.getElementById("rate");
        const balances = document.getElementById("balance");
        const deposits = document.getElementById("deposit");
        const nameregex = /^[A-Za-z]{3,25}$/;
        const descriptionregex = /^.{3,150}$/;
        const statusregex = /.+/;
        const rateregex = /^\d+(?:\.\d+)?$/;
        const balanceregex = /^\d+(?:\.\d+)?$/;
        const depositregex = /^\d+(?:\.\d+)?$/;



        if (id === "name") {
            let message = document.querySelector("#name");
            if (!nameregex.test(namess.value)) {
                message.innerHTML = "Please enter a valid name.";
                namess.style.outlineColor = "red";
                message.style.display = "flex";
                return false;
            } else {
                namess.style.outlineColor = "green";
                message.style.dusplay = "none";
            }
        }
        if (id === "description") {
            let message = document.querySelector("#description");
            if (!descriptionregex.test(namess.value)) {
                message.innerHTML = "Please enter a valid name.";
                descriptions.style.outlineColor = "red";
                message.style.display = "flex";
                return false;
            } else {
                descriptions.style.outlineColor = "green";
                message.style.dusplay = "none";
            }
        }
        if (id === "status") {
            let message = document.querySelector("#status");
            if (!statusregex.test(namess.value)) {
                message.innerHTML = "Please enter a valid name.";
                statuses.style.outlineColor = "red";
                message.style.display = "flex";
                return false;
            } else {
                statuses.style.outlineColor = "green";
                message.style.dusplay = "none";
            }
        }
        if (id === "rate") {
            let message = document.querySelector("#rate");
            if (!rateregex.test(namess.value)) {
                message.innerHTML = "Please enter a valid name.";
                rates.style.outlineColor = "red";
                message.style.display = "flex";
                return false;
            } else {
                rates.style.outlineColor = "green";
                message.style.dusplay = "none";
            }
        }
        if (id === "balance") {
            let message = document.querySelector("#balance");
            if (!balanceregex.test(namess.value)) {
                message.innerHTML = "Please enter a valid name.";
                balances.style.outlineColor = "red";
                message.style.display = "flex";
                return false;
            } else {
                balances.style.outlineColor = "green";
                message.style.dusplay = "none";
            }
        }
        if (id === "deposit") {
            let message = document.querySelector("#deposit");
            if (!depositregex.test(namess.value)) {
                message.innerHTML = "Please enter a valid name.";
                deposits.style.outlineColor = "red";
                message.style.display = "flex";
                return false;
            } else {
                deposits.style.outlineColor = "green";
                message.style.dusplay = "none";
            }
        }

    })
});








getData();