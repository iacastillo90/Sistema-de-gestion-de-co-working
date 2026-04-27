const fs = require('fs');
const path = require('path');

// 1. Corrección de ruta: Apuntar explícitamente a la carpeta "back"
const directoryToScan = path.join(__dirname, 'back');
const outputFile = path.join(__dirname, 'transcripcion_back.txt');

// 2. Uso de Allowlist: Solo leer archivos de código fuente explícitamente permitidos
const allowedExtensions = ['.js', '.ts', '.json', '.md'];
const ignoreDirs = ['node_modules', '.git', 'dist', 'build', 'coverage'];

function getFiles(dir, fileList = []) {
    if (!fs.existsSync(dir)) {
        console.error(`Error: El directorio no existe -> ${dir}`);
        return fileList;
    }

    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
            if (!ignoreDirs.includes(file)) {
                getFiles(filePath, fileList);
            }
        } else {
            const ext = path.extname(file).toLowerCase();
            // Filtrar tanto por extensión permitida como por nombres específicos si es necesario
            if (allowedExtensions.includes(ext) && file !== 'package-lock.json') {
                fileList.push(filePath);
            }
        }
    }
    return fileList;
}

function transcribe() {
    const files = getFiles(directoryToScan);
    
    if (files.length === 0) {
        console.log('No se encontraron archivos válidos para transcribir.');
        return;
    }

    // 3. Uso de WriteStream para optimización de memoria
    const writeStream = fs.createWriteStream(outputFile, { flags: 'w', encoding: 'utf-8' });
    
    writeStream.write('TRANSCRIPCIÓN DEL PROYECTO (CARPETA BACK)\n\n');

    files.forEach(filePath => {
        const fileName = path.basename(filePath);
        const relativePath = path.relative(directoryToScan, filePath);
        
        writeStream.write(`\n================================================================================\n`);
        writeStream.write(`Nombre del archivo: ${fileName}\n`);
        writeStream.write(`Ruta: ${relativePath}\n`);
        writeStream.write(`================================================================================\n\n`);
        
        try {
            const content = fs.readFileSync(filePath, 'utf-8');
            writeStream.write(`${content}\n\n`);
        } catch (readError) {
            console.error(`Fallo al procesar el archivo ${fileName}:`, readError.message);
        }
    });

    writeStream.end();

    writeStream.on('finish', () => {
        console.log(`Transcripción completada con éxito. Archivo generado: ${outputFile}`);
    });

    writeStream.on('error', (err) => {
        console.error('Error de I/O al escribir el archivo:', err);
    });
}

transcribe();