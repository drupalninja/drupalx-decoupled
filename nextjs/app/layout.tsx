import 'material-symbols';
import "../styles/bootstrap.scss";
import Container from "@/components/Container";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { MainMenuQuery, FooterMenuQuery } from "@/graphql/queries";
import { getClientWithAuth } from "@/utils/client.server";

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
      <body>
        <Container>
          <Header mainMenu={menuData?.menu || null} />
          {children}
          <Footer footerMenu={footerData?.menu || null} />
        </Container>
      </body>
    </html>
  );
}
