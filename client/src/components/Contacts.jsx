import React from "react";

const Contacts = () => {
  return (
    <ul className="flex flex-col gap-2 ">
      <li className="relative py-2 px-3 flex items-center justify-start gap-3 hover:bg-stone-800 duration-300 rounded-full">
        <div className="relative ">
          <img
            className="w-8 h-8 object-cover object-center rounded-full ring-2 ring-green-500 ring-offset-2 ring-offset-black"
            src="https://scontent.fmnl13-1.fna.fbcdn.net/v/t1.6435-1/128131566_1401162046721063_3715506702234565360_n.jpg?stp=c0.0.40.40a_cp0_dst-jpg_p40x40&_nc_cat=105&ccb=1-7&_nc_sid=7206a8&_nc_eui2=AeG2RpP4g-UuE76SBllHUq8DBrs8hHnRWX8GuzyEedFZf7UFc9z1AXCR1q3vgyfMN8m1szQXFmZO4E6Adog25uFj&_nc_ohc=ju3ZroxzQegAX9eX97h&_nc_ht=scontent.fmnl13-1.fna&oh=00_AfCaPSduulAAY9fjNxZ5A4cP9eOrCHl4XsIG-W2IYqAR4Q&oe=63A06B93"
            alt=""
          />
        </div>

        <p className="text-white text-sm font-mono">John Reygun Danag</p>
      </li>
      <li className="relative py-2 px-3 flex items-center justify-start gap-3 hover:bg-stone-800 duration-300 rounded-full">
        <div className="relative ">
          <img
            className="w-8 h-8 object-cover object-center rounded-full ring-2 ring-white/50 ring-offset-2 ring-offset-black"
            src="https://scontent.fmnl13-1.fna.fbcdn.net/v/t1.6435-1/128131566_1401162046721063_3715506702234565360_n.jpg?stp=c0.0.40.40a_cp0_dst-jpg_p40x40&_nc_cat=105&ccb=1-7&_nc_sid=7206a8&_nc_eui2=AeG2RpP4g-UuE76SBllHUq8DBrs8hHnRWX8GuzyEedFZf7UFc9z1AXCR1q3vgyfMN8m1szQXFmZO4E6Adog25uFj&_nc_ohc=ju3ZroxzQegAX9eX97h&_nc_ht=scontent.fmnl13-1.fna&oh=00_AfCaPSduulAAY9fjNxZ5A4cP9eOrCHl4XsIG-W2IYqAR4Q&oe=63A06B93"
            alt=""
          />
        </div>

        <p className="text-white text-sm font-mono">John Reygun Danag</p>
      </li>
    </ul>
  );
};

export default Contacts;
