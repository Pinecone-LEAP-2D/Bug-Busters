import { Textarea } from "@/components/ui/textarea";

type AboutUserProps = {
  value: string;
  onChange: (value: string) => void;
  label: string;
};

const TextArea = ({ label, value, onChange }: AboutUserProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="flex flex-col gap-2">
      <p className="text-[14px] font-semibold">{label}</p>

      <Textarea
        className="w-full h-[100px]"
        placeholder="List ingredients"
        onChange={handleChange}
        value={value}
      />
    </div>
  );
};

export default TextArea;
