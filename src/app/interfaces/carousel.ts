export interface Carousel {
    _id?: string;
    title?: string;
    image : string | undefined;
    url?: string;
  }

export const carousels = [
    {
      _id:"1",
      image:"./assets/images/image/banner1.jpg",
      title:"De-Addiation",
      url:"#"
    },
    {
      _id:"2",
      image:"./assets/images/image/banner1.jpg",
      title:"Kidney Care",
      url:"#"
    }
  ];