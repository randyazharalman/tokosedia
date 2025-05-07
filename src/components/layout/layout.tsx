import Header from "./header";


type LayoutProps = {
  children: React.ReactNode;
}
const Layout = ({children}: LayoutProps) => {
  return (
    <div className="flex flex-col h-screen w-screen border p-5 ">
      <Header />
      <div className="flex flex-1 p-4 border">{children}</div>
    </div>
  )
}

export default Layout