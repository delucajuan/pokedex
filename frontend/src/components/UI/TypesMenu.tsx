'use client';
import { useEffect, useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Button, Menu, MenuItem, Skeleton, Stack, Typography } from '@mui/material';
import usePokemonTypes from '@/hooks/usePokemonTypes';
import { TypesMenuOptions } from '@/types/types';
import { capitalizeFirstLetter } from '@/utils/textFormatters';
import { useRouter, useSearchParams } from 'next/navigation';

export default function TypesMenu() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const typeParam = searchParams.get('type');

  // Set selected type as url param or 'all'
  const [selectedType, setSelectedType] = useState(typeParam || 'all');

  // Update selectedType when typeParam changes
  useEffect(() => {
    if (typeParam !== selectedType) {
      setSelectedType(typeParam || 'all');
    }
  }, [selectedType, typeParam]);

  // Fetch Pokemón types
  const { data: typesData, isLoading } = usePokemonTypes();
  const types = typesData ? ['all', ...typesData] : [];

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleTypeSelect = (type: TypesMenuOptions) => {
    setSelectedType(type);

    // Set type as url param
    const params = new URLSearchParams(searchParams.toString());
    if (type === 'all') {
      // If the selected type is 'all', remove the 'type' parameter
      params.delete('type');
    } else {
      // Otherwise, set the 'type' parameter
      params.set('type', type.toString());
    }
    // Remove page parameter on type change
    params.delete('page');
    router.push(`?${params}`);
    handleClose();
  };
  if (isLoading) {
    return (
      <Stack direction="row" alignItems="center">
        <Skeleton width={153} height={36} />
      </Stack>
    );
  }

  return (
    <Stack direction="row" alignItems="center">
      <Typography marginRight={1}>Type</Typography>
      <Button
        aria-controls={open ? 'type-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleMenuOpen}
        variant="contained"
        endIcon={<KeyboardArrowDownIcon />}
        sx={{ textTransform: 'none', minWidth: 110, paddingX: 1 }}
      >
        <Typography>{capitalizeFirstLetter(selectedType)}</Typography>
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{ maxHeight: '80vh', minWidth: 110 }}
        MenuListProps={{
          'aria-labelledby': 'type-selection-button',
        }}
      >
        {types?.map((type) => (
          <MenuItem
            selected={type === selectedType}
            key={type}
            onClick={() => handleTypeSelect(type as TypesMenuOptions)}
          >
            {capitalizeFirstLetter(type)}
          </MenuItem>
        ))}
      </Menu>
    </Stack>
  );
}
