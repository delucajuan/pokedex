import { PokemonType, TypesChipsProps } from '@/types/types';
import { capitalizeFirstLetter } from '@/utils/textFormatters';
import { Stack, Chip } from '@mui/material';

function TypesChips({ types, ...stackProps }: TypesChipsProps) {
  return (
    <Stack direction="row" spacing={1} {...stackProps}>
      {types?.map((type) => (
        <Chip
          key={type}
          label={capitalizeFirstLetter(type)}
          color={type as PokemonType}
          size="small"
          sx={{
            width: '50%',
            fontSize: '1rem',
            fontWeight: 600,
          }}
        />
      ))}
    </Stack>
  );
}

export default TypesChips;
