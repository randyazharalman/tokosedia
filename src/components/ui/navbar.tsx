// const categories = [
//   {
//     id: 1,
//     category: "women",
//   },
//   {
//     id: 2,
//     category: "men"
//   },
//   {
//     id: 3,
//     category: "electronics"
//   },
//   {
//     id: 4,
//     category: "jewelery"
//   }
// ]
const Navbar = () => {
  return (
    <nav className="flex space-x-6">
      <a href="#" className="text-sm font-medium">
        Women
      </a>
      <a href="#" className="text-sm font-medium">
        Men
      </a>
      <a href="#" className="text-sm font-medium">
        Kids
      </a>
      <a href="#" className="text-sm font-medium">
        Sports
      </a>
      <a href="#" className="text-sm font-medium">
        Brands
      </a>
      <a href="#" className="text-sm font-medium">
        New
      </a>
      <a href="#" className="text-sm font-medium text-red-500">
        Sale
      </a>
    </nav>
  );
};

export default Navbar;
