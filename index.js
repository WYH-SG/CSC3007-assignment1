function loadAPIData() {
    var url = "https://api.data.gov.sg/v1/environment/psi";

    fetch(url)
    .then(response => response.json())
    .then(data => 
        {
            var temp = "";
            console.log(data);
            console.log(data.api_info.status);
    
            // Check if the API is working or display NIL
            if (data.api_info.status == "healthy") {
                // Set readings to the fetch data
                var readings = data.items[0].readings
                console.log(readings);
    
                // For each key inside "reading"
                // Attach it to temp
                for (var key in readings) {                
                    // console.log(key)
                    // console.log(readings[key]['national'])                
    
                    temp += "<tr>";
                    temp += "<td>" + key + "</td>";
                    temp += "<td>" + readings[key]['national'] + "</td>";
                    temp += "<td>" + readings[key]['central'] + "</td>";
                    temp += "<td>" + readings[key]['west'] + "</td>";
                    temp += "<td>" + readings[key]['east'] + "</td>";
                    temp += "<td>" + readings[key]['north'] + "</td>";
                    temp += "<td>" + readings[key]['south'] + "</td>";
                    temp += "</tr>"
                }
    
                // Set the temp data to the table body "id"
                console.log(temp)
                document.getElementById("data").innerHTML += temp;
                
            } else{
                console.log("else section")
    
                temp += "<tr>";
                temp += "<td>" + 'No Data Found' + "</td>";
                temp += "<td>" + 'NIL' + "</td>";
                temp += "<td>" + 'NIL' + "</td>";
                temp += "<td>" + 'NIL' + "</td>";
                temp += "<td>" + 'NIL' + "</td>";
                temp += "<td>" + 'NIL' + "</td>";
                temp += "<td>" + 'NIL' + "</td>";
                temp += "</tr>"
                document.getElementById("data").innerHTML += temp;
            }
    
        }
    );
}

// https://careerkarma.com/blog/javascript-cannot-set-property-innerhtml-of-null/
// For Uncaught TypeError: Cannot set properties of null (setting 'innerHTML')
// Because <script> tag is called first, there is nothing to be located, so needed to do onload()
// https://linuxhint.com/window-onload-event-in-javascript/#:~:text=JavaScript%20has%20a%20window%20onload,object%20is%20loaded%20in%20HTML.

window.onload = () => {
    // Get Date/Time
    const d = new Date();
    date = d.toDateString();
    time = d.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    dt = date + ', ' + time
    
    document.getElementById("updated_time").innerHTML = dt;

    // Call API data
    loadAPIData();
}