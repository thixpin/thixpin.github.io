import {
    Layout,
    Certifications,
    Contact,
} from '@/containers';
  
  import type { NextPage } from 'next';
  
  const Page: NextPage = () => {
    return (
      <>
        <Layout>
          <Certifications />
          <Contact />
        </Layout>
      </>
    );
  };
  
  export default Page;
  