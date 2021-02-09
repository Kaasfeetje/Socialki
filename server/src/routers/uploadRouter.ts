import express, { Request, Response, NextFunction } from "express";
import multer, { FileFilterCallback } from "multer";
import path from "path";
import sharp from "sharp";

const router = express.Router();

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, "uploads/");
    },
    filename(req, file, cb) {
        cb(
            null,
            `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
        );
    },
});

const profileImageStorage = multer.memoryStorage();

function checkFileType(file: Express.Multer.File, cb: FileFilterCallback) {
    const filetypes = /jpg|jpeg|png/;
    const extname = filetypes.test(
        path.extname(file.originalname.toLowerCase())
    );
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        return cb(new Error("Images only"));
    }
}

const upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    },
});

const profileImageUpload = multer({
    storage: profileImageStorage,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    },
});

const resizeProfileImages = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const file = req.file;
    const filename = `uploads/${file.fieldname}-${Date.now()}${path.extname(
        file.originalname
    )}`;

    await sharp(file.buffer)
        .resize(250, 250)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(filename);

    req.file.path = filename;

    next();
};

router.post("/", upload.single("image"), (req: Request, res: Response) => {
    res.status(201).send({ data: `${req.file.path}` });
});

router.post(
    "/profileImage",
    profileImageUpload.single("profileImage"),
    resizeProfileImages,
    (req: Request, res: Response) => {
        res.status(201).send({ data: `${req.file.path}` });
    }
);

export { router as uploadRouter };
