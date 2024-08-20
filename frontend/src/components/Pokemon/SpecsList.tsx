'use client';
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Divider,
  ListItem,
  ListSubheader,
  Skeleton,
} from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import HeightIcon from '@mui/icons-material/Height';
import ScaleIcon from '@mui/icons-material/Scale';
import SchoolIcon from '@mui/icons-material/School';
import { SpecsListProps } from '@/types/types';
import { Fragment, useState } from 'react';
import { capitalizeFirstLetter } from '@/utils/textFormatters';

function SpecsList({ pokemon, ...listProps }: SpecsListProps) {
  const [openAbilities, setOpenAbilities] = useState<Record<string, boolean>>({});
  const SPECS_SKELETONS = 3;

  const handleClick = (abilityName: string) => {
    setOpenAbilities((prevOpenAbilities) => ({
      ...prevOpenAbilities,
      [abilityName]: !prevOpenAbilities[abilityName],
    }));
  };
  if (!pokemon) {
    // Render Skeletons
    return (
      <List sx={{ width: '100%' }} {...listProps}>
        {[...Array(SPECS_SKELETONS)].map((_, index) => (
          <Fragment key={index}>
            <Skeleton>
              <ListItem>
                <ListItemIcon>
                  <HeightIcon />
                </ListItemIcon>
                <ListItemText primary="Height: 150cm " />
              </ListItem>
            </Skeleton>
            <Divider component="li" />
          </Fragment>
        ))}
        <Skeleton>
          <ListSubheader>Abilities</ListSubheader>
        </Skeleton>
        <Skeleton width="100%">
          <ListItemButton>
            <ListItemText primary="Shield dust" />
          </ListItemButton>
        </Skeleton>
      </List>
    );
  }
  const { height, weight, baseExperience, abilities } = pokemon;

  // Render Pokémon Details
  return (
    <List sx={{ width: '100%' }} {...listProps}>
      {height && (
        <>
          <ListItem>
            <ListItemIcon>
              <HeightIcon />
            </ListItemIcon>
            {/* Convert decimetre to cm */}
            <ListItemText primary={`Height: ${Number(height) * 10}cm `} />
          </ListItem>
          <Divider component="li" />
        </>
      )}
      {weight && (
        <>
          <ListItem>
            <ListItemIcon>
              <ScaleIcon />
            </ListItemIcon>
            {/* Convert hectogram to kg */}
            <ListItemText primary={`Weight: ${Number(weight) / 10}kg `} />
          </ListItem>
          <Divider component="li" />
        </>
      )}
      {baseExperience && (
        <>
          <ListItem>
            <ListItemIcon>
              <SchoolIcon />
            </ListItemIcon>
            <ListItemText primary={`Base experience: ${baseExperience}`} />
          </ListItem>
          <Divider component="li" />
        </>
      )}
      {abilities?.length && abilities[0].name && (
        <>
          <ListSubheader sx={{ backgroundColor: 'inherit' }}>Abilities</ListSubheader>
          {abilities.map((ability) => (
            <Fragment key={ability.name}>
              {ability.description ? (
                // Render as button only if has description
                <>
                  <ListItemButton onClick={() => handleClick(ability.name)}>
                    <ListItemText primary={capitalizeFirstLetter(ability.name)} />
                    {openAbilities[ability.name] ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse in={openAbilities[ability.name]} timeout="auto" unmountOnExit>
                    <List disablePadding>
                      <ListItemText sx={{ pl: 4, pr: 2 }} primary={ability.description} />
                    </List>
                  </Collapse>
                </>
              ) : (
                <ListItem>
                  <ListItemText primary={capitalizeFirstLetter(ability.name)} />
                </ListItem>
              )}
            </Fragment>
          ))}
        </>
      )}
    </List>
  );
}
export default SpecsList;
