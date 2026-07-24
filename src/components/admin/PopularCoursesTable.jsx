import { Star } from 'lucide-react';

const courses = [
    { title: 'Product Design Sprint', trainer: 'Amira K.', learners: '1,248', rating: '4.9' },
    { title: 'JavaScript Mastery', trainer: 'Omar H.', learners: '934', rating: '4.8' },
    { title: 'AI for Teams', trainer: 'Sara L.', learners: '812', rating: '4.7' },
];

export default function PopularCoursesTable() {
    return (
        <div className="overflow-hidden rounded-[20px] border border-[#E2E8F0] bg-white shadow-sm">
            <div className="border-b border-[#E2E8F0] px-5 py-4">
                <h3 className="text-lg font-semibold text-[#0F172A]">Cours les plus populaires</h3>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                    <thead className="bg-[#F8FAFC] text-[#64748B]">
                        <tr>
                            <th className="px-5 py-3 font-medium">Cours</th>
                            <th className="px-5 py-3 font-medium">Formateur</th>
                            <th className="px-5 py-3 font-medium">Apprenants</th>
                            <th className="px-5 py-3 font-medium">Note</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.map((course) => (
                            <tr key={course.title} className="border-t border-[#E2E8F0]">
                                <td className="px-5 py-4 font-medium text-[#0F172A]">{course.title}</td>
                                <td className="px-5 py-4 text-[#64748B]">{course.trainer}</td>
                                <td className="px-5 py-4 text-[#64748B]">{course.learners}</td>
                                <td className="px-5 py-4">
                                    <div className="flex items-center gap-1 text-amber-500">
                                        <Star className="h-4 w-4 fill-current" />
                                        <span className="font-semibold text-[#0F172A]">{course.rating}</span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
