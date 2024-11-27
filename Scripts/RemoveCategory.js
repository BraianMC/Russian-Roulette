document.addEventListener("DOMContentLoaded", function(){
    var categoryContainer2 = document.getElementById("categoryContainer");

    //*Agrego un event listener al contenedor principal         
    categoryContainer2.addEventListener("click", function(event){
        
        //*Verifico si se hizo click en el boton eliminar
        if (event.target.classList.contains("btn-danger") || event.target.closest('.btn-danger'))
        {
            //*Identifico el contenedor que contiene la categoria
            var categoryItem = event.target.closest(".cloned-category-item");

            //*Obtengo la seccion
            var categorySection = document.getElementById("section-" + categoryItem.id);
            

            //*Si se encontro el contenedor donde esta la categoria entonces se elimina
            if (categoryItem)
            {   
                //*Elimino la categoria y la seccion
                categoryItem.remove();
                categorySection.remove();
                
                //*Modifico la apariencia de las secciones de la ruleta teniendo en cuenta la cantidad
                var numSections = document.querySelectorAll(".roulette-section").length;
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
    
    //*Verifica si el contenedor de categorías está vacío
    if (categoryContainer3.children.length === 1) {
        noCategoriesMsg.classList.remove('d-none');
        categoryContainer3.classList.add('d-none');
    } 
    
    //* En este caso si voy eliminando categorias y si elimino la ultima ahi es donde hago aparecer el msg.
    //* Ahora cuando se agrega una categoria ya desaparece el msg (esto se hace en el archivo AddCategoty.js)
    //* Por lo tanto aca no hace falta hacer desaparecer el msg cuando se agregue una categoria.
}



