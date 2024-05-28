 let products = [];

// Render products on the page
function renderProducts() {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';

    products.forEach((product, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <div>
                <strong>Item:</strong> ${product.item}<br>
                <strong>Purchase Date:</strong> ${product.purchaseDate}<br>
                <strong>Quantity:</strong> ${product.quantity}<br>
                <strong>Cost Price:</strong> ${product.costPrice}<br>
                <strong>Selling Price:</strong> ${product.sellingPrice}<br>
                <div class="action">
                    <button onclick="editItem(${index})">Edit</button>
                    <button onclick="deleteItem(${index})">Delete</button>
                </div>
            </div>
            <hr>
        `;
        productList.appendChild(listItem);
    });

    calculateSummary();
}

// Calculate summary
function calculateSummary() {
    let profitLoss = 0;
    let yearlyProfit = 0;
    let monthlyProfit = 0;
    let weeklyProfit = 0;
    let dailyProfit = 0;
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const startOfYear = new Date(today.getFullYear(), 0, 1);
products.forEach(product => {
        const profit = (product.sellingPrice - product.costPrice) * product.quantity;
        profitLoss += profit;
const purchaseDate = new Date(product.purchaseDate);
        if (purchaseDate >= today) {
            dailyProfit += profit;
        }
        if (purchaseDate >= startOfWeek) {
            weeklyProfit += profit;
        }
        if (purchaseDate >= startOfMonth) {
            monthlyProfit += profit;
        }
        if (purchaseDate >= startOfYear) {
            yearlyProfit += profit;
        }

    });
const profitLossElement = document.getElementById('profitLoss');
    const yearSummaryElement = document.getElementById('yearSummary');
    const monthSummaryElement = document.getElementById('monthSummary');
    const weekSummaryElement = document.getElementById('weekSummary');
    const daySummaryElement = document.getElementById('daySummary');
 profitLossElement.textContent = `Profit/Loss: $${profitLoss.toFixed(2)}`;
    yearSummaryElement.textContent = `Yearly Profit: $${yearlyProfit.toFixed(2)}`;
    monthSummaryElement.textContent = `Monthly Profit: $${monthlyProfit.toFixed(2)}`;
    weekSummaryElement.textContent = `Weekly Profit: $${weeklyProfit.toFixed(2)}`;
    daySummaryElement.textContent = `Daily Profit: $${dailyProfit.toFixed(2)}`;
}
let editingIndex = null;
// Edit an item
function editItem(index) {
    const product = products[index];
    document.getElementById('item').value = product.item;
    document.getElementById('purchaseDate').value = product.purchaseDate;
    document.getElementById('quantity').value = product.quantity;
    document.getElementById('costPrice').value = product.costPrice;
    document.getElementById('sellingPrice').value = product.sellingPrice;

    editingIndex = index;
    // Set the editing index to the current index
    // Scroll to the input section
    document.getElementById('Details').scrollIntoView({ behavior: 'smooth' });

}
// Add a new item or update an existing item
function addItem() {
    const item = document.getElementById('item').value;
    const purchaseDate = document.getElementById('purchaseDate').value;
    const quantity = parseFloat(document.getElementById('quantity').value);
    const costPrice = parseFloat(document.getElementById('costPrice').value);
    const sellingPrice = parseFloat(document.getElementById('sellingPrice').value);

    const now = new Date();
    const inputDate = new Date(purchaseDate);
    if (inputDate > now) {
        alert('You cannot input future sales. Please select a valid date.');
        return;
    }

    if (!item || !purchaseDate || isNaN(quantity) || isNaN(costPrice) || isNaN(sellingPrice)) {
        alert('Please fill in all fields');
        return;
    }
 const product = {
        item: item,
        purchaseDate: purchaseDate,
        quantity: quantity,
        costPrice: costPrice,
        sellingPrice: sellingPrice
    };
if (editingIndex !== null) {
        products[editingIndex] = product; // Update the existing product
        editingIndex = null; // Reset editing index
    } else {
        products.push(product); // Add a new product
    }
renderProducts();
// Clear input fields after adding item or updating item
    document.getElementById('item').value = '';
    document.getElementById('purchaseDate').value = '';
    document.getElementById('quantity').value = '';
    document.getElementById('costPrice').value = '';
    document.getElementById('sellingPrice').value = '';
}
// Handle date input
function handleDateInput() {
    const inputDate = new Date(document.getElementById('purchaseDate').value);
    const currentDate = new Date();

    if (inputDate > currentDate) {
        alert('You cannot input future sales. Please select a valid date.');
        // Reset the input field to the current date
        const formattedDate = currentDate.toISOString().slice(0, 10);
        document.getElementById('purchaseDate').value = formattedDate;
    }
}
// Delete an item
function deleteItem(index) {
    products.splice(index, 1);
    renderProducts();
}
// Save products to localStorage
function saveProducts() {
    localStorage.setItem('products', JSON.stringify(products));
    alert('Products saved successfully!');
}

// Load products from localStorage
function loadProducts() {
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
        products = JSON.parse(savedProducts);
        renderProducts();
    }
}

// Load products when the page loads
window.onload = function() {
    loadProducts();
};
// Update summary elements
function updateSummary() {
    const profitLossElement = document.getElementById('profitLoss');
    const yearSummaryElement = document.getElementById('yearSummary');
    const monthSummaryElement = document.getElementById('monthSummary');
    const weekSummaryElement = document.getElementById('weekSummary');
    const daySummaryElement = document.getElementById('daySummary');

    profitLossElement.textContent = `Profit/Loss: $${calculateTotalProfitLoss().toFixed(2)}`;
    yearSummaryElement.textContent = `Yearly Profit: $${calculateYearlyProfit().toFixed(2)}`;
    monthSummaryElement.textContent = `Monthly Profit: $${calculateMonthlyProfit().toFixed(2)}`;
    weekSummaryElement.textContent = `Weekly Profit: $${calculateWeeklyProfit().toFixed(2)}`;
    daySummaryElement.textContent = `Daily Profit: $${calculateDailyProfit().toFixed(2)}`;
}



// Save sales data to local storage
function saveSalesData(salesData) {
    // Check if local storage is supported by the browser
    if (typeof Storage !== "undefined") {
        // Convert sales data to JSON string
        const salesDataJson = JSON.stringify(salesData);
        // Save the JSON string to local storage
        localStorage.setItem("salesData", salesDataJson);
        console.log("Sales data saved successfully!");
    } else {
        console.error("Local storage is not supported.");
    }
}

// Example usage:
const sales = [
    { item: "Product A", quantity: 10, price: 20 },
    { item: "Product B", quantity: 5, price: 30 }
];

saveSalesData(sales);

// Attach event listener to date input change event
document.getElementById('purchaseDate').addEventListener('change', handleDateInputChange);

// Handle date input change
function handleDateInputChange(event) {
    // Get the selected date from the input element
    const selectedDate = event.target.value;

    // Perform any actions you want to take when the date input changes
    console.log('Selected date:', selectedDate);
    // You can add more code here to handle the selected date
}     