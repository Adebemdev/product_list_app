import { useEffect, useState } from 'react';
import PlusIcon from './Icons/icon-increment-quantity.svg';
import MinusIcon from './Icons/icon-decrement-quantity.svg';
import CartIcon from './Icons/icon-add-to-cart.svg';
import OrderConfirmedIcon from './Icons/icon-order-confirmed.svg';
import classicImage from './assets/images/image-tiramisu-thumbnail.jpg';
import pannaImage from './assets/images/image-panna-cotta-thumbnail.jpg';
import waffleImage from './assets/images/image-waffle-thumbnail.jpg';
import EmptyCartIcon from './Icons/illustration-empty-cart.svg';
import RemoveCartIcon from './Icons/icon-remove-item.svg';
import CarbonNeutralIcon from './Icons/icon-carbon-neutral.svg';

export default function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function FetchData() {
      let ignore = false;
      try {
        const res = await fetch('/data.json');
        if (!res.ok) {
          throw new Error('Newtwork response is not ok!');
        }
        const data = await res.json();
        if (!ignore) {
          setProducts(data);
        }
      } catch (error) {
        console.log('Error fetching the data', error);
      }

      return () => {
        ignore = true;
      };
    }
    FetchData();
  }, [products]);

  return (
    <>
      <Products products={products} />
      <Cart />
      <Order />
    </>
  );
}

function Products({ products }) {
  return (
    <div className="container flex mx-auto p-8">
      <div className="flex flex-col sm:flex-row gap-6">
        <div className="flex-1">
          <h1 className="font-red-hat font-bold text-Rose-900 text-6xl p-6 mb-10">
            Deserts
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 grid-rows-3 gap-4">
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
                <div className="btn w-1/2 flex items-center gap-4 bg-Rose-50 px-8 py-4 rounded-[100px] border-2 border-Rose-500">
                  <button>
                    <img src={CartIcon} alt="cart-icon" />
                  </button>
                  <button>
                    <span className="font-bold text-Rose-900 text-xl">
                      Add to cart
                    </span>
                  </button>
                </div>
                <div className="btn--rose flex items-center justify-between w-1/2 bg-Red px-12 py-4 rounded-[100px]">
                  <button className="flex items-center justify-center border-2 border-Rose-300 w-8 h-8 rounded-full">
                    <img
                      src={MinusIcon}
                      alt="minus-con"
                      className="w-4 text-Rose-300"
                    />
                  </button>
                  <button>
                    <span className="font-bold text-Rose-300 text-2xl mx-auto">
                      4
                    </span>
                  </button>
                  <button className="flex items-center justify-center border-2 border-Rose-300 w-8 h-8 rounded-full ">
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
      </div>
    </div>
  );
}

function Order() {
  return (
    <div className="order-confirmed fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-Rose-50 w-full h-[85vh]  mt-[160px] rounded-2xl lg:w-[500px] lg:h-[500px] lg:mt-0">
        <div className="mx-auto p-10">
          <img
            src={OrderConfirmedIcon}
            alt="order-confirmed icon"
            className="w-20 mb-8 lg:w-8 lg:mb-4"
          />
          <div className="flex flex-col text-[50px] gap-4 text-Rose-900 font-bold tracking-tight leading-[1] mb-6 lg:flex-row lg:text-3xl lg:mb-2">
            <p>Order</p>
            <p>Confirmed</p>
          </div>
          <p className="text-Rose-300 text-2xl mb-12 lg:mb-4">
            We hope you enjoy your food
          </p>

          <div className="bg-Rose-100 rounded-lg mb-10">
            <div className="px-6 pt-6">
              <div className="flex items-center justify-between border-b-[.5px] border-Rose-300">
                <div className="flex gap-6 mb-6">
                  <div>
                    <img
                      src={classicImage}
                      alt="classic panna"
                      className="w-20 h-20 rounded-lg"
                    />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-2xl font-bold text-Rose-900 mb-2">
                      Classic Tiramisu
                    </h3>
                    <div className="flex items-center gap-4">
                      <p className="text-xl font-bold text-Red">2x</p>
                      <p className="text-xl font-bold text-Rose-300">$5.50</p>
                    </div>
                  </div>
                </div>
                <p className="text-2xl text-Rose-900 font-bold">$5.50</p>
              </div>
            </div>
            <div className="px-6 py-6">
              <div className="flex items-center justify-between border-b-[.5px] border-Rose-300">
                <div className="flex gap-6 mb-6">
                  <div>
                    <img
                      src={pannaImage}
                      alt="classic panna"
                      className="w-20 h-20 rounded-lg"
                    />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-2xl font-bold text-Rose-900 mb-2">
                      Panna-cotta
                    </h3>
                    <div className="flex items-center gap-4">
                      <p className="text-xl font-bold text-Red">4x</p>
                      <p className="text-xl font-bold text-Rose-300">$7.00</p>
                    </div>
                  </div>
                </div>
                <p className="text-2xl text-Rose-900 font-bold">$28.00</p>
              </div>
            </div>
            <div className="px-6">
              <div className="flex gap-8 justify-between border-b-[.5px] border-Rose-300">
                <div className="flex gap-6 mb-6">
                  <div>
                    <img
                      src={waffleImage}
                      alt="classic panna"
                      className="w-20 h-20 rounded-lg"
                    />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-2xl font-bold text-Rose-900 mb-2">
                      Vanilla bread creeme
                    </h3>
                    <div className="flex items-center gap-4">
                      <p className="text-xl font-bold text-Red">2x</p>
                      <p className="text-xl font-bold text-Rose-300">$6.50</p>
                    </div>
                  </div>
                </div>
                <p className="text-2xl text-Rose-900 font-bold">$13.00</p>
              </div>
              <div className="flex items-center justify-between py-4">
                <p className="text-2xl text-Rose-300 font-semibold">
                  Order total
                </p>
                <p className="text-4xl font-bold text-Rose-900">$46.00</p>
              </div>
            </div>
          </div>
          <button className=" bg-Red px-12 py-4 rounded-[100px] w-full text-Rose-300 hover:bg-Rose-900 font-bold text-2xl cursor-pointer my-6 md:m-0">
            Start New Order
          </button>
        </div>
      </div>
    </div>
  );
}

function Cart() {
  return (
    <div className="bg-Rose-50 w-full h-1/2 p-8 lg:w-1/4 rounded-md md:h-[60%]">
      <h1 className="text-Red text-3xl font-bold">Your Cart (0)</h1>
      <div className="">
        <img
          src={EmptyCartIcon}
          alt="Empty cart icon"
          className="w-60 mx-auto"
        />
        <p className="text-Rose-400 text-2xl mx-auto text-center">
          Your added items will appear here
        </p>
      </div>

      <div className="hidden">
        <div className="flex items-center justify-between border-b-2 border-Rose-100 py-8">
          <div>
            <h3 className="text-2xl font-bold text-Rose-900 mb-2">
              Lemon Meringue Pie
            </h3>
            <div className="flex items-center gap-4">
              <p className="text-xl font-bold text-Red">1x</p>
              <p className="text-xl font-bold text-Rose-300">@$5.50</p>
              <p className="text-xl font-bold text-Rose-300">$5.50</p>
            </div>
          </div>
          <button className="flex items-center justify-center border-2 border-Rose-300 w-8 h-8 rounded-full">
            <img src={RemoveCartIcon} alt="remove cart items" className="w-4" />
          </button>
        </div>
        <div className="flex items-center justify-between border-b-2 border-Rose-100 py-8">
          <div>
            <h3 className="text-2xl font-bold text-Rose-900 mb-2">
              Pistachio Baklava
            </h3>
            <div className="flex items-center gap-4">
              <p className="text-xl font-bold text-Red">4x</p>
              <p className="text-xl font-bold text-Rose-300">@$5.50</p>
              <p className="text-xl font-bold text-Rose-300">$5.50</p>
            </div>
          </div>
          <button className="flex items-center justify-center border-2 border-Rose-300 w-8 h-8 rounded-full">
            <img src={RemoveCartIcon} alt="remove cart items" className="w-4" />
          </button>
        </div>
        <div className="flex items-center justify-between border-b-2 border-Rose-100 py-8">
          <div>
            <h3 className="text-2xl font-bold text-Rose-900 mb-2">
              Classic Tiramisu
            </h3>
            <div className="flex items-center gap-4">
              <p className="text-xl font-bold text-Red">2x</p>
              <p className="text-xl font-bold text-Rose-300">@$5.50</p>
              <p className="text-xl font-bold text-Rose-300">$5.50</p>
            </div>
          </div>
          <button className="flex items-center justify-center border-2 border-Rose-300 w-8 h-8 rounded-full">
            <img src={RemoveCartIcon} alt="remove cart items" className="w-4" />
          </button>
        </div>

        <div className="flex items-center justify-between py-8">
          <p className="text-2xl font-semibold text-Rose-300">Order total</p>
          <p className="text-3xl text-Rose-900 font-bold">$45.00</p>
        </div>
        <div className="bg-Rose-100 rounded-md w-full flex items-center justify-center p-4 mb-8 gap-2">
          <img
            src={CarbonNeutralIcon}
            alt="carbon neutral icon"
            className="w-6"
          />
          <p className="text-xl text-Rose-300">
            This s a{' '}
            <span className="text-Rose-900 font-bold text-2xl">
              carbon-nuetral
            </span>{' '}
            delivery
          </p>
        </div>
        <button className=" bg-Red px-12 py-4 rounded-[100px] w-full text-Rose-50 hover:bg-Rose-900 text-2xl cursor-pointer">
          Confirmd order
        </button>
      </div>
    </div>
  );
}
