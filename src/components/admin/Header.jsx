export default function Header({ title, subtitle, actions }) {
    return (
        <div className="flex flex-col gap-4 rounded-[20px] border border-[#E2E8F0] bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <div>
                <h1 className="text-2xl font-semibold text-[#0F172A]">{title}</h1>
                <p className="mt-1 text-sm text-[#64748B]">{subtitle}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">{actions}</div>
        </div>
    );
}
