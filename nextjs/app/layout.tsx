import 'material-symbols';
import { Open_Sans } from "next/font/google";
import Container from "@/components/Container";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { MainMenuQuery, FooterMenuQuery } from "@/graphql/queries";
import { getClientWithAuth } from "@/utils/client.server";

import './globals.css'

const font = Open_Sans({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const client = await getClientWithAuth();

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
      <body className={font.className}>
        <Container>
          <Header mainMenu={menuData?.menu || null} />
          {children}
          <Footer footerMenu={footerData?.menu || null} />
        </Container>
      </body>
    </html>
  );
}
