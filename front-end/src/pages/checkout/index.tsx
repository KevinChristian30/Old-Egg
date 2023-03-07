import useAuth from "@/hooks/useAuth";
import HomeLayout from "@/layouts/HomeLayout";
import style from "../../styles/pages/checkout/CheckoutPage.module.scss"
import { useEffect, useState } from "react";
import getAddresses from "../api-calls/address/getAddresses";
import RectangularButton from "@/components/RectangularButton";
import RectangularInputField from "@/components/RectangularInputField/RectangularInputField";
import createAddress from "../api-calls/address/createAddress";
import removeAddress from "../api-calls/address/removeAddress";
import getDeliveryProviders from "../api-calls/deliveryProvider/getDeliveryProviders";
import RectangularSelectField from "@/components/RectangularSelectField";
import getPaymentMethods from "../api-calls/paymentMethod/getPaymentMethods";
import getItemsFromCart from "../api-calls/cart/getItemsFromCart";
import createOrder from "../api-calls/order/createOrder";

const CheckoutPage = (props: any) => {

  const { deliveryProviders, paymentMethods } = props;

  const user:any = useAuth();
  const [addresses, setAddresses] = useState([]);
  
  const [isAddingAdress, setIsAddingAddress] = useState(false);
  
  const [newAddress, setNewAddress] = useState("");

  const [chosenAddress, setChosenAddress] = useState<any>({});
  const [chosenDeliveryProvider, setChosenDeliveryProvider] = useState<any>();
  const [chosenPaymentMethod, setChosenPaymentMethod] = useState<any>();
  const [itemsInCart, setItemsInCart] = useState<any>();
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {

    const getUserAddresses = async () => {

      const response = await getAddresses(user.ID);
      if (response === -1) alert('Server Error');
      else {

        await setAddresses(response);

      }

    }

    getUserAddresses();

    const getItemsInCart = async () => {
      
      const response = await getItemsFromCart(user.ID);
      if (response === 1) alert('Fetching Cart Failed');
      else {

        setItemsInCart(response);
        let totalCost = 0;
        response?.map((item: any) => {

          totalCost += (item.product_price * item.quantity);

        });
        setTotalCost(totalCost);

      }

    }

    getItemsInCart();

  }, [user]);

  useEffect(() => {

    setChosenDeliveryProvider(1);
    setChosenPaymentMethod(2);

  }, []);

  const onSaveNewAddressButtonClicked = async () => {

    const response = await createAddress(user.ID, newAddress);
    if (response === -1) alert('Server Error');
    else {

      alert('Address Saved');
      window.location.reload();

    }

  }

  const onRemoveAddressButtonClicked = async (id: Number) => {

    const response: any = await removeAddress(id);
    if (response === -1) alert('Server Error');
    else {

      window.location.reload();

    }

  }

  const onCheckoutButtonClicked = async () => {

    const response = await createOrder(chosenAddress, chosenDeliveryProvider, chosenPaymentMethod, user.ID, itemsInCart);
    if (response == -1) alert('Server Error');
    else if (response == -2) alert('Address Must be Chosen');
    else if (response == -3) alert('Not Enough Money');
    else {

      alert('Checkout Successful');
      window.location.reload();

    }  

  }

  const getContent = () => {

    if (!itemsInCart || itemsInCart.length == 0) return <h1 className="">Your Cart is Empty</h1>

    return (
      <div className={style.index}>
        <h1>Checkout</h1>
        <br /><br /><br />
        <div className={style.address_container}>
          <h2>1. Address: { Object.keys(chosenAddress).length > 0 ? chosenAddress.address : "(Choose Address)" }</h2>
          <br />
          <div className={style.addresses}>
            {
              addresses && addresses.length > 0 ?
              addresses.map((address: any) => {

                return (
                  <div className={style.address} key={address.ID}>
                    <div className={style.left}>
                      <h3>{address.address}</h3>
                    </div>
                    <div className={style.right}>
                      <RectangularButton 
                        content={<div>Choose</div>}
                        width={100}
                        height={24}
                        onClick={ () => setChosenAddress(address) }
                      />
                      <RectangularButton 
                        content={<div>Remove</div>}
                        width={100}
                        height={24}
                        onClick={ () => onRemoveAddressButtonClicked(address.ID) }
                      />
                    </div>
                  </div>
                );

              }) : <h2>You Don't Have Any Addresses</h2>
            }
          </div>
          <br />
          <RectangularButton 
            content={isAddingAdress ? <div>Close</div> : <div>Add Address</div>}
            width={200}
            height={34}
            orange
            onClick={ () => setIsAddingAddress(!isAddingAdress) }
          />
          {
            isAddingAdress && 
            <div className={style.add_address_container}>
              <br /><br />
              <h2>Add Address</h2>
              <RectangularInputField
                value={newAddress} 
                onChange={setNewAddress}
                area
                width={800}
                height={100}
                placeholder="Address"
              />
              <br />
              <RectangularButton 
                content={<div>Save</div>}
                width={200}
                height={34}
                orange
                onClick={ onSaveNewAddressButtonClicked }
              />
            </div>
          }
        </div>
        <br /><br /><br />
        <div className={style.delivery_provider_container}>
          <h2>2. Delivery Provider</h2>
          <br />
          <RectangularSelectField 
            data={deliveryProviders}
            idAttributeName="ID"
            optionAttributeName="delivery_provider_name"
            onChange={ setChosenDeliveryProvider }
            value={ chosenDeliveryProvider }
            width={200}
            height={30}
          />
        </div>
        <br /><br /><br />
        <div className={style.payment_methods}>
          <h2>3. Payment Method</h2>
          <br />
          <RectangularSelectField 
            data={paymentMethods}
            idAttributeName="ID"
            optionAttributeName="payment_method_name"
            onChange={ setChosenPaymentMethod }
            value={ chosenPaymentMethod }
            width={200}
            height={30}
          />
        </div>
        <br /><br /><br />
        <div className={style.order_summary}>
            <h2>4. Order Summary</h2>
            <br />
            <div className={style.order_summary_container}>
              {
                itemsInCart.map((itemInCart: any) => {
                  return <div className={style.product} key={itemInCart.product_id}>
                    <div className={style.left}>
                      <img src={itemInCart.product_image_links[0]} />
                    </div>
                    <div className={style.right}>
                      <h3>Product Name: {itemInCart.product_name}</h3>
                      <h4>Price: {itemInCart.product_price}</h4>
                      <h4>Quantity: {itemInCart.quantity}</h4>
                    </div>
                  </div>
                })
              }
              <br /><br />
              <div className={style.bottom}>
                <h2>Items Cost: ${totalCost}</h2>
                <h2>Shipping Cost: ${(totalCost * 0.1).toFixed(1)}</h2>
                <h2>Total Cost: ${(totalCost * 1.1).toFixed(1)}</h2>
                <br />
                <br />
                <RectangularButton 
                  content={<div>Checkout</div>}
                  height={24}
                  onClick={ onCheckoutButtonClicked }
                />
              </div>
            </div>
        </div>
      </div>
    );

  }

  return ( <HomeLayout content={ getContent() } user={user} /> );

}
 
export default CheckoutPage;

export const getStaticProps = async () => {
  
  const deliveryProviders = await getDeliveryProviders();
  const paymentMethods = await getPaymentMethods();

  return {
    props: {
      deliveryProviders: deliveryProviders,
      paymentMethods: paymentMethods
    }
  }

}