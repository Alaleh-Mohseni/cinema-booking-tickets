import { RiUserSmileLine } from "react-icons/ri";
import { RiUser6Line } from "react-icons/ri";

function CompleteProfile() {
  return (
    <main className="w-full">
      <section className="">
        <div className="flex flex-col items-center justify-center px-6 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-gray-800 text-white border border-gray-700 rounded-2xl shadow md:mt-0 sm:max-w-md xl:p-0 relative">
            <div className="py-6 px-12 space-y-4 md:space-y-6 sm:py-8">
              <form className="space-y-4 md:space-y-6">
                <div className="py-2">
                  <img
                    className="w-28 h-28 mx-auto rounded-full"
                    src="https://via.placeholder.com/150"
                    alt="Profile"
                  />
                </div>

                <div className="flex gap-5 justify-between py-5 pl-16 pr-6 mt-7 w-full bg-gray-900 rounded-3xl text-slate-500">
                  <div className="flex gap-3 items-center">
                    <RiUserSmileLine className="shrink-0 self-stretch aspect-[0.96]" size="24" />
                    <div className="shrink-0 self-stretch my-auto w-px border border-solid aspect-[0.07] border-slate-500 stroke-[1px] stroke-slate-300"></div>
                    <label htmlFor="firstName" className="sr-only">
                      FirstName
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      placeholder="نام"
                      className="self-stretch my-auto bg-transparent outline-none"
                    />
                  </div>
                </div>

                <div className="flex gap-5 justify-between py-5 pl-16 pr-6 mt-7 w-full bg-gray-900 rounded-3xl text-slate-500">
                  <div className="flex gap-3 items-center">
                    <RiUser6Line className="shrink-0 self-stretch aspect-[0.96]" size="24" />
                    <div className="shrink-0 self-stretch my-auto w-px border border-solid aspect-[0.07] border-slate-500 stroke-[1px] stroke-slate-300"></div>
                    <label htmlFor="lastName" className="sr-only">
                      LastName
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      placeholder="نام خانوادگی"
                      className="self-stretch my-auto bg-transparent outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-[#ff8036] hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-orange-200 font-medium gap-5 rounded-3xl mt-7 px-16 py-3.5 text-xl text-center"
                >
                  ذخیره تغییرات
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default CompleteProfile