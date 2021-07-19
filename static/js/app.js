// from data.js
const tableData = data;

// get table references
var tbody = d3.select("tbody");

function buildTable(data) {
  // First, clear out any existing data
  tbody.html("");

  // Next, loop through each object in the data
  // and append a row and cells for each value in the row
  data.forEach((dataRow) => {
    // Append a row to the table body
    let row = tbody.append("tr");

    // Loop through each field in the dataRow and add
    // each value as a table cell (td)
    Object.values(dataRow).forEach((val) => {
      let cell = row.append("td");
      cell.text(val);
    });
  });
}

// 1. Create a variable to keep track of all the filters as an object.
var filters = {

};

// 3. Use this function to update the filters. 
function updateFilters() {

  // 4a. Save the element that was changed as a variable.
  let city = d3.select(this);
  let state = d3.select(this);
  let country = d3.select(this);
  let shape = d3.select(this);

  // 4b. Save the value that was changed as a variable.
  let cityVal = city.property("value");
  let stateVal = state.property("value");
  let countryVal = country.property("value");
  let shapeVal = shape.property("value");
  // 4c. Save the id of the filter that was changed as a variable.
  let cityID = city.attr("id");
  let stateID = state.attr("id");
  let countryID = country.attr("id");
  let shapeID = shape.attr("id");

  // 5. If a filter value was entered then add that filterId and value
  // to the filters list. Otherwise, clear that filter from the filters object.
  let newFilters = filters;

  if (cityVal) {
    newFilters[cityID] = cityVal;
  }
  else{
    delete newFilters[cityID];
  };
  if (stateVal) {
    newFilters[stateID] = stateVal;
    
  }
  else{
    delete newFilters[stateID];
  };
  if (countryVal) {
    newFilters[countryID] = countryVal;
    
  }
  else{
    delete newFilters[countryID];
  };
  if (shapeVal) {
    newFilters[shapeID] = shapeVal;
    
  }
  else{
    delete newFilters[shapeID];
  };

  // 6. Call function to apply all filters and rebuild the table
  filterTable();
  
  };
  
// 7. Use this function to filter the table when data is entered.
function filterTable() { 

  // 8. Set the filtered data to the tableData.
  let filteredData = tableData;
  // 9. Loop through all of the filters and keep any data that
  // matches the filter values

  // for (const [key, value] of Object.entries(filters)) {
  //   filteredData = filteredData.filter(row => row.key === value);
  // }
  console.log(filters)

  filteredData = filteredData.filter((row) => 
      row.city === filters["city"]||
      row.state === filters["state"]||
      row.country === filters["country"]||
      row.shape === filters["shape"]
    );
  
  // 10. Finally, rebuild the table using the filtered data
  buildTable(filteredData);
};
  
 // 2. Attach an event to listen for changes to each filter
d3.selectAll("#city").on("change", updateFilters);
d3.selectAll("#state").on("change", updateFilters);
d3.selectAll("#country").on("change", updateFilters);
d3.selectAll("#shape").on("change", updateFilters);

// Build the table when the page loads
buildTable(tableData);
