const fs = require("fs");

const getAll = function () {
    const data =  fs.readFileSync(__dirname + "/pelis.json".toString());
    return JSON.parse(data);
  };

  const searchBy = function (texto, arrayDePelis) {
     let result = arrayDePelis.filter((item) => {
       return item.title.toLowerCase().includes(texto);
     });
     return result;

  };

  const sortBy = function (propiedad, arrayDePelis) {
    return arrayDePelis.sort((a,b)=>{
      return a[propiedad] > b[propiedad] ? 1 : -1;
    });
  };
  
  const tag = function (prop, filtrar) {
    var lower = prop.toLowerCase();
    const tag = filtrar.filter((item) =>
    item.tags.find((nombre) => nombre.toLowerCase().includes(lower))
  );
  return tag;
};
  const sinFormato = function (pelis) {
    return  JSON.stringify(pelis);
  };

  exports.searchByCriteria = function (criterios) {
    // comienzo un array vacio que voy a empezar a rellenar con las respuestas de las funciones
    let tmp = getAll();
    if (criterios.search) {
      console.log("hay search y es", criterios.search);
      tmp = searchBy(criterios.search, tmp);
    } else {
      console.log("no hay search");
    }
    if (criterios.sort) {
      tmp = sortBy(criterios.sort, tmp);
      console.log("hay sort y es", criterios.sort);
    } else {
      console.log("no hay sort");
    }
    if(criterios.tag){
      console.log("hay serach y es ", tmp.tag);
      tmp = tag(criterios.tag, tmp);
    }else{
      console.log("no hay tag");
    }  
    if(criterios.hasOwnProperty("no-format")){
      tmp = sinFormato(tmp);
    }
    
    return tmp;
  };