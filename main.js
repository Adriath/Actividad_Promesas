/* Pegar en el navegador para visualizar el archivo XML:

https://api.openweathermap.org/data/2.5/weather?q=Galapagar&appid=86d830bb22abc9b1b3fe4fb21a030040&units=metric&mode=xml
*/

let appid = "86d830bb22abc9b1b3fe4fb21a030040" ;
let urlWeather ="";

document.getElementById("botonTiempo").addEventListener("click", () => {
    cargaCiudad()
        .then(cargarXML)
        .catch(() => {
            document.getElementById("demo").innerHTML = "" ; // Limpia la tabla
            document.getElementById("error").innerHTML = "Ciudad no encontrada" ; // Muestra el error
        })
}) ;


function cargaCiudad() {
    
  const promesa = new Promise((resolve, reject) => {
      
    let btnCiudad = document.getElementById("ciudad") ;
    let ciudad = btnCiudad.value ;

    urlWeather =`https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${appid}&units=metric&mode=xml`;

    let xhr = new XMLHttpRequest() ;

    xhr.onreadystatechange = function() {
        
        if (this.readyState == 4)
        {
            if (this.status == 200)
                // Si la respuesta es correcta
            { 
                resolve(this) ;
            }
            else
                // Si la respuesta es incorrecta
            { 
                reject() ;
            }
        }
    } ;

    xhr.open("GET", urlWeather, true) ;
    xhr.send() ;
  }) ;

  return promesa ;
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