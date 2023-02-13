import Link from "next/link";
import { useRouter } from "next/router";

import { Icons } from "components";

export default function BoxLink({ children, path, name }) {
  const router = useRouter();
  return (
    <div
      className={`box-link ${
        router.asPath === path ? "box-link--active" : "box-link--deactive"
      }`}
    >
      <Link href={path}>
        <a className='box-link__anchor'>
          {children}
          <span className='box-link__text'>{name}</span>
          <Icons.ArrowLeft className='box-link__icon' />
        </a>
      </Link>
    </div>
  );
}
