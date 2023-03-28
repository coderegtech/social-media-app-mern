import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { BiHappyAlt } from "react-icons/bi";
import { BsCameraFill } from "react-icons/bs";
import { IoMdPhotos } from "react-icons/io";
import { RiLiveFill } from "react-icons/ri";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import UploadPost from "../components/UploadPost";
import useAuthStore from "../features/auth/useAuthStore";
import Posts from "../features/post/Posts";
import usePostsStore from "../features/post/usePostsStore";
import useUsersStore from "../features/users/useUsersStore";

const Profile = () => {
  const [like, setLike] = useState(false);
  const [addPostModal, setAddPostModal] = useState(false);

  const { currentUser, accessToken } = useAuthStore(
    (state) => state.currentUser
  );
  const users = useUsersStore((state) => state.users);
  const loading = useUsersStore((state) => state.loading);
  const getUser = useUsersStore((state) => state.getUser);
  const fullName = `${users?.firstname} ${users?.surname}`;

  const isLoading = usePostsStore((state) => state.isLoading);
  const fetching = usePostsStore((state) => state.fetching);
  const isError = usePostsStore((state) => state.isError);
  const posts = usePostsStore((state) => state.posts);
  const fetchUserPost = usePostsStore((state) => state.fetchUserPost);

  const { id } = useParams();

  const API_URL = "http://localhost:9999/api";
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const scrollRef = useRef();
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });

  useEffect(() => {
    const getUserPost = async () => {
      fetching();
      await axios
        .get(`${API_URL}/post/getUserPost/${id}`, config)
        .then((response) => {
          console.log(response.data);
          fetchUserPost(response.data);
        })
        .catch((err) => {
          console.log(err);
          isError(err);
        });
    };

    const getSelectedUser = async () => {
      loading();
      await axios
        .get(`${API_URL}/user/getUser/${id}`, config)
        .then((response) => {
          getUser(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    if (!isLoading) {
      getUserPost();
      getSelectedUser();
    }
  }, []);

  return (
    <>
      <div ref={scrollRef} className="w-full h-full bg-black/90 ">
        <Header />

        <div className="bg-black h-full w-full relative top-[60px]">
          <div className="max-w-5xl mx-auto h-full w-full ">
            {/* background image */}
            <div className="relative w-full h-80 md:max-h-96 md:h-96 bg-black rounded-b-xl bg-cover bg-center bg-no-repeat bg-[url('https://www.rxwallpaper.site/wp-content/uploads/galaxy-widescreen-desktop-wallpapers-3109-amazing-wallpaperz.jpg')]">
              <div className="absolute bottom-3 right-3 bg-white flex gap-3 items-center rounded-xl p-2">
                <BsCameraFill className="text-xl" />
                <p className="hidden md:block">Edit Cover Photo</p>
              </div>
            </div>

            <div className="flex gap-5 items-end md:items-center relative -top-16 left-0 py-5 px-3 border-b border-white/10">
              <div className="relative w-32 h-32 md:w-48 md:h-48 ">
                <img
                  className={`w-full h-full object-cover rounded-full border-4 border-stone-900 `}
                  src={`http://localhost:9999/profile/${users?.profilePic}`}
                  alt=""
                />
                <span className="absolute bottom-2 right-2 bg-stone-700 p-2 rounded-full border-4 border-stone-900">
                  <BsCameraFill className="text-xl text-white" />
                </span>
              </div>
              <div className="py-2">
                <h1 className="text-3xl md:text-4xl text-white font-semibold font-mono">
                  {" "}
                  {fullName.replace(/\b\w/g, (name) => name.toUpperCase())}
                </h1>
                <span className="text-white/50 text-lg">3.2K friends</span>
              </div>
            </div>
            <div className="w-full h-full px-3 md:px-0 relative -top-10 flex gap-3 items-start ">
              {/* left Side */}
              <div className="hidden sticky top-20 max-w-md w-full md:flex flex-col gap-3">
                {/* Photos */}
                <div className="w-full bg-[#111] p-3 rounded-xl">
                  <header className="flex justify-between items-center py-2">
                    <span className="text-lg text-white/80 font-mono">
                      Photos
                    </span>
                    <span className="text-sm text-blue-400 font-mono">
                      See All Photos
                    </span>
                  </header>
                  <div className="w-full rounded-xl overflow-hidden grid gap-1 grid-cols-3">
                    {posts?.map(({ postId, postImgName }, index) => {
                      return (
                        <div
                          className="w-full h-24 overflow-hidden"
                          key={postId}
                        >
                          <img
                            className="w-full h-full object-cover hover:scale-105 duration-200"
                            src={`http://localhost:9999/post/${postImgName}`}
                            alt=""
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Friends */}
                {/* <div className="w-full h-full  p-3 rounded-xl">
              <header className="flex justify-between items-center py-2">
                <span className="text-lg text-white/80 font-mono">
                  Friends
                </span>
                <span className="text-sm text-blue-400 font-mono">
                  See All Friends
                </span>
              </header>
              <div className="w-full h-full rounded-xl overflow-hidden grid grid-cols-3 gap-1  ">
                <div className="w-full h-full">
                  <img
                    className="w-full h-full object-cover"
                    src="https://scontent.fmnl13-1.fna.fbcdn.net/v/t39.30808-6/315848768_819787586083406_3768037584076885466_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=8bfeb9&_nc_eui2=AeEBtp2P904DoALANHEXUCKDMutzfgqU4_cy63N-CpTj96_UeWME_BD3cXz0AAx90NX7u710ZW9-DbBOBMVUQLmJ&_nc_ohc=xdoPzlqBY9gAX9omBDr&_nc_ht=scontent.fmnl13-1.fna&oh=00_AfDB8XPrKrpEI3cl2_xFKl0WOaRGa-k7CIN25maXGzYE5A&oe=637DF41A"
                    alt=""
                  />
                  <p className="text-white/80 text-sm">John Reygun</p>
                </div>
                <div className="w-full h-full">
                  <img
                    className="w-full h-full object-cover"
                    src="https://scontent.fmnl13-1.fna.fbcdn.net/v/t39.30808-6/315848768_819787586083406_3768037584076885466_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=8bfeb9&_nc_eui2=AeEBtp2P904DoALANHEXUCKDMutzfgqU4_cy63N-CpTj96_UeWME_BD3cXz0AAx90NX7u710ZW9-DbBOBMVUQLmJ&_nc_ohc=xdoPzlqBY9gAX9omBDr&_nc_ht=scontent.fmnl13-1.fna&oh=00_AfDB8XPrKrpEI3cl2_xFKl0WOaRGa-k7CIN25maXGzYE5A&oe=637DF41A"
                    alt=""
                  />
                  <p className="text-white/80 text-sm">John Reygun</p>
                </div>
                <div className="w-full h-full">
                  <img
                    className="w-full h-full object-cover"
                    src="https://scontent.fmnl13-1.fna.fbcdn.net/v/t39.30808-6/315848768_819787586083406_3768037584076885466_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=8bfeb9&_nc_eui2=AeEBtp2P904DoALANHEXUCKDMutzfgqU4_cy63N-CpTj96_UeWME_BD3cXz0AAx90NX7u710ZW9-DbBOBMVUQLmJ&_nc_ohc=xdoPzlqBY9gAX9omBDr&_nc_ht=scontent.fmnl13-1.fna&oh=00_AfDB8XPrKrpEI3cl2_xFKl0WOaRGa-k7CIN25maXGzYE5A&oe=637DF41A"
                    alt=""
                  />
                  <p className="text-white/80 text-sm">John Reygun</p>
                </div>
                <div className="w-full h-full">
                  <img
                    className="w-full h-full object-cover"
                    src="https://scontent.fmnl13-1.fna.fbcdn.net/v/t39.30808-6/315848768_819787586083406_3768037584076885466_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=8bfeb9&_nc_eui2=AeEBtp2P904DoALANHEXUCKDMutzfgqU4_cy63N-CpTj96_UeWME_BD3cXz0AAx90NX7u710ZW9-DbBOBMVUQLmJ&_nc_ohc=xdoPzlqBY9gAX9omBDr&_nc_ht=scontent.fmnl13-1.fna&oh=00_AfDB8XPrKrpEI3cl2_xFKl0WOaRGa-k7CIN25maXGzYE5A&oe=637DF41A"
                    alt=""
                  />
                  <p className="text-white/80 text-sm">John Reygun</p>
                </div>
                <div className="w-full h-full">
                  <img
                    className="w-full h-full object-cover"
                    src="https://scontent.fmnl13-1.fna.fbcdn.net/v/t39.30808-6/315848768_819787586083406_3768037584076885466_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=8bfeb9&_nc_eui2=AeEBtp2P904DoALANHEXUCKDMutzfgqU4_cy63N-CpTj96_UeWME_BD3cXz0AAx90NX7u710ZW9-DbBOBMVUQLmJ&_nc_ohc=xdoPzlqBY9gAX9omBDr&_nc_ht=scontent.fmnl13-1.fna&oh=00_AfDB8XPrKrpEI3cl2_xFKl0WOaRGa-k7CIN25maXGzYE5A&oe=637DF41A"
                    alt=""
                  />
                  <p className="text-white/80 text-sm">John Reygun</p>
                </div>
                <div className="w-full h-full">
                  <img
                    className="w-full h-full object-cover"
                    src="https://scontent.fmnl13-1.fna.fbcdn.net/v/t39.30808-6/315848768_819787586083406_3768037584076885466_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=8bfeb9&_nc_eui2=AeEBtp2P904DoALANHEXUCKDMutzfgqU4_cy63N-CpTj96_UeWME_BD3cXz0AAx90NX7u710ZW9-DbBOBMVUQLmJ&_nc_ohc=xdoPzlqBY9gAX9omBDr&_nc_ht=scontent.fmnl13-1.fna&oh=00_AfDB8XPrKrpEI3cl2_xFKl0WOaRGa-k7CIN25maXGzYE5A&oe=637DF41A"
                    alt=""
                  />
                  <p className="text-white/80 text-sm">John Reygun</p>
                </div>
                <div className="w-full h-full">
                  <img
                    className="w-full h-full object-cover"
                    src="https://scontent.fmnl13-1.fna.fbcdn.net/v/t39.30808-6/315848768_819787586083406_3768037584076885466_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=8bfeb9&_nc_eui2=AeEBtp2P904DoALANHEXUCKDMutzfgqU4_cy63N-CpTj96_UeWME_BD3cXz0AAx90NX7u710ZW9-DbBOBMVUQLmJ&_nc_ohc=xdoPzlqBY9gAX9omBDr&_nc_ht=scontent.fmnl13-1.fna&oh=00_AfDB8XPrKrpEI3cl2_xFKl0WOaRGa-k7CIN25maXGzYE5A&oe=637DF41A"
                    alt=""
                  />
                  <p className="text-white/80 text-sm">John Reygun</p>
                </div>
                <div className="w-full h-full">
                  <img
                    className="w-full h-full object-cover"
                    src="https://scontent.fmnl13-1.fna.fbcdn.net/v/t39.30808-6/315848768_819787586083406_3768037584076885466_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=8bfeb9&_nc_eui2=AeEBtp2P904DoALANHEXUCKDMutzfgqU4_cy63N-CpTj96_UeWME_BD3cXz0AAx90NX7u710ZW9-DbBOBMVUQLmJ&_nc_ohc=xdoPzlqBY9gAX9omBDr&_nc_ht=scontent.fmnl13-1.fna&oh=00_AfDB8XPrKrpEI3cl2_xFKl0WOaRGa-k7CIN25maXGzYE5A&oe=637DF41A"
                    alt=""
                  />
                  <p className="text-white/80 text-sm">John Reygun</p>
                </div>
                <div className="w-full h-full">
                  <img
                    className="w-full h-full object-cover"
                    src="https://scontent.fmnl13-1.fna.fbcdn.net/v/t39.30808-6/315848768_819787586083406_3768037584076885466_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=8bfeb9&_nc_eui2=AeEBtp2P904DoALANHEXUCKDMutzfgqU4_cy63N-CpTj96_UeWME_BD3cXz0AAx90NX7u710ZW9-DbBOBMVUQLmJ&_nc_ohc=xdoPzlqBY9gAX9omBDr&_nc_ht=scontent.fmnl13-1.fna&oh=00_AfDB8XPrKrpEI3cl2_xFKl0WOaRGa-k7CIN25maXGzYE5A&oe=637DF41A"
                    alt=""
                  />
                  <p className="text-white/80 text-sm">John Reygun</p>
                </div>
              </div>
            </div> */}
              </div>
              {/* Rigth side */}
              {/* newsfeed */}
              <div className="w-full h-full ">
                <div
                  onClick={() => setAddPostModal(true)}
                  className="w-full h-auto px-3 py-4 bg-[#111] rounded-xl"
                >
                  <div className="w-full h-full flex gap-3 items-center justify-center pb-3">
                    <img
                      className="w-10 h-10 object-cover rounded-full"
                      src={`http://localhost:9999/profile/${currentUser?.profilePic}`}
                      alt=""
                    />
                    <span className="py-2 px-3 w-full bg-white/10 rounded-full text-white/30 cursor-pointer">
                      What's on your mind?
                    </span>
                  </div>

                  <div className="w-full flex justify-around items-center py-2 border-t border-white/20">
                    <div className="flex gap-2 cursor-pointer">
                      <RiLiveFill className="text-red-500 text-xl" />
                      <p className="text-sm text-white/50">Live video</p>
                    </div>
                    <div className="flex gap-2 cursor-pointer">
                      <IoMdPhotos className="text-green-500 text-xl" />
                      <p className="text-sm text-white/50">Photo/video</p>
                    </div>
                    <div className="flex gap-2 cursor-pointer">
                      <BiHappyAlt className="text-yellow-500 text-xl" />
                      <p className="text-sm text-white/50">Feeling/activity</p>
                    </div>
                  </div>
                </div>

                {/* Add Post */}
                <UploadPost
                  active={addPostModal}
                  close={() => setAddPostModal(false)}
                />

                {/* posts */}

                <Posts posts={posts} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
