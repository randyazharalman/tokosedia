
interface BreadCrumbsProps {
  category: string | undefined,
  productTile?: string,
}
const Breadcrumbs = ({category, productTile}: BreadCrumbsProps) => {
  return (
    <div>
      <div className="container mx-auto px-4 py-3">
        <div className="flex text-sm text-gray-500">
          <a href="#" className="hover:underline capitalize">
            {category}
          </a>
          <span className="mx-2">&gt;</span>
          <a href="#" className="hover:underline">
            {productTile}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumbs;
