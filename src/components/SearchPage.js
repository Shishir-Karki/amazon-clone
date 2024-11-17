import React, { useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../utils/cartSlice';
import { cartItem } from '../data/cartItem';

const FilterSection = ({ title, options, selectedOptions, onOptionChange }) => (
  <div className="mb-6">
    <h3 className="text-lg font-bold mb-2">{title}</h3>
    <div className="space-y-2">
      {options.map((option) => (
        <label key={option} className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={selectedOptions.includes(option)}
            onChange={() => onOptionChange(option)}
            className="h-4 w-4 text-amazon-yellow"
          />
          <span className="text-sm">{option}</span>
        </label>
      ))}
    </div>
  </div>
);

function SearchPage({ searchQuery }) {
  const dispatch = useDispatch();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
  };

  const parsePriceString = (priceStr) => {
    return parseFloat(priceStr.replace('₹', '').replace(',', ''));
  };

  const isPriceInRange = (price, range) => {
    const numericPrice = parsePriceString(price);
    switch (range) {
      case 'Under ₹1,000':
        return numericPrice < 1000;
      case '₹1,000 - ₹5,000':
        return numericPrice >= 1000 && numericPrice <= 5000;
      case '₹5,000 - ₹10,000':
        return numericPrice >= 5000 && numericPrice <= 10000;
      case 'Over ₹10,000':
        return numericPrice > 10000;
      default:
        return false;
    }
  };

  const filteredProducts = useMemo(() => {
    const query = searchQuery?.toLowerCase() || '';
    
    return cartItem.filter((item) => {
      const matchesSearch = 
        item.product_name.toLowerCase().includes(query) ||
        item.category?.toLowerCase().includes(query);

      const matchesCategory = 
        selectedCategories.length === 0 ||
        selectedCategories.some(category => 
          item.category?.toLowerCase().includes(category.toLowerCase())
        );

      const matchesRating = 
        selectedRatings.length === 0 ||
        selectedRatings.some(rating => 
          Math.floor(item.rating) >= parseInt(rating)
        );

      const matchesPrice = 
        selectedPriceRanges.length === 0 ||
        selectedPriceRanges.some(range => 
          isPriceInRange(item.discounted_price, range)
        );

      return matchesSearch && matchesCategory && matchesRating && matchesPrice;
    });
  }, [searchQuery, selectedCategories, selectedRatings, selectedPriceRanges]);

  const filterSections = [
    {
      title: "Department",
      options: [
        "Electronics",
        "Home & Kitchen",
        "Fashion",
        "Books",
        "Beauty",
        "Toys & Games",
        "Sports & Fitness",
        "Automotive"
      ],
      selected: selectedCategories,
      onChange: setSelectedCategories
    },
    {
      title: "Customer Rating",
      options: ["4", "3", "2", "1"],
      selected: selectedRatings,
      onChange: setSelectedRatings
    },
    {
      title: "Price",
      options: [
        "Under ₹1,000",
        "₹1,000 - ₹5,000",
        "₹5,000 - ₹10,000",
        "Over ₹10,000"
      ],
      selected: selectedPriceRanges,
      onChange: setSelectedPriceRanges
    }
  ];

  return (
    <div className="max-w-screen-2xl mx-auto px-4 py-6">
      <div className="flex gap-6">
        <div className="w-64 flex-shrink-0">
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Filters</h2>
            {filterSections.map((section, index) => (
              <FilterSection
                key={index}
                title={section.title}
                options={section.options}
                selectedOptions={section.selected}
                onOptionChange={(option) => {
                  section.onChange(prev =>
                    prev.includes(option)
                      ? prev.filter(item => item !== option)
                      : [...prev, option]
                  );
                }}
              />
            ))}
          </div>
        </div>

        <div className="flex-grow">
          <h1 className="text-xl font-bold mb-4">
            {searchQuery ? `Results for "${searchQuery}"` : 'All Products'}
            <span className="text-gray-500 text-sm ml-2">
              ({filteredProducts.length} items)
            </span>
          </h1>

          <div className="space-y-4">
            {filteredProducts.map((item) => (
              <div key={item.product_id} className="bg-white p-4 rounded-lg shadow flex">
                <div className="w-48 h-48 flex-shrink-0">
                  <img
                    src={item.img_link || 'https://via.placeholder.com/200'}
                    alt={item.product_name}
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="ml-6 flex-grow">
                  <h3 className="text-lg font-medium hover:text-[#C7511F] cursor-pointer">
                    {item.product_name}
                  </h3>
                  
                  <div className="flex items-center mt-2">
                    <span className="text-[#F3A847] text-sm">{'★'.repeat(Math.floor(item.rating))}</span>
                    <span className="text-[#007185] text-sm ml-2 hover:text-[#C7511F] cursor-pointer">
                      {item.rating_count} ratings
                    </span>
                  </div>

                  <div className="mt-2">
                    <span className="text-2xl font-medium">{item.discounted_price}</span>
                    {item.actual_price && (
                      <>
                        <span className="text-sm text-gray-500 line-through ml-2">
                          {item.actual_price}
                        </span>
                        <span className="text-sm text-[#CC0C39] ml-2">
                          ({item.discount_percentage} off)
                        </span>
                      </>
                    )}
                  </div>

                  <div className="text-sm text-[#007600] mt-1">In Stock</div>

                  <button
                    onClick={() => handleAddToCart(item)}
                    className="mt-4 bg-[#FFD814] hover:bg-[#F7CA00] text-black py-1 px-4 rounded-full text-sm font-medium"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}

            {filteredProducts.length === 0 && (
              <div className="text-center py-8">
                <h2 className="text-xl font-bold mb-2">No results found</h2>
                <p className="text-gray-600">
                  We couldn't find any matches for "{searchQuery}"
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchPage;