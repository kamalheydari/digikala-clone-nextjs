import Router from "next/router";
import { useEffect, useState } from "react";

import { Header, BigLoading } from "components";

export default function PageLoading() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    Router.events.on("routeChangeStart", () => setLoading(true));
    Router.events.on("routeChangeComplete", () => setLoading(false));
  });

  return (
    loading && (
      <div className='fixed inset-0 z-40 '>
        <Header />
        <div className='grid h-full xl:mt-28 bg-blue-50/30 place-items-center '>
          <BigLoading />
        </div>
      </div>
    )
  );
}
