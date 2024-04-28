let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
let totalAmount = 0;

const categorySelect = document.getElementById('category-select');
const amountInput = document.getElementById('amount-input');
const dateInput = document.getElementById('date-input');
const addBtn = document.getElementById('add-btn');
const expensesTableBody = document.getElementById('expense-table-body');
const totalAmountCell = document.getElementById('total-amount');

// Function to update local storage with current expenses
function updateLocalStorage() {
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

// Function to update the total amount display
function updateTotalAmount() {
    totalAmount = expenses.reduce((acc, expense) => acc + expense.amount, 0);
    totalAmountCell.textContent = totalAmount;
}

// Function to render expenses table
function renderExpenses() {
    expensesTableBody.innerHTML = '';
    expenses.forEach((expense, index) => {
        const newRow = expensesTableBody.insertRow();
        const categoryCell = newRow.insertCell();
        const amountCell = newRow.insertCell();
        const dateCell = newRow.insertCell();
        const deleteCell = newRow.insertCell();
        const deleteBtn = document.createElement('button');

        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', function() {
            if (confirm("Are you sure you want to delete this expense?")) {
                expenses.splice(index, 1);
                updateLocalStorage();
                renderExpenses();
                updateTotalAmount();
            }
        });

        categoryCell.textContent = expense.category;
        amountCell.textContent = expense.amount;
        dateCell.textContent = expense.date;
        deleteCell.appendChild(deleteBtn);
    });
}

// Event listener for adding an expense
addBtn.addEventListener('click', function() {
    const category = categorySelect.value;
    const amount = amountInput.value.trim(); // Remove leading and trailing whitespaces
    const date = dateInput.value;

    if (category === '') {
        alert('Please select a category');
        return;
    }
    if (!amount || isNaN(parseFloat(amount))) { // Check if amount is not a valid number
        alert('Please enter a valid amount');
        return;
    }
    if (date === '') {
        alert('Please select a date');
        return;
    }

    // Convert amount to number
    const parsedAmount = parseFloat(amount);
    
    // Create new expense object
    const newExpense = { category, amount: parsedAmount, date };
    expenses.push(newExpense);
    
    // Update local storage and render expenses
    updateLocalStorage();
    renderExpenses();
    updateTotalAmount();
});

// Load expenses when the page is loaded
window.addEventListener('load', function() {
    renderExpenses();
    updateTotalAmount();
});

// Function to clear all expenses and local storage
function clearAllExpenses() {
    if (confirm("Are you sure you want to delete all expenses?")) {
        expenses = [];
        localStorage.removeItem('expenses');
        renderExpenses();
        updateTotalAmount();
    }
}
