export interface File {
  id: string;
  name: string;
  file_name: string;
  type: string;
  created_at: string;
  content_type: string;
}

export interface InvestmentFileMeta {
  investmentId: string;
  investmentName: string;
}

export interface DealFileMeta {
  dealId: string;
}
