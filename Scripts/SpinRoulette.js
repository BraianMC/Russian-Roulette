document.addEventListener("DOMContentLoaded", function () {

    const tickSound = document.getElementById("tickSound");
    const roulette = document.getElementById("roulette");
    const spinButton = document.getElementById("spinButton");
    var rotation = 0;
    var spinning = false;

    function playTickSound() {
        tickSound.currentTime = 0;
        tickSound.play();
        console.log("sonido");
    }

    function rotateRoulette() {
        if (!spinning) return;

        rotation += 5; //Ajusta la velocidad de rotacion
        roulette.style.transform = `rotate(${rotation}deg)`;
        console.log("ingreso");
        const sections = document.querySelectorAll(".roulette-section");

        //Detecta cuando  el borde de una seccion pasa por la aguja
        sections.forEach((section, index) => {
            const sectionAngle = index * (360 / sections.length);
            // const currentAngle = rotation % 360;
            const isNearNeedle = (rotation % 360 >= sectionAngle - 2.5 && rotation % 360 <= sectionAngle + 2.5);
            if (isNearNeedle) {
                playTickSound();
            }
        });

        requestAnimationFrame(rotateRoulette);
    }


    function getSectionUnderNeedle() {
        const needle = document.getElementById('needle');
        const needleRect = needle.getBoundingClientRect();

        // Obtener las coordenadas centrales del needle
        const needleCenterX = needleRect.left + needleRect.width / 2;
        const needleCenterY = needleRect.bottom; // Tomamos el borde inferior del needle

        // Buscar todas las secciones de la ruleta
        const sections = document.querySelectorAll('.roulette-section');
        let sectionUnderNeedle = null;

        sections.forEach(section => {
            const sectionRect = section.getBoundingClientRect();

            // Comprobar si el punto central del needle está dentro de los límites de la sección
            if (needleCenterX >= sectionRect.left &&
                needleCenterX <= sectionRect.right &&
                needleCenterY >= sectionRect.top &&
                needleCenterY <= sectionRect.bottom) {
                sectionUnderNeedle = section;
            }
        });

        return sectionUnderNeedle;
    }

    spinButton.addEventListener("click", () => {
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
                }
                else {
                    console.log("no se encontro nada..");
                }

            }, 5000);
        }
    });
});


