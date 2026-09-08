export type EnquirySelection = { kind: 'package'; name: string; total: number; features: string[] } | { kind: 'custom'; pageCount: number; featureIds: string[] };
