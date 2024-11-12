function getFixedPoints(numSections) 
{
    const points = {
        1: "0",
        2: "50% 50%, 100% 0%, 100% 100%, 0% 100%",
        3: "50% 50%, 100% 0%, 100% 100%, 63% 100%",
        4: "50% 50%, 100% 0%, 100% 100%, 100% 100%",
        5: "50% 50%, 100% 0%, 100% 100%, 145% 100%",
        6: "50% 50%, 100% 0%, 100% 100%, 225% 100%",
        7: "50% 50%, 100% 0%, 100% 100%, 430% 100%",
        8: "50% 50%, 100% 0%, 100% 100%, 600% 50%",
        9: "50% 50%, 100% 0%, 100% 100%, 500% 20%",
        10: "50% 50%, 100% 0%, 100% 100%, 400% 0%"

    };
    return points[numSections];
}


function calculatePolygonPoints(numSections)
{
    return getFixedPoints(numSections);
}


function updateCategories(angleDistance, clipPathValor)
{
    var sections = document.querySelectorAll(".roulette-section");
    var i = 0;
    sections.forEach(section => {
        var angleSection = angleDistance * i;
        section.style.clipPath = clipPathValor;
        section.style.transform = `rotate(${angleSection}deg)`;
        i += 1;
    });
}



function updateSpanStyles(numSections)
{
    const styleMap = {
        1: { transform: 'rotate(225deg)', left: '23%', top: '23%'},
        2: { transform: 'rotate(225deg)', left: '23%', top: '23%' },
        3: { transform: 'rotate(196deg)', left: '32%', top: '8%' },
        4: { transform: 'rotate(180deg)', left: '30%', top: '0%' },
        5: { transform: 'rotate(170deg)', left: '30%', top: '-5%' },
        6: { transform: 'rotate(165deg)', left: '30%', top: '-8%' },
        7: { transform: 'rotate(160deg)', left: '30%', top: '-11%' },
        8: { transform: 'rotate(157deg)', left: '30%', top: '-13%' },
        9: { transform: 'rotate(155deg)', left: '30%', top: '-15%' },
        10: { transform: 'rotate(153deg)', left: '30%', top: '-16%' },
    };

    const spans = document.querySelectorAll(".span-name");
    console.log(spans);
    const styles = styleMap[numSections];
    spans.forEach(span => {
        span.style.transform = styles.transform;
        span.style.left = styles.left;
        span.style.top = styles.top;
    });
}

// !Agregaria una funcion parecida para los puntos pero segun la cantidad de secciones te dara un valor para el span