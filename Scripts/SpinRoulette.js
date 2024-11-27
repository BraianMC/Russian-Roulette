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
        rotation += 30; //*Ajusta la velocidad de rotacion


        roulette.style.transform = `rotate(${rotation}deg)`;

        
        //!Esto esta fallando porque no me calcula bien el borde
        const isNearNeedle = (rotation % 360 >= sectionAngle - 3.5 && rotation % 360 <= sectionAngle + 3.5);

        if (isNearNeedle) {
            playTickSound();
        }                


        requestAnimationFrame(rotateRoulette);

    }


    //*Retorna el contenido del elemento span que este mas cerca del needle(aguja de ruleta)
    function getSectionUnderNeedle() {
        const needle = document.getElementById("needle");
        const needleRect = needle.getBoundingClientRect();
        const spans = document.querySelectorAll(".roulette-section .span-name");
        console.log("spans:", spans);
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

        return closestSpan ? closestSpan.textContent.trim() : null;
    }


    
    spinButton.addEventListener("click", () => {
        const clickButton = document.getElementById("click");        
        const sections = document.querySelectorAll(".roulette-section");
        
        if (sections.length == 0)
        {
            alert("Ingrese categorias por favor.");
            return;
        }

        clickButton.classList.add("d-none");
        rotateRoulette();

        if (!spinning) {
            spinning = true;

            rotateRoulette();

            setTimeout(() => {
                spinning = false;

                const name = getSectionUnderNeedle();
                document.getElementById("modalMessage").innerText = name;
                    
                //*Muestro el modal usando la API de bootstrap
                var modal = new bootstrap.Modal(document.getElementById("exampleModal"));
                modal.show();
                clickButton.classList.remove("d-none");
                clickButton.style.transform = `rotate(${-rotation}deg)`;
    
            }, 1000);
        }
    });
});


