import {
    Layout,
    Hero,
    Contact,
} from '@/containers';
  
  import type { NextPage } from 'next';
  
  const Page: NextPage = () => {
    return (
      <>
        <Layout>
          <Hero />
          <Contact />
        </Layout>
      </>
    );
  };
  
  export default Page;
  