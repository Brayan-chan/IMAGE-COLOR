function getAverageColor(imageElement, ratio) {
    const canvas = document.createElement('canvas');

    let height = canvas.height = imageElement.naturalHeight;
    let width = canvas.width = imageElement.naturalWidth;

    const context = canvas.getContext('2d');
    context.drawImage(imageElement, 0, 0);

    let data, length;
    let i = -4, count = 0;

    try {
        data = context.getImageData(0, 0, width, height);
        length = data.data.length;
    } catch (err) {
        console.error(err);
        return {
            R: 0,
            G: 0,
            B: 0
        };
    }
    let R = 0, G = 0, B = 0;

    while ((i += ratio * 4) < length) {
        ++count;
        R += data.data[i];
        G += data.data[i + 1];
        B += data.data[i + 2];
    }

    R = Math.round(R / count);
    G = Math.round(G / count);
    B = Math.round(B / count);

    return { R, G, B };
}

function generateGradient(color1, color2, steps) {
    const gradient = [];
    const stepFactor = 1 / (steps - 1);

    for (let i = 0; i < steps; i++) {
        const r = Math.round(color1.R * (1 - stepFactor * i) + color2.R * (stepFactor * i));
        const g = Math.round(color1.G * (1 - stepFactor * i) + color2.G * (stepFactor * i));
        const b = Math.round(color1.B * (1 - stepFactor * i) + color2.B * (stepFactor * i));
        gradient.push(`rgb(${r}, ${g}, ${b})`);
    }

    return gradient;
}

const image = document.querySelector('img');
image.onload = () => {
    const ratio = 4; // Ratio para el cálculo del color promedio
    const color2 = { R: 255, G: 255, B: 255 }; // Color blanco como segundo color

    // Obtener el color promedio de la imagen
    const color1 = getAverageColor(image, ratio);

    // Generar un gradiente con pasos intermedios
    const gradientSteps = 10; // Número de pasos en el gradiente
    const gradientColors = generateGradient(color1, color2, gradientSteps);

    // Aplicar el primer color del gradiente inmediatamente
    document.body.style.transition = 'background 0s'; // Desactivar la transición temporalmente
    document.body.style.background = gradientColors[0];

    // Aplicar el gradiente completo sin esperar
    document.body.style.background = `linear-gradient(to bottom, ${gradientColors.join(', ')})`;
};
