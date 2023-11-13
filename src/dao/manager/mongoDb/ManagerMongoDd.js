class ManagerMongoDb {
    constructor(collection) {
        this.collection = collection
    }

    //crea nuevo documento
    async create(doc) {
        try {
            const newDoc = await this.collection.create(doc)
            return newDoc
        } catch (err) {
            throw new Error('error:', err)
        }
    }
    //devuelve todos los documentos
    async getAll() {
        try {
            const all = await this.collection.find({})
            return all
        } catch (err) {
            throw new Error('error:', err)
        }
    }

    //devuelve el doc que coincide con el id
    async getOne(id) {
        try {
            const one = await this.collection.findById(id)
            return one
        } catch (err) {
            throw new Error('error: Producto no encontrado')
        }
    }
    //actualiza un documento por su id
    async update(id, doc) {
        try {
            console.log(typeof id)
            const updateDoc = await this.collection.findByIdAndUpdate(id, doc)
            return updateDoc
        } catch (err) {
            throw new Error('error:', err)
        }
    }

    //guarda documento
    async save(doc) {
        try {
            await doc.save()
        } catch (error) {
            throw new Error('error:', err)
        }
    }

    //eliminar por id
    async delete(id) {
        try {
            const deleteDoc = await this.collection.findByIdAndDelete(id)
            return deleteDoc
        } catch (err) {
            throw new Error('error:', err)
        }
    }
}

export default ManagerMongoDb
