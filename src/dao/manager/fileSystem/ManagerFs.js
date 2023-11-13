import { existsSync, promises } from 'fs'

/*   ***   Herencia de clases Paradigma Orientado a Objetos  ***  

 Clase contenedora que serivira como clase Padre de las clases Carrito y producto.
 En ella pondremos los metodos que compartiran sus clases hijas.
 Esto lo hacemos ya que ambas clases se guardan de la misma manera con fileSystem. 
 Otra forma de hacerlo tambien podria ser a traves de composicion. Es decir, relacionar las clases a traves de  instancias de distitnas clases.
 Se podria lograr pasandole una instancia de la clase ManagerFs tanto a Product como Cart a traves del contructor, para luego usar los metodos de container en Cart y Product segun sea necesario.

 */

class ManagerFs {
    constructor(name) {
        this.name = name //recibe un nombre de sus clases hijas
        this.path = './files' //ruta donde guardar el archivo
    }

    /* Metodos que usaran las clases hijas */

    //crea carpeta
    async createFiles() {
        try {
            if (existsSync(this.path)) {
                return false
            } else {
                await promises.mkdir(this.path)
                return true
            }
        } catch (error) {
            console.log(error)
        }
    }

    //crea archivo
    async createFile() {
        try {
            if (existsSync(`${this.path}/${this.name}.json`)) {
                console.log('arch ya existe')
                return false
            } else {
                await this.write('')
                console.log('arch no existe')
                return true
            }
        } catch (error) {
            console.log(error)
        }
    }

    //escribe archivo
    async write(content) {
        try {
            await promises.writeFile(`${this.path}/${this.name}.json`, content)
        } catch (error) {
            console.log(error)
        }
    }

    //lee archivo
    async read() {
        try {
            await this.createFiles()
            await this.createFile()
            let file = await promises.readFile(`${this.path}/${this.name}.json`, 'utf-8')
            if (file == '') {
                file = []
                return file
            } else {
                file = JSON.parse(file)
                return file
            }
        } catch (error) {
            console.log(error)
        }
    }

    //guarda objeto
    async save(obj) {
        try {
            await this.createFiles()
            await this.createFile()
            let fileContent = await this.read()
            obj.id = fileContent.length + 1
            fileContent.push(obj)
            await this.write(JSON.stringify(fileContent))
            return obj
        } catch (error) {
            console.log(error)
        }
    }

    //devuelve objeto por id
    async getById(number) {
        try {
            let fileContent = await this.read()
            for (let i of fileContent) {
                if (i.id === number) {
                    return i
                }
            }
            console.log('id no encontrado')
            return null
        } catch (error) {
            console.log(error)
        }
    }

    //devuelve todo los ojetos del archivo
    async getAll() {
        try {
            let fileContent = await this.read()
            return fileContent
        } catch (error) {
            console.log(error)
        }
    }

    //elimina objeto
    async deleteById(number) {
        try {
            let fileContent = await this.read()
            let nContent = fileContent.filter(e => e.id != number)
            await this.write(JSON.stringify(nContent))
        } catch (error) {
            console.log(error)
        }
    }

    //elimina todos los objetos del archivo
    async deleteAll() {
        try {
            let fileContent = await this.read()
            fileContent = ''
            await this.write(fileContent)
        } catch (error) {
            console.log(error)
        }
    }

    //actualiza objeto
    async update(id, obj) {
        try {
            console.log(id, obj)
            let indice = 0
            let exist = false
            let fileContent = await this.read() // metodo que lee el archivo con readFIle
            //recorre el array de objetos
            console.log(fileContent)
            for (let i of fileContent) {
                if (i.id === id) {
                    obj.id = id //mantiene el id
                    fileContent[indice] = obj //agrega el producto nuevo
                    exist = true
                }
                indice++
            }
            //si existe el id
            if (exist) {
                await this.write(JSON.stringify(fileContent)) //actualiza el producto
            } else {
                console.log('no existe ese id')
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export default ManagerFs //exportar clase
