type InputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
};

const InputField = ({ label, value, onChange, type }: InputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;
    if (
      label.toLowerCase() === "first name" ||
      label.toLowerCase() === "last name"
    ) {
      newValue = newValue.charAt(0).toUpperCase() + newValue.slice(1);
    }
    if (type === "cardNumber") {
      newValue = newValue.replace(/\D/g, "");
      if (newValue.length <= 16) {
        newValue = newValue.replace(/(\d{4})(?=\d)/g, "$1-");
      }
    }

    onChange(newValue);
  };

  return (
    <div className="w-full h-auto flex flex-col gap-2 ">
      <p className="text-[14px] font-semibold">{label}</p>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        className="w-full border rounded-sm p-1 text-[14px]"
      />
    </div>
  );
};

export default InputField;
