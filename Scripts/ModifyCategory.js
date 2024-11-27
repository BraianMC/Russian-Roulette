document.addEventListener('DOMContentLoaded', function () {
    var toggleButton = document.getElementById("modify-button");
    var toggleState = false;
    

    toggleButton.addEventListener("click", function () 
    {
        //*Impido que apriete el boton de edicion si no hay categorias
        const sections = document.querySelectorAll(".roulette-section");
        if (sections.length === 0)
        {return;}

        //*Oculta o muestra las opciones de las categorias
        var options = document.querySelectorAll(".options");
        options.forEach(function (option) {
            option.classList.toggle("d-none");
        });

        const categorySpans = document.querySelectorAll(".category-name");
        var buttonAllDelete = document.getElementById("button-all-delete");

        //*Alterno el estado del boton cuando se presiona
        toggleState = !toggleState;

        if (toggleState) {
            //*Modifico la apariencia del boton modificar
            toggleButton.textContent = "Deshabilitar edicion";
            toggleButton.classList.remove("custom-btn-modify");
            toggleButton.classList.add("custom-btn-save");

            //*Habilito la edicion de los span para los nombres de las categorias
            categorySpans.forEach(span => {
                span.setAttribute("contenteditable", "true");
                span.classList.add("editable");
                
                //* Tengo que obtener el contenedor que contiene al span y de ahi obtengo el numero que me servira para
                //* identificar a la seccion en la ruleta y poder modificarla en tiempo real

                //*Detecto cambios de los span en tiempo real
                span.addEventListener("input", function(){
                    
                    span.setAttribute("data-modified", "");
                
                    //*Obtengo el span de la seccion de la ruleta 
                    const div = span.closest(".cloned-category-item");
                    const sectionToUpdate = document.getElementById("section-"+div.id);
                    const targetSpan = sectionToUpdate.querySelector(".span-name");

                    //*Hago que todo texto que ingrese en una span se refleje en tiempo real en el otro
                    targetSpan.textContent = span.textContent;
                   
                });
            });

            //*Habilito el boton para borrar todas las categorias en uno
            buttonAllDelete.classList.remove("d-none");
        }
        else 
        {
            //*Vuelvo a su apariencia original del boton modificar
            toggleButton.textContent = "Habilitar edicion";
            toggleButton.classList.remove("custom-btn-save");
            toggleButton.classList.add("custom-btn-modify");

            //*Deshabilito la edicion de los nombres de las categorias
            categorySpans.forEach(span => {
                span.removeAttribute("contenteditable");
                span.classList.remove("editable");
            });

            //*Deshabilito el boton de borrar todo
            buttonAllDelete.classList.add("d-none");

        }
    });
});
