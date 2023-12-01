interface Geolocation {
  latitude: string;
  longitude: string;
}

interface Address {
  geolocation: Geolocation;
  addressLine: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  _id: string;
}

export default Address;
