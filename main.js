/* Pegar en el navegador para visualizar el archivo XML:

https://api.openweathermap.org/data/2.5/weather?q=Galapagar&appid=86d830bb22abc9b1b3fe4fb21a030040&units=metric&mode=xml
*/

let appid = "86d830bb22abc9b1b3fe4fb21a030040" ;
let urlWeather ="";
let primeraVez = true ; // Esta variabe sirve para distinguir la primera vez de las demás en caso de que se pulse el botón con el campo en blanco.

document.getElementById("botonTiempo").addEventListener("click", () => {
    cargaCiudad()
        .then(cargarXML)
        .catch(() => {
            document.getElementById("demo").innerHTML = "" ; // Limpia la tabla
            document.getElementById("error").innerHTML = "Ciudad no encontrada" ; // Muestra el error
        })
}) ;


function cargaCiudad() {
    
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
                primeraVez = false ; // Deja de ser la primera vez
                cargarXML(this) ;
            }
            else
                // Si la respuesta es incorrecta
            { 
                if (primeraVez)
                    // La primera vez mostrará un mensaje de error específico
                {
                    document.getElementById("error").innerHTML = "Debes introducir una ciudad" ; // Muestra el error
                    
                    if (ciudad.trim().length !== 0)
                        // Si se introduce una ciudad incorrecta después de haber dado al botón la primera vez (con el cambpo en blanco)...
                    {
                        primeraVez = false ; // ... cambiará la variable primeraVez a false para que muestre el siguiente tipo de error
                    }
                }
                else
                    // La segunda vez y sucesivas mostrará el siguiente tipo de error
                {
                    document.getElementById("demo").innerHTML = "" ; // Limpia la tabla
                    document.getElementById("error").innerHTML = "Ciudad no encontrada" ; // Muestra el error
                }
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