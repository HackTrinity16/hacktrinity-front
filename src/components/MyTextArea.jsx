import * as Headless from '@headlessui/react'
import clsx from 'clsx'
import { forwardRef, useState } from 'react'
import PropTypes from 'prop-types'

export const Textarea = forwardRef(function Textarea({ className, resizable = false, value = '', rows = 3, ...props }, ref) {
    const [inputValue, setInputValue] = useState(value);

    const formattedText = inputValue.split('\n').map((line, index) => {
        const paddingClass = 'p-1'; // Add padding class here
        if (line.includes('[JUDGE]')) {
            return <p key={index} className={`text-blue-600 ${paddingClass}`}>{line}</p>;
        } else if (line.includes('[DEFENDER]')) {
            return <p key={index} className={`text-red-600 ${paddingClass}`}>{line}</p>;
        } else if (line.includes('[DEFENDANT]')) {
            return <p key={index} className={`text-green-600 ${paddingClass}`}>{line}</p>;
        } else {
            return <p key={index} className={paddingClass}>{line}</p>;
        }
    });

    return (
        <div className={clsx('relative', className)}>
            <div
                className={clsx([
                    'absolute inset-0 w-full h-full pointer-events-none p-3 overflow-y-auto',
                    'text-base/6 text-zinc-950 placeholder:text-zinc-500 sm:text-sm/6 dark:text-white',
                ])}
            >
                {formattedText}
            </div>
            <textarea
                ref={ref}
                {...props}
                rows={rows}
                className={clsx([
                    'relative block w-full appearance-none rounded-lg px-[calc(theme(spacing[3.5])-1px)] py-[calc(theme(spacing[2.5])-1px)] sm:px-[calc(theme(spacing.3)-1px)] sm:py-[calc(theme(spacing[1.5])-1px)]',
                    'text-base/6 placeholder:text-transparent sm:text-sm/6 dark:text-transparent',
                    'border border-zinc-950/10 data-[hover]:border-zinc-950/20 dark:border-white/10 dark:data-[hover]:border-white/20',
                    'bg-transparent dark:bg-transparent',
                    'focus:outline-none overflow-y-auto',
                    'data-[invalid]:border-red-500 data-[invalid]:data-[hover]:border-red-500 data-[invalid]:dark:border-red-600 data-[invalid]:data-[hover]:dark:border-red-600',
                    'disabled:border-zinc-950/20 disabled:dark:border-white/15 disabled:dark:bg-white/[2.5%] dark:data-[hover]:disabled:border-white/15',
                    resizable ? 'resize-y' : 'resize-none',
                ])}
                style={{ color: 'transparent' }}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
        </div>
    )
})

Textarea.propTypes = {
    className: PropTypes.string,
    resizable: PropTypes.bool,
    value: PropTypes.string,
    rows: PropTypes.number,
}