import path from "path";
import * as dotenv from "dotenv";
import fs from "fs/promises";
import { drupalAuthClient } from "drupal-auth-client";
import { getIntrospectionQuery, buildClientSchema, printSchema } from 'graphql';

(async () => {
  try {
    console.log("🚀 Starting GraphQL Schema Generation with drupal-auth-client");
    
    // Load environment variables from both .env and .env.local
    const envPath = path.join(process.cwd(), ".env");
    const envLocalPath = path.join(process.cwd(), ".env.local");

    dotenv.config({ path: envPath });
    dotenv.config({ path: envLocalPath });

    // Validate required environment variables
    if (!process.env.DRUPAL_AUTH_URI) {
      throw new Error("DRUPAL_AUTH_URI is required");
    }
    if (!process.env.DRUPAL_CLIENT_ID) {
      throw new Error("DRUPAL_CLIENT_ID is required");
    }
    if (!process.env.DRUPAL_CLIENT_SECRET) {
      throw new Error("DRUPAL_CLIENT_SECRET is required");
    }
    if (!process.env.DRUPAL_GRAPHQL_URI) {
      throw new Error("DRUPAL_GRAPHQL_URI is required");
    }

    // Use the existing environment variables
    const authUri = `${process.env.DRUPAL_AUTH_URI}/oauth/token`;
    const graphqlUri = process.env.DRUPAL_GRAPHQL_URI;

    console.log(`🔑 Authenticating with: ${authUri}`);
    
    // Authenticate using drupal-auth-client
    const authClient = await drupalAuthClient(
      authUri,
      "client_credentials",
      {
        clientId: process.env.DRUPAL_CLIENT_ID,
        clientSecret: process.env.DRUPAL_CLIENT_SECRET,
      }
    );

    const token = `${authClient.token_type} ${authClient.access_token}`;
    
    console.log("✅ Authentication successful");

    console.log(`\n🔍 Introspecting GraphQL Schema from: ${graphqlUri}`);

    // Execute introspection query using fetch
    const introspectionQuery = getIntrospectionQuery();
    const response = await fetch(graphqlUri, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
      },
      body: JSON.stringify({
        query: introspectionQuery,
      }),
    });

    if (!response.ok) {
      throw new Error(`GraphQL request failed: ${response.status} ${response.statusText}`);
    }

    const { data } = await response.json() as any;

    if (!data || !data.__schema) {
      throw new Error("Failed to retrieve schema from introspection query");
    }

    console.log("✅ Schema introspection successful");

    // Build client schema from introspection result
    const schema = buildClientSchema(data);

    // Convert to SDL (Schema Definition Language)
    const schemaSDL = printSchema(schema);

    // Ensure schema directory exists
    const schemaDir = path.join(process.cwd(), "schema");
    await fs.mkdir(schemaDir, { recursive: true });

    // Write schema to file
    const schemaPath = path.join(schemaDir, "schema.graphql");
    await fs.writeFile(schemaPath, schemaSDL, 'utf8');

    console.log(`📄 Schema written to: ${schemaPath}`);

    // Also write the introspection result as JSON for tooling
    const introspectionPath = path.join(schemaDir, "introspection.json");
    await fs.writeFile(introspectionPath, JSON.stringify(data, null, 2), 'utf8');

    console.log(`📄 Introspection result written to: ${introspectionPath}`);

    // Generate TypeScript types file
    const typesContent = `// Generated GraphQL Schema Types
// This file is auto-generated. Do not edit manually.

export interface GraphQLSchema {
  __schema: {
    types: Array<{
      name: string;
      kind: string;
      description?: string;
      fields?: Array<{
        name: string;
        type: {
          name?: string;
          kind: string;
        };
        description?: string;
      }>;
    }>;
  };
}

// Export the introspection result
export const introspectionResult = ${JSON.stringify(data, null, 2)} as const;
`;

    const typesPath = path.join(schemaDir, "types.ts");
    await fs.writeFile(typesPath, typesContent, 'utf8');

    console.log(`📄 TypeScript types written to: ${typesPath}`);

    console.log("\n✅ GraphQL Schema generation completed successfully!");
    console.log("\nGenerated files:");
    console.log(`  • ${schemaPath}`);
    console.log(`  • ${introspectionPath}`);
    console.log(`  • ${typesPath}`);

  } catch (error) {
    console.error("\n❌ Error generating schema:", error);
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Stack trace:", error.stack);
    }
    process.exit(1);
  }
})();