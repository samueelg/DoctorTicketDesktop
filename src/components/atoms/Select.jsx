import { Dropdown } from "primereact/dropdown";
import { twMerge } from "tailwind-merge";

export default function Select({
    name,
    label,
    id,
    value,
    onChange,
    options = [],
    placeholder = "Selecione...",
    className = "",
    selectClassName = "",
    required = false,
    disabled = false,
    filter = false,
}) {
    return (
        <div className={twMerge("flex flex-col gap-1", className)}>
            {label && (
                <label htmlFor={id} className="text-large font-medium">
                    {label}
                </label>
            )}

            <Dropdown
                name={name}
                inputId={id}
                value={value}
                options={options}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
                filter={filter}
                className={twMerge("w-full", selectClassName)}
                pt={{
                    input: {
                        className: "py-0 flex items-center"
                    }
                }}
                required={required}
            />
        </div>
    );
}