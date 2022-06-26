const fs = require("fs");

const getAll = function () {
    const data =  fs.readFileSync(__dirname + "/pelis.json".toString());
    return JSON.parse(data);
};

const searchBy = function (texto, arrayDePelis) {
   let textoMin = texto.toLowerCase();
   let result = arrayDePelis.filter((item) => {
      return item.title.toLowerCase().includes(textoMin);
    });
    return result;
};

const sortBy = function (propiedad, arrayDePelis) {
   return (arrayDePelis.sort((a,b)=>{
    return a[propiedad] > b[propiedad] ? 1 : -1;
  }));
};

const tag = function (prop, filtrar) {
  var lower = prop.toLowerCase();
  const tag = filtrar.filter((item) =>
    item.tags.find((nombre) => nombre.toLowerCase().includes(lower))
  );
  return tag;
};

const sinFormato = function (pelis) {
  const formato = JSON.stringify(pelis);
  return formato;
};

exports.searchByCriteria = (criterios)=> {
    // comienzo un array vacio que voy a empezar a rellenar con las respuestas de las funciones
  let tmp = getAll();
  if(criterios.search) {
    //console.log("hay search y es", criterios.search);
    tmp = searchBy(criterios.search, tmp);
  }
  if(criterios.sort) {  
      //console.log("hay sort y es", criterios.sort);
      tmp = sortBy(criterios.sort, tmp);
  }
  if(criterios.tag){
    //console.log("hay serach y es ", tmp.tag);
    tmp = tag(criterios.tag, tmp);
  }
  if(criterios.hasOwnProperty("no-format")){
     tmp = sinFormato(tmp);
  }
    
  return tmp;
};