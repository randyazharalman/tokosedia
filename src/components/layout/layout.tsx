import ScrollToTop from "../ui/scroll-to-top";
import Footer from "./footer";
import Header from "./header";

type LayoutProps = {
  children: React.ReactNode;
};
const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <ScrollToTop />
      <div className="flex flex-col h-screen   px-5 py-3 font-roboto">
        <Header />
        <div className="flex flex-col flex-1 md:px-16 ">{children}</div>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
