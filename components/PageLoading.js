import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { Header, BigLoading } from "components";

export default function PageLoading() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url) => url !== router.asPath && setLoading(true);
    const handleComplete = (url) => url === router.asPath && setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  });

  return (
    loading && (
      <div className='fixed z-40 inset-0 '>
        <Header />
        <div className='xl:mt-28 h-full bg-blue-50/30 grid place-items-center '>
          <div className='border-8 border-white rounded-lg'>
            <BigLoading />
          </div>
        </div>
      </div>
    )
  );
}
