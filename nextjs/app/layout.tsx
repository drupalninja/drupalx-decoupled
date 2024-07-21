import type { Metadata } from "next";
import { Inter } from "next/font/google";
import 'material-symbols';
import "../styles/bootstrap.scss";
import Container from "@/components/Container";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Suspense } from "react";
import NavigationEvents from "@/components/helpers/NavigationEvents";
import { MainMenuQuery, FooterMenuQuery } from "@/graphql/queries";
import { getClient } from "@/utils/client.server";

const inter = Inter({ subsets: ["latin"] });

function getEnvironment(): string {
  return process.env.ENVIRONMENT || "production";
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const environment = getEnvironment();

  const client = await getClient({
    url: process.env.DRUPAL_GRAPHQL_URI!,
    auth: {
      uri: process.env.DRUPAL_AUTH_URI!,
      clientId: process.env.DRUPAL_CLIENT_ID!,
      clientSecret: process.env.DRUPAL_CLIENT_SECRET!,
    },
  });

  const { data: menuData, error: menuError } = await client.query(MainMenuQuery, {});
  
  if (menuError) {
    throw menuError;
  }

  const { data: footerData, error: footerError } = await client.query(FooterMenuQuery, {});

  if (footerError) {
    throw footerError;
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <Container>
          <Header mainMenu={menuData?.menu || null} />
          {children}
          <Footer footerMenu={footerData?.menu || null} />
        </Container>
        <Suspense fallback={null}>
          <NavigationEvents environment={environment} />
        </Suspense>
      </body>
    </html>
  );
}
