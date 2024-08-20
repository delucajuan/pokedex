import { PokemonType, TypesChipsProps } from '@/types/types';
import { capitalizeFirstLetter } from '@/utils/textFormatters';
import { Stack, Chip, Skeleton } from '@mui/material';

function TypesChips({ types, ...stackProps }: TypesChipsProps) {
  const SKELETON_TYPES = 2;

  if (!types) {
    // Render Skeletons
    return (
      <Stack direction="row" spacing={1}>
        {[...Array(SKELETON_TYPES)].map((_, index) => (
          <Skeleton
            variant="rounded"
            height={24}
            sx={{ borderRadius: 50 }}
            key={index}
            width="50%"
          />
        ))}
      </Stack>
    );
  }

  // Render Chips
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
