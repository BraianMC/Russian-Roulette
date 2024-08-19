document.addEventListener("DOMContentLoaded", function () 
{
    var btnRemoveAll = document.getElementById("button-all-delete");

    btnRemoveAll.addEventListener("click", function () 
    {
        //Elimino todos los nombres de categorias
        var categories = document.querySelectorAll(".cloned-category-item");
        categories.forEach(category => {
            category.remove();
        });

        //Elimino todas las secciones de la ruleta
        var sections = document.querySelectorAll(".roulette-section");
        sections.forEach(section => {
            section.remove();
        });
        
        //Hago aparecer el msg y oculto el container de categorias
        var categoryContainer4 = document.getElementById('categoryContainer');
        var msgNoCategories = document.getElementById("no-categories");
        categoryContainer4.classList.add("d-none");
        console.log(msgNoCategories);
        msgNoCategories.classList.remove("d-none");
    });

})


//!Algo a tener en cuenta es que cuando elimino todas las categorias estoy eliminando tambien la plantilla que clon
//!por lo tanto por eso no me deja agregar categorias cuando elimino todas.
