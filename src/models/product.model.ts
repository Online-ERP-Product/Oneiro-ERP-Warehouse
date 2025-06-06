export interface Product {
  uuid: string;
  product_id: string;
  name: string;
  type?: string;
  weight?: number;
  dimensions?: number;
  category?: string;
  manufacturer_uuid?: string;
  warehouse_uuid: string;
  quantity?: number;
  min_stock_level?: number;
  min_import: number;
  max_import: number;
  min_export: number;
  max_export: number;
  received_at?: string;
  invoice?: string;
  cost_price?: number;
  market_price?: number;
  expiration_date?: string;
  note?: string;
}
