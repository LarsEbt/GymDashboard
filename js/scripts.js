fetch('table.csv')

  .then(response => response.text()) // Die Datei als Text laden
  .then(data => {
    // CSV-Daten parsen
    Papa.parse(data, {
      header: true, // Optional: Falls die CSV eine Header-Zeile hat
      complete: (result) => {
        console.log('Parsed Daten:', result.data);

        // Beispiel: Berechnungen mit den Daten
        const sum = result.data.reduce((acc, row) => acc + row.Betrag, 0); // Beispiel für eine Berechnung
        console.log('Summe der Beträge:', sum);

        const total_activities = result.meta.fields.length;
        console.log('Total activities:', total_activities);
      }
      
    });
    //console.log('Daten geladen:', data);
   
  })
  .catch(error => console.error('Fehler beim Laden der CSV-Datei:', error));
 


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