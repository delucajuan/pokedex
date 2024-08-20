import { AppBar, Box, Container, Toolbar } from '@mui/material';
import Link from 'next/link';
import ToggleThemeButton from '../UI/ToggleThemeButton';
import SearchBox from '../UI/SearchBox';

function Header() {
  return (
    <Box>
      <AppBar position="static" color="secondary">
        <Container>
          <Toolbar sx={{ paddingX: '0 !important' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
                <Box
                  component="img"
                  src="/images/logo.png"
                  alt="Pokémon Logo"
                  sx={{ height: { xs: '40px', sm: '60px' } }}
                />
              </Link>
            </Box>
            <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'center', marginX: 2 }}>
              <SearchBox />
            </Box>
            <ToggleThemeButton />
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}

export default Header;
