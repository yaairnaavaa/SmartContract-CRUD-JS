import { NearBindgen, near, call, view, Vector } from 'near-sdk-js'
import { Model } from './model'

@NearBindgen({})
class Contract {
  // Vector que almacena los registros de datos.
  data: Vector<Model> = new Vector<Model>("v-uid");
  
  // Contador global para los IDs
  nextId: number = 0;

  // Crea un nuevo registro.
  @call({})
  new_record({ prop1 }: { prop1: string }): String {
    const sender = near.predecessorAccountId();
    const id = this.nextId;
    const new_record: Model = { sender, id, prop1 };
    this.data.push(new_record);
    this.nextId += 1;

    return "Registro creado";
  }

  // Obtiene un registro específico por su ID.
  @view({})
  get_record({ id }: { id: number }): Model | null {
    const dataArray = this.data.toArray();
    return dataArray.find(record => record.id === id) || null;
  }

  // Obtiene todos los registros almacenados.
  @view({})
  get_all_records(): Model[] {
    return this.data.toArray();
  }

  // Obtiene el total de registros almacenados.
  @view({})
  get_total_records(): number { return this.data.length }

  // Actualiza un registro existente por su ID.
  @call({})
  update_record({ id, new_prop1 }: { id: number, new_prop1: string }): String {
    const sender = near.predecessorAccountId();
    const dataArray = this.data.toArray();

    const indexToUpdate = dataArray.findIndex(record => record.id === id);

    if (indexToUpdate !== -1 && dataArray[indexToUpdate].sender === sender) {
        dataArray[indexToUpdate].prop1 = new_prop1;

        const newVector = new Vector<Model>("v-uid");
        dataArray.forEach(record => newVector.push(record));
        this.data = newVector;

        return "Registro actualizado";
    } else {
        throw new Error("No se encontró registro o no tienes permiso de actualizarlo");
    }
}

  // Elimina un registro existente por su ID.
  @call({})
  delete_record({ id }: { id: number }): String {
    const sender = near.predecessorAccountId();
    const dataArray = this.data.toArray();
    const indexToDelete = dataArray.findIndex(record => record.id === id);

    if (indexToDelete !== -1 && dataArray[indexToDelete].sender === sender) {

      const newRecords = dataArray.filter(record => record.id !== id);

        const newVector = new Vector<Model>("v-uid");
        newRecords.forEach(record => newVector.push(record));
        this.data = newVector;

        return "Registro eliminado";
    } else {
        return "No se encontró registro o no tienes permiso de eliminarlo";
    }
  }
}