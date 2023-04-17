import React from 'react';
import FilterForms from '../FilterForms/FilterForms';
import Table from '../Table/Table';
import style from './Home.modules.css';

function Home() {
  return (
    <div className={ style.container }>
      <h2>Star-Wars-Project!</h2>
      <FilterForms />
      <Table />
    </div>
  );
}

export default Home;
