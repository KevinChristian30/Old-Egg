type User = {
  ID: Number
  first_name?: string,
  last_name?: string,
  email?: string,
  mobile_phone_number?: string,
  password?: string,
  role_id?: number,
  subscribed_to_email_offers_and_discounts?: boolean,
  status?: string,
  two_factor_authentication?: boolean
}

export default User;