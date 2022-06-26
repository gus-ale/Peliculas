const pelis = require("./pelis");

function parsearARGV(consoleInput) {
  let result = {};       // result es un objeto vacío que luego de ser procesado será devuelto por la funcion
  consoleInput.forEach((item , ind)=>{
    if(item.startsWith("--")){
      result[item.slice(2)] = consoleInput[ind + 1];
    }

  });
  return result ;
}

function main() {
  const comandosAEjecutar = parsearARGV(process.argv);

  console.log(pelis.searchByCriteria(comandosAEjecutar));
}

main();
