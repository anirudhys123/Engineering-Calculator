const conversionFactors = {
    length: { SI: { meter: 1, kilometer: 0.001 }, CGS: { centimeter: 100, millimeter: 1000 }, Imperial: { inch: 39.3701, foot: 3.28084, mile: 0.000621371 }},
    force: { SI: { newton: 1, kilonewton: 0.001 }, CGS: { dyne: 100000 }, Imperial: { poundForce: 0.224809 }},
    pressure: { SI: { pascal: 1, kilopascal: 0.001, bar: 0.00001 }, CGS: { dynePerCm2: 10 }, Imperial: { psi: 0.000145038, atm: 0.00000986923 }},
    energy: { SI: { joule: 1, kilojoule: 0.001 }, CGS: { calorie: 0.239006 }, Imperial: { footPound: 0.737562 }},
    torque: { SI: { newtonMeter: 1 }, CGS: { dyneCm: 10000000 }, Imperial: { poundFoot: 0.737562 }},
    power: { SI: { watt: 1, kilowatt: 0.001 }, CGS: { ergPerSecond: 10000000 }, Imperial: { horsepower: 0.00134102 }},
    velocity: { SI: { meterPerSecond: 1, kilometerPerHour: 3.6 }, CGS: { centimeterPerSecond: 100 }, Imperial: { footPerSecond: 3.28084, milePerHour: 2.23694 }},
    acceleration: { SI: { meterPerSecondSquared: 1 }, CGS: { gal: 100 }, Imperial: { footPerSecondSquared: 3.28084 }}
};

function updateUnits() {
    const unitType = document.getElementById("unitType").value;
    const unitSystem = document.getElementById("unitSystem").value;
    const fromUnit = document.getElementById("fromUnit");
    const toUnit = document.getElementById("toUnit");

    fromUnit.innerHTML = "";
    toUnit.innerHTML = "";

    for (let unit in conversionFactors[unitType][unitSystem]) {
        fromUnit.innerHTML += `<option value="${unit}">${unit}</option>`;
    }

    const alternativeSystems = ["SI", "CGS", "Imperial"].filter((sys) => sys !== unitSystem);
    alternativeSystems.forEach((sys) => {
        for (let unit in conversionFactors[unitType][sys]) {
            toUnit.innerHTML += `<option value="${unit}">${unit}</option>`;
        }
    });
}

function convertUnit() {
    const inputValue = parseFloat(document.getElementById("inputValue").value);
    if (!inputValue) return alert("Please enter a valid number.");

    const unitType = document.getElementById("unitType").value;
    const unitSystem = document.getElementById("unitSystem").value;
    const fromUnit = document.getElementById("fromUnit").value;
    const toUnit = document.getElementById("toUnit").value;

    const factorFrom = conversionFactors[unitType][unitSystem][fromUnit];
    const factorTo = conversionFactors[unitType][Object.keys(conversionFactors[unitType]).find(s => s !== unitSystem)][toUnit];

    document.getElementById("result").innerText = `${(inputValue * factorTo / factorFrom).toFixed(4)} ${toUnit}`;
    document.getElementById("resultBox").classList.remove("hidden");
}

function toggleDarkMode() {
    document.body.classList.toggle("dark");
    document.getElementById("themeIcon").innerText = document.body.classList.contains("dark") ? "☀️" : "🌙";
}

updateUnits();
