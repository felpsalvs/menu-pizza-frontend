import Head from "next/head";
import styles from "./styles.module.scss";
import { canSSRAuth } from "../../utils/canSSRAuth";
import { Header } from "../../components/Header";
import { FiUpload } from "react-icons/fi";
import Image from "next/image";
import { useState, ChangeEvent } from "react";

export default function Product() {
  const [avatarUrl, setAvatarUrl] = useState("");
  const [imageAvatar, setImageAvatar] = useState<File>(null);

  function handleFile(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) {
      return;
    }

    const image = event.target.files[0];

    if (!image) {
      return;
    }

    if (image.type === "image/png" || image.type === "image/jpeg") {
      setImageAvatar(image);
      setAvatarUrl(URL.createObjectURL(event.target.files[0]));
    }
  }

  return (
    <>
      <Head>
        <title>Produto | Pizzaria</title>
      </Head>
      <div>
        <Header />
        <main className={styles.container}>
          <h1>Produto</h1>
          <form className={styles.form}>
            <label className={styles.labelAvatar}>
              <span>
                <FiUpload size={24} color="#fff" />
              </span>
              <input
                type="file"
                accept="image/png, image/jpeg"
                onChange={handleFile}
              />
              {avatarUrl && (
                <Image
                  src={avatarUrl}
                  alt="Foto do produto"
                  width={200}
                  height={200}
                  className={styles.preview}
                />
              )}
            </label>
            <select>
              <option>Selecione uma categoria</option>
              <option>Selecione uma categoria</option>
            </select>
            <input
              type="text"
              placeholder="Nome do produto"
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Descrição do produto"
              className={styles.input}
            />

            <textarea placeholder="Ingredientes" className={styles.input} />

            <button className={styles.buttonAdd} type="submit">
              Cadastrar
            </button>
          </form>
        </main>
      </div>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  return {
    props: {},
  };
});
