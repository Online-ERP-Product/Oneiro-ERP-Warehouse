export interface ProductMovement {
  uuid: string;
  warehouse_name?: string;
  product_name?: string;
  product_id: string;
  operation_type: 'idxal' | 'ixrac' | 'transfer';
  created_at: string;
  created_by: string;
  quantity?: number;
  weight?: string;
  dimensions?: string;
  category?: string;
  invoice?: string;
  cost_price?: number;
  market_price?: number;
  updated_at: string;
  updated_by?: string;
  reason?: string;
}
