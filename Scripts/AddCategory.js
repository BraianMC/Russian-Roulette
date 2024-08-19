
const colorCodes = ["#00FF7F", "#EE82EE", "#FA8072", "#FF4500", "#7B68EE", "#483D8B", "#DC143C",
                    "#556B2F", "#FF0000",  "#FF6347",  "#008080",]
  
  
document.addEventListener("DOMContentLoaded", function () {
    var addButton = document.getElementById("add-button");
  
    addButton.addEventListener("click", function () {
  
      var categoryName = document.getElementById('categoryInput').value
      if (categoryName === '') {
        alert('Ingrese el nombre de la categoria. Por favor.');
        return;
      }
  
      //Clonamos la plantilla
      var categoryTemplate = document.getElementById("categoryTemplate");
      var newCategory = categoryTemplate.cloneNode(true);
      newCategory.classList.remove("category-item");
      newCategory.classList.add("cloned-category-item");
  
      console.log(categoryTemplate);
  
        //Agregamos el nombre de la nueva categoria
      newCategory.classList.remove("d-none");
      newCategory.querySelector('span').textContent = categoryName;
  
      //Mostrar el contenedor de categorias si es la primera
      var categoryContainer1 = document.getElementById("categoryContainer");
      
      //Obtengo el numero de categorias y le resto la categoria que se usa para clonar
      var numCategories = (categoryContainer1.children.length - 1) + 1;
      newCategory.id = "category-" + numCategories;

      //Agrega la categoria al contenedor
      categoryContainer1.appendChild(newCategory);
      
      //Limpio el input
      document.getElementById("categoryInput").value = "";
      console.log(categoryContainer1.children.length);
  
      //Obtengo el div del mensajes de que no hay categorias
      var noCategories = document.getElementById("no-categories");
  
      //El temas de los hijos del contenedor tiene que ver con los divs en este caso tengo dos divs
      if (categoryContainer1.children.length > 0) {
        categoryContainer1.classList.remove("d-none");
        noCategories.classList.add("d-none");
      }
      else {
        noCategories.classList.remove("d-none");
      }
  
      //Agregamos la categoria a la ruleta creando una seccion
      AddCategoryToRoulette(categoryName, newCategory.id);
    });
});
  
  function AddCategoryToRoulette(categoryName, idCategory) {
  
    var roulette = document.getElementById("roulette");
    var numSections = roulette.children.length;
    var angleDistance = 0;  
    //Le sumo 1 porque todavia no esta la seccion en la ruleta
    numSections += 1;
    numSections -= 1;
  
  
    //Obtengo los colores de las secciones existentes y los convierto a hexadecimal
    var usedColors = Array.from(roulette.children).map(child => rgbToHex(child.style.backgroundColor)).filter(color => color !== null);
    console.log("Colores usados:", usedColors);
  
    //Filtro los colores disponibles (siempre habra colores disponibles porque no elimino colores)
    var availableColors = colorCodes.filter(color => !usedColors.includes(color));
    console.log("Colores disponibles:", availableColors);
  
    // Verifica si hay colores disponibles (esto es mas por si acaso pero nunca pasara que me quede sin colores)
    if (availableColors.length === 0) {
      console.log("No hay más colores disponibles.");
      return;
    }
  
    //Obtengo al azar un color de los disponibles
    var colorIndex = Math.floor(Math.random() * availableColors.length);
    var selectedColor = availableColors[colorIndex];
  
    //Creo una nueva seccion
    var newSection = document.createElement("div");
    newSection.classList.add("roulette-section");
    newSection.style.backgroundColor = selectedColor;
    newSection.id = "section-" + idCategory;
  
    var span = document.createElement("span");
    span.textContent = categoryName;
    span.classList.add("span-name");
  
    newSection.appendChild(span);
  
  
    //Agrego la seccion a la ruleta
    roulette.appendChild(newSection);
  
    
  
    angleDistance = 360 / numSections;
    //Obtengo el valor del polygon llamando una funcion de otro script 
    
    var clipPathValor = "polygon("+calculatePolygonPoints(numSections)+")";
    
    
    //*Podria meterlo dentro una funcion y llamar a la funcion desde otros scripts
    //*Actualizo los nombres de span      
    updateSpanStyles(numSections);
    //*Esto reemplaza a lo de arriba
    updateCategories(angleDistance, clipPathValor);
  
    //Actualizo la clase section-n el valor transform: rotate(angleDistanceSection)
    //Cuando se termine el codigo de la funcion ahi es donde se reflejan los cambios
  
  }
  
  
  function rgbToHex(rgb) {
    if (!rgb || rgb === 'transparent') return null;
  
    const rgbArray = rgb.match(/\d+/g);
    if (rgbArray.length >= 3) {
      const r = parseInt(rgbArray[0], 10);
      const g = parseInt(rgbArray[1], 10);
      const b = parseInt(rgbArray[2], 10);
  
      return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
    }
    return null;
  }
  

  
