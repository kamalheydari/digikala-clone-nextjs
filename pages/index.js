export default function Home() {
  return <div>hello</div>;
}

Home.getClientLayout = function pageLayout(page) {
  return <>{page}</>;
};
