document.addEventListener('DOMContentLoaded', function () {
    var toggleButton = document.getElementById("modify-button");
    var toggleState = false;


    toggleButton.addEventListener("click", function () 
    {
        var options = document.querySelectorAll(".options");
        options.forEach(function (option) {
            option.classList.toggle("d-none");
        });

        const categorySpans = document.querySelectorAll(".category-name");
        var buttonAllDelete = document.getElementById("button-all-delete");

        //Alterno el estado del boton cuando se presiona
        toggleState = !toggleState;

        if (toggleState) {
            //Modifico la apariencia del boton de modificar
            toggleButton.textContent = "Guardar cambios";
            toggleButton.classList.remove("custom-btn-modify");
            toggleButton.classList.add("custom-btn-save");

            //Habilito la edicion de los span para los nombres de las categorias
            categorySpans.forEach(span => {
                span.setAttribute("contenteditable", "true");
                span.classList.add("editable");
                
                //Detecto cambios de los span en tiempo real
                span.addEventListener("input", () =>{
                    span.setAttribute("data-modified", "");
                })
            });



            //Habilito el boton para borrar todas las categorias en uno
            buttonAllDelete.classList.remove("d-none");
        }
        else {
            //Vuelvo a su apariencia original del boton modificar
            toggleButton.textContent = "Modificar";
            toggleButton.classList.remove("custom-btn-save");
            toggleButton.classList.add("custom-btn-modify");

            //Deshabilito la edicion de los nombres de las categorias
            categorySpans.forEach(span => {
                span.removeAttribute("contenteditable");
                span.classList.remove("editable");
            });

            //Deshabilito el boton de borrar todo
            buttonAllDelete.classList.add("d-none");

            //Obtengo todos los elementos con el atributo "data-modified"
            const modifiedSpans = document.querySelectorAll("[data-modified]");
            console.log("Span que fueron modificados:", modifiedSpans);
            modifiedSpans.forEach(span =>{
                //Obtengo el div que contiene el span osea el elemento anterior a este
                const div = span.closest(".cloned-category-item");
                console.log("div:", div);
                if (div)
                {
                    const originalId = div.id;
                    const sectionId = "section-" + originalId;
                    const sectionToUpdate = document.getElementById(sectionId);
                    console.log("section a actualizar:", sectionToUpdate);
                    if (sectionToUpdate)
                    {
                        const targetSpan = sectionToUpdate.querySelector(".span-name");
                        targetSpan.textContent = span.textContent;
                    }
                }
            })
        }
    });
});





/* Algo a tener en cuenta es que el problema que tenia era que no estaba esperando a que se cargue la pagina 
por completo ya que estaba buscando el id sin que todavia se cargue entonces por eso tiraba error
entonces con el DOMContentLoaded hago que primero se cargue y luego identifique el id 
*/