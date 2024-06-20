import {
    AboutWife,
    Contact,
    Layout,
} from '@/containers';

import type { NextPage } from 'next';

const Page: NextPage = () => {
    return (
        <>
            <Layout>
                <AboutWife />
                <Contact />
            </Layout>
        </>
    );
};

export default Page;
