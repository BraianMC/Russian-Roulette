document.addEventListener("DOMContentLoaded", function(){
    var categoryContainer2 = document.getElementById("categoryContainer");

    //Agrego un event listener al contenedor principal
    categoryContainer2.addEventListener("click", function(event){
        //Verifico si se hizo click en el boton eliminar
        if (event.target.classList.contains("btn-danger") || event.target.closest('.btn-danger'))
        {
            //Identifico el contenedor donde que contiene la categoria
            var categoryItem = event.target.closest(".cloned-category-item");
            //Obtengo la seccion
            var categorySection = document.getElementById("section-" + categoryItem.id);
            //Obtengo el numero de seccion de la ruleta 
            //Si se encontro el contenedor donde esta la categoria entonces se elimina
            if (categoryItem)
            {   
                console.log("categoria a eliminar:", categoryItem);
                //Elimino la categoria y la seccion
                categoryItem.remove();
                categorySection.remove();
                
                //Debo actualizar la ruleta y primero obtengo el numero de secciones en la ruleta y le descuento el circulo central
                //!Ver el caso donde el numero de secciones es 0
                //!No deberia calcular nada porque estoy eliminando la ultima seccion y queda limpia la ruleta
                var numSections = categoryContainer2.children.length - 1;
                var angleDistance = 360 / numSections;
                var clipPathValor = "polygon("+calculatePolygonPoints(numSections)+")";
                updateCategories(angleDistance, clipPathValor);

                checkEmpty();
            }
        }
    });
});


function checkEmpty() 
{
    var categoryContainer3 = document.getElementById('categoryContainer');
    var noCategoriesMsg = document.getElementById('no-categories');
    console.log(categoryContainer3);
    console.log(noCategoriesMsg);

    // Verificar si el contenedor de categorías está vacío
    if (categoryContainer3.children.length === 1) {
        noCategoriesMsg.classList.remove('d-none');
        categoryContainer3.classList.add('d-none');
    } 
    
    //* En este caso si voy eliminando categorias y si elimino la ultima ahi es donde hago aparecer el msg.
    //* Ahora cuando se agrega una categoria ya desaparece el msg (esto se hace en el archivo AddCategoty.js)
    //* Por lo tanto aca no hace falta hacer desaparecer el msg cuando se agregue una categoria.
}

/* En este caso opté por agregar un event listener al contenedor donde se encuentran todas las categorias
    en lugar de agregar por cada boton delete. La decision fue mas por la eficiencia de la pagina y legibilidad
    del codigo.
*/

//!Corregir la repeticion del uso de la variable categoryContainer

//!Corregir el tema de la eliminacion de categorias porque solo elimina la primero pero la segunda se tarda
//! Puede ser porque solo se activa una vez cuando hago click en el contenedor y luego no.