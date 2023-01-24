import { AiFillGithub } from "react-icons/ai";

const Footer = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-8">
      <p className="font-extralight">Made by 0xGuvnor</p>
      <a
        href="https://github.com/0xGuvnor/Liquidatooor_client"
        target="_blank"
        rel="noopener noreferrer"
      >
        <AiFillGithub className="text-2xl transition-all duration-300 ease-in-out hover:scale-110" />
      </a>
    </div>
  );
};
export default Footer;
