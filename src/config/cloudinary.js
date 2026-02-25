const cloudinary = require("cloudinary").v2;
const multer = require("multer");

// Configura o Cloudinary com as credenciais do .env
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer guarda o ficheiro em memória (buffer), não escreve nada no disco
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // máximo 5MB
  },
  fileFilter(req, file, cb) {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Apenas imagens são permitidas."));
    }
    cb(null, true);
  },
});

// Envia o buffer da imagem ao Cloudinary e devolve o resultado
function enviarParaCloudinary(buffer, nomePublico) {
  return new Promise((resolve, reject) => {
    
    // Verifica se o buffer é válido antes de enviar
    if (!buffer || buffer.length === 0) {
      return reject(new Error("Buffer da imagem está vazio."));
    }

    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "projectos/expressJs/zeno-candidata/candidatos/foto",
        public_id: nomePublico,
        overwrite: true,
        resource_type: "image",
        transformation: [
          { width: 400, height: 400, crop: "fill", gravity: "face" },
        ],
      },
      (erro, resultado) => {
        if (erro) {
          console.error("Erro no upload para o Cloudinary:", erro);
          return reject(erro);
        }
        console.log("Upload feito com sucesso:", resultado.secure_url);
        resolve(resultado);
      }
    );

    stream.end(buffer);
  });
}

// Remove uma imagem do Cloudinary pelo public_id
async function removerDoCloudinary(publicId) {
  try {
    await cloudinary.uploader.destroy(publicId);
    console.log("Imagem removida do Cloudinary:", publicId);
  } catch (erro) {
    console.error("Erro ao remover imagem do Cloudinary:", erro.message);
  }
}

module.exports = { upload, enviarParaCloudinary, removerDoCloudinary };