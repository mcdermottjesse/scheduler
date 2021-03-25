import React from "react";
import classNames from "classnames";
import "components/Button.scss";
// import { action } from "@storybook/addon-actions/dist/preview";
// import { configureActions } from "@storybook/addon-actions/dist/preview/configureActions";

//refer to index.js
export default function Button(props) {
  const buttonClass = classNames("button", {
    "button--confirm": props.confirm,
    "button--danger": props.danger,
  });

  return (
    <button
      className={buttonClass}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}
