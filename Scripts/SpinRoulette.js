document.addEventListener("DOMContentLoaded", function () {

    const tickSound = document.getElementById("tickSound");
    const roulette = document.getElementById("roulette");
    const spinButton = document.getElementById("spinButton");

    var rotation = 0;
    var spinning = false;


    function playTickSound() {
        tickSound.currentTime = 0;
        tickSound.play();
    }


    function rotateRoulette() {
        if (!spinning) return;

        const sections = document.querySelectorAll(".roulette-section");
        const sectionAngle = 360 / sections.length;
        console.log("cantidad de secciones:", sections);
        rotation += 30; //Ajusta la velocidad de rotacion


        roulette.style.transform = `rotate(${rotation}deg)`;
        console.log("Imprimir:", rotation);


        //Detecta cuando  el borde de una seccion pasa por la aguja

        //!Esto esta fallando porque no me calcula bien el borde
        const isNearNeedle = (rotation % 360 >= sectionAngle - 2.5 && rotation % 360 <= sectionAngle + 2.5);

        if (isNearNeedle) {
            playTickSound();
            console.log("valor de rotation:", rotation);
        }


        requestAnimationFrame(rotateRoulette);

    }



    //Al declarar las variables afuera de la function cuando se carga el archivo estas son las primeras en ejecutarse
    //Entonces al no haber secciones al cargarse la pagina entonces por eso no me trae nada

    function getSectionUnderNeedle() {
        const needle = document.getElementById("needle");
        const needleRect = needle.getBoundingClientRect();
        const spans = document.querySelectorAll(".roulette-section .span-name");
        var closestSpan = null;
        var minDistance = Infinity;

        spans.forEach(span => {
            const spanRect = span.getBoundingClientRect();
            const distance = Math.sqrt(
                Math.pow(spanRect.left - needleRect.left, 2) +
                Math.pow(spanRect.top - needleRect.top, 2)
            );

            if (distance < minDistance) {
                minDistance = distance;
                closestSpan = span;
            }
        });

        return closestSpan ? closestSpan.closest(".roulette-section") : null;
    }



    spinButton.addEventListener("click", () => {
        const clickButton = document.getElementById("click");
        clickButton.classList.add("d-none");
        rotateRoulette();

        if (!spinning) {
            spinning = true;


            rotateRoulette();

            // Detener la ruleta después de 5 segundos
            setTimeout(() => {
                spinning = false;


                const selectedSection = getSectionUnderNeedle();

                if (selectedSection) {
                    const selectedSectionName = selectedSection.querySelector(".span-name").textContent;
                    document.getElementById("modalMessage").innerText = selectedSectionName;
                    //Muestro el modal usando la API de bootstrap
                    var modal = new bootstrap.Modal(document.getElementById("exampleModal"));
                    modal.show();
                    console.log("opcion ganadora:", selectedSectionName);
                    clickButton.classList.remove("d-none");
                    clickButton.style.transform = `rotate(${-rotation}deg)`;
                }
                else {
                    console.log("no se encontro nada..");
                }

            }, 1000);
        }
    });
});


