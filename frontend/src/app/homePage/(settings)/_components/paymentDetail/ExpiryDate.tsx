import React, { useEffect, useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

type ExpiryDateProps = {
  value: Date | null;
  onChange: (value: Date) => void;
};

const ExpiryDateSelector = ({ value, onChange }: ExpiryDateProps) => {
  const months = Array.from({ length: 12 }, (_, i) =>
    String(i + 1).padStart(2, "0")
  );
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 12 }, (_, i) => String(currentYear + i));

  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");

  useEffect(() => {
    if (value && value instanceof Date) {
      const month = String(value.getMonth() + 1).padStart(2, "0");
      const year = String(value.getFullYear());
      setSelectedMonth(month);
      setSelectedYear(year);
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
