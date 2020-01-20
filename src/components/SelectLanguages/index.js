import React, { useState, useEffect } from 'react';
import GitLanguages from '../../utils/GitLanguages';
import './style.css';

import { Select, MenuItem, InputLabel, FormControl } from '@material-ui/core';
import './style.css';

function SelectLanguages({ selectedLanguage, setSelectedLanguage }) {
  const [languages, setLanguages] = useState([
    'Assembly',
    'C',
    'Java',
    'JavaScript'
  ]);

  useEffect(() => {
    async function loadLanguages() {
      const response = await GitLanguages();
      setLanguages(response);
    }
    loadLanguages();
  }, []);
  return (
    <FormControl fullWidth>
      <InputLabel id='selectLabel'>Linguagem:</InputLabel>
      <Select
        name='programmingLanguages'
        id='programmingLanguages'
        value={selectedLanguage}
        onChange={event => setSelectedLanguage(event.target.value)}
        autoWidth
        variant='outlined'
        labelId='selectLabel'
      >
        {languages.map(lang => (
          <MenuItem key={lang} value={lang}>
            {lang}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default SelectLanguages;
