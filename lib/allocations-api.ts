const baseURL =
  process.env.NEXT_PUBLIC_ALLOCATIONS_API_BASE_URL ??
  `https://api.allocations.com`;
export const AllocationsAPI = {
  makeCall: async (
    path: string,
    method: 'GET' | 'POST' = 'GET',
    body: any = undefined,
    contentType: string = 'application/json'
  ) => {
    return fetch(`${baseURL}/${path}`, {
      method: method,
      headers: {
        'Content-Type': contentType,
        Authorization: `Basic ${process.env.NEXT_PUBLIC_API_ALLOCATIONS_KEY}`
      },
      body: body
    });
  },
  getSPVAgreementPreview: async (dealId: string) => {
    return AllocationsAPI.makeCall(
      `documents/subscription-agreement/preview/${dealId}`,
      'POST'
    );
  },
  getMSADocument: async () => {
    return AllocationsAPI.makeCall(
      `documents/master-service-agreement?preview=true`,
      'POST'
    );
  },
  downloadPDFFile: async (fileId: string) => {
    return AllocationsAPI.makeCall(
      `files/download/${fileId}`,
      'GET',
      undefined,
      'application/pdf'
    );
  },
  downloadZipFile: async (fileIds: string[]) => {
    return AllocationsAPI.makeCall(
      `files/download-bulk`,
      'POST',
      JSON.stringify(fileIds),
      'application/json'
    );
  }
};
