import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import styles from './react-base-comps.module.css';

export function ReactBaseComps() {
  return (
    <div className={styles['container']}>
      <h1>Welcome to ReactBaseComps!</h1>
    </div>
  );
}

type liPropType = {
  title: string;
  onClick: () => void;
}

export function ListItem({ title, onClick }: liPropType) {
  const [classToApply, setClassToApply] = useState(styles.left_pane_item);
  return (
    <li
      onClick={onClick}
      className={classToApply}
      onMouseLeave={() => {
        setClassToApply(styles.left_pane_item);
      }}
      onMouseEnter={() => {
        setClassToApply(styles.left_pane_item_hove);
      }}
    >
      <p className={styles.li_title}>{title}</p>
    </li>
  );
}

interface buttonPropType {
  title: string;
  type?: "btn_small_highlighted" | "btn_small_standard" | "btn_medium_highlighted" | "btn_medium_standard" | "btn_large_highlighted" | "btn_large_standard";
  onClick: () => void;
}
export function Button({ title, type, onClick, ...props }: buttonPropType) {
  let classToApply = styles.btn_medium_standard;
  switch (type) {
    case "btn_large_highlighted":
      classToApply = styles.btn_large_highlighted;
      break;
    case "btn_large_standard":
      classToApply = styles.btn_large_standard;
      break;
    case 'btn_medium_highlighted':
      classToApply = styles.btn_medium_highlighted;
      break;
    case 'btn_medium_standard':
      classToApply = styles.btn_medium_standard;
      break;
    case 'btn_small_highlighted':
      classToApply = styles.btn_small_highlighted;
      break;
    case 'btn_small_standard':
      classToApply = styles.btn_small_standard;
      break;
  }
  return <button onClick={onClick} className={classToApply} {...props}>{title}</button>
}

type TextInputProps = {
  placeholder?: string;
}

export type TextInputHandle = {
  getValue: () => string;
  resetValue: () => void;
}
export const TextInput = forwardRef<TextInputHandle, TextInputProps>(({ placeholder }, ref) => {

  const inputRef = useRef<HTMLInputElement>(null);
  useImperativeHandle(ref, () => ({
    getValue: () => {
      return inputRef.current ? inputRef.current.value : '';
    },
    resetValue: () => {
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    }
  }))
  return <input
    className={styles.entity_name}
    type="text"
    ref={inputRef}
    placeholder={placeholder ? placeholder : "Enter text here"}
  />
});

type textAreaType = {
  initValue: string
}

export const TextArea: React.FC<textAreaType> = ({ initValue }) => {
  // Define a state to store the text area value
  const [value, setValue] = useState<string>(initValue);

  useEffect(() => {
    setValue(initValue);
  }, [initValue]);
  // Handle changes in the text area
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };

  return (
    <div>
      <textarea
        className={styles.textarea}
        value={value}
        onChange={handleChange}
        placeholder="Extracted value"
        rows={2}
        readOnly
      />
    </div>
  );
};


interface INavigationButton {
  buttonType: "next" | "back";
  onClick: () => void;
  [key: string]: any;
}
export function NavigationButton({ buttonType, onClick, ...props }: INavigationButton) {
  let iconToRender;
  if (buttonType === "next") {
    iconToRender = <div onClick={onClick} className={styles.navigation_button_next} {...props}>
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" />
      </svg>
    </div>
  }
  else if (buttonType === "back") {
    iconToRender = <div onClick={onClick} className={styles.navigation_button_back} {...props}>
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
      </svg>
    </div>
  }
  return iconToRender;
}

interface ISettingIconButton{
  [key:string]: any;
}
export function SettingIconButton({...prop}:ISettingIconButton) {
  return <svg {...prop} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-gear" viewBox="0 0 16 16">
    <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0" />
    <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z" />
  </svg>
}