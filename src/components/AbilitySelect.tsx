import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import _ from 'lodash';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const allAbilities = [
    'overgrow',
    'chlorophyll',
    'blaze',
    'solar-power',
    'torrent',
    'rain-dish',
    'shield-dust',
    'run-away',
    'shed-skin',
    'compound-eyes',
    'tinted-lens',
    'swarm',
    'sniper',
    'hustle',
];

function getStyles(
    name: string,
    selectedAbilities: readonly string[],
    theme: Theme
) {
    return {
        fontWeight:
            selectedAbilities.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

export default function AbilitySelect({
    abilities,
    handleSelected,
}: {
    abilities: string[];
    handleSelected: (values: string[]) => void;
}) {
    const theme = useTheme();
    const [selectedAbilities, setAbilities] = React.useState<string[]>([
        ...abilities,
    ]);

    const handleChange = (
        event: SelectChangeEvent<typeof selectedAbilities>
    ) => {
        const {
            target: { value },
        } = event;
        setAbilities(typeof value === 'string' ? value.split(',') : value);
        handleSelected(typeof value === 'string' ? value.split(',') : value);
    };

    return (
        <div>
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-chip-label">Ability</InputLabel>
                <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    value={selectedAbilities}
                    onChange={handleChange}
                    input={
                        <OutlinedInput id="select-multiple-chip" label="Chip" />
                    }
                    renderValue={(selected) => (
                        <Box
                            sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}
                        >
                            {selected.map((value) => (
                                <Chip key={value} label={value} />
                            ))}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                >
                    {_.uniq([...allAbilities, ...abilities]).map((name) => (
                        <MenuItem
                            key={name}
                            value={name}
                            style={getStyles(name, selectedAbilities, theme)}
                        >
                            {name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}
