import React from 'react';
import ReactDom from 'react-dom';

import { Game } from "./components";
import style from './css/style';

ReactDom.render(
  <Game />,
  document.getElementById('container')
);
