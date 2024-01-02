document.addEventListener('DOMContentLoaded', function () {
    // Access the data passed from the HTML file
    var dataFromFlask = window.dataFromFlask;

    // Parse the data as JSON
    try {
        dataFromFlask = JSON.parse(dataFromFlask);
    } catch (error) {
        console.error('Error parsing JSON:', error);
        return; // Stop further execution if parsing fails
    }

    var globalDataFromFlask = Array.isArray(dataFromFlask) ? dataFromFlask : [];
    
    var tableBody = document.getElementById("tableBody");

    globalDataFromFlask.forEach(item => {
        // Select the SVG path by ID
        const pathId = item.pathId;
        const svgPath = document.getElementById(pathId);

        if (svgPath) {

            svgPath.addEventListener('click', (event) => {
                const infoSection = document.getElementById('infoSection');
            
                // Set information in the info section
                infoSection.innerHTML = `
                  <p>Selected Path Information: </p> <br>
                  <strong>Inbound Direction:</strong> ${item.StationA} > ${item.StationB}: ${item.InboundScore}  <br>
                  <strong>Other Station Profile/Info:</strong>  <br>
                  <strong>Outbound Direction:</strong> ${item.StationB} > ${item.StationA}: ${item.OutboundScore}  <br>
                  <strong>Other Station Profile/Info:</strong> <br>
                  <!-- Add more HTML content as needed -->
                `;
              });
            
            svgPath.addEventListener('mouseover', (event) => {
                const tooltip = document.getElementById('tooltip');
                const rect = svgPath.getBoundingClientRect();

                // Set tooltip position and content
                tooltip.style.left = (rect.x) + 'px';
                tooltip.style.top = (rect.y) + 'px';
                tooltip.innerHTML = `
                    <strong>Inbound Direction:</strong> ${item.StationA} > ${item.StationB}: ${item.InboundScore}  <br>
                    <strong>Other Station Profile/Info:</strong>  <br>
                    <strong>Outbound Direction:</strong> ${item.StationB} > ${item.StationA}: ${item.OutboundScore}  <br>
                    <strong>Other Station Profile/Info:</strong> <br>
                    <!-- Add more HTML content as needed -->
                `;
                // Display the tooltip
                tooltip.style.display = 'block';

                svgPath.addEventListener("click", function(event) {
                    var target = event.target;
                    //console.log(target.id)
                    
                    var rectData = data[target.id];

                    displayDataInTable(rectData);
                    // Check if the clicked element is a rect within the SVG
                    
                });
            });

            // Detach hover event listener
            svgPath.addEventListener('mouseout', () => {
                const tooltip = document.getElementById('tooltip');

                // Hide the tooltip
                tooltip.style.display = 'none';
            });


            // Modify the style or perform other actions as needed
            svgPath.style.stroke = "red";
            //svgPath.style.strokeDasharray = "1,1";
            svgPath.style.opacity = "1";

            //console.log(`SVG path with ID ${pathId} found. The score is ${item.InboundScore}`);
        } else {
            //console.error(`SVG path with ID "${pathId}" not found.`);
        }
    });

    // You can now use dataFromFlask in your JavaScript code
});


    function resetZoom() {
        svg.transition()
            .duration(500)
            .call(zoom.transform, d3.zoomIdentity); // Reset zoom to identity
    }

    // Function to zoom in
    function zoomIn() {
        svg.transition()
            .duration(500)
            .call(zoom.scaleBy, 1.2); // Increase the zoom level
    }

    function zoomOut() {
        svg.transition()
            .duration(500)
            .call(zoom.scaleBy, 0.8); // Decrease the zoom level
    }

    // Function to pan left
    function panLeft() {
        svg.transition()
            .duration(500)
            .call(zoom.translateBy, -50, 0); // Pan left by adjusting the x-coordinate
    }

    // Function to pan right
    function panRight() {
        svg.transition()
            .duration(500)
            .call(zoom.translateBy, 50, 0); // Pan right by adjusting the x-coordinate
    }

    function displayDataInTable(data) {
        // Clear existing table rows
        tableBody.innerHTML = "";

        // Create a new table row with data
        var newRow = document.createElement("tr");

        // Add table data cells
        var idCell = document.createElement("td");
        idCell.textContent = data.id;

        var xCell = document.createElement("td");
        xCell.textContent = data.x;

        var yCell = document.createElement("td");
        yCell.textContent = data.y;

        var widthCell = document.createElement("td");
        widthCell.textContent = data.width;

        var heightCell = document.createElement("td");
        heightCell.textContent = data.height;

        // Append cells to the row
        newRow.appendChild(idCell);
        newRow.appendChild(xCell);
        newRow.appendChild(yCell);
        newRow.appendChild(widthCell);
        newRow.appendChild(heightCell);

        // Append the row to the table body
        tableBody.appendChild(newRow);
    }


    function toggleBoxVisibility(me) {

        elementID = me.id
        console.log(me.id) 
    
    if(elementID == "ch_tram-tram" || elementID == "ch_raillo-overground" || elementID == "ch_dlr-dlr" || elementID == "ch_elizabeth"){
        
        if (document.getElementById(me.id).checked == false) {
        
            document.getElementById(elementID.replace("ch_","")).style.visibility = "hidden";       
            }
        else{
            document.getElementById(elementID.replace("ch_","")).style.visibility = "visible";
        }
    }
    else{

        if (document.getElementById(me.id).checked == false) {
        
            document.getElementById("lul-" + me.id).style.visibility = "hidden";       
            }
        else{
            document.getElementById("lul-" + me.id).style.visibility = "visible";
        }
        
        
        }
    }

    function checkAll(checkEm) {
        var cbs = document.getElementsByTagName('input');
    
        for (var i = 0; i < cbs.length; i++) {
            if (cbs[i].type == 'checkbox') {
                cbs[i].checked = checkEm;
                toggleBoxVisibility(cbs[i])
            
            }
        }
       

    }
    

