import { AppBar, Box, Button, Container, Toolbar } from '@mui/material';
import Link from 'next/link';
import ToggleThemeButton from './ToggleThemeButton';
import { SearchBox } from './SearchBox';

function Header() {
  return (
    <Box>
      <AppBar position="static">
        <Container>
          <Toolbar sx={{ paddingX: '0 !important' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
                <Box
                  component="img"
                  src="/images/logo.png"
                  alt="Pokémon Logo"
                  sx={{ height: { xs: '40px', sm: '60px' }, mr: 2 }}
                />
              </Link>
            </Box>
            <Box
              sx={{ display: 'flex', flexGrow: 1, justifyContent: 'center' }}
            >
              <SearchBox />
            </Box>
            <Box>
              <ToggleThemeButton />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}

export default Header;
