import { ProjectsSectionType } from '@/lib/types/sections'
import { getId } from '@/lib/utils/helper';


export const projectsSection: ProjectsSectionType = {
    title: 'my projects',
    projects: [
    {
        id: getId(),
        name: 'Xpel Myanmar',
        url: 'https://xpelmyanmar.com/',
        repo: '',
        img: '/images/xpel.png',
        year: 2021,
        tags: ['Laravel', 'Bootstrap', 'jQuery'],
    },
    {
        id: getId(),
        name: 'RWS MIS',
        url: 'https://www.rwsmis.com/',
        repo: '',
        img: '/images/rws-mis.png',
        year: 2019,
        tags: ['PHP', 'Bootstrap', 'Leaflet'],
    },
    {
        id: getId(),
        name: 'CDA Myanmar',
        url: 'https://cda-myanmar.com/',
        repo: '',
        img: '/images/cda.png',
        year: 2011,
        tags: ['React', 'Bootstrap'],
    },
    {
        id: getId(),
        name: 'L33t DevSecOps',
        url: 'https://leetdev.net/',
        repo: '',
        img: '/images/leetdev.png',
        year: 2018,
        tags: ['Laravel', 'OctoberCMS'],
    },
    {
        id: getId(),
        name: 'Star World Myanmar',
        url: 'https://www.starworldmm.com/',
        repo: '',
        img: '/images/starworld.png',
        year: 2022,
        tags: ['Laravel', 'OctoberCMS'],
    },
    {
        id: getId(),
        name: 'Myanmar Unipress (WP Plugin)',
        url: 'https://wordpress.org/plugins/myanmar-unipress/',
        repo: 'https://github.com/thixpin/Myanmar-UniPress',
        img: '/images/unipress.png',
        year: 2018,
        tags: ['WordPress', 'javascript'],
    }
    ],
};