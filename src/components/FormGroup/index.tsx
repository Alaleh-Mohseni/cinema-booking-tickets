function FormGroup({ label, type, id, placeholder, register, errors, Icon, htmlFor }) {
    return (
        <div className="flex gap-5 justify-between py-5 pl-16 pr-6 mt-7 w-full bg-gray-800 rounded-3xl text-slate-500">
            <div className="flex gap-3 items-center">
                <Icon className="shrink-0 self-stretch aspect-[0.96]" size="24" />
                <div className="shrink-0 self-stretch my-auto w-px border border-solid aspect-[0.07] border-slate-500 stroke-[1px] stroke-slate-300"></div>
                <label htmlFor={htmlFor} className="sr-only">
                    {label}
                </label>
                <input
                    type={type}
                    id={id}
                    placeholder={placeholder}
                    className="self-stretch my-auto bg-transparent outline-none"
                    {...register('oldPassword', {
                        required: 'رمز عبور الزامی است',
                        minLength: {
                            value: 8,
                            message: 'حداقل تعداد کاراکتر ۸ عدد است',
                        }
                    })}
                />
                {errors ? <p className="text-red-500 text-sm">{errors?.message}</p> : null}
            </div>
        </div>
    )
}

export default FormGroup