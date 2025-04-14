type InputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
};

const InputField = ({ label, value, onChange, type }: InputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
  };

  return (
    <div className="w-full h-auto flex flex-col gap-2 ">
      <p className="text-[14px] font-semibold">{label}</p>
      <input
        type={type || "text"}
        value={value}
        onChange={handleChange}
        className="w-full border rounded-sm p-1 text-[14px]"
      />
    </div>
  );
};

export default InputField;
