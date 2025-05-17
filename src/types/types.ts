export type ProductDataType = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  color: string;
  images: string[]; 
  rating: number;
  availabilityStatus: string;
  brand: string;
  dimension: {
    width: number;
    height: number;
    depth: number;
  };
  discountPercentage: number;
  meta: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };
  minimumOrderQuantity: number;
  returnPolicy: string;
  reviews: ReviewType[]; 
  shippingInformation: string;
  sku: string;
  stock: number;
  size: string;
  tags: string[]; 
  thumbnail: string;
  warrantyInformation: string;
  weight: number;
};


export type ReviewType = {
  reviewerName: string;
  reviewerEmail: string;
  comment: string;
  rating: number;
  date: string;
};
