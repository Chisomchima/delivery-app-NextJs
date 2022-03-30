import styles from "../styles/Cart.module.css";
import axios from "axios";
import Image from "next/image";
import {useRouter} from "next/router"
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { reset } from "../redux/cartSlice"
import { PaystackButton } from "react-paystack"



const Cart = () => {
  
  const [cash, setCash] = useState(false);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const router = useRouter();
  const publicKey = "pk_test_be8ad57bc4f3817c9ce970ba9ac562e6598ee088"
  
  const createOrder = async (data) => {
    try {
      const res = await axios.post("http://localhost:3000/api/orders", data);
      if (res.status === 201) {
        dispatch(reset());
        router.push(`/orders/${res.data._id}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const amount = cart.total * 100
  const [email, setEmail] = useState("example@gmail.com")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const method = 0;
 
  const componentProps = {
    email,
    amount,
    metadata: {
      name,
      phone,
      address,
      method,
    },
    publicKey,
    text: "Pay Now",
    onSuccess: function(response){
      alert("successful transaction, thanks for you support!!!!")
      createOrder({ 
        customer: componentProps.metadata.name,
        address:componentProps.metadata.address,
        total: cart.total,
        method: 1,
        number:componentProps.metadata.phone,
      }), response
    },
   
    onClose: function(response){ alert("thes are rare to find, don't go!!!!"), response}
  }
  

  console.log(componentProps)
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <table className={styles.table}>
        {cart.products.map((product) => (
        <tr className={styles.tr} key={product._id}>
                <td>
                  <div className={styles.imgContainer}>
                    <Image
                      src={product.img}
                      layout="fill"
                      objectFit="cover"
                      alt=""
                    />
                  </div>
                </td>
                <td>
                  <span className={styles.name}>{product.title}</span>
                </td>
                <td>
                  <span className={styles.extras}>
                    {product.extras.map((extra) => (
                      <span key={extra._id}>{extra.text}, </span>
                    ))}
                  </span>
                </td>
                <td>
                  <span className={styles.price}>${product.price}</span>
                </td>
                <td>
                  <span className={styles.quantity}>{product.quantity}</span>
                </td>
                <td>
                  <span className={styles.total}>
                    ${product.price * product.quantity}
                  </span>
                </td>
              </tr>
          ))}
        </table>
      </div>
      <div className={styles.right}>
        <div className={styles.wrapper}>
        <h2 className={styles.title}>CART TOTAL</h2>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Subtotal:</b>NGN {cart.total}
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Discount:</b>NGN 0.00
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Total:</b>NGN {cart.total}
          </div>
          <div className="formContainer">
          <form>
          <div className="inputs">
            <label>Name</label>
            <input
              className={styles.input}
              type="text"
              id="name"
              onChange={(e) => setName(e.target.value)}
            />
            <div></div>
            <div className="inputs"></div>
            <label>Email</label>
            <input
             className={styles.input}
              type="text"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            </div>
             <div className="inputs">
            <label>Phone</label>
            <input
              className={styles.input}
              type="text"
              id="phone"
              onChange={(e) => setPhone(e.target.value)}
            />
            </div>
            <div className="inputs">
            <label>Adress</label>
            <input
              className={styles.input}
              type="text"
              id="Adress"
              placeholder="Delivery location"
              onChange={(e) => setAddress(e.target.value)}
            />
            </div>
          </form>
          </div>
            <div className={styles.paymentMethods}>
            <PaystackButton {...componentProps} className={styles.button} />
            <button
                className={styles.payButton}
                onClick={() => 
                setCash(true)}
              >
                CASH ON DELIVERY
              </button>
            </div>
        </div>
      </div>
      {cash && <OrderDetail total={cart.total} createOrder={createOrder} />}
    </div>
  );
};

export default Cart;
