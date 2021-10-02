function optionChanged(option) {
    if(option == 'Select column') {
        clearChart('histogramM');
        clearChart('histogramB');
        return;
    }
    createChart(option, 'M', data, option, 'histogramM', 'histogram');
    createChart(option, 'B', data, option, 'histogramB', 'histogram');
  }

  d3.json("https://qian-mario-mohamed-pamproject3.herokuapp.com/data").then(function(fileData) {
  data = fileData;
  var dropdownMenu = d3.select("#selDataset");
  defaultOption = dropdownMenu.append("option");
  defaultOption.property('selected', 'selected');
  defaultOption.property('value', 'Select column');
  defaultOption.text("Select column");
  acc = calculateAccuracy(data);
  console.log(acc);
  displayAccuracy(acc);
  dataSet = Object.keys(fileData[0])
  console.log(dataSet);
  exclude_list = ['_id', 'id', 'diagnosis', '', 'is_training']
  dataSet.forEach(key => {
    if(!exclude_list.includes(key)) {
        var option = dropdownMenu.append("option");
        option.property('value', key);
        option.text(key);
    }
  }); 
});

function clearChart(tagName) {
    var chart = d3.select(`#${tagName}`);
    chart.style("display", "none");
  }

function calculateAccuracy(data) {
    var sum = 0;
    var right = 0;
    data.forEach(element => {
        if(element['diagnosis'] == element['predicted_label']) {
            right += 1;
        }
        sum += 1;
    });
    return(right/sum);
}

function displayAccuracy(acc) {
    var dat = [{
        values: [acc, 1-acc],
        labels: ['CORRECT', 'INCORRECT'],
        type: 'pie'
    }];
    var layout = {
        width: 500,
        height: 500,
        title: "SVM Accuracy report"
    };
      
    Plotly.plot('accuracy', dat, layout);
}

function createChart(option, label, data, yName, tagName, type) {
    points = [];
    chart = d3.select(`#${tagName}`);
    chart.style("display", "inline");

    console.log(data)

    for(var i = 0; i < data.length; i++) { 
        if(data[i][option] && String(data[i]['diagnosis']).toLocaleLowerCase() == label.toLocaleLowerCase()) {
            points.push(data[i][option]);
        }
    }   
    
    console.log(points)

    var trace1 = {
        x: points,
        mode: 'markers',
        type: type,
        name: `${option} histogram`,
        text: option,
        textposition: 'center',
        textfont: {
            family:  'Raleway, sans-serif'
        },
        marker: { size: 5 }
    };

    var layout = {
        xaxis: {
            title: `${option} value`,
            autotick: true,
            showline: true,
            ticks: 'outside',
            ticklen: 6,
            tickwidth: 1,
            tickcolor: '#001'
        },
        yaxis: {
            title: `Number of occurrences of ${label}` ,
            autotick: true,
            showline: true,
            ticks: 'outside',
            dtick: 0.25,
            ticklen: 6,
            tickwidth: 2,
            tickcolor: '#000'
        }
    };

    var data = [trace1];

    Plotly.newPlot(`${tagName}`, data, layout);
}



