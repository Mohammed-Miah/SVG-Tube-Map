fetch('C:\Users\Mohammed\OneDrive\Computer Vision Training Sept 23\TubeMap Flask\data\data.json')
    .then(response => response.json())
    .then(data => {
        var tableBody = document.getElementById("tableBody");
        // Iterate over each object in the array
        data.forEach(item => {
            // Extract the path ID from the current object
            const pathId = item.pathId;
            //const score = item.InboundScore;
            // Select the SVG path by ID
            const svgPath = document.getElementById(pathId);

            // Check if the SVG path exists
            if (svgPath) {

            
                svgPath.addEventListener('mouseover', (event) => {
                    const tooltip = document.getElementById('tooltip');
                    const rect = svgPath.getBoundingClientRect();

                    // Set tooltip position and content
                    tooltip.style.left = (rect.x+ 10) + 'px';
                    tooltip.style.top = (rect.y + 10) + 'px';
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
                        console.log(target.id)
                        
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

                console.log(`SVG path with ID ${pathId} found. The score is ${item.InboundScore}`);
            } else {
                console.error(`SVG path with ID "${pathId}" not found.`);
            }
        });
    })
    .catch(error => console.error('Error loading JSON:', error));

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

    

