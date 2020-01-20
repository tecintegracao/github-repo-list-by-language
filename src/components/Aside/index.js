import React from 'react';
import SelectLanguages from '../SelectLanguages';

import './style.css';

function Aside(props) {
  return (
    <aside>
      <strong>
        Selecione a linguagem à qual deseja listar os respositórios
      </strong>
      <SelectLanguages {...props} />
    </aside>
  );
}

export default Aside;
