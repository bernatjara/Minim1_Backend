import mongoose, { Document, Schema } from 'mongoose';

export interface IDenuncia {
    usuarioDenunciado: string;
    motivo: string;
}

export interface IDenunciaModel extends IDenuncia, Document {}

const DenunciaSchema: Schema = new Schema(
    {
        usuarioDenunciado: { type: Schema.Types.ObjectId, required: true },
        motivo: { type: String, required: true }
    },
    {
        versionKey: false
    }
);

export default mongoose.model<IDenunciaModel>('denuncia', DenunciaSchema);