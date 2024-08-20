import { Box, Typography, Button } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import Link from 'next/link';

function Error({ errorType }: { errorType: 'server' | 'notFound' | 'notResults' }) {
  const messages = {
    server: 'Server error. Please try again later.',
    notResults: 'No Pokémon matched your search.',
    notFound: `Sorry, the page you’re looking for doesn’t exist.`,
  };

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      paddingY="25vh"
      marginX="auto"
      maxWidth={360}
    >
      {errorType === 'notResults' ? (
        <SearchOffIcon sx={{ fontSize: 80, opacity: 0.7 }} />
      ) : (
        <ErrorOutlineIcon sx={{ fontSize: 80, opacity: 0.7 }} />
      )}
      <Typography marginBottom={2} sx={{ opacity: 0.6 }}>
        {messages[errorType]}
      </Typography>
      {errorType === 'server' ? (
        <Button variant="contained" onClick={handleReload}>
          Reload
        </Button>
      ) : (
        <Link href="/">
          <Button variant="contained">All Pokémon</Button>
        </Link>
      )}
    </Box>
  );
}

export default Error;
