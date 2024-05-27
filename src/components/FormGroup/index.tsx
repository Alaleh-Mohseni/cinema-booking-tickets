function FormGroup({
    label,
    type,
    id,
    placeholder,
    register,
    errors,
    Icon,
    htmlFor,
    name,
    className
}: any) {
    return (
        <>
            <div className={`${className} flex gap-5 justify-between py-5 pl-16 pr-6 mt-7 w-ful rounded-3xl text-slate-500`}>
                <div className="flex gap-3 items-center">
                    <Icon className="shrink-0 self-stretch aspect-[0.96]" size="24" />
                    <div className="shrink-0 self-stretch my-auto w-px border border-solid aspect-[0.07] border-slate-500 stroke-[1px] stroke-slate-300"></div>
                    <label htmlFor={htmlFor} className="sr-only">
                        {label}
                    </label>
                    <input
                        type={type}
                        id={id}
                        name={name}
                        placeholder={placeholder}
                        className='self-stretch my-auto bg-transparent outline-none'
                        {...register(name)}
                    />
                </div>
            </div>
            {errors ? <p className="text-red-500 text-sm px-3">{errors?.message}</p> : null}
        </>
    )
}

export default FormGroup