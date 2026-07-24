import { Bell } from 'lucide-react';

export default function NotificationButton({ count = 0 }) {
    return (
        <button type="button" className="relative rounded-2xl border border-[#E2E8F0] bg-white p-3 text-[#0F172A] shadow-sm transition hover:border-[#3B5BFF] hover:text-[#3B5BFF]">
            <Bell className="h-5 w-5" />
            {count > 0 ? (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#EF4444] text-[10px] font-semibold text-white">
                    {count}
                </span>
            ) : null}
        </button>
    );
}
