function optionChanged(option) {
    if(option == 'Select column') {
        clearChart('histogramM');
        clearChart('histogramB');
        return;
    }
    createChart(option, data, 'M', 'dna_reading_means', 'histogram', 'histogram');
    createChart(option, data, 'B', 'dna_reading_means', 'scatter', 'scatter');
    updateMetadata(option, data);
  }

  d3.json("https://nwu-qianmariomahomedpam-proj2.herokuapp.com/data").then(function(fileData) {
  data = fileData;
  var dropdownMenu = d3.select("#selDataset");
  defaultOption = dropdownMenu.append("option");
  defaultOption.property('selected', 'selected');
  defaultOption.property('value', 'Station Name');
  defaultOption.text("Station Name");
  dataSet = new Set(fileData.stationNames);
  console.log(dataSet);
  dataSet.forEach(element => {
    var option = dropdownMenu.append("option");
    option.property('value', element);
    option.text(element);
  }); 
});

function clearChart(tagName) {
    var chart = d3.select(`#${tagName}`);
    chart.style("display", "none");
  }

function createChart(option, data, xName, yName, tagName, type) {
    yPoints = [];
    xPoints = [];
    chart = d3.select(`#${tagName}`);
    chart.style("display", "inline");

    for(var i = 0; i < data.stationNames.length; i++) { 
        if(data.stationNames[i] == option) {
            yPoints.push(data[yName][i]);
            xPoints.push(data[xName][i]);
        }
    }    

    var trace1 = {
        x: xPoints,
        y: yPoints,
        mode: 'markers',
        type: type,
        name: `DNA Bacterial level VS ${xName}`,
        text: option,
        textposition: 'center',
        textfont: {
            family:  'Raleway, sans-serif'
        },
        marker: { size: 5 }
    };

    var layout = {
        xaxis: {
            title: `${xName}`,
            autotick: true,
            showline: true,
            ticks: 'outside',
            dtick: 0.25,
            ticklen: 6,
            tickwidth: 1,
            tickcolor: '#001'
        },
        yaxis: {
            title: 'DNA Bacterial level' ,
            autotick: true,
            showline: true,
            ticks: 'outside',
            tick0: 0,
            dtick: 0.25,
            ticklen: 6,
            tickwidth: 2,
            tickcolor: '#000'
        }
    };

    var data = [trace1];

    Plotly.newPlot(`${tagName}`, data, layout);
}



