const conversionFactors = {
    length: {
      SI: { meter: 1, kilometer: 0.001 },
      CGS: { centimeter: 100, millimeter: 1000 }
    },
    force: {
      SI: { newton: 1, kilonewton: 0.001 },
      CGS: { dyne: 100000 }
    },
    pressure: {
      SI: { pascal: 1, kilopascal: 0.001, bar: 0.00001 },
      CGS: { dynePerCm2: 10 }
    },
    energy: {
      SI: { joule: 1, kilojoule: 0.001 },
      CGS: { calorie: 0.239006 }
    },
    torque: {
      SI: { newtonMeter: 1 },
      CGS: { dyneCm: 10000000 }
    },
    power: {
      SI: { watt: 1, kilowatt: 0.001 },
      CGS: { ergPerSecond: 10000000 }
    },
    velocity: {
      SI: { meterPerSecond: 1, kilometerPerHour: 3.6 },
      CGS: { centimeterPerSecond: 100 }
    },
    acceleration: {
      SI: { meterPerSecondSquared: 1 },
      CGS: { gal: 100 }
    }
  };
  
  function updateUnits() {
    const unitType = document.getElementById("unitType").value;
    const unitSystem = document.getElementById("unitSystem").value;
    const fromUnit = document.getElementById("fromUnit");
    const toUnit = document.getElementById("toUnit");
  
    fromUnit.innerHTML = "";
    toUnit.innerHTML = "";
  
    // Populate "From" options
    for (let unit in conversionFactors[unitType][unitSystem]) {
      fromUnit.innerHTML += `<option value="${unit}">${unit}</option>`;
    }
  
    // Populate "To" options from the other remaining system
    const altSystem = unitSystem === "SI" ? "CGS" : "SI";
    for (let unit in conversionFactors[unitType][altSystem]) {
      toUnit.innerHTML += `<option value="${unit}">${unit}</option>`;
    }
  }
  
  function convertUnit() {
    const inputValue = parseFloat(document.getElementById("inputValue").value);
    if (!inputValue && inputValue !== 0) return alert("Please enter a valid number.");
  
    const unitType = document.getElementById("unitType").value;
    const unitSystem = document.getElementById("unitSystem").value;
    const fromUnit = document.getElementById("fromUnit").value;
    const toUnit = document.getElementById("toUnit").value;
  
    const factorFrom = conversionFactors[unitType][unitSystem][fromUnit];
    const altSystem = unitSystem === "SI" ? "CGS" : "SI";
    const factorTo = conversionFactors[unitType][altSystem][toUnit];
  
    if (factorFrom && factorTo) {
      const convertedValue = (inputValue * factorTo / factorFrom).toFixed(4);
      document.getElementById("result").innerText = `${convertedValue} ${toUnit}`;
      document.getElementById("resultBox").classList.remove("hidden");
    } else {
      alert("Conversion factor not found.");
    }
  }
  
 
  
  // Initialize on page load
  updateUnits();
  