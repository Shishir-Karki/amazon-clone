import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../utils/cartSlice';
import { cartItem } from '../data/cartItem'; // Import the cartItem data directly

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Find the product from cartItem array
    const foundProduct = cartItem.find(p => p.product_id === id);
    setProduct(foundProduct);
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(product));
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // Split about_product string into bullet points
  const bulletPoints = product.about_product?.split('|') || [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left: Product Image */}
        <div className="md:w-2/5">
          <div className="sticky top-20">
            <img
              src={product.img_link || 'https://via.placeholder.com/400'}
              alt={product.product_name}
              className="w-full object-contain"
              style={{ maxHeight: '500px' }}
            />
          </div>
        </div>

        {/* Middle: Product Details */}
        <div className="md:w-2/5">
          <nav className="text-sm mb-2">
            <ol className="list-none p-0 inline-flex">
              <li className="flex items-center text-[#007185] hover:text-[#C7511F] hover:underline">
                {product.category?.split('|').join(' > ')}
              </li>
            </ol>
          </nav>

          <h1 className="text-xl lg:text-2xl font-medium mb-2">{product.product_name}</h1>
          
          <div className="flex items-center mb-4">
            <span className="text-[#F3A847] text-lg">{'★'.repeat(Math.floor(product.rating))}</span>
            <span className="text-[#007185] text-sm ml-2 hover:text-[#C7511F] cursor-pointer">
              {product.rating_count} ratings
            </span>
          </div>

          <div className="border-t border-b py-4 my-4">
            <div className="flex items-baseline gap-2">
              <span className="text-sm">List Price: </span>
              <span className="text-3xl">{product.discounted_price}</span>
              {product.actual_price && (
                <>
                  <span className="text-sm text-gray-500 line-through">
                    {product.actual_price}
                  </span>
                  <span className="text-sm text-[#CC0C39]">
                    ({product.discount_percentage} off)
                  </span>
                </>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">About this item</h3>
            <ul className="list-disc list-inside space-y-2 text-sm">
              {bulletPoints.map((point, index) => (
                <li key={index}>{point.trim()}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right: Buy Box */}
        <div className="md:w-1/5">
          <div className="border rounded-lg p-4 sticky top-20">
            <div className="text-2xl mb-2">{product.discounted_price}</div>
            
            <div className="text-sm mb-4">
              <span className="text-[#007600] font-medium">FREE delivery</span>{' '}
              <span className="font-bold">Tomorrow</span>
              <br />
              Order within 4 hrs 32 mins
            </div>

            <div className="text-lg text-[#007600] font-medium mb-4">In Stock</div>

            <button
              onClick={handleAddToCart}
              className="w-full bg-[#FFD814] hover:bg-[#F7CA00] text-black py-2 px-6 rounded-full font-medium mb-2"
            >
              Add to Cart
            </button>

            <button
              onClick={() => navigate('/cart')}
              className="w-full bg-[#FFA41C] hover:bg-[#FA8900] text-black py-2 px-6 rounded-full font-medium"
            >
              Buy Now
            </button>

            <div className="border-t mt-4 pt-4">
              <div className="flex items-center text-sm mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                </svg>
                Secure transaction
              </div>
              <div className="text-xs text-[#007185]">
                Ships from and sold by Amazon.in
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;