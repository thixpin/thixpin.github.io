import { CertificationsSectionType } from '@/lib/types/sections'

export const certificationsSection: CertificationsSectionType = {
    title: 'Education & Certifications',
    certificates: [
        {
            title: 'B.Sc Industrial Chemistry',
            issuer: 'West Yangon University',
            description: 'I have completed my Bachelor of Science in Industrial Chemistry from West Yangon University.',
            issue_date: 'November 2006',
            expiry_date: '',
            logo_path: '/images/graduation.svg',
            certificate_link: '',
        },
        {
            title: 'AWS Certified Cloud Practitioner',
            issuer: 'Amazon Web Services (AWS)',
            description: 'The AWS Certified Cloud Practitioner examination is intended for individuals who have the knowledge and skills necessary to effectively demonstrate an overall understanding of the AWS Cloud, independent of specific technical roles addressed by other AWS Certifications.',
            issue_date: 'December 2022',
            expiry_date: 'April 2026',
            logo_path: '/images/clf-c02.png',
            certificate_link: 'https://www.credly.com/badges/b4d7d864-9f48-4f6f-9682-64cdbcd89662/linked_in_profile',
        },
        {
            title: 'AWS Certified Solutions Architect - Associate',
            issuer: 'Amazon Web Services (AWS)',
            description: 'The AWS Certified Solutions Architect – Associate examination is intended for individuals who perform a solutions architect role and have one or more years of hands-on experience designing available, cost-efficient, fault-tolerant, and scalable distributed systems on AWS.',
            issue_date: 'April 2023',
            expiry_date: 'April 2026',
            logo_path: '/images/saa-c03.png',
            certificate_link: 'https://www.credly.com/badges/f9d590d5-a76c-4ac7-8712-f5b2644d358a/linked_in_profile',
        },
        {
            title: 'DPN Technical Specialist',
            issuer: 'DataDog',
            description: 'The DPN Technical Specialist examination is intended for individuals who have the knowledge and demonstrated the knowledge of Datadog products, including Infrastructure, APM and Logs.',
            issue_date: 'June 2023',
            expiry_date: '',
            logo_path: '/images/dpn.png',
            certificate_link: 'https://datadog.docebosaas.com/share/gamification/badges/external/5dee39df-6109-4149-83c2-207f77bb3f0e?lang=en',
        },
        {
            title: 'EF SET English Certificate (C1 Advanced)',
            issuer: 'EF Standard English Test (EF SET) ',
            description: 'The achieved level is 66/100 on the EF SET score scale and C1 Advanced according to the Common European Framework of Reference (CEFR). The EF SET score is calculated as an average of the skill section scores.',
            issue_date: 'March 2024',
            expiry_date: '',
            logo_path: '/images/efset.png',
            certificate_link: 'https://cert.efset.org/8N8kWc',
        },
    ],
};