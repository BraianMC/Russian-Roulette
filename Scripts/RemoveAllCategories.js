document.addEventListener("DOMContentLoaded", function () 
{
    var btnRemoveAll = document.getElementById("button-all-delete");
    const toggleButton = document.getElementById("modify-button");

    btnRemoveAll.addEventListener("click", function () 
    {
        //*Elimino todos los nombres de categorias
        var categories = document.querySelectorAll(".cloned-category-item");
        categories.forEach(category => {
            category.remove();
        });

        //*Elimino todas las secciones de la ruleta
        var sections = document.querySelectorAll(".roulette-section");
        sections.forEach(section => {
            section.remove();
        });
        
        //*Hago aparecer el msg y oculto el container de categorias
        var categoryContainer4 = document.getElementById('categoryContainer');
        var msgNoCategories = document.getElementById("no-categories");
        categoryContainer4.classList.add("d-none");
        msgNoCategories.classList.remove("d-none");

        
        //*Cambio a la apariencia original del boton de edición
        toggleButton.textContent = "Habilitar edicion";
        toggleButton.classList.remove("custom-btn-save");
        toggleButton.classList.add("custom-btn-modify");

        btnRemoveAll.classList.add("d-none");
            
    });

})


