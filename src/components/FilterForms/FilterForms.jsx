import React from 'react';
import useAuth from '../../hooks/useAuth';
import Input from './Input/Input';

function FilterForms() {
  const { handleChange } = useAuth();
  return (
    <div>
      <Input dataTestid="name-filter" type="text" handleChange={ handleChange } />
    </div>
  );
}

export default FilterForms;
