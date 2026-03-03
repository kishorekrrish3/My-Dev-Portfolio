import { Client, Databases, ID, Query } from "appwrite";

const client = new Client();

client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "https://cloud.appwrite.io/v1")
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || "");

export const databases = new Databases(client);

export const APPWRITE_DB_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "";

export const COLLECTIONS = {
  PROJECTS: process.env.NEXT_PUBLIC_APPWRITE_PROJECTS_COLLECTION_ID || "projects",
  CERTIFICATES: process.env.NEXT_PUBLIC_APPWRITE_CERTIFICATES_COLLECTION_ID || "certificates",
  CONTACT: process.env.NEXT_PUBLIC_APPWRITE_CONTACT_COLLECTION_ID || "contact_submissions",
};

export { ID, Query };

export async function getProjects() {
  try {
    const res = await databases.listDocuments(APPWRITE_DB_ID, COLLECTIONS.PROJECTS, [
      Query.orderAsc("order"),
    ]);
    return res.documents;
  } catch {
    return [];
  }
}

export async function getCertificates() {
  try {
    const res = await databases.listDocuments(APPWRITE_DB_ID, COLLECTIONS.CERTIFICATES, [
      Query.orderAsc("order"),
    ]);
    return res.documents;
  } catch {
    return [];
  }
}

export async function submitContact(name: string, email: string, message: string) {
  return databases.createDocument(APPWRITE_DB_ID, COLLECTIONS.CONTACT, ID.unique(), {
    name,
    email,
    message,
    submitted_at: new Date().toISOString(),
  });
}
