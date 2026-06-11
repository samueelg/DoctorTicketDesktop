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
    children,
}) {
    const variants = {
        green: "text-white bg-green-600 hover:bg-green-700 focus:ring-green-500",
        red: "text-white bg-red-600 hover:bg-red-700 focus:ring-red-500",
        gray: "text-white bg-gray-600 hover:bg-gray-700 focus:ring-gray-500",
        outline: "bg-transparent border border-gray-300 text-gray-800 bg-gray-200 hover:bg-gray-300 focus:ring-gray-400",
        none: ''
    };

    return (
        <div className={className}>
            <button
                type={type}
                onClick={onClick}
                className={twMerge(
          "inline-flex items-center justify-center px-4 py-2 rounded-md text-md font-medium focus:outline-none focus:ring-2 transition",
          variants[variant],
          buttonClassName
        )}
            >
            {icon && iconPos === "left" && icon}
                {text}
            {icon && iconPos === "right" && icon}

            {children}
            </button>
        </div>
    );
}
