import { twMerge } from "tailwind-merge";

export default function Button({
    type = "button",
    onClick,
    text,
    className = "",
    buttonClassName = "",
    variant = "green",
    icon = null,
    iconPos = "left",
    disabled = false,
    loading = false,
    children,
}) {
    const variants = {
        green: "text-white bg-green-600 hover:bg-green-700 focus:ring-green-500",
        red: "text-white bg-red-600 hover:bg-red-700 focus:ring-red-500",
        gray: "text-white bg-gray-600 hover:bg-gray-700 focus:ring-gray-500",
        outline: "bg-transparent border border-gray-300 text-gray-800 bg-gray-200 hover:bg-gray-300 focus:ring-gray-400",
        none: ''
    };

    const isDisabled = disabled || loading;

    return (
        <div className={className}>
            <button
                type={type}
                onClick={onClick}
                disabled={isDisabled}
                className={twMerge(
          "inline-flex items-center justify-center px-4 py-2 rounded-md text-md font-medium focus:outline-none focus:ring-2 transition",
          variants[variant],
          isDisabled && "opacity-50 cursor-not-allowed",
          buttonClassName
        )}
            >
            {loading && (
                <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
            )}
            {!loading && icon && iconPos === "left" && icon}
                {text}
            {!loading && icon && iconPos === "right" && icon}

            {children}
            </button>
        </div>
    );
}
