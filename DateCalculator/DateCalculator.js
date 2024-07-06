function calculateDifference() {
    const date1 = new Date(document.getElementById('date1').value);
    const date2 = new Date(document.getElementById('date2').value);
    const output = document.getElementById('output');

    if (isNaN(date1) || isNaN(date2)) {
        output.innerHTML = 'Please select both dates.';
        return;
    }

    const difference = Math.abs(date2 - date1);
    const daysDifference = Math.ceil(difference / (1000 * 60 * 60 * 24));
    
    output.innerHTML = `The difference between the selected dates is ${daysDifference} days.`;
}

function calculateNewDate() {
    const startDate = new Date(document.getElementById('startDate').value);
    const days = parseInt(document.getElementById('days').value, 10);
    const output = document.getElementById('output');

    if (isNaN(startDate) || isNaN(days)) {
        output.innerHTML = 'Please select a start date and enter the number of days.';
        return;
    }

    const newDate = new Date(startDate);
    newDate.setDate(newDate.getDate() + days);

    output.innerHTML = `The new date after adding/subtracting ${days} days is ${newDate.toDateString()}.`;
}

function goBack() {
    window.history.back();
}
