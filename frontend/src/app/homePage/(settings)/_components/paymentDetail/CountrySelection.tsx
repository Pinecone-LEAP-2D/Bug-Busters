import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formattedCountries } from "../../../_utils/countries";
import { date } from "yup";
import { useBankCard } from "@/app/provider/BankCardProvider";

const CountrySelection = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => {
  const { bankCard } = useBankCard();
  const country = bankCard[0]?.country;
  return (
    <div className="flex flex-col gap-2">
      <p className="text-[14px] font-semibold">Select Country</p>
      <Select onValueChange={onChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={country} />
        </SelectTrigger>
        <SelectContent>
          {formattedCountries.map((country) => (
            <SelectItem key={country.name} value={country.name}>
              {country.flag} {country.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CountrySelection;
