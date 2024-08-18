import { AppBar, Box, Container, Stack, Toolbar } from '@mui/material';
import Link from 'next/link';
import ToggleThemeButton from './ToggleThemeButton';
import SearchBox from './SearchBox';
import TypesMenu from './TypesMenu';

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
                  sx={{ height: { xs: '40px', sm: '60px' } }}
                />
              </Link>
            </Box>
            <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'center', marginX: 2 }}>
              <SearchBox />
            </Box>
            <Stack direction="row" spacing={1} display="flex" alignItems="center">
              <TypesMenu />
              <ToggleThemeButton />
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}

export default Header;
