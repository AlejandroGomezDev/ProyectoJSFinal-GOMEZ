//El proyecto es hacer un quizz 

// No Elimine nada de lo anterior para que se vea como fue evolucionando el proyecto, perdon por la desprolijidad.

//creamos la class para las preguntas (Ya no lo usamos, ya que las preguntas las sacamos de la API Local)

                                    // class Preguntas{
                                    //     constructor (id, tipo, pregunta, opcion1, opcion2, opcion3, opcion4){
                                    //         this.id = id
                                    //         this.tipo = tipo
                                    //         this.pregunta = pregunta
                                    //         this.opcion1 = opcion1
                                    //         this.opcion2 = opcion2
                                    //         this.opcion3 = opcion3
                                    //         this.opcion4 = opcion4
                                    //     }
                                    // }



//array donde se almacenan las preguntas (Ya no usamos la array de cuestinario ya que las preguntas las sacamos de la API)

                                    // const cuestionario = []


// Lo mismo que en lo anterior, no hacemos uso de la Class, ya que las preguntas la sacamos de la API, todo esto fue usado para los proyectos entregados anteriores.

                                    // const pregunta1 = new Preguntas (1 ,"Arte","Quien pinto la ultima cena?", "Leonardo da Vinci", "Vincent van Gogh", "Salvador Dali", "Pablo Picasso")
                                    // cuestionario.push(pregunta1)
                                    // const pregunta2 = new Preguntas (2 ,"Deportes","Quien es el maximo goleador historico en mundiales de futbol?", "Pele (Brasil)", "Miroslav Klose (Alemania)", "Ronaldo (Brasil)", "Just Fontaine (Francia)")
                                    // cuestionario.push(pregunta2)
                                    // const pregunta3 = new Preguntas (3 ,"Geografia","Cual es la capital de Canada?", "Toronto", "Quebec", "Victoria", "Ottawa")
                                    // cuestionario.push(pregunta3)
                                    // const pregunta4 = new Preguntas (4 ,"Entretenimiento","Quien es el hermano de Mario en la saga de videojuegos Super Mario Bross?", "Yoshi", "Toad", "Luiggi", "Bowser")
                                    // cuestionario.push(pregunta4)





//la verdad no sabia como implementar todavia un metodo, pero como mas adelante el usuario va a poder elegir tambien el tipo de preguntas que quiera, por eso le agregue el parametro tipo
//asi que el filter seria bueno para que busque solo preguntas de por ejemplo, deportes.

// const resultado = cuestionario.filter((el) => el.tipo == 'Deportes')
// console.log(resultado);


//Plantilla para las preguntas
fetch("cuestionarioPreguntas.json")
    .then(response => response.json())
    .then(data =>{
        let divPreguntas = document.getElementById("preguntas")
        data.forEach((preguntaFormulada)=>{
        let nuevaPregunta = document.createElement("div")
        nuevaPregunta.innerHTML = `<article>
                            <div class="container">
                                <section id="pregunta">
                                <h3>${preguntaFormulada.pregunta}</h3>
                                <label class="respuestaBtn">
                                    <input id="opcion1" type="radio" value="1" name=inputRadio${preguntaFormulada.id}>${preguntaFormulada.opcion[0]}
                                </label> 
                                <label class="respuestaBtn">
                                    <input id="opcion2" type="radio" value="2" name=inputRadio${preguntaFormulada.id}>${preguntaFormulada.opcion[1]}
                                </label>  
                                <label class="respuestaBtn">
                                    <input id="opcion3" type="radio" value="3" name=inputRadio${preguntaFormulada.id}>${preguntaFormulada.opcion[2]}
                                </label>  
                                <label class="respuestaBtn">
                                    <input id="opcion4" type="radio" value="4" name=inputRadio${preguntaFormulada.id}>${preguntaFormulada.opcion[3]}
                                </label>     
                                </section>
                            </div>
                            </article>`
    divPreguntas.appendChild(nuevaPregunta)  
    })
})


//Boton Resultado, que siver de verificacion de las respuestas, donde a travez de un evento le pasamos la funcion de ValidarOpcion
    let btnResultado = document.getElementById("resultadoBtn")
    btnResultado.addEventListener("click", () => {validarOpcion()})


//Funcion validarOpcion, donde pusheamos al array OpcionElegida la respueta elegida por medio del value.
    function validarOpcion(){
        for(let i = 0; i < correctas.length; i++){
            let inputRadio1 = document.getElementById("opcion1")
            let inputRadio2 = document.getElementById("opcion2")
            let inputRadio3 = document.getElementById("opcion3")
            let inputRadio4 = document.getElementById("opcion4")
            if(inputRadio1.checked == true){
                opcionElegida.push(inputRadio1.value)
            }else if(inputRadio2.checked == true){
                opcionElegida.push(inputRadio2.value)
            }else if(inputRadio3.checked == true){
                opcionElegida.push(inputRadio3.value)
            }else if(inputRadio4.checked == true){
                opcionElegida.push(inputRadio4.value)
            }
    }
//Llamamos a la funcion Marcador dentro de la funcion validarOpcion para comparar las opciones elegidas con las opciones correctas.
    marcador()
}

//En esta parte quise crear un array que contenga ya el numero que son las preguntas correctas del cuestionario, queria ver si se podia hacer algo asi de comparar arrays con un ciclo, para comparar lo que ingresa con las correctas. Obteniendo los valores a travez del Value.
const correctas = [1,2,4,3]

//array donde el usuario hace el push de las opciones elegidas, este array va almacenar las opciones que elija el usuario, asi poder comparar con el array de las respuestas ya correctas.
const opcionElegida = []
    
//comparacion del array de correctas con el array del push del usuario, para calcular y sumar cuantas preguntas contesto correctamente.
function marcador(){
    let cantidadCorrectas = 0
    for(i=0; i < correctas.length;i++){
        if(correctas[i]==opcionElegida[i]){
            cantidadCorrectas++;
            //setItem para que el localStorage almacene la puntuacion del usuario
            localStorage.setItem ("puntaje", cantidadCorrectas);
            //Uso de libreria donde muestra al dar el boton resultado, cuantas contesto bien
            Swal.fire({
                title: 'PUNTAJE',
                text: `Usted ha contestado ${cantidadCorrectas}  preguntas bien`,
                icon: 'success',
                showConfirmButton: false,
                timer: 1500
            })
        }
    }
    
//Alert usado en entrega anterior.    
// alert(`Usted ha contestado ${cantidadCorrectas} preguntas bien.`)
}

//getItem
let marcadorMostrado = localStorage.getItem ("puntaje")

//Creamos tablero 
//Prototipo de un tablero con los puntajes almacenados en el localStorage. Ya que no puedo obtener los datos, no esta optimo.
            // let divTablero = document.getElementById("tablaMarcador")
            // let mostrarMarcador = document.createElement("div")
            //     mostrarMarcador.innerHTML = `<p>Su puntaje es ${marcadorMostrado}</p>`
            //     divTablero.appendChild(mostrarMarcador)

//log para comprobar si se pusheo las opciones del usuario.    
console.log(opcionElegida);

//Comentario: Disculpa por entregar un proyecto incompleto, me quede trabado en validar el uso de radio para pushear los values al array de opcionElegida. Estuve muy trabado en este asunto. Lo mas cerca que llegue fue a como quedo el proyecto ahora, se que el problema esta en el ciclo for, no comprendo como hacer que cada pregunta me la tome por separado, cuando de la primera pregunta elijo 1 opcion, se pushea 4 veces ese mismo valor de la opcion elegida y no me toma individual cada eleccion. 