let appid = "86d830bb22abc9b1b3fe4fb21a030040" ;
let urlWeather ="";

document.getElementById("botonTiempo").addEventListener("click", cargaCiudad) ;


function cargaCiudad() {
    
    let btnCiudad = document.getElementById("ciudad") ;
    ciudad = btnCiudad.value ;

    if (ciudad.trim().length === 0) {
        
        ciudad = "Galapagar" ; 
    }

    urlWeather =`https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${appid}&units=metric&mode=xml`;

    let xhr = new XMLHttpRequest() ;

    xhr.onreadystatechange = function() {
        
        if (this.readyState == 4)
        {
            // Si la respuesta es correcta
            if (this.status == 200)
            { 
                cargarXML(this) ;
            }
            // Si la respuesta es incorrecta
            else
            { 
                document.getElementById("demo").innerHTML = "" ; // Limpia la tabla
                document.getElementById("error").innerHTML = "Ciudad no encontrada" ; // Muestra el error
            }
        }
    } ;

    xhr.open("GET", urlWeather, true) ;
    xhr.send() ;
}

function cargarXML(xml) {
    
    let docXML = xml.responseXML ;

    let table = "" ;

    table = "<tr><th>Temperatura</th><th>Humedad</th><th>Presión</th><th>Viento</th></tr>" ;

    let temperatura = docXML.getElementsByTagName("temperature")[0].getAttribute("value") ;
    let humedad = docXML.getElementsByTagName("humidity")[0].getAttribute("value") ;
    let presion = docXML.getElementsByTagName("pressure")[0].getAttribute("value") ;
    let viento = docXML.getElementsByTagName("speed")[0].getAttribute("value") ;

    table += "<tr>" ;
    table += "<td>" + temperatura + " ºC </td>" ;
    table += "<td>" + humedad + " % </td>" ;
    table += "<td>" + presion + " hPa </td>" ;
    table += "<td>" + viento + " m/s </td>" ;
    table += "</tr>" ;

    document.getElementById("demo").innerHTML = table ; // Pinta la tabla
    document.getElementById("error").innerHTML = "" ; // Limpia el mensaje de error

    

    
}