import * as mongoDB from 'mongodb';
import { client as mongoClient } from "../app"

export interface IQueryParams {
    //Indexer - the key and value pairs can be anything.
    [param: string]: any;
}

export class BaseService<TEntity> {
    // private mongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING);

    constructor(protected collection: string) {}

    async getAll(queryParams?: IQueryParams): Promise<TEntity[]> {
        let result: TEntity[];
        try {
            console.log("Connecting...")
            await mongoClient.connect();
            console.log('Connected successfully.');
            if (this.collection === 'comments') {
            console.log('Connected successfully. Comments');
                result = (await (mongoClient
                    .db(process.env.DB_NAME)
                    .collection(this.collection)
                    .find({ postId: queryParams.id })
                    .toArray() as unknown)) as TEntity[];
            } else {
                result = (await (mongoClient
                    .db(process.env.DB_NAME)
                    .collection(this.collection)
                    .find()
                    .toArray() as unknown)) as TEntity[];
            }
        } catch {
            console.log('error getting all of');
            return null;
        } finally {
            await mongoClient.close();
        }
        return result;
    }

    async getOne(id: string, queryParams?: IQueryParams): Promise<TEntity> {
        let result: TEntity;
        try {
            await mongoClient.connect();
            console.log('Connected successfully.');
            result = (await mongoClient
                .db(process.env.DB_NAME)
                .collection(this.collection)
                .find({ _id: new mongoDB.ObjectId(id) })) as unknown as TEntity;
        } catch {
            console.log('error getting one of');
            return null;
        } finally {
            await mongoClient.close();
        }
        return result;
    }

    async create(
        newObject: TEntity,
        queryParams?: IQueryParams
    ): Promise<void> {
        // How can i return the newly created document? For now ill just requery all of the items from the database to update the client side.
        try {
            await mongoClient.connect();
            console.log('Connected successfully.');
            await mongoClient
                .db(process.env.DB_NAME)
                .collection(this.collection)
                .insertOne(newObject);
        } catch {
            console.log('error creating one of');
            return null;
        } finally {
            await mongoClient.close();
        }
    }

    async update(
        id: string,
        updatedObject: TEntity,
        queryParams?: IQueryParams
    ): Promise<void> {
        try {
            await mongoClient.connect();
            console.log('Connected successfully.');
            await mongoClient
                .db(process.env.DB_NAME)
                .collection(this.collection)
                .updateOne(
                    { _id: new mongoDB.ObjectId(id) },
                    { $set: updatedObject }
                );
        } catch {
            console.log('error updating one of');
            return null;
        } finally {
            await mongoClient.close();
        }
    }

    async delete(id: string, queryParams?: IQueryParams): Promise<void> {
        try {
            await mongoClient.connect();
            console.log('Connected successfully.');
            await mongoClient
                .db(process.env.DB_NAME)
                .collection(this.collection)
                .deleteOne({ _id: new mongoDB.ObjectId(id) });
        } catch {
            console.log('error deleting one of');
            return null;
        } finally {
            await mongoClient.close();
        }
    }
}
