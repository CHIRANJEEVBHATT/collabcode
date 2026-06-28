import { Toaster } from "react-hot-toast";
import AppRoutes from "@/routes/AppRoutes";

function App() {
  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 4000,
          style: {
            background: "#000",
            border: "1px solid rgba(255,255,255,0.18)",
            color: "#fff",
          },
        }}
      />
      <AppRoutes />
    </>
  );
}

export default App;
