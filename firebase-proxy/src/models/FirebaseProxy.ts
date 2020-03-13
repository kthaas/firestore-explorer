import { Firestore } from "@google-cloud/firestore";
const grpc = require("@grpc/grpc-js");
import * as fs from "fs";
import { db } from "../json-db";
import { CloudServer } from "./Server";

export const generateFirestoreEmulatedInstance = (projectId: string) => {
  return new Firestore({
    host: "localhost:8080",
    ssl: false
  });
};

export const generateCloudEmulatedInstance = (server: CloudServer) => {
  const fileName = `server-${server.id}.json`;
  const filePath = `data/${fileName}`;
  const exists = fs.existsSync(filePath);
  if (!exists) {
    fs.writeFileSync(filePath, JSON.stringify(server.config));
  }
  return new Firestore({
    keyFilename: filePath
  });
};
