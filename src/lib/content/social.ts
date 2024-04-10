import { socialLinks } from '@/lib/content/portfolio';
import { SocialSectionType } from '@/lib/types/sections';


export const socialSection: SocialSectionType = {
    socialLinks: [
    {
        icon: 'tabler:brand-github',
        url: socialLinks.github,
    },
    {
        icon: 'lucide:notebook-pen',
        url: socialLinks.blog,
    },
    {
        icon: 'lucide:twitter',
        url: socialLinks.twitter,
    },
    {
        icon: 'lucide:linkedin',
        url: socialLinks.linkedin,
    },
    {
        icon: 'lucide:facebook',
        url: socialLinks.facebook,
    },
    ],
};