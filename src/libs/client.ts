import { createClient } from "@sanity/client";

export const config = {
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: process.env.SANITY_API_VERSION,
  token: process.env.SANITY_TOKEN, // Replace with the copied token
  useCdn: false,
}

export const sanityClient = createClient(config);