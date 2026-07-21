import { forwardRef } from 'react';

const variants = {
    primary: 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20 hover:bg-cyan-400 dark:bg-cyan-600 dark:text-white dark:hover:bg-cyan-500 dark:shadow-cyan-600/30',
    secondary: 'border border-slate-300 bg-white text-slate-700 hover:border-cyan-400 hover:text-cyan-500 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-cyan-500 dark:hover:text-cyan-300 dark:hover:bg-slate-800',
    ghost: 'bg-transparent text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors',
};

const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
};

const Button = forwardRef(function Button(
    { children, className = '', variant = 'primary', size = 'md', as = 'button', ...props },
    ref,
) {
    const sharedClassName = `inline-flex items-center justify-center rounded-full font-semibold transition duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400/40 disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${sizes[size]} ${className}`;

    if (as === 'a') {
        return (
            <a ref={ref} className={sharedClassName} {...props}>
                {children}
            </a>
        );
    }

    return (
        <button ref={ref} className={sharedClassName} {...props}>
            {children}
        </button>
    );
});

export default Button;
