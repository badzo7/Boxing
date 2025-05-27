import React from 'react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { X, MinusCircle, PlusCircle, ShoppingBag, ArrowLeft } from 'lucide-react';
import OrderSummary from '../components/order/OrderSummary';

const CartPage: React.FC = () => {
  const {
    items,
    removeFromCart,
    updateQuantity,
    getTotalPrice
  } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="pt-24 pb-16 container-custom">
        <div className="flex flex-col items-center justify-center text-center py-16">
          <ShoppingBag className="h-16 w-16 text-neutral-700 mb-4" />
          <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
          <p className="text-neutral-400 mb-8 max-w-md">
            Looks like you haven't added any custom gloves to your cart yet.
          </p>
          <Link to="/customize" className="btn btn-primary">
            Start Designing
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 container-custom">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl md:text-3xl font-bold">Shopping Cart</h1>
        <Link to="/customize" className="text-neutral-400 hover:text-white flex items-center gap-2 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Continue Shopping
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-neutral-800 rounded-xl overflow-hidden"
            >
              <div className="p-6 border-b border-neutral-700 flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <img
                    src={item.preview}
                    alt="Glove preview"
                    className="h-20 w-20 rounded object-cover bg-neutral-700"
                  />
                  <h3 className="text-lg font-bold">Custom Gloves</h3>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      className="text-neutral-400 hover:text-white transition-colors"
                    >
                      <MinusCircle className="h-4 w-4" />
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="text-neutral-400 hover:text-white transition-colors"
                    >
                      <PlusCircle className="h-4 w-4" />
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-neutral-500 hover:text-red-500 transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <OrderSummary order={item.order} />
              </div>
            </div>
          ))}
        </div>

        <div>
          <div className="bg-neutral-800 rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-neutral-400">Subtotal</span>
                <span>${getTotalPrice().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Taxes</span>
                <span>Calculated at checkout</span>
              </div>
            </div>

            <div className="border-t border-neutral-700 pt-4 mb-6">
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>${getTotalPrice().toFixed(2)}</span>
              </div>
            </div>

            <button className="btn btn-primary w-full py-3">
              Proceed to Checkout
            </button>

            <div className="mt-6 text-sm text-neutral-400 text-center">
              <p>Free shipping on all orders over $150</p>
              <p className="mt-2">30-day satisfaction guarantee</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
