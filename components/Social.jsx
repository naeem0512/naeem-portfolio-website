import Link from "next/link";
import { FaGithub, FaLinkedinIn, FaDiscord, FaEnvelope } from "react-icons/fa";

// Update these paths with your actual social media links
const socials = [
  { icon: <FaGithub />, path: "https://github.com/naeem0512" },
  { icon: <FaLinkedinIn />, path: "https://www.linkedin.com/in/mohammed-ahmed-0592731a9/" },
  { icon: <FaDiscord />, path: "https://discordapp.com/users/naeem6446" }, // Use your actual Discord profile link
  { icon: <FaEnvelope />, path: "mailto:naeemahmed7860@gmail.com" },
];

const Social = ({ containerStyles, iconStyles }) => {
  return (
    <div className={containerStyles}>
      {socials.map((item, index) => {
        return (
          <Link key={index} href={item.path} className={iconStyles}>
            {item.icon}
          </Link>
        );
      })}
    </div>
  );
};

export default Social;
