import { getCurrentWindow } from "@tauri-apps/api/window";

const appWindow = getCurrentWindow();

export function TitleBar() {
    return (
        <div
            data-tauri-drag-region
            className="h-8 flex items-center justify-between select-none bg-white border-b border-slate-100"
        >
            {/* Espaçador à esquerda para manter o título centralizado */}
            <div className="w-24" />

            <span
                data-tauri-drag-region
                className="text-sm font-medium text-slate-600 pointer-events-none"
            >
                DoctorTicket
            </span>

            <div className="flex h-full">
                <button
                    type="button"
                    aria-label="Minimizar"
                    onClick={() => appWindow.minimize()}
                    className="w-12 h-full flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-colors"
                >
                    <svg width="11" height="11" viewBox="0 0 11 11">
                        <rect x="1" y="5" width="9" height="1" fill="currentColor" />
                    </svg>
                </button>
                <button
                    type="button"
                    aria-label="Fechar"
                    onClick={() => appWindow.close()}
                    className="w-12 h-full flex items-center justify-center text-slate-500 hover:bg-red-500 hover:text-white transition-colors"
                >
                    <svg width="11" height="11" viewBox="0 0 11 11">
                        <path
                            d="M1 1 L10 10 M10 1 L1 10"
                            stroke="currentColor"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
}
