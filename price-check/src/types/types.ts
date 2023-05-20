export interface Response {
  results: Result[];
}

export interface Result {
  hits: Hit[];
  nbHits: number;
  page: number;
  nbPages: number;
  hitsPerPage: number;
  facets: Facets3;
  facets_stats: FacetsStats;
  exhaustiveFacetsCount: boolean;
  exhaustiveNbHits: boolean;
  exhaustiveTypo: boolean;
  exhaustive: Exhaustive;
  query: string;
  params: string;
  index: string;
  renderingContent: RenderingContent;
  processingTimeMS: number;
  processingTimingsMS: ProcessingTimingsMs;
  serverTimeMS: number;
}

export interface Hit {
  schemaVersion: number;
  sku: string;
  online_product_timestamp: string;
  title: string;
  primary_title: string;
  secondary_title: string;
  category_id: number;
  category: string;
  category_hierarchy: string[];
  release_date: number;
  taxable: boolean;
  price: number;
  weight: number;
  all_calculated_product_tags: string[];
  compare_at_price: any;
  button: string;
  preamble: string;
  brand_image_url: string;
  template_name: string;
  facets: Facets;
  banner_tags: BannerTags;
  promo_tags: PromoTag[];
  showWasPrice: boolean;
  product: Product;
  productGroup: ProductGroup;
  department: Department;
  display: Display;
  availability: Availability;
  pricing: Pricing;
  google_tag_manager: GoogleTagManager;
  services: any[];
  family: Family;
  onPromotion: boolean;
  weighted_average_rating: number;
  bnplExcluded: boolean;
  product_published: boolean;
  product_type: string;
  vendor: string;
  variant_id: number;
  created_at: string;
  product_id: number;
  inventory_management: string;
  inventory_quantity: string;
  inventory_management_shopify: string;
  updated_at: string;
  handle: string;
  tags: string;
  product_image: string;
  published_at: string;
  shopify_timestamp: string;
  month_combined_bucket?: number;
  year_combined_bucket?: number;
  objectID: string;
  _highlightResult: HighlightResult;
  productTags?: ProductTags;
  service?: Service;
  manually_loaded?: boolean;
}

export interface Facets {
  Director: string[];
  Actors: string[];
  "Film Genre": string[];
  Label: string[];
  Audio?: string[];
  Subtitles?: string[];
  "Running Time": number[];
  "Aspect ratio": string[];
  "Region Coding": string[];
  "TV Standard": string[];
  Rating: string[];
  "Consumer Advice"?: string[];
  "Year of Release": number[];
  "Primary Format - Movies/TV": string[];
  productRating?: number[];
  Category: string[];
  "Primary Category": string[];
  Availability: string[];
  Price: number[];
}

export interface BannerTags {
  label?: string;
  color?: string;
  background_color?: string;
}

export interface PromoTag {
  label: string;
  color: string;
  background_color: string;
}

export interface Product {
  id: string;
  ean13: string;
  description: string;
  model: string;
  brand: string;
  departmentCode: number;
  productGroupId: number;
  supplierProductDetails: SupplierProductDetail[];
  packagedDimensions: PackagedDimensions;
  releaseDate: string;
  limitPerOrder: number;
  freightPrice: number;
  limitedRunPromotionItems: any[];
  campaigns: any[];
  hasOnlineCategory: boolean;
  format: string;
  showReviews: boolean;
  averageProductReviewRating?: number;
  numberOfProductReviews: number;
  productGroupName: string;
  departmentName: string;
  releaseQuarter: string;
  productFlags: ProductFlag[];
  releaseDateText?: string;
}

export interface SupplierProductDetail {
  supplierNumber: number;
  supplierName: string;
  supplierEAN13: string;
  supplierStockCode: string;
  supplierStockDescription: string;
}

export interface PackagedDimensions {
  height: number;
  width: number;
  depth: number;
  weight: number;
}

export interface ProductFlag {
  Id: number;
  Name: string;
}

export interface ProductGroup {
  id: number;
  description: string;
  timestamp: string;
}

export interface Department {
  id: number;
  description: string;
  timestamp: string;
}

export interface Display {
  artist: string;
  tracklist: any[];
  actors: string;
  directors: string;
  images: Image[];
  keyFeatures: any[];
  categoryHierarchy: string[];
  graphicAttributes: any[];
}

export interface Image {
  ResourceId: string;
  Timestamp: string;
  ImageIndex?: number;
  ImageCategory: string;
  Extension: string;
  ImageHash: string;
  ImageName: string;
  ImageUrl: string;
}

export interface Availability {
  channelsAllowedToSellProduct: any[];
  displayProduct: boolean;
  canBuyOnline: boolean;
  canPreOrder: boolean;
  fulfilment: string;
  productLifecycle: string;
  preOrderLimit: PreOrderLimit;
  deliveryFromOnlineWarehouseOnly: boolean;
  deliveryConstraint: string;
  ranging: string;
  deliveryStatus: string;
  clickNCollectStatus: string;
  cashNCarryStatus: string;
  overallStatus: string;
  availabilityStatement: string;
  deliveryOnly: boolean;
  availableNow: string;
}

export interface PreOrderLimit {
  limitType: string;
  limitStatus: string;
  limitReachedDate: string;
}

export interface Pricing {
  displayPriceInc: number;
  displayPriceTax: number;
  wasPrice?: number;
  saveAmount?: number;
  displayWasPrice: boolean;
  displayPriceAfterCashback: boolean;
  coreTicketPrice: number;
  wasPriceExpiryDate: string;
}

export interface GoogleTagManager {
  name: string;
  id: string;
  price: number;
  brand: string;
  category: string;
  dimension4: string;
  dimension5: string;
  dimension6: string;
  dimension7: string;
  dimension3?: string;
  variants?: Variant[];
}

export interface Variant {
  Name: string;
  Value: string;
}

export interface Family {
  id?: string;
  title?: string;
  options?: Option[];
  availabilities?: Availability2[];
  buttons?: Button[];
  prices?: Price[];
  standAloneSkus?: string[];
  keepSplit?: boolean;
  render?: string;
}

export interface Option {
  Name: string;
  SpecRender: string;
  Children: Children[];
}

export interface Children {
  SKU: string;
  Sequence: number;
  Value: string;
}

export interface Availability2 {
  DeliveryOnly: boolean;
  SKU: string;
  DisplayProduct: boolean;
  CanBuyOnline: boolean;
  CanPreOrder: boolean;
  Fulfilment: string;
  ProductLifecycle: string;
  DeliveryConstraint: string;
  DeliveryStatus: string;
  Ranging: string;
  ClickNCollectStatus: string;
  CashNCarryStatus: string;
  DeliveryFromOnlineWarehouseOnly: boolean;
  AvailabilityStatement: string;
  OverallStatus: string;
}

export interface Button {
  Sku: string;
  Button: string;
}

export interface Price {
  Sku: string;
  DisplayPriceInc: number;
}

export interface HighlightResult {
  sku: Sku;
  title: Title;
  category: Category;
  facets: Facets2;
  product: Product2;
}

export interface Sku {
  value: string;
  matchLevel: string;
  matchedWords: any[];
}

export interface Title {
  value: string;
  matchLevel: string;
  matchedWords: any[];
}

export interface Category {
  value: string;
  matchLevel: string;
  matchedWords: any[];
}

export interface Facets2 {
  "Primary Format - Movies/TV": PrimaryFormatMoviesTv[];
}

export interface PrimaryFormatMoviesTv {
  value: string;
  matchLevel: string;
  matchedWords: any[];
}

export interface Product2 {
  ean13: Ean13;
  model: Model;
}

export interface Ean13 {
  value: string;
  matchLevel: string;
  matchedWords: any[];
}

export interface Model {
  value: string;
  matchLevel: string;
  matchedWords: any[];
}

export interface ProductTags {
  allCalculatedProductTags: any[];
  bannerTag: BannerTag;
  promoTags: PromoTag2[];
}

export interface BannerTag {
  backgroundColour: string;
  colour: string;
  label: string;
}

export interface PromoTag2 {
  backgroundColour: string;
  colour: string;
  label: string;
}

export interface Service {
  services: any[];
}

export interface Facets3 {
  "facets.Price": FacetsPrice;
  "facets.Category": FacetsCategory;
}

export interface FacetsPrice {
  [n: number]: number;
}

export interface FacetsCategory {
  Movies: number;
}

export interface FacetsStats {
  "facets.Price": FacetsPrice2;
}

export interface FacetsPrice2 {
  min: number;
  max: number;
  avg: number;
  sum: number;
}

export interface Exhaustive {
  facetsCount: boolean;
  nbHits: boolean;
  typo: boolean;
}

export interface RenderingContent {}

export interface ProcessingTimingsMs {
  afterFetch: AfterFetch;
  fetch: Fetch;
  request: Request;
  total: number;
}

export interface AfterFetch {
  format: Format;
  total: number;
}

export interface Format {
  decompress: number;
  highlighting: number;
  total: number;
}

export interface Fetch {
  scanning: number;
  total: number;
}

export interface Request {
  roundTrip: number;
}
