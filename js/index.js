let input = {}
let output = {}

function getInput(element) {
    return document.getElementById('input-' + element).value;
}

function updateInput() {
    input = {
        msrp: getInput('msrp'),
        term: getInput('term'),
        down: getInput('down'),
        tax: getInput('tax'),
        interest: getInput('interest'),
        residual: getInput('residual')
    }
}

function displayResults () {
    document.getElementById('monthly-depreciation').innerHTML = output.monthlyDepreciation;
    document.getElementById('monthly-tax').innerHTML = output.monthlyTax;
    document.getElementById('monthly-rent').innerHTML = output.monthlyRent;
    document.getElementById('monthly-total').innerHTML = output.monthlyTotal;
}

function calculate() {
    updateInput();

    const { msrp, term, down, tax, interest, residual } = input;

    let moneyFactor = interest / 2400;
    let residualValue = msrp * residual / 100;
    let adjustedMsrp = msrp - down;

    let monthlyDepreciation = (adjustedMsrp  - residualValue) / term;
    let monthlyRent = (adjustedMsrp + residualValue) * moneyFactor;
    let monthlyTax = (monthlyDepreciation + monthlyRent) * tax / 100;
    let monthlyPayment = monthlyDepreciation + monthlyRent + monthlyTax;

    // Round
    const round = (num) => Math.round(num * 100) / 100;

    monthlyDepreciation = round(monthlyDepreciation);
    monthlyTax = round(monthlyTax);
    monthlyRent = round(monthlyRent);
    monthlyPayment = round(monthlyPayment);

    output = {
        monthlyDepreciation,
        monthlyTax,
        monthlyRent,
        monthlyTotal: monthlyPayment
    }

    displayResults();
}

// Run the calculations every 100ms
setInterval(calculate, 100);