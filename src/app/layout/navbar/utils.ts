import {
  // usFlag,

  iqFlag,

} from "@/assets/images/flags/utils";
import ukFlag from "@/assets/images/flags/ukFlag.svg";
import { ShoppingBag } from "lucide-vue-next";

import { avatar5, avatar3, avatar7 } from "@/assets/images/users/utils";

export const languagesData: {
  title: string;
  value: string;
  src: string;
  lang: string;
}[] = [
  { title: "English", value: "English", src: ukFlag, lang: "en" },
  { title: "Arabic", value: "Arabic", src: iqFlag, lang: "ar" }
];



export const notificationData = [
  {
    src: avatar3,
    title: "<b>@willie_passem</b> followed you",
    fullTime: "Wednesday 03:42 PM",
    time: "4 sec",
    type: "followers"
  },
  {
    src: avatar5,
    title: "<b>@caroline_jessica</b> commented on your post",
    message: `Amazing! Fast, to the point, professional and really amazing
    to work with them!!!`,
    fullTime: "Wednesday 03:42 PM",
    time: "15 min",
    type: "mentions"
  },
  {
    icon: ShoppingBag,
    title: `Successfully purchased a business plan for
    <span class="text-red-500">$199.99</span>`,
    fullTime: "Monday 11:26 AM",
    time: "Yesterday",
    type: "invites"
  },
  {
    src: avatar7,
    title: `<b>@scott</b> liked your post`,
    fullTime: "Thursday 06:59 AM",
    time: "1 Week",
    isLike: true,
    type: "mentions"
  }
];
