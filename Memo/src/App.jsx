import Block from "./components/Block.jsx";
import InputBox from "./components/InputBox.jsx";
import Button from "./components/Button.jsx";
import Footer from "./components/Footer.jsx";
import Meme from "./components/Meme.jsx";
import axios from "axios";
import { useState } from "react";

function App() {
  const [topText, setTopText] = useState(" ");
  const [bottomText, setBottomText] = useState(" ");
  const [topFinal, setTopFinal] = useState("");
  const [bottomFinal, setBottomFinal] = useState("");
  const [img, setImg] = useState("");

  const memeAPI = "https://api.imgflip.com/get_memes";

  const buttonHandle = async (event) => {
    try {
      const response = await axios.get(`${memeAPI}`);
      generateMeme(response.data.data.memes);
    } catch (err) {
      console.log(err);
    }
  };
  const generateMeme = async (images) => {
    try {
      const image = images[Math.floor(Math.random() * images.length)];
      setImg(image.url);
      setTopFinal(topText);
      setBottomFinal(bottomText);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <header className="hero is-link">
        <Block title="Meme Generator"></Block>
      </header>
      <section className="section">
        <InputBox title="Top text" setText={setTopText}></InputBox>
        <InputBox title="Bottom text" setText={setBottomText}></InputBox>
        <Button click={buttonHandle}></Button>
      </section>
      <section>
        <Meme img={img} top={topFinal} bottom={bottomFinal}></Meme>
      </section>
      <Footer></Footer>
    </>
  );
}

export default App;
