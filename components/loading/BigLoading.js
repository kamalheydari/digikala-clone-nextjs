import Loading from "components/common/Loading";
import Image from "next/image";

export default function BigLoading() {
  return (
    <div className='p-8 mx-auto text-center space-y-10 rounded-lg bg-red-100/90 max-w-max '>
      <div className='relative w-40 h-12 mx-auto'>
        <Image src='/icons/logo.svg' layout='fill' alt='digikala' />
      </div>
      <Loading />
    </div>
  );
}
