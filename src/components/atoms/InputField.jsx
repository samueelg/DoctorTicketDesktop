export default function InputField({
    label,
    type,
    value,
    onChange,
    placeholder,
    id,
    className = "",
    inputClassName = ""
}) {
    return (
        <div className={`flex flex-col gap-1 ${className}`}>
            <label htmlFor={id} className="text-large font-medium">
                {label}
            </label>

            <input
                id={id}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`
                    w-full
                    rounded-md
                    border
                    border-gray-300
                    px-3
                    py-2
                    text-sm
                    hover:bg-gray-100
                    focus:outline-none
                    focus:ring-2
                    focus:ring-green-500
                    ${inputClassName}
                `}
            />
        </div>
    );
}
