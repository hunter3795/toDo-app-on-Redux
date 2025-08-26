import React, {memo, type ReactNode} from "react";
import styles from './Modal.module.css'

type ModalProps = {
  active: boolean;
  setActive: (avtive: boolean) => void;
  children?: ReactNode;
}

const Modal:React.FC<ModalProps> = ({ active, setActive, children }) => {
  return (
    <div className={`${styles.modal} ${active ? styles.modal_active : ''}`} onClick={() => setActive(false)}>
      <div className={`${styles.modal_content} ${active ? styles.modal_content_active : ''}`} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}

export default memo(Modal);