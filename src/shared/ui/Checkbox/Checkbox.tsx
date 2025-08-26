import React from "react";
import styles from './Checkbox.module.css';

type CheckboxProps = {
  checked?: boolean;
  onChange?: () => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange }) => {
  return (
      <label className={styles.container}>
        <input checked={!checked} type="checkbox" onChange={onChange}/>
        <div className={styles.checkmark}></div>
      </label>
  )
}

export default Checkbox;