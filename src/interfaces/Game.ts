export interface Game {
  name: string;
  imgUrl: string;
  start: number;
  end: number;
  sent: boolean;
  confirmed: boolean;
  store: {
    name: string;
    url: string;
  };
  slug: string;
  price: string;
  link: string;
}
