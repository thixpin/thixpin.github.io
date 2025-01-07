import { ShowLottie } from '@/components';

const Hello = () => {
  return (
    <div className="w-full max-w-xl text-center mt-20 mx-auto">
      <p className="mt-5 text-3xl capitalize md:text-4xl text-dark-2">
        Hello, World!
      </p>
      <ShowLottie path="/lotties/hello.json" className="mx-auto" />
    </div>
  );
};

export default Hello;
