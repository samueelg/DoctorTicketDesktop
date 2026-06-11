export default function Textarea({
    label,
    type,
    value,
    onChange,
    placeholder,
    id,
    className = "",
    inputClassName = "",
    rows=""
}) {
    return (
        <div className={`flex flex-col gap-1 ${className}`}>
            <label htmlFor={id} className="text-large font-medium">
                {label}
            </label>

            <textarea
                id={id}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                rows={rows}
                className={`
                    w-full
                    rounded-md
                    border
                    border-gray-300
                    px-3
                    py-2
                    text-sm
                    outline-none
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
