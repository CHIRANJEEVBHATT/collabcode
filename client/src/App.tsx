import { Toaster } from "react-hot-toast";
import AppRoutes from "@/routes/AppRoutes";

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} toastOptions={{ duration: 4000 }} />
      <AppRoutes />
    </>
  );
}

export default App;