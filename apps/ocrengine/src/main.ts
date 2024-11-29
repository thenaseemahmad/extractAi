import express, { Request, Response } from 'express';
import tesseract from "node-tesseract-ocr";
import cors from "cors";
import multer from "multer";
import path from 'path';
import morgan from 'morgan';


const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

app.use(cors());
app.use(morgan('common'));
//this middleware will make sure that a folder named uploads should be created 
//and used to uplaod files that are uploaded by clients
app.use(express.static(__dirname));
// app.use(bodyParser.json());

async function ImageToText(imagepath:string){
  const config = {
    lang: "eng",
    oem: 1,
    psm: 3,
  }
  return await tesseract.recognize(imagepath, config)
}

//configure multer storage
const storage = multer.diskStorage({
  destination:(req, file, cb) => {
    cb(null, path.join(__dirname,'/uploads/'));
  },
  filename:(req, file, cb)=>{
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({storage});

app.post('/upload', upload.single('image'),async(req,res)=>{
  if(!req.file){
    return res.status(400).json({message:'No file uploaded'});
  }
  const text = await ImageToText(req.file.path);
  res.status(200).json({message: 'File uploaded successfully', filepath: `uploads/${req.file.filename}`, extractedText: text});
});

app.post('/imagetotext',async(req:Request, res:Response)=>{
  const {imagepath} = req.body;
  const config = {
    lang: "eng",
    oem: 1,
    psm: 3,
  }
  const text = await tesseract.recognize(imagepath, config)
  res.send({text: text});
});

app.all("*", (req,res)=>{
  throw new Error("Path not found")
})

app.listen(port, host, () => {
  console.log(`[ Ocrengine: Ready ] http://${host}:${port}`);
});
