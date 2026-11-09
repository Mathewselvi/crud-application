let expenses = []

if (localStorage.getItem("expenses")) {
    expenses = JSON.parse(localStorage.getItem("expenses"))
}

displayexpenselist()

expenseform.addEventListener(`submit`, (event) => {
    event.preventDefault()

    const expensenameinput = expensename.value
    const amountinput = amount.value
    const categoryinput = category.value
    const dateinput = date.value

    if (expensenameinput && amountinput && categoryinput && dateinput) {
        const editindex = editstatus.value

        if (editindex === "") {
            expenses.push({ expensename: expensenameinput, amount: amountinput, category: categoryinput, date: dateinput })
        } else {
            expenses[editindex] = { expensename: expensenameinput, amount: amountinput, category: categoryinput, date: dateinput }
            editstatus.value = ""
        }
    } else {
        alert("Please fill the form completely")
        return;
    }

    expenseform.reset()
    localStorage.setItem("expenses", JSON.stringify(expenses))
    displayexpenselist()
})

// filter dropdown triggers a re-render
filtercategory.addEventListener(`change`, () => {
    displayexpenselist()
})

// display expense array (skips rows that don't match the filter, keeps real index)
function displayexpenselist() {
    tablebody.innerHTML = ""
    let total = 0
    const selectedcategory = filtercategory.value

    expenses.forEach((item, index) => {
        if (selectedcategory !== "All" && item.category !== selectedcategory) {
            return
        }

        total += Number(item.amount)

        tablebody.innerHTML += `
        <tr>
          <td>${index + 1}</td>
          <td>${item.expensename}</td>
          <td>${item.amount}</td>
          <td>${item.category}</td>
          <td>${item.date}</td>
          <td>
            <button class="btn btn-warning" onclick="editexpense(${index})">Edit</button>
            <button class="btn btn-danger" onclick="delexpense(${index})">Delete</button>
          </td>
        </tr>`
    })

    totalamount.innerText = total.toFixed(2)
}

// edit expense
function editexpense(expenseindex) {
    const expensedetails = expenses[expenseindex]
    expensename.value = expensedetails.expensename
    amount.value = expensedetails.amount
    category.value = expensedetails.category
    date.value = expensedetails.date
    editstatus.value = expenseindex
}

// delete expense
function delexpense(expenseindex) {
    if (confirm("Are you sure you want to delete the data?")) {
        expenses.splice(expenseindex, 1)
        localStorage.setItem("expenses", JSON.stringify(expenses))
        displayexpenselist()
    }
}
