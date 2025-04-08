import ChangePassword from "../_components/ChangePassword";
import PaymentDetail from "../_components/paymentDetail/PaymentDetail";
import PersonalInfo from "../_components/personalInfo/PersonalInfo";
import SuccessMessage from "../_components/SuccessMessage";

const Settings = () => {
  return (
    <div className="w-full px-10 h-screen ">
      <div className="flex flex-col gap-6 w-[650px]">
        <h1 className="text-[24px] font-semibold">My account</h1>
        <PersonalInfo />
        <ChangePassword />
        <PaymentDetail />
        <SuccessMessage />
      </div>
    </div>
  );
};

export default Settings;
