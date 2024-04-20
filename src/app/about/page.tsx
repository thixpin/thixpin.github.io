import {
    About,
    Contact,
    Layout,
} from '@/containers';

import type { NextPage } from 'next';

const Page: NextPage = () => {
    return (
        <>
            <Layout>
                <About />
                <Contact />
            </Layout>
        </>
    );
};

export default Page;
