import React, { lazy, Suspense } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  createRoutesFromElements,
  Route,
  ScrollRestoration,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loading } from './assets/images';
import SignUp from './pages/Account/SignUp';
import SignIn from './pages/Account/SignIn';

const LazyHeader = lazy(() => import('./components/home/Header/Header'));
const LazyHeaderBottom = lazy(() =>
  import('./components/home/Header/HeaderBottom')
);
const LazySpecialCase = lazy(() =>
  import('./components/SpecialCase/SpecialCase')
);
const LazyFooter = lazy(() => import('./components/home/Footer/Footer'));
const LazyFooterBottom = lazy(() =>
  import('./components/home/Footer/FooterBottom')
);
const LazyHome = lazy(() => import('./pages/Home/Home'));
const LazyShop = lazy(() => import('./pages/Shop/Shop'));
const LazyAbout = lazy(() => import('./pages/About/About'));
const LazyContact = lazy(() => import('./pages/Contact/Contact'));
const LazyJournal = lazy(() => import('./pages/Journal/Journal'));
const LazyOffer = lazy(() => import('./pages/Offer/Offer'));
const LazySubCat = lazy(() => import('./pages/subCat/SubCat'));
const LazyPayment = lazy(() => import('./pages/payment/Payment'));
const LazyProductDetails = lazy(() =>
  import('./pages/ProductDetails/ProductDetails')
);
const LazyProductCreate = lazy(() =>
  import('./pages/ProductDetails/ProductCreate')
);
const LazyProductUpadate = lazy(() =>
  import('./pages/ProductDetails/ProductUpdate')
);
const LazyCart = lazy(() => import('./pages/Cart/Cart'));
//const LazySignUp = lazy(() => import("./pages/Account/SignUp"));
//const LazySignIn = lazy(() => import("./pages/Account/SignIn"));

const LazySearchResults = lazy(() =>
  import('./pages/SearchResults/SearchResults')
);

const Layout = () => {
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Suspense
        fallback={
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100vh', // 100% of the viewport height
            }}
          >
            <div>
              <img
                src={loading}
                alt="Loading"
                style={{ width: '100px', height: '100px' }}
              />
            </div>
            <p style={{ marginTop: '10px' }}>Chemical Ink Company</p>
          </div>
        }
      >
        <LazyHeader />
        <LazyHeaderBottom />
        <LazySpecialCase />
        <ScrollRestoration />
        <Outlet />
        <LazyFooter />
        <LazyFooterBottom />
      </Suspense>
    </div>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Layout />}>
        <Route index element={<LazyHome />} />
        <Route path="/shop" element={<LazyShop />} />
        <Route path="/about" element={<LazyAbout />} />
        <Route path="/contact" element={<LazyContact />} />
        <Route path="/journal" element={<LazyJournal />} />
        <Route path="/category/:category" element={<LazyOffer />} />
        <Route path="/category/:subCat" element={<LazySubCat />} />
        <Route path="/product/:slug" element={<LazyProductDetails />} />
        <Route path="/admin/product/create" element={<LazyProductCreate />} />
        <Route
          path="/admin/product-update/:slug"
          element={<LazyProductUpadate />}
        />
        <Route path="/cart" element={<LazyCart />} />
        <Route path="/paymentgateway" element={<LazyPayment />} />
        <Route path="/search" element={<LazySearchResults />} />{' '}
        {/* New Route */}
      </Route>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
    </Route>
  )
);

function App() {
  return (
    <div className="font-bodyFont">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
