import { useEffect, useReducer } from 'react';
import PlusIcon from './Icons/icon-increment-quantity.svg';
import MinusIcon from './Icons/icon-decrement-quantity.svg';
import CartIcon from './Icons/icon-add-to-cart.svg';
import OrderConfirmedIcon from './Icons/icon-order-confirmed.svg';
import EmptyCartIcon from './Icons/illustration-empty-cart.svg';
import RemoveCartIcon from './Icons/icon-remove-item.svg';
import CarbonNeutralIcon from './Icons/icon-carbon-neutral.svg';

const initialState = {
  products: [],
  cart: [],
};

function reducer(state, action) {
  console.log(state);

  switch (action.type) {
    case 'data_set': {
      return {
        ...state,
        products: action.payload,
      };
    }
    case 'addTocart':
      const addProduct = state.product[action.payload];
      return {
        ...state,
        cart: [...state.cart, addProduct],
      };
    default:
      throw new Error('Unknown action' + action.type);
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  function AddToCart(index) {
    dispatch({ type: 'addTocart', payload: index });
  }

  useEffect(() => {
    async function FetchData() {
      let ignore = false;
      try {
        const res = await fetch('/data.json');
        if (!res.ok) {
          throw new Error('Newtwork response is not ok!');
        }
        const data = await res.json();
        console.log(data);
        if (!ignore) {
          dispatch({
            type: 'data_set',
            payload: data,
          });
        }
      } catch (error) {
        console.log('Error fetching the data', error);
      }

      return () => {
        ignore = true;
      };
    }
    FetchData();
  }, []);

  return (
    <>
      <div className="container flex flex-col md:flex-row">
        <Products state={state} onAddToCart={AddToCart} />
        <Cart
          state={state}
          // onOrderOpen={handleOrderOpen}
          // onDeleteItem={handleRemoveFromCart}
        />
      </div>
      {/* {isOpen && <Order onOrderOpen={handleOrderOpen} cart={cart} />} */}
    </>
  );
}

function Products({ state, onAddToCart }) {
  return (
    <div className="container mx-auto p-8">
      <div className="flex flex-col sm:flex-row gap-6">
        <div className="flex-1">
          <h1 className="font-red-hat font-bold text-Rose-900 text-6xl p-6 mb-10">
            Deserts
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 grid-rows-3 gap-4">
            {state.products.map((product, index) => (
              <div key={index} className="img-container">
                <picture>
                  <source media="lg" srcSet={product.image.desktop} />
                  <source media="md" srcSet={product.image.tablet} />
                  <source media="sm" srcSet={product.image.mobile} />
                  <img
                    src={product.image.mobile}
                    alt={product.name}
                    className={`w-full h-auto rounded-2xl`}
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
                <div>
                  <div className="btn w-1/2 flex items-center justify-center gap-4 bg-Rose-50 px-8 py-4 rounded-[100px] border-2 border-Rose-500">
                    <button>
                      <img src={CartIcon} alt="cart-icon" />
                    </button>
                    <button
                      onClick={() => {
                        onAddToCart(index);
                        console.log(index);
                      }}
                    >
                      <span className="font-bold text-Rose-900 text-xl">
                        Add to cart
                      </span>
                    </button>
                  </div>

                  <div className="btn--rose flex items-center justify-between w-1/2 bg-Red px-12 py-4 rounded-[100px]">
                    <button className="flex items-center justify-center border-2 border-Rose-300 w-8 h-8 rounded-full hover:bg-Rose-50">
                      <img
                        src={MinusIcon}
                        alt="minus-con"
                        className="w-4 text-Rose-300 hover:text-Red"
                      />
                    </button>
                    <button>
                      <span className="font-bold text-Rose-300 text-2xl mx-auto">
                        {product.quantity}
                      </span>
                    </button>
                    <button className="flex items-center justify-center border-2 border-Rose-300 w-8 h-8 rounded-full hover:bg-Rose-50">
                      <img
                        src={PlusIcon}
                        alt="plus-icon"
                        className="w-4 text-Rose-300"
                      />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Order({ onOrderOpen, cart }) {
  const orderedTotal = cart
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-Rose-50 w-full h-auto  mt-[160px] rounded-2xl lg:w-[500px] lg:h-auto lg:mt-0">
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
            {cart.map((item, index) => (
              <div key={index}>
                <div className="px-6 pt-6">
                  <div className="flex items-center justify-between border-b-[.5px] border-Rose-300">
                    <div className="flex gap-6 mb-6">
                      <picture>
                        <source media="lg" srcSet={item.image.desktop} />
                        <source media="md" srcSet={item.image.tablet} />
                        <source media="sm" srcSet={item.image.mobile} />
                        <img
                          src={item.image.thumbnail}
                          alt={item.name}
                          className={`w-20 h-auto rounded-2xl`}
                        />
                      </picture>
                      <div className="flex flex-col">
                        <h3 className="text-2xl font-bold text-Rose-900 mb-2">
                          {item.name}
                        </h3>
                        <div className="flex items-center gap-4">
                          <p className="text-xl font-bold text-Red">
                            {item.quantity}x
                          </p>
                          <p className="text-xl font-bold text-Rose-300">
                            ${item.price.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                    <p className="text-2xl text-Rose-900 font-bold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            <div className="flex items-center justify-between py-8 px-6">
              <p className="text-2xl font-semibold text-Rose-300">
                Order total
              </p>
              <p className="text-3xl text-Rose-900 font-bold">
                ${orderedTotal}
              </p>
            </div>
          </div>
          <button
            className=" bg-Red px-12 py-4 rounded-[100px] w-full text-Rose-300 hover:bg-Rose-900 font-bold text-2xl cursor-pointer my-6 md:m-0"
            onClick={onOrderOpen}
          >
            Start New Order
          </button>
        </div>
      </div>
    </div>
  );
}

function Cart({ onOrderOpen, state, onDeleteItem }) {
  return (
    <div className="w-[90%] h-auto mx-auto mb-8 bg-Rose-50  p-8 md:w-1/3 rounded-md md:h-[60%] md:mt-20">
      <h1 className="text-Red text-3xl font-bold">Your Cart (0)</h1>
      {state.cart.length > 0 ? (
        <CartFilled
          onOrderOpen={onOrderOpen}
          state={state}
          onDeleteItem={onDeleteItem}
        />
      ) : (
        <EmptyCart />
      )}
    </div>
  );
}

function EmptyCart() {
  return (
    <div>
      <img src={EmptyCartIcon} alt="Empty cart icon" className="w-60 mx-auto" />
      <p className="text-Rose-400 text-2xl mx-auto text-center">
        Your added items will appear here
      </p>
    </div>
  );
}

function CartFilled({ onOrderOpen, state, onDeleteItem }) {
  const orderedTotal = state.cart
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <div className="">
      <div>
        {state.cart.map((item, index) => (
          <div
            className="flex items-center justify-between border-b-2 border-Rose-100 py-8"
            key={index}
          >
            <div>
              <h3 className="text-2xl font-bold text-Rose-900 mb-2">
                {item.name}
              </h3>
              <div className="flex items-center gap-4">
                <p className="text-xl font-bold text-Red">{item.quantity}x</p>
                <p className="text-xl font-bold text-Rose-300">
                  @${item.price.toFixed(2)}
                </p>
                <p className="text-xl font-bold text-Rose-300">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
            <button
              className="flex items-center justify-center border-2 border-Rose-300 w-8 h-8 rounded-full"
              onClick={() => {
                onDeleteItem(item.id);
              }}
            >
              <img
                src={RemoveCartIcon}
                alt="remove cart items"
                className="w-4"
              />
            </button>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between py-8">
        <p className="text-2xl font-semibold text-Rose-300">Order total</p>
        <p className="text-3xl text-Rose-900 font-bold">${orderedTotal}</p>
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
            carbon-neutral
          </span>{' '}
          delivery
        </p>
      </div>
      <button
        className=" bg-Red px-12 py-4 rounded-[100px] w-full text-Rose-50 hover:bg-Rose-900 text-2xl cursor-pointer"
        onClick={onOrderOpen}
      >
        Confirm order
      </button>
    </div>
  );
}
