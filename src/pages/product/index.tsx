import Head from "next/head";
import styles from "./styles.module.scss";
import { canSSRAuth } from "../../utils/canSSRAuth";
import { Header } from "../../components/Header";
import { FiUpload } from "react-icons/fi";
import Image from "next/image";
import { useState, ChangeEvent, FormEvent } from "react";
import { setupAPIClient } from "../../services/api";
import { toast } from "react-toastify";

type ItemProps = {
  id: string;
  name: string;
};

interface CategoryProps {
  categoryList: ItemProps[];
}

export default function Product({ categoryList }: CategoryProps) {

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const [avatarUrl, setAvatarUrl] = useState("");
  const [imageAvatar, setImageAvatar] = useState<File>(null);

  const [categories, setCategories] = useState<ItemProps[]>(categoryList || []);
  const [categorySelected, setCategorySelected] = useState<ItemProps>(0);

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

  //seleciona uma nova categoria na lista
  function handleChangeCategory(event: ChangeEvent<HTMLSelectElement>) {
    const index = event.target.value;
    setCategorySelected(index);
  }

  async function handleRegister(event: FormEvent) {
    event.preventDefault();

    try{
      const data = new FormData();

      if(name === "" || description === "" || price === "" || imageAvatar === null){
        toast.error("Preencha todos os campos");
        return;
      }

      data.append("name", name);
      data.append("description", description);
      data.append("price", price);
      data.append("category_id", categories[categorySelected].id);
      data.append('file', imageAvatar);

      const apiClient = setupAPIClient();
      await apiClient.post("/product", data);

      toast.success("Produto cadastrado com sucesso");

    }catch(error){
      console.log(error);
      toast.error("Erro ao cadastrar produto");
    }

    setName("");
    setDescription("");
    setPrice("");
    setAvatarUrl("");
    setImageAvatar(null);
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
          <form className={styles.form} onSubmit={handleRegister}>
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
            <select value={categorySelected} onChange={handleChangeCategory}>
              {categories.map((item, index) => {
                return (
                  <option key={item.id} value={index}>
                    {item.name}
                  </option>
                );
              })}
            </select>
            <input
              type="text"
              placeholder="Nome do produto"
              className={styles.input}
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <input
              type="text"
              placeholder="Descrição do produto"
              className={styles.input}
              value={price}
              onChange={(event) => setPrice(event.target.value)}
            />

            <textarea 
            placeholder="Ingredientes" 
            className={styles.input}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            />

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
  const apiClient = setupAPIClient(ctx);
  const response = await apiClient.get("/category");

  // console.log(response.data);
  return {
    props: {
      categoryList: response.data,
    },
  };
});
