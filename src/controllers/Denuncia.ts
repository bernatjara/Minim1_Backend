import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import User from '../models/User';
import Denuncia from '../models/Denuncia';

const createDenuncia = (req: Request, res: Response, next: NextFunction) => {
    const { usuarioDenunciado, motivo } = req.body;

    const denuncia = new Denuncia({
        _id: new mongoose.Types.ObjectId(),
        usuarioDenunciado, 
        motivo
    });

    return denuncia
        .save()
        .then((denuncia) => res.status(201).json(denuncia))
        .catch((error) => res.status(500).json(error));
};

const readDenuncia = (req: Request, res: Response, next: NextFunction) => {
    const denunciaId = req.params.denunciaId;

    return Denuncia.findById(denunciaId)
        .then((denuncia) => (denuncia ? res.status(200).json(denuncia) : res.status(404).json({ message: 'Not found' })))
        .catch((error) => res.status(500).json(error));
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
    return Denuncia.find()
        .then((denuncias) => res.status(200).json(denuncias))
        .catch((error) => res.status(500).json(error));
};

const updateDenuncia = (req: Request, res: Response, next: NextFunction) => {
    const denunciaId = req.params.denunciaId;
    const { usuarioDenunciado, motivo } = req.body;
    const denuncia = new Denuncia({
        usuarioDenunciado,
        motivo
    });
    return User.findByIdAndUpdate(denunciaId, { usuarioDenunciado: denuncia.usuarioDenunciado, motivo: denuncia.motivo })
        .then((denunciaOut) => (denunciaOut ? res.status(200).json(denuncia) : res.status(404).json({ message: 'Not found' })))
        .catch((error) => res.status(500).json(error));
};

const deleteDenuncia = (req: Request, res: Response, next: NextFunction) => {
    const denunciaId = req.params.denunciaId;

    return Denuncia.findByIdAndDelete(denunciaId)
        .then((denuncia) => (denuncia ? res.status(201).json({ message: 'Deleted' }) : res.status(404).json({ message: 'Not found' })))
        .catch((error) => res.status(500).json(error));
};

const getDenunciasOfUser = async (req: Request, res: Response) => {
    try {
        const idUser = req.params.id;
        console.log(idUser);
        const response = await getAllDenunciasByUser(idUser);
        const data = response ? response : 'NOT_FOUND';
        res.send(data);
    } catch (err) {
        console.log(err);
        return err;
    }
};

const getAllDenunciasByUser = async (userId: string) => {
    const responseItem = await User.findOne({ _id: userId }).populate('denuncia');
    return responseItem;
};

export default { createDenuncia, readDenuncia, readAll, updateDenuncia, deleteDenuncia, getDenunciasOfUser };

