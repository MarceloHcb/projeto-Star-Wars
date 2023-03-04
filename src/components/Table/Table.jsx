import React from 'react';
import useAuth from '../../hooks/useAuth';

function Table() {
  const { dataApi, loading, newData = dataApi } = useAuth();
  if (loading) {
    return <p>Loading...</p>;
  }
  return (

    <div>
      <table border={ 3 }>
        <thead>
          <tr>
            {dataApi && (Object.keys(dataApi[0]).map((el, index) => (
              <th key={ index }>
                {el}
              </th>
            )))}
          </tr>
        </thead>
        <tbody>
          {newData && (newData?.map((el, index) => (
            <tr key={ index }>
              {Object.values(el).map((res, key) => (
                <td
                  key={ key }
                  data-testid={ key === 0 ? 'planet-name' : '' }
                >
                  {res}

                </td>
              ))}
            </tr>
          )))}
        </tbody>
      </table>
    </div>

  );
}

export default Table;
