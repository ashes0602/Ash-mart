import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto h-20 px-4 py-4 flex justify-between items-center">
        <Link
          href="/product"
          className="text-3xl font-bold text-green-900 flex items-center gap-2"
        >
          🥫 TinFood
        </Link>
        <div className="flex gap-6 text-gray-700 font-medium">
          <Link href="/product" className="text-green-900 font-semibold text-lg hover:text-green-500">
            + Add Products
          </Link>

          <Link href="/order" className="text-green-900 font-semibold text-lg hover:text-green-500">
            Product List
          </Link>

          {/* <Link href="/cart" className="text-green-900 font-semibold text-lg hover:text-green-500">
            Cart items
          </Link> */}
        </div>
      </div>
    </nav>
  );
}
