import React from "react";

export const CircleButton = (props) => {
  const { id, addedClass, handleOnClick } = props;

  return (
    <div className={`circleButton ${addedClass}`} onClick={handleOnClick}>
      <i className={`${id} circleButton__icon`}></i>
    </div>
  );
};
