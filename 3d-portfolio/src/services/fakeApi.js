export const simulatePayment = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const success = Math.random() > 0.3;
      resolve(success);
    }, 1500);
  });
};