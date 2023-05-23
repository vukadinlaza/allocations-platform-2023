const baseURL = process.env.NEXT_PUBLIC_ALLOCATIONS_API_BASE_URL ?? `https://api.allocations.com`;
export const AllocationsAPI = {
  makeCall: async (path: string, method: "GET"|"POST" = "GET", body: any = undefined)=> {
    return fetch(
      `${baseURL}/${path}`,
      {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${process.env.NEXT_PUBLIC_API_ALLOCATIONS_KEY}`
        }
      }
    );
  },
  getSPVAgreementPreview: async (dealId: string)=>{
    return AllocationsAPI.makeCall(`documents/subscription-agreement/preview/${dealId}`);
  },
  downloadFile: async (fileId: string)=>{
    return AllocationsAPI.makeCall(`files/download/${fileId}`);
  }
}
