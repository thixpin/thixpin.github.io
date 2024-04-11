'use client';
import { getId } from '@/lib/utils/helper';

import { motion, MotionProps } from 'framer-motion';
import Image from 'next/image';

type Props = {
    title: string;
    issuer: string;
    description: string;
    issue_date: string;
    expiry_date: string;
    logo_path: string;
    certificate_link?: string;
    className?: string;
} & MotionProps;

const Certificate = ({
    title,
    issuer,
    description,
    issue_date,
    expiry_date,
    logo_path,
    certificate_link = '',
    className = '',
}: Props) => {
  return (
    <motion.div
      className={`flex gap-8 sm:gap-10 flex-col lg:flex-row items-center ${className}`}
    >
      <li className="mb-10 ms-6" key={getId()}>
            <span className='relative flex'>
                <span className='absolute -left-1 -top-1'>
                    <Image
                        src={logo_path}
                        alt={title}
                        width={100}
                        height={100}
                        className="rounded"
                    />
                </span>
            </span>
            <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20"><path fill="currentColor" d="M4.46 5.16L5 7.46l-.54 2.29l2.01 1.24L7.7 13l2.3-.54l2.3.54l1.23-2.01l2.01-1.24L15 7.46l.54-2.3l-2-1.24l-1.24-2.01l-2.3.55l-2.29-.54l-1.25 2zm5.55 6.34a3.999 3.999 0 1 1 0-8c2.2 0 3.99 1.79 3.99 3.99c0 2.22-1.79 4.01-3.99 4.01m-.02-1C8.33 10.5 7 9.16 7 7.5c0-1.65 1.33-3 2.99-3S13 5.85 13 7.5c0 1.66-1.35 3-3.01 3m3.84 1.1l-1.28 2.24l-2.08-.47L13 19.2l1.4-2.2h2.5zm-7.7.07l1.25 2.25l2.13-.51L7 19.2L5.6 17H3.1z" /></svg>
            </span>
            <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white ml-24">
                {title}
            </h3>
            <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500 ml-24 pt-2">
                Issue on: {issue_date} <span className={expiry_date === '' ? 'hidden' : ''}> - Expire on: {expiry_date} </span> 
            </time>
            <h4 className="flex items-center mb-1 text-strong font-semibold text-gray-400 dark:text-gray-500 ml-24 pt-2">
                Issue by: {issuer}
            </h4>
            <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                {description}
            </p>

            <span className={certificate_link === '' ? 'hidden' : ''}>
                <a href={certificate_link} className='inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-100 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700' target="_blank" rel="noreferrer noopener">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" className='mr-2'>
                        <path fill="currentColor" d="M12.5 13.3c-.2-.5-.2-.9-.1-1.3H3V4.5l6 4l6-4v1.7c.6-.3 1.1-.3 1.4-.3c.1-.1.3-.2.5-.3v-3c.1-.9-.6-1.6-1.5-1.6H2.6C1.7 1 1 1.7 1 2.6v9.8c0 .9.7 1.6 1.6 1.6h10.3c-.2-.2-.3-.4-.4-.7M15 3L9 7L3 3zm7.6 6.9c-.2-.6-.7-.7-1-1c-.2-.3-.2-.9-.7-1.2c-.5-.4-1-.2-1.4-.3s-.7-.6-1.3-.6s-.9.4-1.3.6c-.4.1-.9-.1-1.4.3c-.5.3-.4.8-.7 1.2c-.3.3-.8.5-1 1c-.2.6.2 1 .2 1.4s-.4.8-.2 1.4s.7.7 1 1c.2.3.2.9.7 1.2c.5.4 1 .2 1.4.3s.7.6 1.3.6s.9-.4 1.3-.6c.4-.1.9.1 1.4-.3s.5-.9.7-1.2c.3-.3.8-.5 1-1c.2-.6-.2-1-.2-1.4s.4-.8.2-1.4m-4.4 4.5c-1.7 0-3-1.4-3-3s1.4-3 3-3s3 1.4 3 3s-1.3 3-3 3m1.5-3.1c0 .8-.7 1.5-1.5 1.5s-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5s1.5.7 1.5 1.5m-.2 5.8l-.5 2.7l-.6 3.1l-2-1.9l-2.4 1.1l1-5.7c.4.2.9.3 1.4.3c.3.2.7.4 1 .5c.2.1.5.1.8.1c.5.1.9 0 1.3-.2m3.2 2.4l-2-.7l.4-2.2l.6-.3l.1-.1z" />
                    </svg>
                    View Certificate
                </a>
            </span>
        </li>
    </motion.div>
  );
};

export default Certificate;
