import React from 'react';


export const SelectedCharacteristicsList = ({list}) => {
  return (
    <ul>
        {list.map(el=><li>{el.name}={el.info}</li>)}
    </ul>
  )
}
