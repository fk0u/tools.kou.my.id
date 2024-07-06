function loadExpenses() {
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    const expenseList = document.getElementById('expenseList');
    const total = document.getElementById('total');
    expenseList.innerHTML = '';
    let totalAmount = 0;

    expenses.forEach(expense => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            ${expense.name} - $${expense.amount}
            <button onclick="removeExpense('${expense.id}')">Remove</button>
        `;
        expenseList.appendChild(listItem);
        totalAmount += parseFloat(expense.amount);
    });

    total.innerHTML = `Total: $${totalAmount.toFixed(2)}`;
}

function addExpense() {
    const expenseName = document.getElementById('expenseName').value;
    const expenseAmount = document.getElementById('expenseAmount').value;
    const expenseList = document.getElementById('expenseList');
    const total = document.getElementById('total');

    if (expenseName.trim() === '' || expenseAmount.trim() === '') {
        alert('Please enter a valid expense name and amount');
        return;
    }

    const expense = {
        id: Date.now().toString(),
        name: expenseName,
        amount: parseFloat(expenseAmount).toFixed(2)
    };

    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses.push(expense);
    localStorage.setItem('expenses', JSON.stringify(expenses));

    loadExpenses();
    document.getElementById('expenseName').value = '';
    document.getElementById('expenseAmount').value = '';
}

function removeExpense(id) {
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses = expenses.filter(expense => expense.id !== id);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    loadExpenses();
}

function goBack() {
    window.history.back();
}
