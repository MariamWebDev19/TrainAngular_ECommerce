// src/app/services/flowbite.service.ts
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class FlowbiteService {
  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  loadFlowbite(callback: (flowbite: any) => void) {
    if (isPlatformBrowser(this.platformId)) {
      import('flowbite').then(flowbite => {
        callback(flowbite);
      });
    }
  }
}





 
// import pay from '../../assets/images/paypal.png'
// export default function Footer() {

//   return (
//     <footer className="bg-gray-400 my-24 py-10 px-20 pt-6 m-12 border-4 rounded-2xl">
//       <div className="">
//         <h2 className="text-3xl  font-sans italic text-green-700">
//           Crafted with by Mariam Yousri Omar{" "}
//         </h2>
//         <p className=" text-lg  font-sans italic text-gray-800 font-normal">
//           React+Vite JavaScript TailwindCSS Flowbit 
//         </p>
//       </div>
//       <div className="flex justify-between py-5">
//         <input
//           type="text"
//           id="text"
//           className="bg-gray-50 border w-[85%] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
//           placeholder="Your Email..."
//           required
//         />
//         <button className="bg-green-600 text-white font-sans italic p-2 rounded-2xl ">
//           Share app link
//         </button>
//       </div>
//       <div className="flex  justify-between  font-sans italic text-gray-800 py-3">
//          <p className=" font-sans italic text-gray-800 text-lg">Payment partner</p>
//         <p className="text-gray-800 text-lg font-sans italic">Get deliveries with FrechCart</p> 
        
//       </div>
//     </footer>
//   );
// }

