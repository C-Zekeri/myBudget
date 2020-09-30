//First of all, bienvenue. Je m'appelle La Professeur, et tu?
const income = document.getElementById('income-amount');
const noBudgetContent = document.querySelector('.no-budget');
const newBudgetContent = document.querySelector('.new-budget');
const displayBudgetContent = document.querySelector('.display-budget');
const budgetCategories = document.querySelector('.budget-categories');
const displayCategories = document.querySelector('.display__categories');
let categories = [];
let sum = 0;

const createBtn = document.getElementById('create-budget');
const editBtn = document.getElementById('edit-budget');
const deleteBtn = document.getElementById('delete-budget');
const saveBtn = document.getElementById('save-budget');

createBtn.addEventListener('click', createBudget);
editBtn.addEventListener('click', editBudget);
deleteBtn.addEventListener('click', showDeleteOptions);

function createBudget() {
    const addBtn = document.querySelector('.add-category');

    //add listeners to save and add buttons
    saveBtn.addEventListener('click', saveBudget);
    addBtn.addEventListener('click', createCategory);
    //disable save button until a category is added
    saveBtn.disabled = true;

    //display create budget interface
    noBudgetContent.classList.add('hide');
    newBudgetContent.classList.remove('hide');
}

function createCategory() {
    //create new elements
    const category = document.createElement('div');
    const nameLabel = document.createElement('label');
    const categoryName = document.createElement('input');
    const amountLabel = document.createElement('label');
    const categoryAmount = document.createElement('input');

    //define attributes of new label elements
    nameLabel.innerText = "Category";
    nameLabel.htmlFor = "category";
    amountLabel.innerText = "Amount";
    amountLabel.htmlFor = "amount";
    categoryAmount.setAttribute("type", "number");

    //assign classes to new elements
    category.classList.add('budget-category');
    categoryName.classList.add('budget-category__name');
    categoryAmount.classList.add('budget-category__amount');

    //append new elements to parent elements
    budgetCategories.appendChild(category);
    category.appendChild(nameLabel);
    nameLabel.appendChild(categoryName);
    category.appendChild(amountLabel);
    amountLabel.appendChild(categoryAmount);

    //create object for new category
    let newCategory = { name: "", amount: "" };

    //modify category values as user updates them
    categoryName.addEventListener('keyup', modifyValues);
    categoryAmount.addEventListener('keyup', modifyValues);

    function modifyValues() {
        newCategory.name = categoryName.value;
        newCategory.amount = Number(categoryAmount.value);

        budgetSum();
        incomeBalance();
        saveBtn.disabled = false;
    }

    //push new category to array of categories
    categories.push(newCategory);
}

function budgetSum() {
    sum = 0;
    const sumContainer = document.querySelector('.budget-sum');
    const displaySumContainer = document.querySelector('.display__budget-sum');

    for (const i of categories) {
        sum += i.amount;
    }

    sumContainer.innerHTML = `<strong>Total Amount:</strong> #${sum}`;
    displaySumContainer.innerHTML = `<strong>Total Amount:</strong> #${sum}`;
}

function incomeBalance() {
    const incomeBalanceContainer = document.querySelector('.income-balance');
    const displayBalanceContainer = document.querySelector('.display__income-balance');
    let incomeAmount = Number(income.value);

    function subtract() {
        //subtract sum of budget cost from income
        let incomeRemainder = incomeAmount - sum;
        //display income left over after subtraction
        incomeBalanceContainer.innerHTML = `<strong>Remainder:</strong> #${incomeRemainder}`;
        displayBalanceContainer.innerHTML = `<strong>Remainder:</strong> #${incomeRemainder}`;
    }
    subtract();

    //update incomeAmount as user changes value
    income.addEventListener('change', e => {
        incomeAmount = Number(income.value);
        subtract();
    })
}

function saveBudget() {
    newBudgetContent.classList.add('hide');
    displayBudgetContent.classList.remove('hide');

    displayBudget();
}

function displayBudget() {
    for (i of categories) {
        let percentage = (i.amount / income.value) * 100;

        const displayCategory = document.createElement('div');
        displayCategory.classList.add('display-category');
        displayCategories.appendChild(displayCategory);

        function createElement(name, className, text) {
            name = document.createElement('p');
            name.classList.add(`${className}`);
            name.innerHTML = text;
            displayCategory.appendChild(name);
        }

        createElement('displayName', 'display-category__name', `<strong>Category:</strong> ${i.name}`);
        createElement('displayAmount', 'display-category__amount', `<strong>Amount:</strong> ${i.amount}`);
        createElement('displayPercentage', 'display-category__percentage', `<strong>Income Percentage:</strong> ${percentage.toFixed(1)}%`);
    }
}

function editBudget() {
    displayBudgetContent.classList.add('hide');
    newBudgetContent.classList.remove('hide');

    displayCategories.innerHTML = "";
}

function showDeleteOptions() {
    deleteOptions = document.querySelector('.delete-options');
    yes = document.getElementById('yes');
    no = document.getElementById('no');

    //display delete options
    deleteOptions.classList.remove('hide');

    //delete if user clicks yes, revert if no
    yes.addEventListener('click', deleteBudget);
    no.addEventListener('click', e => {
        deleteOptions.classList.add('hide');
    })
}

function deleteBudget() {
    //empty categories array and remove created elements from DOM
    categories = [];
    budgetCategories.innerHTML = "";

    //return budgetSum and incomeBalance to initial values
    budgetSum();
    incomeBalance();

    //return to no budget display
    noBudgetContent.classList.remove('hide');
    displayBudgetContent.classList.add('hide');
}

//register service worker
if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
        navigator.serviceWorker
            .register("serviceWorker.js")
            .then(res => console.log("service worker registered"))
            .catch(err => console.log("service worker not registered", err))
    })
}

//implement function to delete individual categories