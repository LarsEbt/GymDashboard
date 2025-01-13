let globalData = [];
// Datei einlesen
fetch('table.csv') // Hier der relative Pfad zur CSV-Datei
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP-Fehler! Status: ${response.status}`);
    }
    return response.text(); // Die Datei als Text einlesen
  })
  .then(csvText => {
    globalData = processData(csvText); // CSV-Text verarbeiten
    console.log(globalData); // Ergebnis ausgeben
  })
  .catch(error => {
    console.error('Fehler beim Einlesen der Datei:', error);
  });

// Funktion zum Verarbeiten der CSV-Daten
function processData(csvText) {
  const lines = csvText.trim().split('\n'); // Zeilen aufteilen
  return lines.map(line => {
    const [datum, zeit] = line.split(',').map(value => value.trim()); // Spalten aufteilen
    const [startZeit, endZeit] = zeit.split(' - ').map(value => value.trim()); // Zeiten trennen
    return { datum, startZeit, endZeit }; // Objekt mit Datum, Startzeit und Endzeit
  });
}

function timeToMinutes(time) {
  const [hours, minutes] = time.split(':').map(Number); // Zeit in Stunden und Minuten aufteilen
  return hours * 60 + minutes; // Stunden in Minuten umwandeln und Minuten hinzuzufügen
}

function calculateTimeDifference(startTime, endTime) {
  const startMinutes = timeToMinutes(startTime);
  let endMinutes = timeToMinutes(endTime);

  // Wenn die Endzeit kleiner ist als die Startzeit, bedeutet das, dass sie nach Mitternacht liegt.
  // Daher müssen wir 24 Stunden (1440 Minuten) zur Endzeit hinzufügen.
  if (endMinutes < startMinutes) {
    endMinutes += 24 * 60; // 1440 Minuten für einen vollen Tag
  }

  const difference = endMinutes - startMinutes; // Berechne die Differenz in Minuten
  return difference; // Gibt die Differenz in Minuten zurück
}

const timeString = "22:42 - 01:55";
const [startTime, endTime] = timeString.split(' - '); // Zeit trennen

const difference = calculateTimeDifference(startTime, endTime);
const differenceInHours = difference / 60;
console.log(`Die Differenz in Hours: ${differenceInHours} Hours`);
console.log(`Die Differenz in Minuten: ${difference} Minuten`);

const ToltalTime =  calculateTotalTime(globalData.startZeit, globalData.endZeit); 
console.log('Total Time ', ToltalTime);

function calculateTotalTime(startTime ,endTime) {
  let totalMinutes = 0;
  globalData.forEach(data => {
    const difference = calculateTimeDifference(data.startZeit, data.endZeit);
    totalMinutes += difference;
  });
  return totalMinutes;
 

}



// processData.array.forEach(element => {
//   console.log(element);
// });


//Bar Chart
var barChartOptions = {
    series: [{
    data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
  }],
    chart: {
    type: 'bar',
    height: 350
  },
  plotOptions: {
    bar: {
      borderRadius: 4,
      borderRadiusApplication: 'end',
      horizontal: true,
    }
  },
  dataLabels: {
    enabled: true
  },
  xaxis: {
    categories: ['South Korea', 'Canada', 'United Kingdom', 'Netherlands', 'Italy', 'France', 'Japan',
      'United States', 'China', 'Germany'
    ],
  }
  };

  var barChart = new ApexCharts(document.querySelector("#bar-chart"), barChartOptions);
  barChart.render();