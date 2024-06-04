function Button({ text }: any) {
    return (
        <button
            type="submit"
            className="w-full text-white bg-[#ff8036] hover:bg-orange-500 font-medium gap-5 rounded-3xl mt-7 px-16 py-4 text-xl text-center"
        >
            {text}
        </button>
    )
}

export default Button