import { NavbarSectionType } from '@/lib/types/sections';
import { resumeFileName } from '@/lib/utils/config';

export const navbarSection: NavbarSectionType = {
    navLinks: [
        { name: 'about', url: '/#about'},
        { name: 'skills', url: '/#skills'},
        { name: 'experience', url: '/#experience' },
        { name: 'projects', url: '/#projects' },
        { name: 'certifications', url: '/#certifications' },
        { name: 'contact', url: '/#contact' },
    ],
    cta: {
        title: 'resume',
        url: `/${resumeFileName}`,
    },
}