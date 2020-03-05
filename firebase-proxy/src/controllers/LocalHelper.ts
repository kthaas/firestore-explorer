import { LocalQuery } from "../models/Commands";
import { Firestore } from "@google-cloud/firestore";
const grpc = require("@grpc/grpc-js");
// Create a new client
const firestore = new Firestore({
  host: "localhost",
  port: 8080
});

export const handleLocalQuery = async (query: LocalQuery) => {
  let data: { [key: string]: any } = {};
  const db = firestore;
  const result = await db.doc("movies/60756").get();
  const collections = await result.ref.listCollections();
  console.log(collections);
  data["success"] = true;
  data["data"] = {
    id: result.id,
    path: result.ref.path,
    data: result.data()
  };
  return data;
};
