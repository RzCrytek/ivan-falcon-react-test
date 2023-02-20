import { ClipboardEvent } from 'react';

interface IProps {
  label: string;
  name: string;
  value: string;
  onChange: (...args: any[]) => void;
  type?: string;
  maxLength?: number;
}

const InputField = (props: IProps) => {
  const { label, name, value, onChange, type = 'text' } = props;

  const preventCopyPaste = (e: ClipboardEvent<HTMLInputElement>) => e.preventDefault();

  return (
    <div className="field">
      <label className="label">{label}</label>

      <div className="control">
        <input
          {...props}
          className="input"
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onCopy={(e) => preventCopyPaste(e)}
          onPaste={(e) => preventCopyPaste(e)}
          required
        />
      </div>
    </div>
  );
};

export default InputField;
