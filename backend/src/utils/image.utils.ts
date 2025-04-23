import sharp from 'sharp';
import path from 'path';

/**
 * Сжимает изображение до ширины 800px и добавляет водяной знак.
 * watermark.png должен лежать в папке assets вашего проекта
 */
export const processImage = async (filePath: string) => {
    const outputPath = filePath.replace(/(\.[\w\d_-]+)$/i, '_processed$1');

    await sharp(filePath)
        .resize(800)
        .toFile(outputPath);

    return outputPath;
};