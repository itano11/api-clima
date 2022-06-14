window.addEventListener('load', ()=>{

     //Variables latitud y longitud
     let lat
     let lon

     //Capturando los elementos del DOM y asignando a variables
     let temperaturaValor = document.getElementById("temperatura-valor")
     let temperaturaDescripcion = document.getElementById("temperatura-descripcion")

     let ubicacion = document.getElementById("ubicacion")
     let iconoAnimado = document.getElementById("icono-animado")

     let vientoVelocidad = document.getElementById("viento-velocidad")

     //Obteniendo nuestra geolocalización
     if(navigator.geolocation){
          navigator.geolocation.getCurrentPosition( posicion => {
              lat = posicion.coords.latitude
              lon = posicion.coords.longitude

              //Ubicación actual
              const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=es&units=metric&appid=API-KEY`

              //Ubicación por ciudad y país
              //const url = `https://api.openweathermap.org/data/2.5/weather?q={city name},{country code}&appid=API-KEY`


              //Ubicación por nombre de ciudad, incorporando lenguaje español y sistema métrico
              //const url = `https://api.openweathermap.org/data/2.5/weather?q=santiago&lang=es&units=metric&appid=API-KEY`

              //Utilizando fetch para las respuestas de la API en formato JSON en este caso
              fetch(url)
               .then( response => { return response.json() })
               .then( datos => {

                    //Trabajando la máxima y mínima
                    let tempMax = Math.round(datos.main.temp_max)
                    let tempMin = Math.round(datos.main.temp_min)

                    //Mostrando variable tempMax y tempMin por el navegador, mediante el id del componente DOM
                    maxima.textContent = `${tempMax} °C`
                    minima.textContent = `${tempMin} °C`

                    //Trabajando la humedad
                    let hum = Math.round(datos.main.humidity)
                    //Mostrando variable temp por el navegador, mediante el id del componente DOM
                    humedad.textContent = `${hum} %`

                    //Trabajando la temperatura
                    let temp = Math.round(datos.main.temp)
                    //Mostrando variable temp por el navegador, mediante el id del componente DOM
                    temperaturaValor.textContent = `${temp} °C`

                    //Trabajando la descripción del tiempo
                    let descr = datos.weather[0].description
                    //Mostrando variable descr por el navegador, mediante el id del componente DOM
                    temperaturaDescripcion.textContent = descr.toUpperCase()

                    //Trabajando con la ubicacion
                    let ubica = datos.name
                    //Mostrando variable temp por el navegador, mediante el id del componente DOM
                    ubicacion.textContent = ubica

                    //Trabajando con la velocidad del viento
                    let veloc = datos.wind.speed

                    //Mostrando variable veloc por el navegador, mediante el id del componente DOM
                    vientoVelocidad.textContent = `${veloc} m/s`

                    //Trabajando con la sensación térmica
                    let sens = Math.round(datos.main.feels_like)
                    //Mostrando variable sens por el navegador, mediante el id del componente DOM
                    sensacion.textContent = `${sens} °C`

                    //Trabajando con el ícono
                    //Para íconos estáticos
                    /*
                    let iconCode = datos.weather[0].icon
                    const urlIcon = `https://openweathermap.org/img/wn/${iconCode}.png`
                    console.log(urlIcon)
                    */

                    //Para íconos
                    console.log(datos)
                    switch (datos.weather[0].main) {

                         case 'Thunderstorm':
                              iconoAnimado.src='img/tormenta.jpg'
                              console.log('TORMENTA');
                              break;
                         case 'Drizzle':
                              iconoAnimado.src='img/lluvia.jpg'
                              console.log('LLOVIZNA');
                              break;
                         case 'Rain':
                              iconoAnimado.src='img/lluvia.jpg'
                              console.log('LLUVIA');
                              break;
                         case 'Snow':
                              iconoAnimado.src='img/nieve.jpg'
                                console.log('NIEVE');
                              break;
                         case 'Clear':
                                iconoAnimado.src='img/despejadoDia.jpg'
                                console.log('DESPEJADO');
                              break;
                         case 'Haze':
                                   iconoAnimado.src='img/niebla.jpg'
                                   console.log('NIEBLA');
                                 break;
                         case 'Atmosphere':
                              iconoAnimado.src='img/parcial.jpg'
                                console.log('PARCIAL');
                                break;
                         case 'Clouds':
                                iconoAnimado.src='img/nublado.jpg'
                                console.log('NUBES');
                                break;
                         default:
                              iconoAnimado.src='img/parcial.jpg'
                              console.log('por defecto');
                    }

               })
               //Uso de catch para capturar posibles errores y mostrarlos por consola
               .catch ( error => {
                    console.log(error)
               })
          } )

     //Creando fecha y hora
     let fechaActual = new Date();

     fecha_Actual.textContent = fechaActual
     }
})
