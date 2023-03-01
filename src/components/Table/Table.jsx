import React from 'react';
import useAuth from '../../hooks/useAuth';

function Table() {
  const { dataApi, loading, newData = dataApi } = useAuth();
  console.log(newData);

  return (
    <div>
      {loading === true ? <p>Loading...</p>
        : (
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
                      <td key={ key }>{res}</td>
                    ))}
                  </tr>
                )))}
              </tbody>
            </table>
          </div>
        )}
    </div>

  );
}

export default Table;
