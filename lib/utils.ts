export const getFullName = (user: any) => {
  if (!user) return '';
  if (user && user.first_name) return `${user.first_name} ${user.last_name ?? ''}`.trim();
  return user.email;
};

export const getFirstLetter = (email: string | undefined | null) => {
  if (!email) return 'A';
  return email[0];
};

export const downloadFile = async (fileData: Blob, fileName: string) => {
  const url = URL.createObjectURL(fileData);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${fileName}`;
  document.body.appendChild(link);
  link.click();
  URL.revokeObjectURL(url);
  link.remove();
};

export const getDeviceType = () => {
  const userAgent = navigator.userAgent;
  
  // Regular expressions to match device types
  const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  const tabletRegex = /Tablet|iPad/i;
  
  if (mobileRegex.test(userAgent)) {
    return 'Mobile';
  } else if (tabletRegex.test(userAgent)) {
    return 'Tablet';
  } else {
    return 'Desktop';
  }
}