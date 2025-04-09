type BankCardProps = {
  setStep?: (step: number) => void;
};

const BankCard: React.FC<BankCardProps> = ({ setStep }) => {
  const handleBackButton = () => {
    setStep(1);
  };
  return (
    <div>
      Bank card
      <button onClick={handleBackButton}> back</button>
    </div>
  );
};

export default BankCard;
