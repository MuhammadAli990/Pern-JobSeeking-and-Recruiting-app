import React from "react";
import { Link } from "react-router-dom";

function PrivateRoute() {
  return (
    <section class="bg-white">
      <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 h-screen flex justify-center items-center">
        <div class="mx-auto max-w-screen-sm text-center">
          <h1 class="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 ">
            403
          </h1>
          <p class="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl ">
            Forbidden.
          </p>
          <p class="mb-8 text-lg font-light text-gray-500">
            Sorry, that page is forbidden. You'll find lots to explore on the
            home page.{" "}
          </p>
          <Link
            to={"/"}
            class="border border-black font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:bg-black hover:text-white duration-200"
          >
            Back to Homepage
          </Link>
        </div>
      </div>
    </section>
  );
}

export default PrivateRoute;
