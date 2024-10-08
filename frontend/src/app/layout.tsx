import type { Metadata } from 'next';
import './globals.css';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { Container, CssBaseline } from '@mui/material';
import { ThemeContextProvider } from '../context/ThemeContext';
import Header from '../components/Layout/Header';
import Footer from '@/components/Layout/Footer';

export const metadata: Metadata = {
  title: 'Pokédex',
  description:
    'Discover every Pokémon in the Pokedex with detailed stats, types, abilities, and evolutions. ',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <ThemeContextProvider>
            <CssBaseline>
              <Header />
              <Container maxWidth="lg" sx={{ paddingY: 2 }}>
                {children}
              </Container>
              <Footer />
            </CssBaseline>
          </ThemeContextProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
