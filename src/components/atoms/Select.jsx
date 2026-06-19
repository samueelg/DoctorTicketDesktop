import { Dropdown } from "primereact/dropdown";
import { twMerge } from "tailwind-merge";

export default function Select({
    name,
    label,
    id,
    value,
    onChange,
    options = [],
    optionLabel = "",
    optionValue = "",
    placeholder = "Selecione...",
    className = "",
    selectClassName = "",
    showClear = false,
    required = false,
    disabled = false,
    filter = false,
    editable = false,
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
                optionLabel={optionLabel}
                onChange={onChange}
                optionValue={optionValue}
                editable={editable}
                placeholder={placeholder}
                disabled={disabled}
                showClear={showClear}
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