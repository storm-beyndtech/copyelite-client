import AdminDepositCards from "@/components/AdminDepositCards";
import AdminTradeCards from "@/components/AdminTradesCard";
import AdminUserCards from "@/components/AdminUserCards";
import AdminWithdrawalCards from "@/components/AdminWithdrawalCards";
import BigChart from "@/components/BigChart";

export default function Admin() {
  return (
    <>
    <AdminUserCards />
    <AdminDepositCards />
    <AdminWithdrawalCards />
    <AdminTradeCards />

      <div className="w-full flex gap-5 my-4 max-[1100px]:flex-col mb-4">
      </div>

      <div className="h-100 flex items-center justify-center mb-4 rounded-[15px] p-1 shadow-1 bg-gray-50 dark:bg-gray-800">
        <BigChart />
      </div>

      <div className="w-full flex gap-5 my-4 max-[1100px]:flex-col mb-4">
      </div>
    </>
  )
}
