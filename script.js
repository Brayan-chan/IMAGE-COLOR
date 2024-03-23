function getAverageColor(imageElement, ratio) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    let height = canvas.height = imageElement.naturalHeight;
    let width = canvas.width = imageElement.naturalWidth;

    context.drawImage(imageElement, 0, 0);

    let data = context.getImageData(0, 0, width, height).data;
    let pixelCount = data.length / 4;
    let R = 0, G = 0, B = 0;

    for (let i = 0; i < pixelCount; i += ratio) {
        R += data[i * 4];
        G += data[i * 4 + 1];
        B += data[i * 4 + 2];
    }

    R = Math.round(R / (pixelCount / ratio));
    G = Math.round(G / (pixelCount / ratio));
    B = Math.round(B / (pixelCount / ratio));

    return { R, G, B };
}

const image = document.querySelector('img');
image.onload = () => {
    const ratio = 4; // Ratio para el cálculo del color promedio

    // Obtener el color promedio de la imagen
    const color = getAverageColor(image, ratio);

    // Aplicar el color promedio como fondo del cuerpo de la página
    document.body.style.background = `rgb(${color.R}, ${color.G}, ${color.B})`;
};
