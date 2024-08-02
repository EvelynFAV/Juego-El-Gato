import React, { useState } from 'react'
import './Juego.css'

const Juego = () => {
  const [jugador, setJugador] = useState(true); //true es 'X'y false es 'O'
  const [cuadrados, setCuadrados] = useState(Array(9).fill(null));

  const calcularGanador = (cuadrados) => {
    const lineas = [
      [0, 1, 2], //aquí van todas las posibles combinaciones del ganador (fila, columna o diagonal)
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lineas.length; i++) { //bucle for, para iterar sobre cada linea, y en cada iteración
      const [a, b, c] = lineas[i]; //se realiza una desestructuración de cada linea. Esa desestructuración tiene como nombre "lineas[i]"
                                  //para abordar cada linea ganadora posible (van del 0 al 7 en este caso)
      if (cuadrados[a] && cuadrados[a] === cuadrados[b] && cuadrados[a] === cuadrados[c]) {
        return cuadrados[a];//retorna al cuadrado [a] que es el jugador ganador que lo clickeó al principio - X - ó - O -
      }
    }
    return; //en caso de que no haya ganador en el juego, no retorna nada.
  }
  const manejarClick = (i) => {
    if (cuadrados[i] || calcularGanador(cuadrados)) {
      return; //aquí devuelve nada si es que la casilla está clickeada y/o hay un ganador
    } else {
      const siguienteCuadrado = cuadrados.slice();//el slice() crea una copia del array de cuadrados, pero no cambia los valores.
      siguienteCuadrado[i] = jugador ? 'X' : 'O';
      setCuadrados(siguienteCuadrado);
      setJugador(!jugador) //esto es lo mismo que decir que setJugador tendrá como valor, lo contrario de "jugador"
    }                     // que en este caso sería "false"
  }
  const ganador = calcularGanador(cuadrados);//se establece una variable que toma como valor, la fx que busca los ganadores.
  let estado;                               //para así poder establecer el dinamismo del juego, entregando un ganador
  if (ganador) {                           //si es que la fx retorna algo (porque si no hay ganadores, no retorna nada)
    estado = 'Ganador: ' + ganador;       // se toma ese retorno como ganador. Y si ocurre eso, se establece el estado 
  } else {                               //"ganador + el ganador (que este último sería el "cuadrado[a]") de la fx"
    estado = 'Siguiente jugador: ' + (jugador ? 'X' : 'O'); //sino, retorna que debe continuar el siguiente
  }
  const resetJuego =()=> { //función para el botón que resetea el juego
    setCuadrados(Array(9).fill(null)); //limpia los botones del array
    setJugador(true)                  //limpia el estado del jugador.
  }
  const color =(i)=> { //establece colores para cada jugador.
    let valor = cuadrados[i];
    return {
      color: valor === 'X' ? 'red' : 'blue'
    }
  }
  return (
    <div className="game">
      <div className="status">{estado}</div>
      <div className="board-row">
        <button type='button' className='casilla' onClick={() => manejarClick(0)} style={color(0)}>{cuadrados[0]}</button>
        <button type='button' className='casilla' onClick={() => manejarClick(1)} style={color(1)}>{cuadrados[1]}</button>
        <button type='button' className='casilla' onClick={() => manejarClick(2)} style={color(2)} >{cuadrados[2]}</button>
      </div>
      <div className="board-row">
        <button type='button' className='casilla' onClick={() => manejarClick(3)}style={color(3)}>{cuadrados[3]}</button>
        <button type='button' className='casilla' onClick={() => manejarClick(4)}style={color(4)} >{cuadrados[4]}</button>
        <button type='button' className='casilla' onClick={() => manejarClick(5)}style={color(5)} >{cuadrados[5]}</button>
      </div>
      <div className="board-row">
        <button type='button' className='casilla' onClick={() => manejarClick(6)}style={color(6)}>{cuadrados[6]}</button>
        <button type='button' className='casilla' onClick={() => manejarClick(7)}style={color(7)}>{cuadrados[7]}</button>
        <button type='button' className='casilla' onClick={() => manejarClick(8)}style={color(8)}>{cuadrados[8]}</button>
      </div>
      <div className='contenedor-boton-reset'>
        <button type='button' className='boton-reset' onClick={resetJuego}>Resetear juego</button>
      </div>
    </div>
  );
}

  export default Juego
