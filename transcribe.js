const fs = require('fs');
const path = require('path');

// ─── Configuración ────────────────────────────────────────────────────────────
const targets = [
    {
        dir: path.join(__dirname, 'Back'),
        output: path.join(__dirname, 'transcripcion_back.txt'),
        label: 'BACK',
        extensions: ['.js', '.json', '.md'],
    },
    {
        dir: path.join(__dirname, 'Front'),
        output: path.join(__dirname, 'transcripcion_front.txt'),
        label: 'FRONT',
        extensions: ['.js', '.jsx', '.css', '.json', '.md', '.html'],
    },
];

const ignoreDirs = ['node_modules', '.git', 'dist', 'build', 'coverage', '.qodo'];
const ignoreFiles = ['package-lock.json'];

// ─── Funciones ────────────────────────────────────────────────────────────────
function getFiles(dir, allowedExtensions, fileList = []) {
    if (!fs.existsSync(dir)) {
        console.error(`Error: El directorio no existe -> ${dir}`);
        return fileList;
    }

    const entries = fs.readdirSync(dir);
    for (const entry of entries) {
        const fullPath = path.join(dir, entry);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            if (!ignoreDirs.includes(entry)) {
                getFiles(fullPath, allowedExtensions, fileList);
            }
        } else {
            const ext = path.extname(entry).toLowerCase();
            if (allowedExtensions.includes(ext) && !ignoreFiles.includes(entry)) {
                fileList.push(fullPath);
            }
        }
    }
    return fileList;
}

function transcribeTarget({ dir, output, label, extensions }) {
    const files = getFiles(dir, extensions);

    if (files.length === 0) {
        console.log(`[${label}] No se encontraron archivos válidos.`);
        return;
    }

    const writeStream = fs.createWriteStream(output, { flags: 'w', encoding: 'utf-8' });

    writeStream.write(`TRANSCRIPCIÓN DEL PROYECTO (CARPETA ${label})\n`);
    writeStream.write(`Generado: ${new Date().toLocaleString()}\n`);
    writeStream.write(`Total de archivos: ${files.length}\n\n`);

    files.forEach(filePath => {
        const fileName = path.basename(filePath);
        const relativePath = path.relative(dir, filePath);

        writeStream.write(`\n================================================================================\n`);
        writeStream.write(`Nombre del archivo: ${fileName}\n`);
        writeStream.write(`Ruta: ${relativePath}\n`);
        writeStream.write(`================================================================================\n\n`);

        try {
            const content = fs.readFileSync(filePath, 'utf-8');
            writeStream.write(`${content}\n\n`);
        } catch (readError) {
            console.error(`[${label}] Fallo al leer ${fileName}:`, readError.message);
        }
    });

    writeStream.end();

    writeStream.on('finish', () => {
        console.log(`✅ [${label}] Transcripción generada: ${path.basename(output)} (${files.length} archivos)`);
    });

    writeStream.on('error', (err) => {
        console.error(`[${label}] Error de I/O:`, err);
    });
}

// ─── Ejecución ────────────────────────────────────────────────────────────────
targets.forEach(transcribeTarget);