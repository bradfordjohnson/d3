d3.csv("data/pesos.csv").then(function (data) {
    let totalPesos = 0;

    // Iterate through the data array and accumulate the values
    data.forEach(function (d) {
      let columnValue = +d.amount; // Assuming 'Age' is the column you want to sum
      if (!isNaN(columnValue)) {
        totalPesos += columnValue;
      }
    });

    // Add a method to round the total pesos to the nearest integer
    data.roundToNearestInteger = function (d) {
      return Math.round(totalPesos);
    }

    // Add a method to the data object to convert the total to dollars
    data.convertToDollars = function (d) {
      totalDollars = data.roundToNearestInteger() / 17.12;
      return totalDollars.toFixed(2);
    }

    // Display the sum in the scorecard
    d3.select("#pesos-scorecard")
      .append("p")
      .text("Total Pesos Spent");
    
    d3.select("#pesos-scorecard")
      .append("h2")
      .text("$" + data.roundToNearestInteger());

    d3.select("#dollars-scorecard")
      .append("p")
      .text("USD Equivalent");
      
    d3.select("#dollars-scorecard")
      .append("h2")
      .text("$" + data.convertToDollars());

  }).catch(function (error) {
    console.error("Error loading CSV file:", error);
  });