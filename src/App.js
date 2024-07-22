import { useEffect, useState } from 'react';
import PlusIcon from './Icons/icon-increment-quantity.svg';
import MinusIcon from './Icons/icon-decrement-quantity.svg';
import CartIcon from './Icons/icon-add-to-cart.svg';

export default function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function FetchData() {
      try {
        const res = await fetch('/data.json');
        if (!res.ok) {
          throw new Error('Newtwork response is not ok!');
        }
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.log('Error fetching the data', error);
      }
    }

    FetchData();
  }, [products]);

  return (
    <div className="font-red-hat">
      <div className="container flex mx-auto p-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <h1 className="font-red-hat font-bold text-Rose-900 text-4xl py-6">
              Deserts
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 grid-rows-3 gap-4">
              {products.map((product, index) => (
                <div key={index} className="img-container">
                  <picture>
                    <source media="lg" srcSet={product.image.desktop} />
                    <source media="md" srcSet={product.image.tablet} />
                    <source media="sm" srcSet={product.image.mobile} />
                    <img
                      src={product.image.mobile}
                      alt={product.name}
                      className="w-full h-auto rounded-2xl"
                    />
                  </picture>
                  <div className="mt-8">
                    <p className="text-md text-Rose-300">{product.category}</p>
                    <h3 className="text-lg font-semibold text-Rose-900">
                      {product.name}
                    </h3>
                    <p className="text-xl font-bold text-Red">
                      ${product.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="btn flex items-center gap-4 bg-Rose-50 px-8 py-4 rounded-[100px] border-2 border-Rose-500">
                    <button>
                      <img src={CartIcon} alt="cart-icon" />
                    </button>
                    <button>
                      <span className="font-bold text-Rose-900 text-xl">
                        Add to cart
                      </span>
                    </button>
                  </div>
                  <div className="btn--rose flex items-center gap-8 bg-Red px-8 py-4 rounded-[100px]">
                    <button className="flex items-center justify-center border-2 border-Rose-300 w-8 h-8 rounded-full">
                      <img
                        src={MinusIcon}
                        alt="minus-con"
                        className="w-4 text-Rose-300"
                      />
                    </button>
                    <button>
                      <span className="font-bold text-Rose-300 text-2xl">
                        0
                      </span>
                    </button>
                    <button className="flex items-center justify-center border-2 border-Rose-300 w-8 h-8 rounded-full">
                      <img
                        src={PlusIcon}
                        alt="plus-icon"
                        className="w-4 text-Rose-300"
                      />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-Rose-50">
            <h1>Your Cart</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
