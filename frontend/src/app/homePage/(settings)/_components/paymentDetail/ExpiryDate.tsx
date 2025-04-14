import React, { useEffect, useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useBankCard } from "@/app/provider/BankCardProvider";

type ExpiryDateProps = {
  value: Date | string | null;
  onChange: (value: Date) => void;
};

const ExpiryDateSelector = ({ value, onChange }: ExpiryDateProps) => {
  const { bankCard } = useBankCard();
  const card = bankCard[0].expiryDate;
  const year = card.slice(0, 4);
  const month = card.slice(5, 7);
  const months = Array.from({ length: 12 }, (_, i) =>
    String(i + 1).padStart(2, "0")
  );
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 12 }, (_, i) => String(currentYear + i));

  const [selectedMonth, setSelectedMonth] = useState<string>(
    month ? month : ""
  );
  const [selectedYear, setSelectedYear] = useState<string>(year ? year : "");

  useEffect(() => {
    if (value) {
      let dateValue: Date;

      if (value instanceof Date) {
        dateValue = value;
      } else if (typeof value === "string") {
        dateValue = new Date(value);
      } else {
        return;
      }

      if (!isNaN(dateValue.getTime())) {
        const month = String(dateValue.getMonth() + 1).padStart(2, "0");
        const year = String(dateValue.getFullYear());

        setSelectedMonth(month);
        setSelectedYear(year);
      } else {
      }
    }
  }, [value]);

  const createDateFromMonthYear = (month: string, year: string) => {
    const monthIndex = parseInt(month) - 1;
    const yearValue = parseInt(year);

    const lastDay = new Date(yearValue, monthIndex + 1, 0).getDate();

    return new Date(yearValue, monthIndex, lastDay, 23, 59, 59);
  };

  const handleMonthChange = (newMonth: string) => {
    setSelectedMonth(newMonth);
    if (selectedYear) {
      const expiryDate = createDateFromMonthYear(newMonth, selectedYear);
      onChange(expiryDate);
    }
  };

  const handleYearChange = (newYear: string) => {
    setSelectedYear(newYear);
    if (selectedMonth) {
      const expiryDate = createDateFromMonthYear(selectedMonth, newYear);
      onChange(expiryDate);
    }
  };

  return (
    <div className="flex gap-4 w-full">
      <div className="w-1/2 flex flex-col gap-2">
        <p className="text-sm font-semibold">Expires</p>
        <Select value={selectedMonth} onValueChange={handleMonthChange}>
          <SelectTrigger className="w-full h-8">
            <SelectValue placeholder="Month" />
          </SelectTrigger>
          <SelectContent>
            {months.map((m) => (
              <SelectItem key={m} value={m}>
                {m}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="w-1/2 flex flex-col gap-2">
        <p className="text-sm font-semibold">Year</p>
        <Select value={selectedYear} onValueChange={handleYearChange}>
          <SelectTrigger className="w-full h-8">
            <SelectValue placeholder="Year" />
          </SelectTrigger>
          <SelectContent>
            {years.map((y) => (
              <SelectItem key={y} value={y}>
                {y}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ExpiryDateSelector;
