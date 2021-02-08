import express, { Request, Response } from "express";
import multer, { FileFilterCallback } from "multer";
import path from "path";

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

router.post("/", upload.single("image"), (req: Request, res: Response) => {
    res.status(201).send({ data: `${req.file.path}` });
});

router.post(
    "/profileImage",
    upload.single("profileImage"),
    (req: Request, res: Response) => {
        res.status(201).send({ data: `${req.file.path}` });
    }
);

export { router as uploadRouter };
