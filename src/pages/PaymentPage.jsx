import { ArrowLeft, CreditCard, Lock, Shield, Check } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { courseCatalog, getPurchasedCourses, savePurchasedCourses } from '../data/courseCatalog';
import { useLocale } from '../context/LocaleContext';
import { useAuth } from '../context/AuthContext';

export default function PaymentPage() {
    const { t } = useLocale();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const courseId = searchParams.get('courseId');
    const [cardDetails, setCardDetails] = useState({ number: '', name: '', expiry: '', cvc: '' });
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [purchasedCourses, setPurchasedCourses] = useState([]);

    useEffect(() => {
        if (!user) {
            navigate('/signin');
            return;
        }
        setPurchasedCourses(getPurchasedCourses());
    }, [user, navigate]);

    const course = courseCatalog.find((c) => c.id === parseInt(courseId));

    if (!course) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-950">
                <div className="text-center">
                    <p className="text-slate-600 dark:text-gray-400">{t('courseNotFound')}</p>
                    <Button onClick={() => navigate('/courses')} className="mt-4">
                        {t('backToCourses')}
                    </Button>
                </div>
            </div>
        );
    }

    const handleCardChange = (e) => {
        const { name, value } = e.target;
        let formattedValue = value;

        if (name === 'number') {
            formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
        } else if (name === 'expiry') {
            formattedValue = value.replace(/\D/g, '').replace(/(\d{2})(\d{2})/, '$1/$2').slice(0, 5);
        } else if (name === 'cvc') {
            formattedValue = value.replace(/\D/g, '').slice(0, 3);
        }

        setCardDetails((prev) => ({ ...prev, [name]: formattedValue }));
    };

    const handlePayment = async (e) => {
        e.preventDefault();
        setIsProcessing(true);

        // Simulate payment processing
        setTimeout(() => {
            const updated = Array.from(new Set([...purchasedCourses, parseInt(courseId)]));
            setPurchasedCourses(updated);
            savePurchasedCourses(updated);
            setIsProcessing(false);
            setPaymentSuccess(true);

            setTimeout(() => {
                navigate('/courses');
            }, 2000);
        }, 2000);
    };

    if (paymentSuccess) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 dark:bg-slate-950">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-center">
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-500/20 dark:bg-green-900/30">
                        <Check size={40} className="text-green-500" />
                    </div>
                    <h1 className="mt-6 text-3xl font-semibold text-white">{t('paymentSuccessful')}</h1>
                    <p className="mt-2 text-gray-400">{t('courseAddedToLibrary')}</p>
                    <p className="mt-6 text-sm text-gray-500">{t('redirectingToCourses')}</p>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/50 to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-12">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                <button
                    onClick={() => navigate('/courses')}
                    className="flex items-center gap-2 text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300 mb-8"
                >
                    <ArrowLeft size={20} />
                    {t('backToCourses')}
                </button>

                <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
                    {/* Left Side - Payment Form */}
                    <Card className="p-6 sm:p-8 dark:bg-slate-900 dark:border-slate-700">
                        <h1 className="text-3xl font-bold text-slate-950 dark:text-white">{t('completePayment')}</h1>
                        <p className="mt-2 text-slate-600 dark:text-gray-400">{t('securePaymentMessage')}</p>

                        {/* Course Summary in Payment Form */}
                        <div className="mt-8 rounded-[16px] border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/50">
                            <div className="flex gap-4">
                                <img src={course.image} alt={course.title} className="h-24 w-24 rounded-lg object-cover" />
                                <div>
                                    <h3 className="font-semibold text-slate-950 dark:text-white">{course.title}</h3>
                                    <p className="mt-1 text-sm text-slate-600 dark:text-gray-400">{course.instructor}</p>
                                    <div className="mt-3 flex items-baseline gap-2">
                                        <span className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">{course.price}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Payment Form */}
                        <form onSubmit={handlePayment} className="mt-8 space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                                    {t('cardholderName')}
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={cardDetails.name}
                                    onChange={handleCardChange}
                                    placeholder={t('enterFullName')}
                                    className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-400 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-cyan-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                                    {t('cardNumber')}
                                </label>
                                <input
                                    type="text"
                                    name="number"
                                    value={cardDetails.number}
                                    onChange={handleCardChange}
                                    placeholder="1234 5678 9012 3456"
                                    maxLength="19"
                                    className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-400 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-cyan-500"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                                        {t('expiryDate')}
                                    </label>
                                    <input
                                        type="text"
                                        name="expiry"
                                        value={cardDetails.expiry}
                                        onChange={handleCardChange}
                                        placeholder="MM/YY"
                                        className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-400 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-cyan-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                                        CVC
                                    </label>
                                    <input
                                        type="text"
                                        name="cvc"
                                        value={cardDetails.cvc}
                                        onChange={handleCardChange}
                                        placeholder="123"
                                        maxLength="3"
                                        className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-400 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-cyan-500"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-900/50 dark:bg-blue-950/20">
                                <Lock size={16} className="text-blue-600 dark:text-blue-400" />
                                <p className="text-sm text-blue-700 dark:text-blue-300">{t('paymentSecure')}</p>
                            </div>

                            <Button
                                type="submit"
                                variant="primary"
                                disabled={isProcessing || !cardDetails.number || !cardDetails.name || !cardDetails.expiry || !cardDetails.cvc}
                                className="w-full py-3 text-lg"
                            >
                                {isProcessing ? t('processing') : `${t('payNow')} ${course.price}`}
                            </Button>
                        </form>

                        <div className="mt-8 space-y-3 rounded-lg bg-slate-50 p-4 dark:bg-slate-800/50">
                            <div className="flex items-center gap-2 text-sm">
                                <Shield size={16} className="text-cyan-600" />
                                <span className="text-slate-700 dark:text-gray-400">{t('securePciCompliant')}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <CreditCard size={16} className="text-cyan-600" />
                                <span className="text-slate-700 dark:text-gray-400">{t('allPaymentMethods')}</span>
                            </div>
                        </div>
                    </Card>

                    {/* Right Side - Order Summary */}
                    <div className="space-y-4">
                        <Card className="p-6 dark:bg-slate-900 dark:border-slate-700">
                            <h2 className="text-lg font-semibold text-slate-950 dark:text-white">{t('orderSummary')}</h2>
                            <div className="mt-4 space-y-3 border-t border-slate-200 pt-4 dark:border-slate-700">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-600 dark:text-gray-400">{t('coursePrice')}</span>
                                    <span className="font-semibold text-slate-900 dark:text-white">{course.price}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-600 dark:text-gray-400">{t('taxFee')}</span>
                                    <span className="font-semibold text-slate-900 dark:text-white">Free</span>
                                </div>
                                <div className="flex justify-between border-t border-slate-200 pt-3 dark:border-slate-700">
                                    <span className="font-semibold text-slate-900 dark:text-white">{t('total')}</span>
                                    <span className="text-xl font-bold text-cyan-600 dark:text-cyan-400">{course.price}</span>
                                </div>
                            </div>
                        </Card>

                        <Card className="p-6 dark:bg-slate-900 dark:border-slate-700">
                            <h3 className="font-semibold text-slate-950 dark:text-white">{t('whatYouGet')}</h3>
                            <ul className="mt-4 space-y-2">
                                <li className="flex items-center gap-2 text-sm text-slate-600 dark:text-gray-400">
                                    <Check size={16} className="text-green-500" />
                                    {t('lifetimeAccess')}
                                </li>
                                <li className="flex items-center gap-2 text-sm text-slate-600 dark:text-gray-400">
                                    <Check size={16} className="text-green-500" />
                                    {t('allMaterials')}
                                </li>
                                <li className="flex items-center gap-2 text-sm text-slate-600 dark:text-gray-400">
                                    <Check size={16} className="text-green-500" />
                                    {t('certificateOfCompletion')}
                                </li>
                                <li className="flex items-center gap-2 text-sm text-slate-600 dark:text-gray-400">
                                    <Check size={16} className="text-green-500" />
                                    {t('supportAccess')}
                                </li>
                            </ul>
                        </Card>

                        <Card className="p-6 dark:bg-slate-900 dark:border-slate-700">
                            <h3 className="font-semibold text-slate-950 dark:text-white">{t('courseInstructor')}</h3>
                            <div className="mt-4 flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white dark:bg-slate-700">
                                    {course.avatar}
                                </div>
                                <div>
                                    <p className="font-semibold text-slate-900 dark:text-white">{course.instructor}</p>
                                    <p className="text-sm text-slate-500 dark:text-gray-400">{course.instructorTitle}</p>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
